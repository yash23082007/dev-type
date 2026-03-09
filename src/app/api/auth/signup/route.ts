import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword, createToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    })

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username'
      return NextResponse.json(
        { error: `A user with this ${field} already exists` },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      }
    })

    const token = await createToken({
      userId: user.id,
      username: user.username,
      email: user.email,
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    }, { status: 201 })

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
