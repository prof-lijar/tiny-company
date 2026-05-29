import React from 'react';

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            How it Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our proven methodology helps you move from absolute beginner to TOPIK mastery.
          </p>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-10"></div>
          
          {[
            {
              step: '01',
              title: 'Assess',
              description: 'Take our placement test to identify your current level and gaps.',
              icon: '🎯',
            },
            {
              step: '02',
              title: 'Study',
              description: 'Follow a structured path with SRS vocabulary and AI-guided grammar.',
              icon: '📚',
            },
            {
              step: '03',
              title: 'Master',
              description: 'Practice with real TOPIK mock tests and get AI writing feedback.',
              icon: '🏆',
            },
          ].map((item, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-indigo-50 text-3xl rounded-full flex items-center justify-center mb-6 ring-4 ring-white shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                {item.icon}
              </div>
              <div className="mb-2 flex items-center justify-center gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{item.step}</span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{item.title}</h3>
              </div>
              <p className="text-slate-600 max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
