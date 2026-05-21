import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { authDb } from '@/lib/auth-db';

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
      case 'checkout.session.completed':
        const session = event.data.object as any;
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

      case 'customer.subscription.deleted':
        const subSession = event.data.object as any;
        const subUserId = subSession.metadata?.userId || subSession.client_reference_id;
        
        if (subUserId) {
          const user = await authDb.getUserById(subUserId);
          if (user) {
            user.subscriptionTier = 'free';
            console.log(`User ${subUserId} downgraded to FREE tier`);
          }
        }
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return NextResponse.json({ error: 'Webhook Error', message: err.message }, { status: 400 });
  }
}
