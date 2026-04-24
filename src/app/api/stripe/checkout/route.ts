export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId, email } = body;
    if (!priceId || !email) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

    const baseUrl = process.env.NEXTAUTH_URL || "https://shortreels-xi.vercel.app";

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        mode: "subscription",
        "payment_method_types[0]": "card",
        customer_email: email,
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        success_url: `${baseUrl}/dashboard?upgraded=true`,
        cancel_url: `${baseUrl}/pricing`,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ url: data.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Checkout failed" }, { status: 500 });
  }
}
