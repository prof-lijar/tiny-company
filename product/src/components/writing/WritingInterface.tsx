'use client';

import React, { useState } from 'react';
import { WritingPrompt, EssayOutline } from '@/lib/types';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface WritingInterfaceProps {
  prompt: WritingPrompt;
  onSubmit: (answer: string) => void;
  outline?: EssayOutline;
}

export default function WritingInterface({ prompt, onSubmit, outline }: WritingInterfaceProps) {
  const [answer, setAnswer] = useState('');
  const [showOutline, setShowOutline] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            Task {prompt.taskNumber}
          </span>
          <span className="text-slate-500 text-sm">Level {prompt.level}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2">{prompt.title}</h3>
        <p className="text-slate-600 mb-4 italic">{prompt.instruction}</p>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 font-serif text-lg leading-relaxed text-slate-800 mb-6 whitespace-pre-wrap">
          {prompt.context}
        </div>

        {outline && (
          <div className="mb-6 border border-indigo-100 rounded-lg overflow-hidden">
            <button 
              onClick={() => setShowOutline(!showOutline)}
              className="w-full px-4 py-2 bg-indigo-50 text-indigo-700 flex items-center justify-between font-medium text-sm hover:bg-indigo-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                View My AI Outline
              </div>
              {showOutline ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showOutline && (
              <div className="p-4 bg-white border-t border-indigo-100 space-y-4 text-sm text-slate-600">
                {outline.structure.map((section, i) => (
                  <div key={i} className="space-y-1">
                    <div className="font-bold text-indigo-900">{section.title}</div>
                    <ul className="list-disc list-inside space-y-1">
                      {section.points.map((p, j) => <li key={j}>{p}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {prompt.prompt}
          </label>
          <textarea
            className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-serif text-lg"
            placeholder="Write your answer here in Korean..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            lang="ko"
          />
          <div className="text-right text-slate-400 text-xs mt-2">
            Characters: {answer.length}
          </div>
        </div>

        <button
          onClick={() => onSubmit(answer)}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-md"
        >
          Submit for AI Feedback
        </button>
      </div>
    </div>
  );
}
