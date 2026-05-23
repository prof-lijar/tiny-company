'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { calculateNextReview, SRSResult } from '@/lib/srs';
import { FlashCard } from '@/components/vocabulary/FlashCard';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { VocabularyWord } from '@/lib/data/vocabulary';

interface UserProgress {
  [key: string]: {
    interval: number;
    easeFactor: number;
    nextReview: number;
  };
}

export default function VocabularyPage() {
  const [selectedLevel, setSelectedLevel] = useState<number>(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<UserProgress>({});
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function loadInitialData() {
      try {
        // 1. Fetch vocabulary for the selected level
        const { data: vocabData, error: vocabError } = await supabase
          .from('vocabulary')
          .select('*')
          .eq('level', selectedLevel);

        if (vocabError) throw vocabError;
        setWords((vocabData as VocabularyWord[]) || []);

        // 2. Fetch vocabulary progress from API
        const res = await fetch('/api/vocabulary');
        const progressData = await res.json();
        setProgress(progressData);
      } catch (err) {
        console.error('Error loading vocabulary data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, [selectedLevel, supabase]);

  const filteredWords = useMemo(() => {
    return words;
  }, [words]);

  const currentWord = filteredWords[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = async (quality: number) => {
    setIsFlipped(false);
    
    if (!currentWord) return;
    const wordId = currentWord.id;
    const currentSRS = progress[wordId] || { interval: 0, easeFactor: 2.5, nextReview: 0 };
    
    const result: SRSResult = calculateNextReview(quality, currentSRS.easeFactor, currentSRS.interval);
    
    const newState = {
      interval: result.newInterval,
      easeFactor: result.newEaseFactor,
      nextReview: Date.now() + result.newInterval * 24 * 60 * 60 * 1000,
    };

    // Update local state
    setProgress(prev => ({
      ...prev,
      [wordId]: newState,
    }));

    // Persist to backend
    try {
      await fetch('/api/vocabulary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wordId, state: newState }),
      });
    } catch (err) {
      console.error('Error saving vocabulary progress:', err);
    }

    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-500">
        Loading your vocabulary progress...
      </div>
    );
  }

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
              setSelectedLevel(level);
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
              className="bg-blue-600 h-full transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / filteredWords.length) * 100}%` }}
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
