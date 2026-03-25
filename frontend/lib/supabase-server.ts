import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service role key
// This bypasses RLS and should ONLY be used in API routes / server components
export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}
