import React from 'react';
import { getModelEssayById } from '@/lib/model-essays';
import { ComparativeView } from '@/components/writing/ComparativeView';
import { ModelEssay } from '@/lib/types/model-essays';
import { notFound } from 'next/navigation';

export default async function WritingComparePage({ searchParams }: { searchParams: { modelEssayId: string } }) {
  const { modelEssayId } = await searchParams;
  
  if (!modelEssayId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <p className="text-slate-600">Please select a model essay to compare against.</p>
      </div>
    );
  }

  const modelEssay = await getModelEssayById(modelEssayId);
  
  if (!modelEssay) {
    notFound();
  }

  // In a real implementation, this would fetch the user's most recent essay for this prompt
  // For now, we'll simulate a user essay for demonstration of the ComparativeView
  const mockUserEssay = `인공지능은 현대 사회에서 매우 중요합니다. 많은 사람들이 AI를 사용하고 있습니다. 
AI는 편리하지만 위험할 수도 있습니다. 우리는 AI를 잘 사용해야 합니다. 
미래에는 AI가 많은 직업을 대신할 것입니다. 그래서 우리는 새로운 능력을 배워야 합니다.
이것은 우리에게 큰 도전입니다. 하지만 잘 준비하면 좋은 결과가 있을 것입니다.`;

  const mockInsights = {
    missedOpportunities: [
      {
        userText: '매우 중요합니다',
        suggestion: '패러다임을 근본적으로 변화시키고 있다',
        reason: 'Use academic verbs and phrases to describe impact rather than simple adjectives like "very important".'
      },
      {
        userText: '위험할 수도 있습니다',
        suggestion: '정체성과 노동 시장의 불안정성이라는 심각한 과제를 던져주고 있다',
        reason: 'Specifically define the "danger" using academic terminology (instability of the labor market).'
      },
      {
        userText: '새로운 능력을 배워야 합니다',
        suggestion: '비판적 사고력과 복합적인 문제 해결 능력을 갖추어야 한다',
        reason: 'Replace generic "new abilities" with specific high-level cognitive skills required for Level 6.'
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Comparative Analysis
        </h1>
        <p className="text-lg text-slate-600">
          Compare your draft against a Level 6 model essay to identify 
          vocabulary gaps and structural improvements.
        </p>
      </header>

      <ComparativeView 
        userEssay={mockUserEssay} 
        modelEssay={modelEssay} 
        insights={mockInsights} 
      />
    </div>
  );
}
