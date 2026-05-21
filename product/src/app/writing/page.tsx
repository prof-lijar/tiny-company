'use client';

import React, { useState } from 'react';
import { WritingPrompt } from '@/lib/types';
import { writingPrompts } from '@/lib/data/writing-prompts';
import WritingInterface from '@/components/writing/WritingInterface';

interface Feedback {
  score: number;
  strengths: string[];
  improvements: string[];
  correctedText: string;
}

export default function WritingPage() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentPrompt = writingPrompts[currentPromptIndex];

  const handleSubmit = async (answer: string) => {
    setIsAnalyzing(true);
    setFeedback(null);
    
    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, this would be a call to an LLM API
    const simulatedFeedback: Feedback = {
      score: Math.floor(Math.random() * 20) + 60, // 60-80
      strengths: [
        'Good use of formal written style (-ㄴ/는다)',
        'Logical flow of arguments',
        'Appropriately used vocabulary for the level',
      ],
      improvements: [
        'Check for natural phrasing in the second paragraph',
        'Ensure the subject-verb agreement is consistent',
        'Consider using more sophisticated connectors (e.g., 그리고 → 하지만, 따라서)',
      ],
      correctedText: `[Corrected Version]\n${answer}\n\n(AI would provide a more natural version here)`,
    };
    
    setFeedback(simulatedFeedback);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Writing Practice</h1>
        <p className="text-xl text-slate-600">
          Improve your TOPIK II writing skills with AI-powered feedback.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WritingInterface 
            prompt={currentPrompt} 
            onSubmit={handleSubmit} 
          />
          
          <div className="flex justify-between items-center mt-8">
            <button 
              disabled={currentPromptIndex === 0}
              onClick={() => {
                setCurrentPromptIndex(prev => prev - 1);
                setFeedback(null);
              }}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50 transition-colors"
            >
              Previous Prompt
            </button>
            <button 
              disabled={currentPromptIndex === writingPrompts.length - 1}
              onClick={() => {
                setCurrentPromptIndex(prev => prev + 1);
                setFeedback(null);
              }}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50 transition-colors"
            >
              Next Prompt
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          {isAnalyzing ? (
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-indigo-600 font-medium">AI is analyzing your writing...</p>
            </div>
          ) : feedback ? (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div className="text-center mb-6">
                <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Estimated Score</div>
                <div className="text-5xl font-bold text-indigo-600">{feedback.score}/100</div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">Strengths</h4>
                <ul className="space-y-2">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="text-green-500">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">Improvements</h4>
                <ul className="space-y-2">
                  {feedback.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="text-amber-500">⚠</span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-800">Corrected Text</h4>
                <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-600 font-serif whitespace-pre-wrap border border-slate-200">
                  {feedback.correctedText}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center text-slate-500 italic">
              Submit your writing to receive AI feedback.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
