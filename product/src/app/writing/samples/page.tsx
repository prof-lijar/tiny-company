import React from 'react';
import { getModelEssays, getModelEssayById } from '@/lib/model-essays';
import { ComparativeView } from '@/components/writing/ComparativeView';
import { ModelEssay } from '@/lib/types/model-essays';
import Link from 'next/link';

export default async function WritingSamplesPage() {
  const essays = await getModelEssays();
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Writing Sample Library
        </h1>
        <p className="text-lg text-slate-600">
          Study Level 6 model essays to understand the structure, vocabulary, and 
          academic tone required for a high score.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {essays.map((essay) => (
          <div 
            key={essay.id} 
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase">
                {essay.theme}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Level {essay.level}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
              {essay.title}
            </h3>
            <p className="text-slate-600 text-sm line-clamp-3 mb-6">
              {essay.prompt}
            </p>
            <Link 
              href={`/writing/samples/${essay.id}`}
              className="mt-auto px-4 py-2 bg-slate-900 text-white text-center rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Read Full Essay
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
