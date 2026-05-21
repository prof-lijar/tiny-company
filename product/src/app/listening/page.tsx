'use client';

import React, { useState } from 'react';
import { listeningData } from '@/lib/data/listening';
import { ListeningPlayer } from '@/components/listening/ListeningPlayer';
import { Volume2, Zap } from 'lucide-react';
import { TopikLevel } from '@/lib/types';

export default function ListeningPage() {
  const [selectedLevel, setSelectedLevel] = useState<TopikLevel>(3);
  const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [is2026Mode, setIs2026Mode] = useState(false);

  const filteredPassages = listeningData.filter(p => p.level === selectedLevel);
  const currentPassage = filteredPassages[currentPassageIdx];
  const currentQuestion = currentPassage?.questions[currentQuestionIdx];

  if (!currentPassage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No passages available for this level</h2>
        <p className="text-slate-600 mb-4">Please try selecting another TOPIK level.</p>
        <div className="flex gap-2">
          {[3, 4, 5, 6].map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level as TopikLevel)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLevel === level ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Level {level}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || !currentQuestion) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setTotalAnswered(prev => prev + 1);
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    
    if (currentQuestionIdx < currentPassage.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setCurrentQuestionIdx(0);
      if (currentPassageIdx < filteredPassages.length - 1) {
        setCurrentPassageIdx(prev => prev + 1);
      } else {
        alert('You have completed all listening exercises for this level!');
        setCurrentPassageIdx(0);
        setCurrentQuestionIdx(0);
        setScore(0);
        setTotalAnswered(0);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex-start">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Listening Practice</h1>
          <p className="text-slate-600">Improve your Korean listening skills with TOPIK-style exercises.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {[3, 4, 5, 6].map(level => (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level as TopikLevel);
                  setCurrentPassageIdx(0);
                  setCurrentQuestionIdx(0);
                  setIsSubmitted(false);
                  setSelectedOption(null);
                }}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedLevel === level ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Level {level}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
            <input 
              type="checkbox" 
              id="mode-2026" 
              checked={is2026Mode}
              onChange={(e) => setIs2026Mode(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
            />
            <label 
              htmlFor="mode-2026" 
              className="text-sm font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <Zap size={14} className="text-amber-500" />
              2026 Mode (1.1x)
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Volume2 className="text-indigo-500" size={20} />
              Audio Passage
            </h3>
            <ListeningPlayer 
              audioUrl={currentQuestion?.audioUrl}
              is2026Mode={is2026Mode}
              onEnded={() => console.log('Audio ended')} 
            />
            <div className="mt-4 text-sm text-slate-500 italic">
              Tip: Listen carefully to the audio before choosing an answer.
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Question</h3>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                Passage {currentPassageIdx + 1} - Q{currentQuestionIdx + 1} of {currentPassage.questions.length}
              </span>
            </div>
            
            {currentQuestion && (
              <>
                <p className="text-xl text-slate-800 mb-6 font-medium leading-relaxed">
                  {currentQuestion.question}
                </p>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <label 
                      key={idx} 
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedOption === idx 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-slate-100 hover:border-slate-300 bg-slate-50'
                      } ${
                        isSubmitted && idx === currentQuestion.correctAnswer 
                          ? 'border-green-500 bg-green-50' 
                          : isSubmitted && selectedOption === idx 
                            ? 'border-red-500 bg-red-50' 
                            : ''
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="listening-option" 
                        className="hidden" 
                        checked={selectedOption === idx}
                        onChange={() => handleOptionSelect(idx)}
                      />
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 mr-3 ${
                        selectedOption === idx ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 text-slate-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  {!isSubmitted ? (
                    <button 
                      onClick={handleSubmit}
                      disabled={selectedOption === null}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-slate-300 transition-colors"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button 
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      {currentQuestionIdx < currentPassage.questions.length - 1 || currentPassageIdx < filteredPassages.length - 1 
                      ? 'Next Question' 
                      : 'Finish Session'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-4">Your Progress</h4>
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-bold text-indigo-600">{score}/{totalAnswered}</span>
              <span className="text-sm text-indigo-500 font-medium">Accuracy: {totalAnswered > 0 ? Math.round((score/totalAnswered)*100) : 0}%</span>
            </div>
            <div className="w-full bg-indigo-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300" 
                style={{ width: `${totalAnswered > 0 ? (score/totalAnswered)*100 : 0}%` }}
              />
            </div>
          </div>

          {isSubmitted && currentQuestion && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Explanation</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
