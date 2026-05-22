import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from '@/auth';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  let session: any = null;
  try {
    session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await req.json();

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing`,
      client_reference_id: session.user.id,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: unknown) {
    logger.error('Stripe Checkout Error', error, { route: 'POST /api/stripe/checkout', userId: session?.user?.id });
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
