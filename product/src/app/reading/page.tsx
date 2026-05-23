'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Timer, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
}

interface ReadingPassage {
  id: string;
  level: number;
  title: string;
  content: string;
  time_limit_minutes: number;
  questions: Question[];
}

export default function ReadingPage() {
  const [passages, setPassages] = useState<ReadingPassage[]>([]);
  const [currentPassageIndex, setCurrentPassageIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchPassages() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reading_passages')
          .select('*');
        
        if (error) throw error;
        setPassages(data || []);
      } catch (err) {
        console.error('Error loading reading passages:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPassages();
  }, [supabase]);

  const handleSubmit = useCallback(() => {
    if (currentPassageIndex === null) return;
    const passage = passages[currentPassageIndex];
    if (!passage) return;
    
    let correctCount = 0;
    const questions = passage.questions as Question[];
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  }, [currentPassageIndex, answers, passages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentPassageIndex !== null && !submitted) {
      const passage = passages[currentPassageIndex];
      if (!passage) return;
      
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentPassageIndex, submitted, handleSubmit, passages]);

  const handlePassageSelect = (index: number) => {
    const passage = passages[index];
    if (!passage) return;
    setCurrentPassageIndex(index);
    setTimeLeft((passage.time_limit_minutes || 5) * 60);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const resetPractice = () => {
    setCurrentPassageIndex(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-500">
        Loading reading passages...
      </div>
    );
  }

  if (currentPassageIndex === null) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Reading Comprehension</h1>
          <p className="text-slate-600">TOPIK-style practice</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passages.map((passage, index) => (
            <div 
              key={passage.id} 
              className="border rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer bg-white group"
              onClick={() => handlePassageSelect(index)}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                  Level {passage.level}
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded flex items-center gap-1">
                  <Timer size={12} /> {passage.time_limit_minutes || 5}m
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {passage.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {passage.content}
              </p>
              <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                Start Practice &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const passage = passages[currentPassageIndex];
  if (!passage) return null;

  const questions = passage.questions as Question[];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={resetPractice}
          className="text-slate-600 hover:text-slate-900 flex items-center gap-2 text-sm font-medium"
        >
          &larr; Back to list
        </button>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
            timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-100 text-blue-700'
          }`}>
            <Timer size={16} />
            {formatTime(timeLeft)}
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
            Level {passage.level}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Passage Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-6 h-fit">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">{passage.title}</h2>
          <div 
            className="text-lg leading-relaxed text-slate-800 font-medium" 
            lang="ko"
          >
            {passage.content}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3 text-sm text-blue-800">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>This is a timed exercise. You have {passage.time_limit_minutes || 5} minutes to complete the questions. The system will auto-submit once time expires.</p>
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-8">
          {questions.map((q, qIndex) => (
            <div key={q.id} className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                  {qIndex + 1}
                </span>
                <p className="text-lg font-medium text-slate-900" lang="ko">
                  {q.question}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 ml-9">
                {q.options.map((option, oIndex) => {
                  const isSelected = answers[q.id] === oIndex;
                  const isCorrect = q.correctAnswer === oIndex;
                  let optionClass = 'border-slate-200 text-slate-700 hover:bg-slate-50';
                  
                  if (submitted) {
                    if (isCorrect) {
                      optionClass = 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500';
                    } else if (isSelected && !isCorrect) {
                      optionClass = 'border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500';
                    } else {
                      optionClass = 'border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionClass = 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500';
                  }

                  return (
                    <button
                      key={oIndex}
                      disabled={submitted}
                      onClick={() => handleOptionSelect(q.id, oIndex)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${optionClass}`}
                    >
                      <span lang="ko">{option}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="ml-9 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800">
                  <strong className="block mb-1">Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-200"
            >
              Submit Answers
            </button>
          ) : (
            <div className="p-6 bg-white border-2 border-blue-500 rounded-2xl text-center space-y-4 shadow-xl">
              <div className="text-sm text-slate-600 uppercase font-bold tracking-wider">Your Result</div>
              <div className="text-5xl font-black text-blue-600">
                {score} / {questions.length}
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                  setScore(0);
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
