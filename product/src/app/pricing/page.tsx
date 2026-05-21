'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';

export default function PricingPage() {
  const handleCheckout = async (priceId: string) => {
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('An error occurred during checkout');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Study Plan</h1>
        <p className="text-lg text-slate-600">Upgrade to Pro for unlimited access to AI writing feedback and mock tests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className="p-8 border-slate-200 flex flex-col">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
            <div className="text-4xl font-bold text-slate-900 mb-4">$0<span className="text-lg font-medium text-slate-500">/mo</span></div>
            <p className="text-slate-600">Perfect for beginners starting their TOPIK journey.</p>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              50 Vocabulary words/day
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Basic Grammar lessons
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              1 Mock test/month
            </li>
            <li className="flex items-center gap-3 text-slate-400 line-through">
              <CheckCircle2 className="w-5 h-5 text-slate-300" />
              Unlimited AI Writing feedback
            </li>
          </ul>
          <Button variant="outline" className="w-full py-6 text-lg font-semibold">
            Current Plan
          </Button>
        </Card>

        {/* Pro Plan */}
        <Card className="p-8 border-orange-500 ring-2 ring-orange-500 relative flex flex-col">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            Most Popular
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
            <div className="text-4xl font-bold text-slate-900 mb-4">$12<span className="text-lg font-medium text-slate-500">/mo</span></div>
            <p className="text-slate-600">Everything you need to ace the TOPIK II exam.</p>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Unlimited Vocabulary words
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Full Grammar library
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Unlimited Mock tests
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Unlimited AI Writing feedback
            </li>
          </ul>
          <Button 
            onClick={() => handleCheckout('price_pro_monthly')} 
            className="w-full py-6 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white"
          >
            Upgrade to Pro
          </Button>
        </Card>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6 text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <span>Secure payments processed by Stripe</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          <span>Cancel your subscription at any time</span>
        </div>
      </div>
    </div>
  );
}
