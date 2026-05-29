import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const FEATURES = [
  {
    title: 'Vocabulary Builder',
    description: 'Master TOPIK vocabulary with our Spaced Repetition System (SRS) and curated lists by level.',
    icon: '📚',
  },
  {
    title: 'Grammar Lessons',
    description: 'Step-by-step guides for TOPIK II grammar points, categorized by level 3-6.',
    icon: '✍️',
  },
  {
    title: 'Reading Practice',
    description: 'Real-world reading passages and comprehension exercises tailored to the exam format.',
    icon: '📖',
  },
  {
    title: 'AI Writing Feedback',
    description: 'Get instant, detailed AI feedback on your TOPIK writing essays to improve your score.',
    icon: '🤖',
  },
  {
    title: 'Listening Exercises',
    description: 'Targeted listening practice with high-quality audio and exam-style questions.',
    icon: '🎧',
  },
  {
    title: 'Mock Test Simulator',
    description: 'Experience the real exam environment with timed mock tests and performance analytics.',
    icon: '⏱️',
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
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Master TOPIK II with <span className="text-blue-600">Confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            The ultimate study platform for TOPIK II (Levels 3-6). Combine SRS vocabulary, 
            comprehensive grammar, and AI-powered writing feedback to reach your goal score.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Start Learning for Free
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Study Plan
            </Button>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform is designed specifically for the TOPIK II exam, providing a 
              structured path from Level 3 to Level 6.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="p-6 md:p-8 hover:shadow-md transition-shadow group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-12">
              Choose the plan that fits your study goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <Card key={plan.name} className={`p-6 md:p-8 relative ${plan.highlighted ? 'border-blue-600 ring-2 ring-blue-600' : 'border-slate-200'}`}>
                <div className="text-center mb-8">
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
                      <span className="text-green-500">✓</span>
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
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to ace your TOPIK test?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands of students mastering Korean proficiency.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
