export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";

// POST /api/stripe/webhook - Handle Stripe webhooks
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2023-10-16" });

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig || "", process.env.STRIPE_WEBHOOK_SECRET || "");
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const email = session.customer_email;
        // In production: update user subscription status in DB
        console.log(`✅ Subscription completed: ${email}`);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        console.log(`❌ Subscription cancelled: ${sub.id}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
