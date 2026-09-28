import { NextResponse } from "next/server";
import { admin } from "../../../lib/firebase-admin";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with service role key to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyAdmin(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken;
}

export async function POST(req: Request) {
  try {
    await verifyAdmin(req);
    const data = await req.json();

    const { error } = await supabase.from("locations").insert([data]);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error adding location:", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
