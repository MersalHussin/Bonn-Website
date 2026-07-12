import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: Request) {
  try {
    // A simple query to keep the Supabase project active
    // We fetch a single row from any table, e.g., 'products', or just use a basic auth call.
    // Fetching from a table ensures the database is woken up and active.
    const { data, error } = await supabase.from('news').select('id').limit(1);

    if (error) {
      console.error("Keep-alive error:", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    console.log("Supabase keep-alive ping successful at", new Date().toISOString());
    return NextResponse.json({ success: true, message: "Supabase is active" });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
