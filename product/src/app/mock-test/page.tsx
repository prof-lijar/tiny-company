'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MockTestResult, MockTestQuestion } from '@/lib/types';
import { ChevronRight, ChevronLeft, Timer, AlertCircle, Lock, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface QuestionPaletteItemProps {
  index: number;
  isActive: boolean;
  isAnswered: boolean;
  onClick: (index: number) => void;
}

function QuestionPaletteItem({ index, isActive, isAnswered, onClick }: QuestionPaletteItemProps) {
  return (
    <button
      onClick={() => onClick(index)}
      className={`w-8 h-8 text-xs font-bold rounded-md transition-all border ${
        isActive 
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
          : isAnswered 
            ? 'bg-indigo-100 text-indigo-700 border-indigo-300' 
            : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-400'
      }`}
    >
      {index + 1}
    </button>
  );
}

export default function MockTestSimulator() {
  const [currentTest, setCurrentTest] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<MockTestResult | null>(null);
  const [isExamMode, setIsExamMode] = useState(false);
  const [showExamWarning, setShowExamWarning] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mockTests, setMockTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTests() {
      try {
        const response = await fetch('/api/mock-tests');
        const data = await response.json();
        setMockTests(data);
      } catch (e) {
        console.error("Failed to load mock tests", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadTests();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const test = mockTests[currentTest];
  if (!test) return null;

  const section = test.sections[currentSectionIndex];
  const currentQuestion = section.questions[currentQuestionIndex];

  const calculateResults = useCallback(() => {
    let totalScore = 0;
    const sectionScores: { [key: string]: number } = {};
    
    test.sections.forEach((sec: any) => {
      let secScore = 0;
      sec.questions.forEach((q: any) => {
        if (q.correctAnswer !== undefined && answers[q.id] === q.correctAnswer) {
          secScore += 1;
        }
      });
      sectionScores[sec.id] = secScore;
      totalScore += secScore;
    });
    
    const totalQuestions = test.sections.reduce((acc: number, s: any) => acc + s.questions.length, 0);
    const rawPercentage = (totalScore / totalQuestions) * 100;
    const normalizedScore = Math.round(rawPercentage * 3); 
    
    setResults({
      sectionScores,
      totalScore: normalizedScore,
      timeTakenSeconds: 0,
    });
  }, [test, answers]);

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
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, finishTest]);

  const startTest = (mode: 'practice' | 'exam') => {
    if (mode === 'exam') {
      setIsExamMode(true);
      setShowExamWarning(true);
    } else {
      setIsExamMode(false);
      executeStart();
    }
  };

  const executeStart = () => {
    setIsTestActive(true);
    const totalDurationMinutes = test.sections.reduce((acc: number, sec: any) => acc + sec.durationMinutes, 0);
    setTimeLeft(totalDurationMinutes * 60);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setShowExamWarning(false);
  };

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSectionChange = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= test.sections.length) return;
    setCurrentSectionIndex(newIndex);
    setCurrentQuestionIndex(0);
  };

  const handleQuestionChange = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= section.questions.length) return;
    setCurrentQuestionIndex(newIndex);
  };

  const getLevel = (score: number) => {
    if (score >= 170) return 'Level 5';
    if (score >= 140) return 'Level 4';
    if (score >= 100) return 'Level 3';
    return 'Level 2 or below';
  };

  return (
    <div className={`min-h-screen ${isExamMode ? 'bg-slate-50' : 'bg-white'} py-12 px-4`}>
      {!isTestActive && !isFinished && (
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Mock Test Simulator</h1>
            <p className="text-xl text-slate-600">
              Prepare for the TOPIK II IBT experience with official timing and structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {mockTests.map((t, idx) => (
              <div key={t.id} className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{t.title}</h3>
                  <div className="flex gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Timer size={14} /> {t.sections.reduce((acc: number, s: any) => acc + s.durationMinutes, 0)} mins</span>
                    <span className="flex items-center gap-1"><AlertCircle size={14} /> {t.sections.reduce((acc: number, s: any) => acc + s.questions.length, 0)} Questions</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => { setCurrentTest(idx); startTest('practice'); }}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
                  >
                    Practice Mode
                  </button>
                  <button 
                    onClick={() => { setCurrentTest(idx); startTest('exam'); }}
                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Lock size={16} /> Strict Exam Mode
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showExamWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-6 border border-slate-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck size={32} />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Enter Strict Mode?</h2>
              <p className="text-slate-600">
                You will be locked into the exam interface. Section jumping is restricted, and the timer is absolute. No study aids will be provided.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowExamWarning(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={executeStart}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-bold"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {isTestActive && (
        <div className={`max-w-7xl mx-auto space-y-6 ${isExamMode ? 'grid grid-cols-12 gap-6' : 'block'}`}>
          <div className={`flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-4 z-10 gap-4 ${isExamMode ? 'col-span-12' : 'block'}`}>
            <div className="flex items-center gap-4">
              <div className={`text-lg font-bold ${isExamMode ? 'text-slate-700' : 'text-slate-800'}`}>
                {test.title} {isExamMode && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full uppercase tracking-wider">Strict Mode</span>}
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-sm font-mono font-bold shadow-inner">
                <Timer size={16} className="text-amber-400" />
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              {!isExamMode && test.sections.map((sec: any, idx: number) => (
                <button
                  key={sec.id}
                  onClick={() => handleSectionChange(idx)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                    currentSectionIndex === idx 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sec.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  if (isExamMode) {
                    setShowConfirmModal(true);
                  } else {
                    finishTest();
                  }
                }}
                className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-bold"
              >
                Finish
              </button>
            </div>
          </div>

          <div className={`space-y-6 ${isExamMode ? 'col-span-8' : 'max-w-4xl mx-auto'}`}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-slate-800">{section.name} Section</h2>
                  <p className="text-sm text-slate-500">Question {currentQuestionIndex + 1} of {section.questions.length}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                  <AlertCircle size={16} />
                  {section.questions.length} Questions
                </div>
              </div>

              <div className="space-y-6">
                {currentQuestion && (
                  <>
                    {currentQuestion.passage && (
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 font-serif text-lg leading-relaxed text-slate-800 mb-6 shadow-inner">
                        {currentQuestion.passage}
                      </div>
                    )}
                    {currentQuestion.audioUrl && (
                      <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                          <span className="sr-only">Play Audio</span>
                          <span className="text-xl">▶</span>
                        </div>
                        <div className="text-sm text-indigo-600 font-semibold">
                          Audio Clip: {currentQuestion.audioUrl} <span className="ml-2 opacity-70">(1.1x Speed)</span>
                        </div>
                      </div>
                    )}

                    <div className="text-xl text-slate-800 font-medium leading-relaxed mb-8">
                      {currentQuestion.question}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {currentQuestion.options && currentQuestion.options.map((opt: string, optIdx: number) => (
                        <button 
                          key={optIdx}
                          onClick={() => handleAnswerChange(currentQuestion.id, optIdx)}
                          className={`p-4 text-left border-2 rounded-xl transition-all font-medium ${
                            answers[currentQuestion.id] === optIdx 
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-600' 
                            : 'bg-white border-slate-100 text-slate-700 hover:border-indigo-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${answers[currentQuestion.id] === optIdx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {optIdx + 1}
                            </span>
                            {opt}
                          </div>
                        </button>
                      ))}
                      
                      {currentQuestion.prompt && (
                        <textarea 
                          className="w-full h-48 p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-serif text-lg"
                          placeholder="Write your answer here..."
                          value={answers[currentQuestion.id] || ''}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          lang="ko"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                <button 
                  disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      handleQuestionChange(currentQuestionIndex - 1);
                    } else if (currentSectionIndex > 0) {
                      handleSectionChange(currentSectionIndex - 1);
                      handleQuestionChange(section.questions.length - 1);
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-indigo-600 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors font-bold"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                
                {currentSectionIndex < test.sections.length - 1 || currentQuestionIndex < section.questions.length - 1 ? (
                  <button 
                    onClick={() => {
                      if (currentQuestionIndex < section.questions.length - 1) {
                        handleQuestionChange(currentQuestionIndex + 1);
                      } else {
                        handleSectionChange(currentSectionIndex + 1);
                        handleQuestionChange(0);
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-bold shadow-md"
                  >
                    Next <ChevronRight size={20} />
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      if (isExamMode) {
                        setShowConfirmModal(true);
                      } else {
                        finishTest();
                      }
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold shadow-md"
                  >
                    Submit Final Test
                  </button>
                )}
              </div>
            </div>
          </div>

          {isExamMode && (
            <div className="col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
                <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
                  <LayoutDashboard size={20} className="text-indigo-600" />
                  Question Palette
                </div>
                
                <div className="space-y-6">
                  {test.sections.map((sec: any, sIdx: number) => (
                    <div key={sec.id} className="space-y-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sec.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {sec.questions.map((q: any, qIdx: number) => (
                          <QuestionPaletteItem 
                            key={q.id}
                            index={qIdx}
                            isActive={currentSectionIndex === sIdx && currentQuestionIndex === qIdx}
                            isAnswered={answers[q.id] !== undefined}
                            onClick={() => {
                              handleSectionChange(sIdx);
                              handleQuestionChange(qIdx);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isFinished && (
        <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-extrabold text-slate-900">Test Results</h2>
            <p className="text-xl text-slate-600">Your performance analysis is ready.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center space-y-2">
              <div className="text-sm text-slate-500 uppercase font-bold tracking-wider">Overall Score</div>
              <div className="text-6xl font-black text-indigo-600">{results?.totalScore} <span className="text-2xl text-slate-400">/ 300</span></div>
              <div className="text-xl font-bold text-slate-700">
                {results ? getLevel(results.totalScore) : 'Calculating...'}
              </div>
            </div>
            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center space-y-2">
              <div className="text-sm text-slate-500 uppercase font-bold tracking-wider">Accuracy</div>
              <div className="text-6xl font-black text-slate-800">
                {results ? ((results.totalScore / 300) * 100).toFixed(1) : '0'}%
              </div>
              <div className="text-slate-500 font-medium">Based on correct answers</div>
            </div>
            <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center space-y-2">
              <div className="text-sm text-slate-500 uppercase font-bold tracking-wider">Status</div>
              <div className="text-6xl font-black text-emerald-500">
                Done
              </div>
              <div className="text-slate-500 font-medium">Session Completed</div>
            </div>
          </div>

          <button 
            onClick={() => {
              setIsFinished(false);
              setIsTestActive(false);
              setResults(null);
              setIsExamMode(false);
            }}
            className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
          >
            Return to Simulator
          </button>
        </div>
      )}

      <Modal 
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={finishTest}
        title="Submit Final Test?"
        message="Are you sure you want to submit your test? You will not be able to change your answers after you submit."
      />
      
    </div>
  );
}
