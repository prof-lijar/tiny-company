import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mockup } from '@/components/ui/Mockup';

const FEATURES = [
  {
    title: 'Vocabulary Builder',
    description: 'Master TOPIK vocabulary with our Spaced Repetition System (SRS) and curated lists by level.',
    icon: '📚',
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
    icon: '📖',
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
    category: 'Study',
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

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            How it Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our methodology is designed to take you from beginner to advanced proficiency.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-10"></div>
          
          {[
            { step: '01', title: 'Assess', description: 'Take a placement test to determine your current TOPIK level and identify gaps.' },
            { step: '02', title: 'Study', description: 'Use SRS vocabulary and grammar lessons tailored to your specific level.' },
            { step: '03', title: 'Master', description: 'Apply your knowledge with reading, writing, and full-length mock tests.' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-indigo-50">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold mb-6 border border-indigo-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400"></span>
                </span>
                Trusted by 1,000+ Korean learners
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                Master TOPIK II with <span className="text-indigo-600">Confidence</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                The ultimate study platform for TOPIK II (Levels 3-6). Combine SRS vocabulary, 
                comprehensive grammar, and AI-powered writing feedback to reach your goal score.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Start Learning for Free
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Study Plan
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <Mockup />
            </div>
          </div>
        </div>
        
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-400 rounded-full blur-3xl opacity-20 -z-10"></div>
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
              <Card key={index} className="p-6 md:p-8 border-t-4 border-t-indigo-600 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group bg-white">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
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

      {/* How it Works Section */}
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
              <Card key={plan.name} className={`p-6 md:p-8 relative transition-all duration-300 ${
                plan.highlighted 
                ? 'border-indigo-600 ring-2 ring-indigo-600 scale-105 shadow-xl bg-gradient-to-br from-white to-indigo-50' 
                : 'border-slate-200'
              }`}>
                <div className="text-center mb-8">
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
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
                      <span className="text-indigo-500 font-bold">✓</span>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to ace your TOPIK test?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands of students mastering Korean proficiency.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 border-none">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
