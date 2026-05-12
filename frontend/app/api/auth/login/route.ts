import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { createServerSupabase } from "@/lib/supabase-server";

const secretKey = process.env.JWT_SECRET_KEY || "dania-real-estate-super-secret-key-2024";
const key = new TextEncoder().encode(secretKey);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@daniarealestate.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let jwtPayload: Record<string, any> | null = null;

    // 1. Check superadmin credentials (env vars)
    if (email === adminEmail && password === adminPassword) {
      jwtPayload = { email, role: "superadmin", name: "Super Admin" };
    } else {
      // 2. Check branch users in Supabase admin_users table
      const supabase = createServerSupabase();
      const { data: user } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .eq("is_active", true)
        .single();

      if (user) {
        jwtPayload = {
          email: user.email,
          role: "branch",
          name: user.name,
          branch: user.branch,
          id: user.id,
        };
      }
    }

    if (!jwtPayload) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 401 }
      );
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(key);

    const response = NextResponse.json(
      { message: "Authentication successful", success: true },
      { status: 200 }
    );
    response.cookies.set({
      name: "session",
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
