'use client';

import React, { useState, useEffect } from 'react';
import { modelEssays } from '@/lib/data/model-essays';
import { writingPrompts } from '@/lib/data/writing-prompts';
import { ComparativeView } from '@/components/writing/ComparativeView';
import { SampleCard } from '@/components/writing/SampleCard';

export default function WritingSamplesPage() {
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [userEssay, setUserEssay] = useState<string>('');
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState<{
    userEssay: string;
    modelEssay: string;
    insights: {
      missedOpportunities: any[];
      vocabularyUpgrades: any[];
    };
  } | null>(null);

  useEffect(() => {
    // Default to the first Task 54 prompt
    const t54Prompt = writingPrompts.find(p => p.taskNumber === 54);
    if (t54Prompt) {
      setSelectedPromptId(t54Prompt.id);
    }
  }, []);

  const handleCompare = async () => {
    if (!userEssay || !selectedPromptId) return;
    
    setIsComparing(true);
    
    try {
      const response = await fetch('/api/writing-compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userEssay, 
          promptId: selectedPromptId 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get comparative analysis');
      }

      const data = await response.json();
      
      setComparisonData({
        userEssay,
        modelEssay: data.modelEssay,
        insights: data.insights,
      });
    } catch (error) {
      console.error('Error comparing essays:', error);
      alert('An error occurred during the comparative analysis. Please try again.');
    } finally {
      setIsComparing(false);
    }
  };

  const prompt = writingPrompts.find(p => p.id === selectedPromptId);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Writing Sample Library & Comparative Analysis</h1>
        <p className="text-slate-600">
          모범 답안을 공부하고, 자신의 글을 레벨 6 수준의 에세이와 비교하여 분석하세요.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Prompt Selection & User Input */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              📝 주제 선택
            </h2>
            <select 
              className="w-full p-2 rounded border border-slate-300 bg-slate-50 text-slate-700"
              value={selectedPromptId || ''}
              onChange={(e) => {
                setSelectedPromptId(e.target.value);
                setComparisonData(null);
              }}
            >
              {writingPrompts
              .filter(p => p.taskNumber === 54)
              .map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
            
            <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800 space-y-2 border border-blue-100">
              <p className="font-medium">Prompt Context:</p>
              <p className="italic">{prompt?.context}</p>
              <div className="mt-2 text-xs text-blue-600">
                {prompt?.prompt}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">✍️ 나의 에세이 작성</h2>
            <textarea 
              className="w-full h-64 p-3 rounded border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              placeholder="여기에 에세이를 작성하세요..."
              value={userEssay}
              onChange={(e) => setUserEssay(e.target.value)}
            />
            <button 
              onClick={handleCompare}
              disabled={isComparing || !userEssay}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 transition-colors"
            >
              {isComparing ? 'AI 분석 중...' : '모범 답안과 비교 분석하기'}
            </button>
          </div>
        </div>

        {/* Right Column: Results/Library */}
        <div className="lg:col-span-2 space-y-8">
          {!comparisonData ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">🌟 Level 6 Model Essays</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modelEssays
                  .filter(essay => essay.promptId === selectedPromptId)
                  .map(essay => (
                    <SampleCard key={essay.id} essay={essay} />
                  ))
                }
                {modelEssays.filter(essay => essay.promptId === selectedPromptId).length === 0 && (
                  <p className="text-slate-500 italic">이 주제에 대한 모범 답안이 아직 없습니다.</p>
                )}
              </div>
            </div>
          ) : (
            <ComparativeView 
              userEssay={comparisonData.userEssay}
              modelEssay={comparisonData.modelEssay}
              insights={comparisonData.insights}
            />
          )}
        </div>
      </div>
    </div>
  );
}
