'use client';

import React from 'react';

interface SampleCardProps {
  sample: {
    score: number;
    text: string;
    analysis: string;
    expertTips: string[];
  };
  onClose: () => void;
}

export default function SampleCard({ sample, onClose }: SampleCardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
              Score: {sample.score}/100
            </div>
            <h3 className="text-xl font-bold text-slate-800">Expert Sample Answer</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Model Answer</h4>
            <div className="p-4 bg-slate-50 rounded-xl text-slate-700 font-serif leading-relaxed border border-slate-200 whitespace-pre-wrap">
              {sample.text}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">AI Analysis</h4>
            <p className="text-slate-600 leading-relaxed">
              {sample.analysis}
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Expert Tips</h4>
            <ul className="space-y-3">
              {sample.expertTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <span className="text-indigo-500 font-bold">#{i+1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
