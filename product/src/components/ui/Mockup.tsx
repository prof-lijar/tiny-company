import React from 'react';

export const Mockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-4 relative z-10">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <span className="font-bold text-slate-900">TOPIK Flow</span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Mock Vocab Card */}
        <div className="bg-indigo-50 rounded-xl p-6 text-center border border-indigo-100 mb-4">
          <div className="text-sm text-indigo-600 font-medium mb-2">Vocabulary • Level 4</div>
          <div className="text-3xl font-bold text-slate-900 mb-2">환경 보호</div>
          <div className="text-lg text-slate-600 mb-4">Environmental Protection</div>
          <div className="flex justify-center gap-2">
            <div className="px-3 py-1 bg-white rounded-full text-xs text-slate-500 border border-indigo-200">Noun</div>
            <div className="px-3 py-1 bg-white rounded-full text-xs text-slate-500 border border-indigo-200">Essential</div>
          </div>
        </div>

        {/* Mock Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Daily Goal</span>
            <span className="text-indigo-600 font-medium">12/20 words</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-3/5 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-200 rounded-full blur-2xl opacity-50 -z-10"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-200 rounded-full blur-2xl opacity-50 -z-10"></div>
    </div>
  );
};
