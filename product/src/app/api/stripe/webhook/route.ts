import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { authDb } from '@/lib/auth-db';
import { Stripe } from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock'
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId || session.client_reference_id;
        
        if (userId) {
          // Update user to PRO tier in our mock DB
          const user = await authDb.getUserById(userId);
          if (user) {
            user.subscriptionTier = 'pro';
            console.log(`User ${userId} upgraded to PRO tier`);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const subUserId = subscription.metadata?.userId || 
          (typeof subscription.customer === 'string' ? subscription.customer : undefined);
        
        if (subUserId) {
          const user = await authDb.getUserById(subUserId);
          if (user) {
            user.subscriptionTier = 'free';
            console.log(`User ${subUserId} downgraded to FREE tier`);
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Webhook Error';
    console.error('Webhook Error:', errorMessage);
    return NextResponse.json({ error: 'Webhook Error', message: errorMessage }, { status: 400 });
  }
}
