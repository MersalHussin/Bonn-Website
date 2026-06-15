import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxP0ph1NcqUsd1K_Zf50m_Z_SOPAl9R6tJJ_83lwgSiNSTbje6dHIq77P1M0FPBg_4M/exec"
    );

    if (!res.ok) {
      console.error("Google Script returned non-OK status:", res.status);
      return NextResponse.json({ error: "Failed to fetch clients from Google Script" }, { status: 500 });
    }

    const text = await res.text();
    console.log("Google Script Response:", text);

    let clients;
    try {
      clients = JSON.parse(text); // حاول تحويل النص لـ JSON
    } catch (err) {
      console.error("Failed to parse JSON from Google Script:", err);
      return NextResponse.json({ error: "Invalid JSON from Google Script" }, { status: 500 });
    }

    return NextResponse.json(clients); // لو JSON تمام ارجعه
  } catch (err) {
    console.error("Unexpected error fetching Google Script:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
