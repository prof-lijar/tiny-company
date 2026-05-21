'use client';

import React, { useState } from 'react';
import { VocabularyWord } from '@/lib/data/vocabulary';

interface FlashCardProps {
  word: VocabularyWord;
  onFlip: () => void;
  isFlipped: boolean;
}

export const FlashCard: React.FC<FlashCardProps> = ({ word, onFlip, isFlipped }) => {
  return (
    <div 
      className="relative w-full max-w-md h-64 cursor-pointer perspective-1000"
      onClick={onFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-blue-100 rounded-2xl shadow-md flex flex-col items-center justify-center p-6 text-center">
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">Korean</span>
          <h2 className="text-4xl font-bold text-slate-900 mb-2" lang="ko">{word.korean}</h2>
          <p className="text-slate-500 text-sm">{word.romanization}</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-50 border-2 border-blue-200 rounded-2xl shadow-md flex flex-col items-center justify-center p-6 text-center">
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">English & Example</span>
          <h3 className="text-2xl font-bold text-blue-600 mb-2">{word.english}</h3>
          <div className="mt-4 p-3 bg-white rounded-lg border border-blue-100 text-left w-full">
            <p className="text-slate-800 text-sm font-medium mb-1" lang="ko">{word.example}</p>
            <p className="text-slate-500 text-xs italic">{word.exampleTranslation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
