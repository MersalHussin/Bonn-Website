import { NextResponse } from "next/server";
import { admin } from "../../../../lib/firebase-admin";
import { createClient } from "@supabase/supabase-js";

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
  return await admin.auth().verifyIdToken(token);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdmin(req);
    const data = await req.json();
    const { id } = await params;

    const { error } = await supabase
      .from("locations")
      .update(data)
      .eq("id", id);
      
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating location:", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await verifyAdmin(req);
    const { id } = await params;

    const { error } = await supabase
      .from("locations")
      .delete()
      .eq("id", id);
      
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting location:", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
