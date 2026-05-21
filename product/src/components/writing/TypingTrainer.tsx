'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TypingPracticeText } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Timer, RotateCcw, CheckCircle2 } from 'lucide-react';

interface TypingTrainerProps {
  text: TypingPracticeText;
  onComplete: (stats: { wpm: number; accuracy: number; time: number }) => void;
}

export default function TypingTrainer({ text, onComplete }: TypingTrainerProps) {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value === text.text) {
      const finishTime = Date.now();
      setEndTime(finishTime);
      setIsFinished(true);
      
      const timeTaken = (finishTime - (startTime || finishTime)) / 1000;
      const wpm = Math.round((text.text.length / 5) / (timeTaken / 60));
      const accuracy = 100; // Since we only finish on exact match in this simple version
      
      onComplete({ wpm, accuracy, time: timeTaken });
    }

    setUserInput(value);
  };

  const reset = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const renderText = () => {
    return text.text.split('').map((char, index) => {
      let colorClass = 'text-slate-400';
      if (index < userInput.length) {
        colorClass = userInput[index] === char ? 'text-emerald-600' : 'text-red-500 bg-red-100';
      }
      return (
        <span key={index} className={`${colorClass} transition-colors duration-100`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 font-serif text-2xl leading-relaxed min-h-[120px]">
        <div className="absolute top-4 right-4 flex items-center gap-2 text-slate-400 text-sm font-mono">
          <Timer size={16} />
          {startTime && !endTime && (
            <span>{((Date.now() - startTime) / 1000).toFixed(1)}s</span>
          )}
        </div>
        <div className="relative z-0 whitespace-pre-wrap">
          {renderText()}
        </div>
        
        {/* Invisible input for capturing keystrokes */}
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
        <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" />
            <span className="font-bold">Practice Complete!</span>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <span>WPM: {Math.round((text.text.length / 5) / (((endTime! - startTime!) / 1000) / 60))}</span>
            <span>Accuracy: 100%</span>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button variant="outline" onClick={reset} className="flex items-center gap-2">
          <RotateCcw size={16} /> Reset
        </Button>
      </div>
    </div>
  );
}
