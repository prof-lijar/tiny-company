'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import type { WeaknessReport as WeaknessReportType } from '@/lib/types';

export default function WeaknessReport() {
  const [report, setReport] = useState<WeaknessReportType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeWeaknesses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze-weaknesses');
      if (!response.ok) throw new Error('Failed to fetch weakness analysis');
      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 border-slate-200 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold text-slate-900">AI Weakness Analysis</h3>
        </div>
        {!report && (
          <Button 
            onClick={analyzeWeaknesses} 
            disabled={loading}
            className="text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Run Analysis'}
          </Button>
        )}
      </div>

      {loading && (
        <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm font-medium">Analyzing your performance data...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mb-4 border border-red-100">
          {error}
        </div>
      )}

      {report && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800 leading-relaxed">
              {report.overallAnalysis}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Top Priority Areas</h4>
            {report.topWeaknesses.map((weakness, i) => (
              <div key={i} className="p-4 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-900">{weakness.tag}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    weakness.impact === 'high' ? 'bg-red-100 text-red-600' : 
                    weakness.impact === 'medium' ? 'bg-amber-100 text-amber-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    {weakness.impact} Impact
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  {weakness.recommendation}
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs h-8 flex items-center justify-center gap-1">
                  Go to Lesson <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          <Button 
            variant="outline" 
            onClick={() => setReport(null)} 
            className="w-full text-xs text-slate-500 hover:text-slate-700"
          >
            Clear Report
          </Button>
        </div>
      )}

      {!report && !loading && !error && (
        <div className="py-12 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 max-w-[200px] mx-auto">
            Click the button to let our AI identify your study gaps.
          </p>
        </div>
      )}
    </Card>
  );
}
