'use client';

import React from 'react';

interface SampleCardProps {
  essay: {
    score: number;
    text: string;
    analysis: string;
    expertTips: string[];
  };
  onClose?: (id: string) => void;
}

const SampleCard: React.FC<SampleCardProps> = ({ essay, onClose }) => {
  return (
    <div className="group relative p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="flex justify-between items-center mb-3">
        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
          Score: {essay.score}/100
        </div>
        <span className="text-xs text-slate-400">Click to view details</span>
      </div>
      <div className="text-slate-700 line-clamp-3 text-sm leading-relaxed">
        {essay.text}
      </div>
      <div className="mt-4 flex items-center gap-2 text-blue-600 text-xs font-semibold">
        <span>View Full Analysis</span>
        <span className="text-lg">→</span>
      </div>
    </div>
  );
};

export default SampleCard;
