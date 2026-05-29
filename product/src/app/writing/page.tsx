'use client';

import React, { useState } from 'react';
import { EssayOutline, WritingFeedback } from '@/lib/types';
import { writingPrompts } from '@/lib/writing-prompts';
import WritingInterface from '@/components/writing/WritingInterface';
import EssayOutliner from '@/components/writing/EssayOutliner';
import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

export default function WritingPage() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOutlinerOpen, setIsOutlinerOpen] = useState(false);
  const [currentOutline, setCurrentOutline] = useState<EssayOutline | undefined>(undefined);

  const currentPrompt = writingPrompts[currentPromptIndex];

  const handleSubmit = async (answer: string) => {
    setIsAnalyzing(true);
    setFeedback(null);
    
    try {
      const response = await fetch('/api/writing-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          answer, 
          prompt: currentPrompt.prompt,
          context: currentPrompt.guidelines.join(' ') 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI feedback');
      }

      const data: WritingFeedback = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error('Error submitting writing:', error);
      alert('An error occurred while analyzing your writing. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {currentPrompt.title}
            </h2>
            <button 
              onClick={() => {
                setCurrentOutline(undefined);
                setIsOutlinerOpen(true);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <span className="text-sm">✨ Get AI Outline</span>
            </button>
          </div>

          <WritingInterface 
            prompt={currentPrompt} 
            onSubmit={handleSubmit}
            outline={currentOutline}
          />
          
          <div className="flex justify-between items-center mt-8">
            <button 
              disabled={currentPromptIndex === 0}
              onClick={() => {
                setCurrentPromptIndex(prev => prev - 1);
                setFeedback(null);
                setCurrentOutline(undefined);
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
                setCurrentOutline(undefined);
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
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="text-green-500">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-500" />
                  Improvements
                </h4>
                <ul className="space-y-2">
                  {feedback.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="text-amber-500">•</span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>

              {feedback.templateUsage && feedback.templateUsage.detectedTemplates.length > 0 && (
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 space-y-3">
                  <h4 className="font-bold text-amber-800 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} />
                    Template Analysis
                  </h4>
                  <div className="text-xs text-amber-700 mb-2">
                    Structural Variety Score: <span className="font-bold">{feedback.templateUsage.structuralVarietyScore}/5</span>
                  </div>
                  <div className="space-y-2">
                    {feedback.templateUsage.naturalAlternatives.map((alt, i) => (
                      <div key={i} className="text-xs bg-white p-2 rounded border border-amber-200">
                        <div className="text-slate-400 line-through mb-1">{alt.template}</div>
                        <div className="flex items-center gap-1 text-amber-700 font-medium">
                          <Lightbulb size={12} /> {alt.alternative}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

      {isOutlinerOpen && (
        <EssayOutliner 
          prompt={currentPrompt.prompt} 
          onOutlineGenerated={(outline) => setCurrentOutline(outline)}
          onClose={() => setIsOutlinerOpen(false)}
        />
      )}
    </div>
  );
}
