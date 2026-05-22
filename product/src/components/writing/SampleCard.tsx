'use client';

import React from 'react';
import { WritingSample } from '@/lib/types';

interface SampleCardProps {
  sample: WritingSample;
  onClose?: () => void;
}

const SampleCard: React.FC<SampleCardProps> = ({ sample, onClose }) => {
  return (
    <div className="relative p-6 bg-white rounded-2xl border border-slate-200 shadow-lg animate-in fade-in zoom-in duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
          Model Answer Score: {sample.score}/100
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            aria-label="Close"
          >
            <span className="text-xl">&times;</span>
          </button>
        )}
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Sample Essay</h4>
        <div className="text-slate-800 leading-relaxed font-serif text-lg whitespace-pre-wrap">
          {sample.text}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
        <div>
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Expert Analysis</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            {sample.analysis}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Key Tips</h4>
          <ul className="space-y-2">
            {sample.expertTips.map((tip, index) => (
              <li key={index} className="text-sm text-slate-600 flex gap-2">
                <span className="text-indigo-500">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SampleCard;
