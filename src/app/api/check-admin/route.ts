import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { uid } = await req.json();

  const admins = process.env.ADMIN_UIDS?.split(",") || [];

  return NextResponse.json({
    isAdmin: admins.includes(uid),
  });
}
