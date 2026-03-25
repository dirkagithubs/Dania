import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const secretKey = process.env.JWT_SECRET_KEY || "dania-real-estate-super-secret-key-2024"
const key = new TextEncoder().encode(secretKey)

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // In a real application, you'd check this against a database.
    // Here we're using environment variables for the admin credentials.
    const validEmail = process.env.ADMIN_EMAIL || "admin@daniarealestate.com"
    const validPassword = process.env.ADMIN_PASSWORD || "admin123"

    if (email === validEmail && password === validPassword) {
      // Create a JWT session
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      const session = await new SignJWT({ email, role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key)

      const response = NextResponse.json(
        { message: 'Authentication successful', success: true },
        { status: 200 }
      )
      
      // Set HttpOnly cookie
      response.cookies.set({
        name: 'session',
        value: session,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expires,
        path: '/'
      })
      
      return response
    }

    return NextResponse.json(
      { message: 'Invalid credentials', success: false },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    )
  }
}
