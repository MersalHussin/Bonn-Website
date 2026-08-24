import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message, turnstileToken } = await request.json();

    if (!turnstileToken) {
      return NextResponse.json({ success: false, message: "رمز الكابتشا مفقود" }, { status: 400 });
    }

    // Verify Cloudflare Turnstile
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: turnstileToken,
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json({ success: false, message: "فشل التحقق الأمني" }, { status: 403 });
    }

    // Insert into Supabase
    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject,
          message,
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ success: false, message: "فشل حفظ البيانات" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "تم بنجاح" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, message: "حدث خطأ في الخادم" }, { status: 500 });
  }
}
