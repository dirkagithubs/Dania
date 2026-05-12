import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET_KEY || "dania-real-estate-super-secret-key-2024";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    // Login page and auth API are always accessible
    if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, key, { algorithms: ["HS256"] });

      // Only superadmin can access user management
      if (pathname.startsWith("/admin/users") && payload.role !== "superadmin") {
        return NextResponse.redirect(new URL("/admin/properties", request.url));
      }

      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
