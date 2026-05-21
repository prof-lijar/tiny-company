'use client';

import React, { useState } from 'react';
import { WritingPrompt, WritingSample } from '@/lib/types';
import { writingSamples } from '@/lib/data/writing-samples';
import SampleCard from './SampleCard';

interface WritingInterfaceProps {
  prompt: WritingPrompt;
  onSubmit: (answer: string) => void;
  outline?: EssayOutline;
}

interface EssayOutline {
  structure: { title: string; points: string[] }[];
  vocabularySuggestions: { word: string; meaning: string; level: number }[];
  grammarConnectors: { connector: string; usage: string }[];
}

export default function WritingInterface({ prompt, onSubmit, outline }: WritingInterfaceProps) {
  const [answer, setAnswer] = useState('');
  const [showSample, setShowSample] = useState(false);
  const [selectedSample, setSelectedSample] = useState<WritingSample | null>(null);

  const handleSampleClick = () => {
    const sample = writingSamples.find(s => s.promptId === prompt.id);
    if (sample) {
      setSelectedSample(sample);
      setShowSample(true);
    }
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert('Please write something before submitting.');
      return;
    }
    onSubmit(answer);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-indigo-900">{prompt.title}</h3>
            <span className="text-sm text-indigo-600 font-medium">Task {prompt.taskNumber}</span>
          </div>
          <button 
            onClick={handleSampleClick}
            className="px-3 py-1.5 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="text-lg">📝</span> View Model Answer
          </button>
        </div>
        <div className="text-slate-700 leading-relaxed mb-4">
          {prompt.instruction}
        </div>
        <div className="p-4 bg-white rounded-xl border border-indigo-200 text-slate-800 font-serif italic text-sm shadow-sm">
          {prompt.context}
        </div>
      </div>

      <div className="relative">
        <textarea
          className="w-full h-64 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm font-serif text-lg leading-relaxed bg-white"
          placeholder="Write your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-medium">
          {answer.length} characters
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSubmit}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
        >
          <span className="text-lg">🚀 Submit for AI Feedback</span>
        </button>
      </div>

      {outline && (
        <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
          <h4 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <span className="text-lg">✨ AI-Generated Outline</span>
            <span className="text-xs bg-emerald-200 text-emerald-700 px-2 py-1 rounded-full font-bold">Pro</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="font-bold text-emerald-800 text-sm uppercase tracking-wider">Structure</h5>
              {outline.structure.map((section, i) => (
                <div key={i} className="flex gap-3">
                  <div className="text-emerald-500 font-bold text-sm">{i + 1}.</div>
                  <div className="text-sm text-emerald-900">
                    <span className="font-bold">{section.title}:</span> {section.points.join(', ')}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-emerald-800 text-sm uppercase tracking-wider">Vocabulary & Connectors</h5>
              <div className="flex flex-wrap gap-2">
                {outline.vocabularySuggestions.map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-white text-emerald-700 border border-emerald-200 rounded-md text-xs font-medium">
                    {item.word} ({item.meaning})
                  </span>
                ))}
                {outline.grammarConnectors.map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-xs font-medium">
                    {item.connector}
                    <span className="text-slate-500 text-[10px] ml-1">({item.usage})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSample && selectedSample && (
        <SampleCard 
          sample={selectedSample} 
          onClose={() => setShowSample(false)} 
        />
      )}
    </div>
  );
}
