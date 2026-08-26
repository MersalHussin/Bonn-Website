import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend client
// The API key must be provided in the environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, turnstileToken } = await request.json();

    if (!turnstileToken) {
      return NextResponse.json({ error: "رمز الكابتشا مفقود" }, { status: 400 });
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
      return NextResponse.json({ error: "فشل التحقق الأمني" }, { status: 403 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!audienceId) {
      console.error("RESEND_AUDIENCE_ID is not configured in environment variables.");
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Add contact to Resend Audience
    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: audienceId,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Subscribed successfully', data },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Newsletter Subscription Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
