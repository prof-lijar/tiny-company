'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

interface ListeningPlayerProps {
  onEnded?: () => void;
}

export const ListeningPlayer: React.FC<ListeningPlayerProps> = ({ onEnded }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock audio behavior since we don't have real files
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (onEnded) onEnded();
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onEnded]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{isPlaying ? 'Playing audio...' : 'Ready to play'}</span>
            <span>{Math.floor(progress / 10)}s / 10s</span>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button 
          onClick={reset}
          className="p-2 text-slate-600 hover:text-indigo-600 transition-colors"
          title="Restart"
        >
          <RotateCcw size={20} />
        </button>
        
        <div className="p-2 text-slate-400">
          <Volume2 size={20} />
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 mt-3">
        (Audio simulation: 10 seconds)
      </p>
    </div>
  );
};
