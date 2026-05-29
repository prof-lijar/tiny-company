import React from 'react';

export const HeroMockup = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Decorative background glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
      
      {/* Main Mockup Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <div className="mx-auto bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 w-1/2 text-center">
            topik-study-platform.app
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Mockup Content: Vocab Card */}
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 text-center space-y-4 transform rotate-2 shadow-sm">
            <div className="text-sm font-medium text-indigo-600 uppercase tracking-wider">Vocabulary Study</div>
            <div className="text-3xl font-bold text-slate-900">공부하다</div>
            <div className="text-lg text-slate-600">to study</div>
            <div className="flex justify-center gap-2 pt-2">
              <div className="px-2 py-1 bg-white rounded text-xs text-slate-500 border border-indigo-200">Level 3</div>
              <div className="px-2 py-1 bg-white rounded text-xs text-slate-500 border border-indigo-200">Verb</div>
            </div>
          </div>

          {/* Mockup Content: Progress Bars */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500">Overall Progress</span>
              <span className="text-xs font-bold text-indigo-600">68%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full w-[68%] rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase">Grammar</div>
                <div className="text-sm font-bold text-slate-700">12/20 Units</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase">Writing</div>
                <div className="text-sm font-bold text-slate-700">4/10 Essays</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Badge */}
      <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-xl">
          🚀
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">Fast Progress</div>
          <div className="text-[10px] text-slate-500">AI-Powered Learning</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
