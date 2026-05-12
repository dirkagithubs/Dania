import { cookies } from "next/headers";
import { jwtVerify, type JWTPayload } from "jose";
import { NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET_KEY || "dania-real-estate-super-secret-key-2024";
const key = new TextEncoder().encode(secretKey);

export type SessionPayload = JWTPayload & {
  email: string;
  role: "superadmin" | "branch";
  name: string;
  branch?: string;
  id?: string;
};

/** Verifies the session cookie and returns the payload, or null if invalid/missing. */
export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) return null;
  try {
    const { payload } = await jwtVerify(sessionCookie, key, { algorithms: ["HS256"] });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/** Returns the session payload if the caller is any authenticated admin, or a 401 response. */
export async function requireAuth(): Promise<SessionPayload | NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return session;
}

/** Returns the session payload if the caller is a superadmin, or a 403 response. */
export async function requireSuperAdmin(): Promise<SessionPayload | NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "superadmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return session;
}
