'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { mockTests } from '@/lib/data/mock-tests';
import { MockTestResult, MockTestQuestion } from '@/lib/types';

export default function MockTestSimulator() {
  const [currentTest, setCurrentTest] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<MockTestResult | null>(null);

  const test = mockTests[currentTest];
  const section = test.sections[currentSectionIndex];

  const calculateResults = useCallback(() => {
    let totalScore = 0;
    const sectionScores: { [key: string]: number } = {};
    
    test.sections.forEach((sec) => {
      let secScore = 0;
      sec.questions.forEach((q: MockTestQuestion) => {
        if (q.correctAnswer !== undefined && answers[q.id] === q.correctAnswer) {
          secScore += 1;
        }
      });
      sectionScores[sec.id] = secScore;
      totalScore += secScore;
    });
    
    // 2026 Reform: We assume each correct answer is worth a certain weight.
    // For a real app, we'd have weights per question.
    // Total score is normalized to 300 (Listening 100, Reading 100, Writing 100).
    // Mock tests currently use simplified 1:1 scoring for correct answers.
    // We will map the raw count to a 300-point scale for the 2026 Reform levels.
    
    const totalQuestions = test.sections.reduce((acc, s) => acc + s.questions.length, 0);
    const rawPercentage = (totalScore / totalQuestions) * 100;
    const normalizedScore = Math.round(rawPercentage * 3); // Map 0-100% to 0-300
    
    setResults({
      sectionScores,
      totalScore: normalizedScore,
      timeTakenSeconds: (section.durationMinutes * 60) - timeLeft,
    });
  }, [test, answers, section, timeLeft]);

  const finishTest = useCallback(() => {
    setIsTestActive(false);
    setIsFinished(true);
    calculateResults();
  }, [calculateResults]);

  useEffect(() => {
    if (!isTestActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimeout(() => {
            finishTest();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, finishTest]);

  const startTest = () => {
    setIsTestActive(true);
    setTimeLeft(section.durationMinutes * 60);
  };

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const totalQuestions = test.sections.reduce((acc, s) => acc + s.questions.length, 0);

  // 2026 Reform Scoring Logic
  const getLevel = (score: number) => {
    if (score >= 170) return 'Level 5';
    if (score >= 140) return 'Level 4';
    if (score >= 100) return 'Level 3';
    return 'Level 2 or below';
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {!isTestActive && !isFinished && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Mock Test Simulator</h1>
          <p className="text-xl text-slate-600 mb-8">
            Simulate the TOPIK II experience with timed sections and real-world format.
          </p>
          <div className="max-w-md mx-auto space-y-4">
            {mockTests.map((t, idx) => (
              <div key={t.id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-800">{t.title}</span>
                <button 
                  onClick={() => {
                    setCurrentTest(idx);
                    startTest();
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isTestActive && (
        <div className="space-y-8">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-4 z-10">
            <div className="text-lg font-bold text-slate-800">
              {test.title} - {section.name}
            </div>
            <div className="text-xl font-mono font-bold text-indigo-600 bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <button 
              onClick={finishTest}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Finish Test
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            {section.questions.map((q: MockTestQuestion, idx) => (
              <div key={q.id} className="p-6 border-b border-slate-100 last:border-0 space-y-4">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Question {idx + 1}</div>
                
                {q.passage && (
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-serif text-lg leading-relaxed text-slate-800 mb-4">
                    {q.passage}
                  </div>
                )}
                {q.audioUrl && (
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                      <span className="sr-only">Play Audio</span>
                      ▶️
                    </div>
                    <div className="text-sm text-indigo-600 font-medium">
                      Audio Clip: {q.audioUrl} (Simulated 1.1x speed for 2026 Reform)
                    </div>
                  </div>
                )}

                <div className="text-lg text-slate-800 mb-4">{q.question}</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options && q.options.map((opt: string, optIdx: number) => (
                    <button 
                      key={optIdx}
                      onClick={() => handleAnswerChange(q.id, optIdx)}
                      className={`p-3 text-left border rounded-lg transition-all ${
                        answers[q.id] === optIdx 
                        ? 'bg-indigo-100 border-indigo-600 ring-1 ring-indigo-600 text-indigo-900' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                  
                  {q.prompt && (
                    <textarea 
                      className="col-span-2 w-full h-32 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-serif"
                      placeholder="Write your answer here..."
                      value={answers[q.id] || ''}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      lang="ko"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isFinished && (
        <div className="text-center space-y-8 py-12">
          <h2 className="text-4xl font-extrabold text-slate-900">Test Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
              <div className="text-sm text-slate-500 uppercase font-bold mb-2">Overall Score</div>
              <div className="text-5xl font-bold text-indigo-600">{results?.totalScore} / 300</div>
              <div className="text-lg font-semibold text-slate-700 mt-2">
                {results ? getLevel(results.totalScore) : 'Calculating...'}
              </div>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
              <div className="text-sm text-slate-500 uppercase font-bold mb-2">Time Taken</div>
              <div className="text-2xl font-bold text-slate-800">{Math.floor((results?.timeTakenSeconds || 0) / 60)}m { (results?.timeTakenSeconds || 0) % 60 }s</div>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
              <div className="text-sm text-slate-500 uppercase font-bold mb-2">Accuracy</div>
              <div className="text-2xl font-bold text-slate-800">
                {results ? ((results.totalScore / 300) * 100).toFixed(1) : '0'}%
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsFinished(false);
              setIsTestActive(false);
              setResults(null);
            }}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            Return to Simulator
          </button>
        </div>
      )}
    </div>
  );
}
