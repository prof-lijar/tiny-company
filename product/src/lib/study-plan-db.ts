import { User, authDb } from './auth-db';
import { StudyPlan, StudyTask } from './types';

// Mock storage for study plans and tasks
const plans: Record<string, StudyPlan> = {};

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
    const today = new Date();
    const examDate = new Date(date);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // We generate a fresh plan whenever the date is set
    const plan = await this.generateDailyPlan(userId, ['Grammar: -기 때문에', 'Vocab: Environment']); 
    await this.updatePlan(userId, { 
      targetExamDate: date, 
      daysRemaining: diffDays,
      ...plan 
    });
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

    // More realistic task generation
    const dailyTasks: StudyTask[] = [
      {
        id: `vocab-${today.getDate()}`,
        type: 'vocabulary',
        title: 'Review 20 SRS vocabulary words',
        completed: false,
        dueDate: today.toISOString(),
        priority: 'medium',
        targetUrl: '/vocabulary',
      },
      {
        id: `grammar-${today.getDate()}`,
        type: 'grammar',
        title: 'Study 2 new grammar patterns',
        completed: false,
        dueDate: today.toISOString(),
        priority: 'medium',
        targetUrl: '/grammar',
      },
      {
        id: `reading-${today.getDate()}`,
        type: 'reading',
        title: 'Complete 1 Reading comprehension passage',
        completed: false,
        dueDate: today.toISOString(),
        priority: 'low',
        targetUrl: '/reading',
      },
    ];

    // Add weakness-based tasks
    if (weaknesses.length > 0) {
      dailyTasks.push({
        id: `weakness-${weaknesses[0]}-${today.getDate()}`,
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
        id: `mock-test-${today.getDate()}`,
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
