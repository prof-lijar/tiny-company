'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TypingPracticeText } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Timer, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface TypingTrainerProps {
  text: TypingPracticeText;
  onComplete: (stats: { wpm: number; accuracy: number; time: number }) => void;
}

export default function TypingTrainer({ text, onComplete }: TypingTrainerProps) {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Reset state when text changes
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    setElapsedTime(0);
    setErrors(0);
  }, [text]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !endTime && !isFinished) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime, isFinished]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Start timer on first character
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    // Track errors: compare current input with target text
    if (value.length > userInput.length) {
      const charIndex = value.length - 1;
      if (charIndex < text.text.length && value[charIndex] !== text.text[charIndex]) {
        setErrors(prev => prev + 1);
      }
    }

    // Check for completion
    if (value === text.text) {
      const finishTime = Date.now();
      setEndTime(finishTime);
      setIsFinished(true);
      
      const start = startTime || finishTime;
      const timeTaken = (finishTime - start) / 1000;
      const minutes = timeTaken / 60;
      const wpm = minutes > 0 ? Math.round((text.text.length / 5) / minutes) : 0;
      const accuracy = Math.round(((text.text.length - errors) / text.text.length) * 100);
      
      onComplete({ 
        wpm: Math.max(0, wpm), 
        accuracy: Math.max(0, accuracy), 
        time: timeTaken 
      });
    }

    setUserInput(value);
  };

  const reset = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    setElapsedTime(0);
    setErrors(0);
    if (inputRef.current) inputRef.current.focus();
  };

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0;
    const timeTakenSeconds = (endTime - startTime) / 1000;
    if (timeTakenSeconds <= 0) return 0;
    const minutes = timeTakenSeconds / 60;
    return Math.round((text.text.length / 5) / minutes);
  };

  const calculateAccuracy = () => {
    if (text.text.length === 0) return 0;
    return Math.round(((text.text.length - errors) / text.text.length) * 100);
  };

  const renderText = () => {
    return text.text.split('').map((char, index) => {
      let colorClass = 'text-slate-400'; // Not yet typed
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          colorClass = 'text-emerald-600'; // Correct
        } else {
          colorClass = 'text-red-500 bg-red-100'; // Wrong
        }
      } else if (index === userInput.length) {
        colorClass = 'text-indigo-600 ring-2 ring-indigo-400 rounded-sm animate-pulse'; // Current cursor
      }

      return (
        <span key={index} className={`${colorClass} transition-all duration-75`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 font-serif text-2xl leading-relaxed min-h-[160px] shadow-inner">
        <div className="absolute top-4 right-4 flex items-center gap-4 text-slate-400 text-sm font-mono">
          <div className="flex items-center gap-1">
            <Timer size={16} />
            {startTime && !endTime && (
              <span>{(elapsedTime / 1000).toFixed(1)}s</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <AlertCircle size={16} />
            <span>Errors: {errors}</span>
          </div>
        </div>
        
        <div className="relative z-0 whitespace-pre-wrap selection:bg-transparent">
          {renderText()}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isFinished}
          className="absolute inset-0 opacity-0 cursor-default"
          autoFocus
        />
      </div>

      {isFinished && (
        <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" />
            <span className="font-bold text-lg">Practice Complete!</span>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <div className="text-center">
              <div className="text-xs uppercase text-emerald-600 font-bold">WPM</div>
              <div className="text-xl font-black">{calculateWPM()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase text-emerald-600 font-bold">Accuracy</div>
              <div className="text-xl font-black">{calculateAccuracy()}%</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button variant="outline" onClick={reset} className="flex items-center gap-2 group">
          <RotateCcw size={16} className="group-hover:rotate-[-45deg] transition-transform" /> 
          Reset Practice
        </Button>
      </div>
    </div>
  );
}
