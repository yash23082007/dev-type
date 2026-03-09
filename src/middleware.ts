import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'devtype-secret-key-change-in-production-2024'
)

const COOKIE_NAME = 'devtype-auth-token'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  const { pathname } = request.nextUrl

  const protectedPaths = ['/dashboard']
  const authPaths = ['/login', '/signup']

  const isProtected = protectedPaths.some(p => pathname.startsWith(p))
  const isAuthPath = authPaths.some(p => pathname.startsWith(p))

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      await jwtVerify(token, JWT_SECRET)
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (isAuthPath && token) {
    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch {
      // Invalid token, let them see auth pages
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
