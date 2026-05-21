import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { grammarData } from '@/lib/data/grammar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default async function GrammarLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pattern = grammarData.find(p => p.id === id);

  if (!pattern) {
    notFound();
  }

  // Find previous and next lessons for navigation
  const index = grammarData.findIndex(p => p.id === id);
  const prevPattern = index > 0 ? grammarData[index - 1] : null;
  const nextPattern = index < grammarData.length - 1 ? grammarData[index + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link 
          href="/grammar" 
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
        >
          &larr; Back to Grammar List
        </Link>
      </div>

      <article className="space-y-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100 mb-4">
            Level {pattern.level}
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {pattern.title}
          </h1>
          <div className="text-2xl font-mono text-slate-600 italic bg-slate-100 px-4 py-2 rounded-lg inline-block">
            {pattern.pattern}
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">Explanation</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            {pattern.explanation}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">Examples</h2>
          <div className="grid gap-4">
            {pattern.examples.map((example, idx) => (
              <Card key={idx} className="p-6">
                <div className="space-y-2">
                  <p className="text-xl font-medium text-slate-900" lang="ko">
                    {example.korean}
                  </p>
                  <p className="text-slate-600 italic">
                    {example.english}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">Usage Notes</h2>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-slate-700 leading-relaxed">
            {pattern.usage_notes}
          </div>
        </section>

        <nav className="flex items-center justify-between pt-12 mt-12 border-t">
          {prevPattern && (
            <Link href={`/grammar/${prevPattern.id}`}>
              <Button variant="outline" size="md">
                &larr; Previous: {prevPattern.title}
              </Button>
            </Link>
          )}
          {!prevPattern && <div />}
          
          {nextPattern && (
            <Link href={`/grammar/${nextPattern.id}`}>
              <Button variant="outline" size="md">
                Next: {nextPattern.title} &rarr;
              </Button>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
