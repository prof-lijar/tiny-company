'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Gauge } from 'lucide-react';

interface ListeningPlayerProps {
  onEnded?: () => void;
  is2026Mode?: boolean;
  audioUrl?: string;
}

export const ListeningPlayer: React.FC<ListeningPlayerProps> = ({ onEnded, is2026Mode = false, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(is2026Mode ? 1.1 : 1.0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio object
    const audio = new Audio(audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [audioUrl, onEnded]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (is2026Mode && playbackSpeed !== 1.1) {
      setPlaybackSpeed(1.1);
    } else if (!is2026Mode && playbackSpeed === 1.1) {
      setPlaybackSpeed(1.0);
    }
  }, [is2026Mode]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
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
            <span className="flex items-center gap-1">
              {isPlaying ? 'Playing audio...' : 'Ready to play'}
              {playbackSpeed !== 1 && <span className="text-indigo-600 font-bold">({playbackSpeed}x)</span>}
            </span>
            <span>{Math.floor((audioRef.current?.currentTime || 0))}s / {Math.floor(audioRef.current?.duration || 0)}s</span>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          <Gauge size={14} className="text-slate-400 ml-1" />
          {[1.0, 1.1, 1.2].map(speed => (
            <button
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              className={`text-xs px-2 py-1 rounded ${
                playbackSpeed === speed 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {speed}x
            </button>
          ))}
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
        {is2026Mode ? '2026 Reform Mode: High-speed playback enabled' : 'Standard playback speed'}
      </p>
    </div>
  );
};
