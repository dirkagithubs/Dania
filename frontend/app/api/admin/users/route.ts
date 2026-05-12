import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { requireSuperAdmin } from "@/lib/auth";

// GET /api/admin/users — list all branch users
export async function GET() {
  const auth = await requireSuperAdmin();
  if (auth instanceof NextResponse) return auth;

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, name, email, branch, is_active, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/admin/users — create a branch user
export async function POST(request: NextRequest) {
  const auth = await requireSuperAdmin();
  if (auth instanceof NextResponse) return auth;

  const { name, email, password, branch } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "name, email, and password are required" },
      { status: 400 }
    );
  }

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("admin_users")
    .insert({ name, email, password, branch: branch || "Main Branch" })
    .select("id, name, email, branch, is_active, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}

// PATCH /api/admin/users — toggle active status
export async function PATCH(request: NextRequest) {
  const auth = await requireSuperAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id, is_active } = await request.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("admin_users")
    .update({ is_active })
    .eq("id", id)
    .select("id, name, email, branch, is_active, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE /api/admin/users?id=... — delete a branch user
export async function DELETE(request: NextRequest) {
  const auth = await requireSuperAdmin();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const supabase = createServerSupabase();
  const { error } = await supabase.from("admin_users").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
