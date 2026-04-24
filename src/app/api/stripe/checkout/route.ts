export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";

// POST /api/stripe/checkout - Create a Stripe Checkout session
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceId, userId, email } = body;

    if (!priceId || !email) {
      return NextResponse.json({ error: "priceId and email are required" }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    // Use fetch directly instead of the Stripe SDK to avoid build issues
    const session = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        mode: "subscription",
        "payment_method_types[0]": "card",
        customer_email: email,
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        success_url: `${process.env.NEXTAUTH_URL || "https://shortreels-xi.vercel.app"}/dashboard?upgraded=true`,
        cancel_url: `${process.env.NEXTAUTH_URL || "https://shortreels-xi.vercel.app"}/pricing`,
      }),
    });

    const data = await session.json();
    return NextResponse.json({ url: data.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error.message);
    return NextResponse.json({ error: error.message || "Checkout failed" }, { status: 500 });
  }
}
