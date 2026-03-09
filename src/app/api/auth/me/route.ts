import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const authUser = await getAuthUser()

    if (!authUser) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        level: true,
        totalTests: true,
        avgWpm: true,
        highestWpm: true,
        avgAccuracy: true,
        streak: true,
        lastTestDate: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
