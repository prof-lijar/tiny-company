'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Trophy, 
  BookOpen, 
  CheckCircle, 
  TrendingUp, 
  Flame, 
  Clock 
} from 'lucide-react';

// Mock data for the dashboard
const USER_STATS = {
  streak: 12,
  totalStudyTime: '42h 15m',
  vocabMastered: 450,
  vocabTotal: 1200,
  grammarCompleted: 24,
  grammarTotal: 60,
  avgReadingScore: 78,
  lastTestScore: 82,
};

const ACTIVITY_LOG = [
  { date: '2026-05-20', activity: 'Studied 20 Vocabulary words', level: 4, status: 'completed' },
  { date: '2026-05-19', activity: 'Completed Grammar Lesson: -는데', level: 3, status: 'completed' },
  { date: '2026-05-18', activity: 'Reading Practice: News Article', level: 5, status: 'completed' },
  { date: '2026-05-17', activity: 'Mock Test Section: Listening', level: 4, status: 'completed' },
];

const SCORE_TRENDS = [
  { month: 'Jan', score: 60 },
  { month: 'Feb', score: 65 },
  { month: 'Mar', score: 62 },
  { month: 'Apr', score: 70 },
  { month: 'May', score: 82 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, Learner!</h1>
          <p className="text-slate-600">Here is your TOPIK II progress overview.</p>
        </div>
        <div className="flex items-center gap-3 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold border border-orange-200">
          <Flame className="w-5 h-5" />
          <span>{USER_STATS.streak} Day Streak!</span>
        </div>
      </header>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Vocabulary" 
          value={`${USER_STATS.vocabMastered}/${USER_STATS.vocabTotal}`} 
          subtitle="Words Mastered" 
          icon={<BookOpen className="w-6 h-6 text-blue-600" />} 
          progress={(USER_STATS.vocabMastered / USER_STATS.vocabTotal) * 100}
        />
        <StatCard 
          title="Grammar" 
          value={`${USER_STATS.grammarCompleted}/${USER_STATS.grammarTotal}`} 
          subtitle="Lessons Completed" 
          icon={<CheckCircle className="w-6 h-6 text-green-600" />} 
          progress={(USER_STATS.grammarCompleted / USER_STATS.grammarTotal) * 100}
        />
        <StatCard 
          title="Avg. Reading Score" 
          value={`${USER_STATS.avgReadingScore}%`} 
          subtitle="Based on last 5 tests" 
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />} 
          progress={USER_STATS.avgReadingScore}
        />
        <StatCard 
          title="Study Time" 
          value={USER_STATS.totalStudyTime} 
          subtitle="Total time invested" 
          icon={<Clock className="w-6 h-6 text-amber-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart Simulation */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Score Progression
            </h3>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">Last 5 Months</span>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2 relative">
            {/* Simple CSS-based Bar Chart */}
            {SCORE_TRENDS.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full max-w-[40px] bg-blue-500 rounded-t-md transition-all duration-500 group-hover:bg-blue-600 relative"
                  style={{ height: `${item.score}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-slate-700">
                    {item.score}%
                  </div>
                </div>
                <span className="text-xs text-slate-500">{item.month}</span>
              </div>
            ))}
            {/* X-Axis Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-slate-200"></div>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            Your reading comprehension has improved by <span className="text-green-600 font-bold">22%</span> since January.
          </p>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {ACTIVITY_LOG.map((log, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  {i !== ACTIVITY_LOG.length - 1 && (
                    <div className="absolute top-8 left-4 w-px h-full bg-slate-200"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{log.activity}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-500">{log.date}</span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      Level {log.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-8 text-sm">
            View Full History
          </Button>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, progress }: { 
  title: string; 
  value: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  progress?: number;
}) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">
          {icon}
        </div>
        {progress !== undefined && (
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-500 mb-4">{subtitle}</div>
      {progress !== undefined && (
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-1000" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </Card>
  );
}
