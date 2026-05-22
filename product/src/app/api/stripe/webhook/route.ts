import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { authDb } from '@/lib/auth-db';
import { Stripe } from 'stripe';

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Internal Server Error: Stripe configuration missing' }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId || session.client_reference_id;
        
        if (userId) {
          try {
            await authDb.updateUserSubscription(userId, 'pro');
            console.log(`User ${userId} upgraded to PRO tier via checkout session`);
          } catch (dbErr) {
            console.error(`Database error upgrading user ${userId}:`, dbErr);
            return NextResponse.json({ error: 'Database write failed' }, { status: 500 });
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId || 
          (typeof subscription.customer === 'string' ? subscription.customer : undefined);
        
        if (userId) {
          try {
            // If the subscription is active or trialing, they are 'pro'
            const tier = (subscription.status === 'active' || subscription.status === 'trialing') ? 'pro' : 'free';
            await authDb.updateUserSubscription(userId, tier);
            console.log(`User ${userId} subscription updated to ${tier} tier`);
          } catch (dbErr) {
            console.error(`Database error updating user ${userId}:`, dbErr);
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
            console.log(`User ${subUserId} downgraded to FREE tier via subscription deletion`);
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
