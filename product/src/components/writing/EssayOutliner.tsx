'use client';

import React, { useState } from 'react';
import { EssayOutline } from '@/lib/types';
import { Loader2, BookOpen, Lightbulb, X } from 'lucide-react';

interface EssayOutlinerProps {
  prompt: string;
  onOutlineGenerated: (outline: EssayOutline) => void;
  onClose: () => void;
}

export default function EssayOutliner({ prompt, onOutlineGenerated, onClose }: EssayOutlinerProps) {
  const [outline, setOutline] = useState<EssayOutline | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateOutline = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/writing-outliner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) throw new Error('Failed to generate outline');
      
      const data = await response.json();
      setOutline(data);
    } catch (error) {
      console.error('Error generating outline:', error);
      alert('An error occurred while generating the outline. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Essay Outliner</h2>
            <p className="text-slate-500 text-sm">Structure your Task 54 essay for maximum score</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <h3 className="text-indigo-800 font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Prompt
            </h3>
            <p className="text-indigo-900 text-sm leading-relaxed">{prompt}</p>
          </div>

          {!outline && !isLoading && (
            <div className="text-center py-12 space-y-4">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Ready to structure your essay?</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                The AI will generate a 4-part structure, suggest advanced vocabulary, and recommend connectors to improve your flow.
              </p>
              <button 
                onClick={generateOutline}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 mx-auto"
              >
                Generate AI Outline
              </button>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              <p className="text-slate-600 font-medium">Analyzing prompt and constructing outline...</p>
            </div>
          )}

          {outline && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    Proposed Structure
                  </h3>
                  <div className="space-y-3">
                    {outline.structure.map((section, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="font-bold text-slate-700 text-sm uppercase tracking-wide">
                          {section.title}
                        </div>
                        <ul className="list-disc list-inside text-slate-600 text-sm space-y-1">
                          {section.points.map((point, i) => (
                            <li key={i} className="leading-relaxed">{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      Advanced Vocabulary (L5-6)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {outline.vocabularySuggestions.map((vocab, idx) => (
                        <div key={idx} className="px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-medium">
                          <span className="font-bold">{vocab.word}</span>: {vocab.meaning}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      Grammar Connectors
                    </h3>
                    <div className="space-y-2">
                      {outline.grammarConnectors.map((conn, idx) => (
                        <div key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-lg text-xs font-medium flex justify-between items-center">
                          <span><span className="font-bold">{conn.connector}</span>: {conn.usage}</span>
                          <span className="text-indigo-400 ml-2">{conn.connector}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-6 border-t border-slate-100">
                <button 
                  onClick={() => {
                    onOutlineGenerated(outline);
                    onClose();
                  }}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  Start Writing with this Outline
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
