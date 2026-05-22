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
    
    // Simulate AI Comparison Logic
    // In a real app, this would call an API route /api/writing-compare
    setTimeout(() => {
      const modelEssay = modelEssays.find(m => m.promptId === selectedPromptId);
      
      if (!modelEssay) {
        setIsComparing(false);
        alert('모범 답안이 준비되지 않은 주제입니다.');
        return;
      }

      setComparisonData({
        userEssay,
        modelEssay: modelEssay.text,
        insights: {
          vocabularyUpgrades: [
            { from: '좋은 점', to: '긍정적인 측면', reason: '학술적 에세이에서는 구체적이고 전문적인 어휘를 사용하는 것이 좋습니다.' },
            { from: '생각한다', to: '주장한다/역설한다', reason: '단순한 생각보다는 논리적 주장을 펼치는 표현을 사용하세요.' },
          ],
          missedOpportunities: [
            { 
              suggestion: '거시적 관점의 분석 추가', 
              reason: '모범 답안에서는 개인의 문제를 넘어 사회 구조적 원인을 분석하고 있습니다.', 
              replacement: '단순히 개인의 노력이 부족한 것이 아니라, 시스템적 지원 체계의 부재가 근본적인 원인이다.' 
            },
          ],
        },
      });
      setIsComparing(false);
    }, 1500);
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
              🎯 주제 선택
            </h2>
            <select 
              className="w-full p-2 rounded border border-slate-300 bg-slate-50 text-slate-700"
              value={selectedPromptId || ''}
              onChange={(e) => setSelectedPromptId(e.target.value)}
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
            <h2 className="text-lg font-semibold text-slate-800">✍️ 나의 에세이 쓰기</h2>
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
                {modelEssays.map(essay => (
                  <SampleCard key={essay.id} essay={essay} />
                ))}
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
