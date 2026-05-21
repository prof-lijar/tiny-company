import { User, authDb } from './auth-db';
import { StudyPlan, StudyTask } from './types';

// Mock storage for study plans and tasks
const plans: Record<string, StudyPlan> = {};
const tasks: Record<string, StudyTask[]> = {};

export const studyPlanDb = {
  async getPlan(userId: string): Promise<StudyPlan | null> {
    return plans[userId] || null;
  },

  async updatePlan(userId: string, updates: Partial<StudyPlan>): Promise<StudyPlan> {
    const currentPlan = plans[userId] || {
      userId,
      targetExamDate: '',
      daysRemaining: 0,
      overallProgress: 0,
      dailyTasks: [],
      streak: 0,
    };
    
    const updatedPlan = { ...currentPlan, ...updates };
    plans[userId] = updatedPlan;
    return updatedPlan;
  },

  async setTargetExamDate(userId: string, date: string): Promise<void> {
    const plan = await this.updatePlan(userId, { targetExamDate: date });
    
    // Recalculate days remaining
    const today = new Date();
    const examDate = new Date(date);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    await this.updatePlan(userId, { daysRemaining: diffDays });
  },

  async toggleTask(userId: string, taskId: string, completed: boolean): Promise<void> {
    const plan = plans[userId];
    if (!plan) return;

    const task = plan.dailyTasks.find(t => t.id === taskId);
    if (task) {
      task.completed = completed;
    }
    
    // Update overall progress
    const totalTasks = plan.dailyTasks.length;
    const completedTasks = plan.dailyTasks.filter(t => t.completed).length;
    plan.overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  },

  async generateDailyPlan(userId: string, weaknesses: string[] = []): Promise<StudyPlan> {
    // In a real app, this a complex algorithm
    // For now, we implement a realistic mock generator that simulates the dynamic nature
    const today = new Date();
    const targetDate = plans[userId]?.targetExamDate || '';
    
    if (!targetDate) {
      return {
        userId,
        targetExamDate: '',
        daysRemaining: 0,
        overallProgress: 0,
        dailyTasks: [],
        streak: 0,
      };
    }

    const dailyTasks: StudyTask[] = [
      {
        id: 'vocab-1',
        type: 'vocabulary',
        title: 'Review 20 new vocabulary words',
        completed: false,
        dueDate: today.toISOString(),
        priority: 'medium',
        targetUrl: '/vocabulary',
      },
      {
        id: 'grammar-1',
        type: 'grammar',
        title: 'Study 2 new grammar patterns',
        completed: false,
        dueDate: today.toISOString(),
        priority: 'medium',
        targetUrl: '/grammar',
      },
    ];

    // Add weakness-based tasks
    if (weaknesses.length > 0) {
      dailyTasks.push({
        id: `weakness-${weaknesses[0]}`,
        type: 'reading',
        title: `Focused practice: ${weaknesses[0]}`,
        completed: false,
        dueDate: today.toISOString(),
        priority: 'high',
        targetUrl: `/reading`,
      });
    }

    // Schedule mock tests on Sundays
    if (today.getDay() === 0) {
      dailyTasks.push({
        id: 'mock-test-1',
        type: 'mock-test',
        title: 'Full Mock Test Simulator',
        completed: false,
        dueDate: today.toISOString(),
        priority: 'high',
        targetUrl: '/mock-test',
      });
    }

    const currentPlan = plans[userId] || { userId, targetExamDate: '', daysRemaining: 0, overallProgress: 0, dailyTasks: [], streak: 0 };
    return {
      ...currentPlan,
      dailyTasks,
    };
  }
};
