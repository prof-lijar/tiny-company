'use client';

import React, { useState, useMemo } from 'react';
import { VOCABULARY_DATA, VocabularyWord } from '@/lib/data/vocabulary';
import { calculateNextReview, SRSResult } from '@/lib/srs';
import { FlashCard } from '@/components/vocabulary/FlashCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface SRSState {
  interval: number;
  easeFactor: number;
  nextReview: number;
}

interface UserProgress {
  [key: string]: SRSState;
}

export default function VocabularyPage() {
  const [selectedLevel, setSelectedLevel] = useState<3 | 4 | 5 | 6>(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<UserProgress>({});

  const filteredWords = useMemo(() => {
    return VOCABULARY_DATA.filter(word => word.level === selectedLevel);
  }, [selectedLevel]);

  const currentWord = filteredWords[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = (quality: number) => {
    setIsFlipped(false);
    
    const wordId = currentWord.id;
    const currentSRS = progress[wordId] || { interval: 0, easeFactor: 2.5, nextReview: 0 };
    
    const result: SRSResult = calculateNextReview(quality, currentSRS.easeFactor, currentSRS.interval);
    
    setProgress(prev => ({
      ...prev,
      [wordId]: {
        interval: result.newInterval,
        easeFactor: result.newEaseFactor,
        nextReview: Date.now() + result.newInterval * 24 * 60 * 60 * 1000,
      },
    }));

    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Vocabulary Builder</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Master TOPIK vocabulary using a Spaced Repetition System. 
          Rate your recall to optimize your study schedule.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[3, 4, 5, 6].map(level => (
          <Button 
            key={level} 
            variant={selectedLevel === level ? 'primary' : 'outline'}
            onClick={() => {
              setSelectedLevel(level as 3 | 4 | 5 | 6);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
          >
            TOPIK Level {level}
          </Button>
        ))}
      </div>

      {currentWord && (
        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          <div className="mb-4 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300 w-[var(--progress-width)]" 
              style={{ '--progress-width': `${((currentIndex + 1) / filteredWords.length) * 100}%` } as React.CSSProperties}
            ></div>
          </div>

          <FlashCard 
            word={currentWord} 
            onFlip={handleFlip} 
            isFlipped={isFlipped} 
          />

          {isFlipped && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-6">
              <Button variant="outline" onClick={() => handleRate(0)} className="text-xs">
                Again
              </Button>
              <Button variant="outline" onClick={() => handleRate(2)} className="text-xs">
                Hard
              </Button>
              <Button variant="outline" onClick={() => handleRate(3)} className="text-xs">
                Good
              </Button>
              <Button variant="outline" onClick={() => handleRate(5)} className="text-xs">
                Easy
              </Button>
            </div>
          )}

          <div className="text-center mt-8 text-slate-500 text-sm">
            Card {currentIndex + 1} of {filteredWords.length}
          </div>
        </div>
      )}
    </div>
  );
}
