'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Calendar, TrendingUp } from 'lucide-react';
import { StudyPlan } from '@/lib/types';

interface DailyPlanProps {
  initialPlan?: StudyPlan;
}

export default function DailyPlan({ initialPlan }: DailyPlanProps) {
  const [plan, setPlan] = useState<StudyPlan | null>(initialPlan || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateInput, setDateInput] = useState('');

  useEffect(() => {
    async function fetchPlan() {
      try {
        const res = await fetch('/api/study-plan');
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setPlan(data);
        }
      } catch {
        setError('Failed to fetch study plan');
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
  }, []);

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      await fetch('/api/study-plan', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, completed }),
      });
      if (plan) {
        setPlan({
          ...plan,
          dailyTasks: plan.dailyTasks.map(t => 
            t.id === taskId ? { ...t, completed } : t
          ),
          overallProgress: plan.dailyTasks.filter(t => t.completed).length / 
            (plan.dailyTasks.length || 1) * 100
        });
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const setExamDate = async (date: string) => {
    if (!date) return;
    try {
      await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetExamDate: date }),
      });
      const res = await fetch('/api/study-plan');
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      console.error('Error setting exam date:', err);
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading your study plan...</div>;
  if (error) {
    return (
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center">
        <div className="flex justify-center mb-4">
          <Calendar className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Set Your Study Goal</h3>
        <p className="text-blue-700 mb-6">To generate a personalized plan, we need to know when your TOPIK exam is.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input 
            type="date" 
            className="px-4 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button 
            onClick={() => setExamDate(dateInput)}
            disabled={!dateInput}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Update Date
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Days Remaining</p>
            <p className="text-2xl font-bold text-gray-900">{plan?.daysRemaining} days</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg text-green-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Study Streak</p>
            <p className="text-2xl font-bold text-gray-900">{plan?.streak} days</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
            <div className="w-6 h-6 rounded-full border-2 border-purple-600 flex items-center justify-center text-xs font-bold text-purple-600">
              {Math.round(plan?.overallProgress || 0)}%
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Overall Progress</p>
            <p className="text-2xl font-bold text-gray-900">{Math.round(plan?.overallProgress || 0)}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Today&apos;s Plan</h3>
          <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="divide-y divide-gray-100">
          {plan?.dailyTasks.map((task) => (
            <div 
              key={task.id} 
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleTask(task.id, !task.completed)}
                  className="transition-transform active:scale-90"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 group-hover:text-gray-400" />
                  )}
                </button>
                <div>
                  <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {task.title}
                  </p>
                  {task.priority === 'high' && (
                    <span className="text-[10px] uppercase font-bold text-red-500 px-1.5 py-0.5 rounded bg-red-50 border border-red-100">
                      High Priority
                    </span>
                  )}
                </div>
              </div>
              <a 
                href={task.targetUrl} 
                className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
              >
                Start Now &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
