import React from 'react';
import { ModelEssay } from '@/lib/types/model-essays';

interface ComparativeViewProps {
  userEssay: string;
  modelEssay: ModelEssay;
  insights: {
    missedOpportunities: {
      userText: string;
      suggestion: string;
      reason: string;
    }[];
  };
}

export const ComparativeView: React.FC<ComparativeViewProps> = ({ userEssay, modelEssay, insights }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Essay Panel */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Your Draft
          </h3>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 whitespace-pre-wrap leading-relaxed min-h-[400px] font-serif">
            {userEssay}
          </div>
        </div>

        {/* Model Essay Panel */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-500 rounded-full"></span>
            Model Essay (Level 6)
          </h3>
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-slate-800 whitespace-pre-wrap leading-relaxed min-h-[400px] font-serif">
            {modelEssay.content}
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
        <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
          ✨ AI Comparative Analysis
        </h3>
        <div className="space-y-4">
          {insights.missedOpportunities.length > 0 ? (
            insights.missedOpportunities.map((op, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border border-indigo-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 font-bold text-lg">✕</div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Instead of:</p>
                    <p className="text-slate-700 font-medium mb-2 italic">"{op.userText}"</p>
                    <p className="text-sm text-slate-500 mb-1">Try this academic expression from the model essay:</p>
                    <p className="text-indigo-700 font-bold text-lg">"{op.suggestion}"</p>
                    <p className="text-sm text-slate-600 mt-2">{op.reason}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-600 italic">No specific missed opportunities found. Great job!</p>
          )}
        </div>
      </div>
    </div>
  );
};
