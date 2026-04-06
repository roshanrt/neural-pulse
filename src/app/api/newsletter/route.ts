import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUB_ID;

  if (!apiKey || !pubId) {
    // Not yet configured — fail gracefully in dev, log in prod
    console.error("[newsletter] BEEHIIV_API_KEY or BEEHIIV_PUB_ID not set");
    return NextResponse.json(
      { error: "Newsletter service not configured." },
      { status: 503 }
    );
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    console.error("[newsletter] beehiiv error:", res.status, body);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
