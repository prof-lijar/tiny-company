'use client';

import React, { useState } from 'react';
import { writingSamples } from '@/lib/data/writing-samples';
import { writingPrompts } from '@/lib/data/writing-prompts';
import SampleCard from '@/components/writing/SampleCard';
import { Button } from '@/components/ui/Button';

export default function WritingSamplesPage() {
  const [selectedSample, setSelectedSample] = useState<any>(null);
  const [filterLevel, setFilterLevel] = useState<number | 'all'>( 'all');

  const filteredSamples = writingSamples.filter(sample => 
    filterLevel === 'all' || sample.level === filterLevel
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Writing Sample Library</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Study high-scoring model answers and expert analyses to master TOPIK II writing.
        </p>
      </header>

      <div className="flex justify-center gap-3 mb-12">
        <Button 
          variant={filterLevel === 'all' ? 'primary' : 'outline'} 
          onClick={() => setFilterLevel('all')}
        >
          All Levels
        </Button>
        {[3, 4, 5, 6].map(level => (
          <Button 
            key={level} 
            variant={filterLevel === level ? 'primary' : 'outline'} 
            onClick={() => setFilterLevel(level)}
          >
          Level {level}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSamples.map((sample) => {
          const prompt = writingPrompts.find(p => p.id === sample.promptId);
          return (
            <div 
              key={sample.id} 
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => setSelectedSample(sample)}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold">
                    Level {sample.level}
                  </span>
                  <span className="text-emerald-600 font-bold text-sm">
                    Score: {sample.score}/100
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {prompt?.title || 'Writing Sample'}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                  {sample.text}
                </p>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Full Analysis
              </Button>
            </div>
          );
        })}
      </div>

      {selectedSample && (
        <SampleCard 
          sample={selectedSample} 
          onClose={() => setSelectedSample(null)} 
        />
      )}

      {filteredSamples.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 italic">No samples found for this level.</p>
        </div>
      )}
    </div>
  );
}
