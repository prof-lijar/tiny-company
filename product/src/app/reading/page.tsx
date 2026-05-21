'use client';

import React, { useState } from 'react';
import { READING_PASSAGES } from '@/lib/data/reading';

export default function ReadingPage() {
  const [currentPassageIndex, setCurrentPassageIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handlePassageSelect = (index: number) => {
    setCurrentPassageIndex(index);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    const passage = READING_PASSAGES[currentPassageIndex!];
    let correctCount = 0;
    passage.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const resetPractice = () => {
    setCurrentPassageIndex(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  if (currentPassageIndex === null) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Reading Comprehension</h1>
          <p className="text-slate-600">TOPIK-style practice</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {READING_PASSAGES.map((passage, index) => (
            <div 
              key={passage.id} 
              className="border rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer bg-white group"
              onClick={() => handlePassageSelect(index)}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                  Level {passage.level}
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

  const passage = READING_PASSAGES[currentPassageIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={resetPractice}
          className="text-slate-600 hover:text-slate-900 flex items-center gap-2 text-sm font-medium"
        >
          &larr; Back to list
        </button>
        <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
          Level {passage.level}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Passage Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">{passage.title}</h2>
          <div 
            className="text-lg leading-relaxed text-slate-800 font-medium" 
            lang="ko"
          >
            {passage.content}
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-8">
          {passage.questions.map((q, qIndex) => (
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
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < passage.questions.length}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answers
            </button>
          ) : (
            <div className="p-6 bg-white border-2 border-blue-500 rounded-2xl text-center space-y-4">
              <div className="text-sm text-slate-600 uppercase font-bold tracking-wider">Your Result</div>
              <div className="text-5xl font-black text-blue-600">
                {score} / {passage.questions.length}
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
