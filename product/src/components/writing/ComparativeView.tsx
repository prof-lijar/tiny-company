import React from 'react';

interface ComparativeViewProps {
  userEssay: string;
  modelEssay: string;
  insights: {
    missedOpportunities: {
      suggestion: string;
      reason: string;
      original: string;
      replacement: string;
    }[];
    vocabularyUpgrades: {
      from: string;
      to: string;
      reason: string;
    }[];
  };
}

export const ComparativeView: React.FC<ComparativeView umaViewProps> = ({
  userEssay,
  modelEssay,
  insights,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
        {/* User Essay Pane */}
        <div className="flex flex-col border rounded-lg bg-white shadow-sm overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 border-b font-semibold text-slate-700 flex justify-between items-center">
            <span>내 에세이 (User Essay)</span>
            <span className="text-xs font-normal text-slate-500">Draft</span>
          </div>
          <div className="p-4 overflow-y-auto text-lg leading-relaxed whitespace-pre-wrap text-slate-800 h-full">
            {userEssay}
          </div>
        </div>

        {/* Model Essay Pane */}
        <div className="flex flex-col border rounded-lg bg-blue-50 shadow-sm overflow-hidden border-blue-200">
          <div className="bg-blue-100 px-4 py-2 border-b border-blue-200 font-semibold text-blue-800 flex justify-between items-center">
            <span>모범 답안 (Model Essay)</span>
            <span className="text-xs font-normal text-blue-600">Level 6 Standard</span>
          </div>
          <div className="p-4 overflow-y-auto text-lg leading-relaxed whitespace-pre-wrap text-slate-800 h-full">
            {modelEssay}
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="border rounded-lg bg-white shadow-sm p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          ✨ AI 분석 및 개선 제안
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vocabulary Upgrades */}
          <div>
            <h4 className="text-md font-semibold text-blue-700 mb-3 border-b pb-1">
              🚀 어휘 업그레이드 (Vocabulary Upgrades)
            </h4>
            <div className="space-y-3">
              {insights.vocabularyUpgrades.length > 0 ? (
                insights.vocabularyUpgrades.map((item, idx) => (
                  <div key={idx} className="flex flex-col p-3 bg-slate-50 rounded border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-500 line-through text-sm">{item.from}</span>
                      <span className="text-blue-600 font-bold">→ {item.to}</span>
                    </div>
                    <p className="text-sm text-slate-600">{item.reason}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">추천할 어휘 업그레이드가 없습니다.</p>
              )}
            </div>
          </div>

          {/* Missed Opportunities */}
          <div>
            <h4 className="text-md font-semibold text-green-700 mb-3 border-b pb-1">
              💡 놓친 포인트 (Missed Opportunities)
            </h4>
            <div className="space-y-3">
              {insights.missedOpportunities.length > 0 ? (
                insights.missedOpportunities.map((item, idx) => (
                  <div key={idx} className="flex flex-col p-3 bg-slate-50 rounded border border-slate-200">
                    <p className="text-sm font-medium text-slate-800 mb-1">{item.suggestion}</p>
                    <p className="text-xs text-slate-500 mb-2">{item.reason}</p>
                    <div className="text-xs bg-white p-2 rounded border border-slate-100 italic text-slate-600">
                      "{item.replacement}"
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">추가할 만한 핵심 포인트가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
