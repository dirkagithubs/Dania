import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET_KEY || "dania-real-estate-super-secret-key-2024"
const key = new TextEncoder().encode(secretKey)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    // Exclude the login page and auth API from the middleware redirect
    if (pathname === '/admin/login' || pathname.startsWith('/api/auth')) {
      return NextResponse.next()
    }

    const sessionCookie = request.cookies.get('session')?.value

    if (!sessionCookie) {
      // No session, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify JWT token using jose
      await jwtVerify(sessionCookie, key, {
        algorithms: ['HS256'],
      })
      
      // Token is valid, proceed
      return NextResponse.next()
    } catch (error) {
      // Invalid token, clear it and redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('session')
      return response
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
}
