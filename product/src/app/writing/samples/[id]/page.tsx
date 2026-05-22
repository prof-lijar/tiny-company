import React from 'react';
import { getModelEssayById } from '@/lib/model-essays';
import { ComparativeView } from '@/components/writing/ComparativeView';
import { ModelEssay } from '@/lib/types/model-essays';
import { notFound } from 'next/navigation';

export default async function ModelEssayDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const essay = await getModelEssayById(id);
  
  if (!essay) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{essay.title}</h1>
        <div className="flex gap-2 mb-6">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase">
            {essay.theme}
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
            Level {essay.level}
          </span>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-8">
          <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Writing Prompt</h4>
          <p className="text-slate-800 leading-relaxed">{essay.prompt}</p>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Model Answer</h3>
        <div className="text-lg text-slate-800 leading-relaxed whitespace-pre-wrap font-serif">
          {essay.content}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm mb-4">
          Want to see how your writing compares to this model?
        </p>
        <Link 
          href={`/writing/compare?modelEssayId=${essay.id}`}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors"
        >
          Start Comparative Analysis
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';
