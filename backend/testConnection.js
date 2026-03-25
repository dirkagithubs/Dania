import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from('properties').select('*').limit(1);
  if (error) {
    console.error("Connection failed or table 'properties' doesn't exist:", error);
  } else {
    console.log("Connection successful! First row:", data);
  }
}

testConnection();
