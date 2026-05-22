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
          try {
            await authDb.updateUserSubscription(userId, 'pro');
            console.log(`User ${userId} upgraded to PRO tier`);
          } catch (dbErr) {
            console.error(`Database error upgrading user ${userId}:`, dbErr);
            return NextResponse.json({ error: 'Database write failed' }, { status: 500 });
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const subUserId = subscription.metadata?.userId || 
          (typeof subscription.customer === 'string' ? subscription.customer : undefined);
        
        if (subUserId) {
          try {
            await authDb.updateUserSubscription(subUserId, 'free');
            console.log(`User ${subUserId} downgraded to FREE tier`);
          } catch (dbErr) {
            console.error(`Database error downgrading user ${subUserId}:`, dbErr);
            return NextResponse.json({ error: 'Database write failed' }, { status: 500 });
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
