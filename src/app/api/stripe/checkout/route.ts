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

    // Dynamic import to avoid build-time issues
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2023-10-16" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
      metadata: { userId: userId || "" },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error.message);
    return NextResponse.json({ error: error.message || "Checkout failed" }, { status: 500 });
  }
}
