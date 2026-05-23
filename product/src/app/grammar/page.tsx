import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { GrammarLessonCard } from '@/components/grammar/GrammarLessonCard';

export default async function GrammarPage() {
  const supabase = await createClient();
  
  // Fetch all grammar grammar lessons
  const { data: grammarData, error } = await supabase
    .from('grammar_lessons')
    .select('*')
    .order('level', { ascending: true });

  if (error) {
    console.error('Error fetching grammar lessons:', error);
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500">Error loading grammar lessons. Please try again later.</p>
      </div>
    );
  }

  const levels = [3, 4, 5, 6];
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Grammar Lessons
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Master TOPIK II grammar patterns with detailed explanations, usage notes, and real-world examples.
        </p>
      </header>

      <div className="space-y-16">
        {levels.map((level) => {
          const levelPatterns = grammarData?.filter(p => p.level === level) || [];
          if (levelPatterns.length === 0) return null;

          return (
            <section key={level} className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  Level {level}
                </h2>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelPatterns.map((pattern) => (
                  <GrammarLessonCard 
                    key={pattern.id} 
                    pattern={pattern} 
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
