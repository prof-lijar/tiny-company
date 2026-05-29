import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HeroMockup } from '@/components/home/HeroMockup';
import { HowItWorks } from '@/components/home/HowItWorks';

const FEATURES = [
  {
    title: 'Vocabulary Builder',
    description: 'Master TOPIK vocabulary with our Spaced Repetition System (SRS) and curated lists by level.',
    icon: '📖',
    category: 'Study',
  },
  {
    title: 'Grammar Lessons',
    description: 'Step-by-step guides for TOPIK II grammar points, categorized by level 3-6.',
    icon: '✍️',
    category: 'Study',
  },
  {
    title: 'Reading Practice',
    description: 'Real-world reading passages and comprehension exercises tailored to the exam format.',
    icon: '📚',
    category: 'Study',
  },
  {
    title: 'AI Writing Feedback',
    description: 'Get instant, detailed AI feedback on your TOPIK writing essays to improve your score.',
    icon: '🤖',
    category: 'AI Tools',
  },
  {
    title: 'Listening Exercises',
    description: 'Targeted listening practice with high-quality audio and exam-style questions.',
    icon: '🎧',
    category: 'AI Tools',
  },
  {
    title: 'Mock Test Simulator',
    description: 'Experience the real exam environment with timed mock tests and performance analytics.',
    icon: '⏱️',
    category: 'AI Tools',
  },
];

const PRICING_PLANS = [
  {
    name: 'Free',
    price: '0$',
    features: ['50 Vocabulary words/day', 'Basic Grammar lessons', '1 Mock test/month', 'Community support'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '12$',
    features: ['Unlimited Vocabulary', 'Full Grammar library', 'Unlimited Mock tests', 'AI Writing Feedback', 'Priority support'],
    highlighted: true,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100 animate-fade-in">
                ✨ Trusted by 1,000+ Korean learners
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Master TOPIK II with <span className="text-indigo-600">Confidence</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The ultimate study platform for TOPIK II (Levels 3-6). Combine SRS vocabulary, 
                comprehensive grammar, and AI-powered writing feedback to reach your goal score.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-8">
                  Start Learning for Free
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  View Study Plan
                </Button>
              </div>
            </div>
            <div className="flex-1 relative w-full max-w-2xl">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Everything you need to succeed
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform is designed specifically for the TOPIK II exam, providing a 
              structured path from Level 3 to Level 6.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="p-6 md:p-8 relative group hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-indigo-600 shadow-sm hover:shadow-xl">
                <div className="text-4xl mb-4 w-14 h-14 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-12">
              Choose the plan that fits your study goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <Card key={plan.name} className={`p-6 md:p-8 relative ${
                plan.highlighted 
                ? 'border-indigo-600 ring-2 ring-indigo-600 scale-105 z-10 bg-gradient-to-br from-white to-indigo-50/30 shadow-2xl' 
                : 'border-slate-200 shadow-sm'
              }`}>
                <div className="text-center mb-8">
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest animate-pulse">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-slate-900 mb-4">
                    {plan.price} <span className="text-lg font-normal text-slate-500">/ month</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6">
                    {plan.highlighted ? 'Most popular for serious learners' : 'Perfect for starting out'}
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-600">
                      <span className="text-indigo-500 text-lg">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.highlighted ? 'primary' : 'outline'} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.highlighted ? 'Upgrade to Pro' : 'Get Started'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight animate-fade-in">
              Ready to ace your TOPIK test?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands of students mastering Korean proficiency.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 shadow-xl px-8">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
