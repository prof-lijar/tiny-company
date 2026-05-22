import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { authDb } from '@/lib/auth-db';
import { Stripe } from 'stripe';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    logger.error('STRIPE_WEBHOOK_SECRET is not configured', new Error('Configuration missing'), { route: 'POST /api/stripe/webhook' });
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
            logger.info(`User ${userId} upgraded to PRO tier via checkout session`, { userId, event: event.type });
          } catch (dbErr) {
            logger.error(`Database error upgrading user ${userId}`, dbErr, { route: 'POST /api/stripe/webhook', userId, event: event.type });
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
            const tier = (subscription.status === 'active' || subscription.status === 'trialing') ? 'pro' : 'free';
            await authDb.updateUserSubscription(userId, tier);
            logger.info(`User ${userId} subscription updated to ${tier} tier`, { userId, event: event.type });
          } catch (dbErr) {
            logger.error(`Database error updating user ${userId}`, dbErr, { route: 'POST /api/stripe/webhook', userId, event: event.type });
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
            logger.info(`User ${subUserId} downgraded to FREE tier via subscription deletion`, { userId: subUserId, event: event.type });
          } catch (dbErr) {
            logger.error(`Database error downgrading user ${subUserId}`, dbErr, { route: 'POST /api/stripe/webhook', userId: subUserId, event: event.type });
            return NextResponse.json({ error: 'Database write failed' }, { status: 500 });
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    logger.error('Webhook Error', err, { route: 'POST /api/stripe/webhook' });
    return NextResponse.json({ error: 'Webhook Error', message: err instanceof Error ? err.message : 'Webhook Error' }, { status: 400 });
  }
}
