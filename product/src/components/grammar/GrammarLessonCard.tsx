import React from 'react';
import Link from 'next/link';

interface GrammarLessonCardProps {
  pattern: {
    id: string;
    title: string;
    pattern: string;
    level: number;
  };
  onClick?: () => void;
}

export const GrammarLessonCard: React.FC<GrammarLessonCardProps> = ({ pattern }) => {
  return (
    <Link 
      href={`/grammar/${pattern.id}`}
      className="group block p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100">
          Level {pattern.level}
        </span>
        <span className="text-xs text-slate-400 group-hover:text-blue-500 transition-colors">
          View Lesson &rarr;
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
        {pattern.title}
      </h3>
      <p className="text-lg font-medium text-slate-600 italic">
        {pattern.pattern}
      </p>
    </Link>
  );
};
