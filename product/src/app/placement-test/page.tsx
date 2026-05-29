'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, Award, Volume2, BookOpen, PenTool, Brain } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ListeningPlayer } from '@/components/listening/ListeningPlayer';
import { listeningData } from '@/lib/data/listening';
import { READING_PASSAGES } from '@/lib/data/reading';
import { writingPrompts } from '@/lib/data/writing-prompts';

type Step = 'welcome' | 'listening' | 'reading' | 'writing' | 'review' | 'result';

const TEST_CONFIG = {
  listening: {
    l3: ['listen-1', 'listen-5', 'listen-6'],
    l4: ['listen-2', 'listen-9', 'listen-10'],
    l5_6: ['listen-3', 'listen-4', 'listen-13', 'listen-14'],
  },
  reading: {
    l3: ['reading-1', 'reading-4', 'reading-7'],
    l4: ['reading-2', 'reading-5', 'reading-8'],
    l5_6: ['reading-3', 'reading-6', 'reading-9', 'reading-15'],
  },
  writingId: 'w3',
};

export default function PlacementTestPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [writingAnswer, setWritingAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ level: number; label: string } | null>(null);

  const listenPassages = [
    ...TEST_CONFIG.listening.l3,
    ...TEST_CONFIG.listening.l4,
    ...TEST_CONFIG.listening.l5_6,
  ].map(id => listeningData.find(l => l.id === id)).filter(Boolean) as any[];

  const readPassages = [
    ...TEST_CONFIG.reading.l3,
    ...TEST_CONFIG.reading.l4,
    ...TEST_CONFIG.reading.l5_6,
  ].map(id => READING_PASSAGES.find(r => r.id === id)).filter(Boolean) as any[];

  const writingPrompt = writingPrompts.find(w => w.id === TEST_CONFIG.writingId);

  const handleAnswer = (qId: string, optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateResult = () => {
    let score = 0;
    // Listening
    listenPassages.forEach(p => {
      p.questions.forEach((q: any) => {
        if (answers[q.id] === q.correctAnswer) score++;
      });
    });
    // Reading
    readPassages.forEach(p => {
      p.questions.forEach((q: any) => {
        if (answers[q.id] === q.correctAnswer) score++;
      });
    });

    if (score <= 8) return { level: 2, label: 'Basic Path' };
    if (score <= 12) return { level: 3, label: 'Intermediate Path' };
    if (score <= 16) return { level: 4, label: 'Upper-Intermediate Path' };
    return { level: 5, label: 'Advanced Path' };
  };

  const submitTest = async () => {
    setIsLoading(true);
    // Simulate API call to save results and trigger study plan
    await new Promise(resolve => setTimeout(resolve, 2000));
    const res = calculateResult();
    setPrediction(res);
    setStep('result');
    setIsLoading(false);
  };

  const progress = () => {
    if (step === 'listening') return ((currentIdx + 1) / listenPassages.length) * 100;
    if (step === 'reading') return ((currentIdx + 1) / readPassages.length) * 100;
    return 0;
  };

  if (step === 'welcome') {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center space-y-8 py-20">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600">
            <Brain size={48} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-slate-900">TOPIK Placement Test</h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Discover your current Korean proficiency level. We'll assess your listening, reading, and writing skills to create a personalized study path just for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          <div className="p-4 border rounded-xl bg-slate-50">
            <Volume2 className="text-blue-500 mb-2" />
            <h3 className="font-bold">Listening</h3>
            <p className="text-sm text-slate-500">10 Questions</p>
          </div>
          <div className="p-4 border rounded-xl bg-slate-50">
            <BookOpen className="text-blue-500 mb-2" />
            <h3 className="font-bold">Reading</h3>
            <p className="text-sm text-slate-500">10 Questions</p>
          </div>
          <div className="p-4 border rounded-xl bg-slate-50">
            <PenTool className="text-blue-500 mb-2" />
            <h3 className="font-bold">Writing</h3>
            <p className="text-sm text-slate-500">1 Essay Prompt</p>
          </div>
        </div>
        <Button 
          onClick={() => setStep('listening')} 
          className="px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-200"
        >
          Start Free Assessment <ArrowRight className="ml-2" />
        </Button>
      </div>
    );
  }

  if (step === 'listening') {
    const passage = listenPassages[currentIdx];
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep('welcome')} className="text-slate-500">
            <ArrowLeft className="mr-2" size={16} /> Back
          </Button>
          <div className="text-sm font-bold text-blue-600">Listening Section {currentIdx + 1}/{listenPassages.length}</div>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progress()}%` }} />
        </div>
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Volume2 className="text-blue-600" />
            <h2 className="text-xl font-bold">{passage.title}</h2>
          </div>
          <ListeningPlayer audioUrl={passage.questions[0].audioUrl} />
          <div className="space-y-8 mt-8">
            {passage.questions.map((q: any, qIdx: number) => (
              <div key={q.id} className="space-y-4">
                <p className="text-lg font-medium text-slate-900">{qIdx + 1}. {q.question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt: string, oIdx: number) => (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswer(q.id, oIdx)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        answers[q.id] === oIdx ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-6">
            <Button 
              onClick={() => {
                if (currentIdx < listenPassages.length - 1) setCurrentIdx(prev => prev + 1);
                else setStep('reading');
              }}
              disabled={Object.keys(answers).length < (currentIdx + 1) * 2} // Assume 2 questions per passage
              className="px-6"
            >
              {currentIdx < listenPassages.length - 1 ? 'Next Passage' : 'Start Reading'} <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'reading') {
    const passage = readPassages[currentIdx];
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep('listening')} className="text-slate-500">
            <ArrowLeft className="mr-2" size={16} /> Back
          </Button>
          <div className="text-sm font-bold text-blue-600">Reading Section {currentIdx + 1}/{readPassages.length}</div>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progress()}%` }} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-slate-50 border-slate-200 sticky top-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">{passage.title}</h2>
            <p className="text-lg leading-relaxed text-slate-800 font-medium" lang="ko-KR">{passage.content}</p>
          </Card>
          <div className="space-y-8">
            {passage.questions.map((q: any, qIdx: number) => (
              <div key={q.id} className="space-y-4">
                <p className="text-lg font-medium text-slate-900">{qIdx + 1}. {q.question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt: string, oIdx: number) => (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswer(q.id, oIdx)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        answers[q.id] === oIdx ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-6">
              <Button 
                onClick={() => {
                  if (currentIdx < readPassages.length - 1) setCurrentIdx(prev => prev + 1);
                  else setStep('writing');
                }}
                className="px-6"
              >
                {currentIdx < readPassages.length - 1 ? 'Next Passage' : 'Proceed to Writing'} <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'writing') {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep('reading')} className="text-slate-500">
            <ArrowLeft className="mr-2" size={16} /> Back
          </Button>
          <div className="text-sm font-bold text-blue-600">Writing Section</div>
        </div>
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <PenTool className="text-blue-600" />
            <h2 className="text-xl font-bold">{writingPrompt?.title}</h2>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800 space-y-2">
            <p><strong>Instructions:</strong> {writingPrompt?.instruction}</p>
            <p><strong>Context:</strong> {writingPrompt?.context}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Your Response</label>
            <textarea
              className="w-full h-64 p-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-0 transition-all outline-none"
              placeholder="Write your answer here..."
              value={writingAnswer}
              onChange={(e) => setWritingAnswer(e.target.value)}
            />
          </div>
          <div className="flex justify-end pt-6">
            <Button onClick={() => setStep('review')} className="px-6">
              Review All Answers <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Review Your Assessment</h1>
          <div className="text-sm text-slate-500">Please check your answers before submitting.</div>
        </div>
        <Card className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-blue-600 flex items-center gap-2">
                <Volume2 size={18} /> Listening
              </h3>
              <div className="text-sm space-y-1">
                {Object.entries(answers).filter(([k]) => k.startsWith('l')).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b py-1">
                    <span>Question {k}:</span>
                    <span className="font-bold">Option {v + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-blue-600 flex items-center gap-2">
                <BookOpen size={18} /> Reading
              </h3>
              <div className="text-sm space-y-1">
                {Object.entries(answers).filter(([k]) => k.startsWith('q')).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b py-1">
                    <span>Question {k}:</span>
                    <span className="font-bold">Option {v + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 border-t space-y-4">
            <h3 className="font-bold text-blue-600 flex items-center gap-2">
              <PenTool size={18} /> Writing
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border text-sm italic text-slate-600">
              {writingAnswer || 'No answer provided.'}
            </div>
          </div>
          <div className="flex justify-between pt-6">
            <Button variant="ghost" onClick={() => setStep('writing')}>
              <ArrowLeft className="mr-2" size={18} /> Edit Answers
            </Button>
            <Button 
              onClick={submitTest} 
              disabled={isLoading} 
              className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? <><Loader2 className="mr-2 animate-spin" size={18} /> Analyzing...</> : 'Submit Assessment'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center space-y-10 py-20">
        <div className="flex justify-center">
          <div className="p-6 bg-yellow-100 rounded-full text-yellow-600">
            <Award size={64} />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Assessment Complete!</h1>
          <div className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-2xl font-black shadow-xl">
            Predicted Level: {prediction?.level}
          </div>
          <p className="text-xl text-slate-600">
            We recommend the <span className="font-bold text-blue-600">{prediction?.label}</span> for you.
          </p>
        </div>
        <Card className="p-8 text-left bg-slate-50 border-blue-200 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <CheckCircle2 className="text-green-500" /> What this means
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Based on your performance in Listening, Reading, and Writing, your proficiency aligns with TOPIK Level {prediction?.level}. 
            Your personalized study path will focus on bridging the gap between your current level and the next milestone.
          </p>
        </Card>
        <Button 
          onClick={() => router.push('/dashboard')} 
          className="px-10 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
        >
          View My Personalized Study Path <ArrowRight className="ml-2" />
        </Button>
      </div>
    );
  }

  return null;
}
