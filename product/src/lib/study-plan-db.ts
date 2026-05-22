import { createClient } from '@/lib/supabase/server';
import { StudyPlan, StudyTask } from './types';

export const studyPlanDb = {
  async getPlan(userId: string): Promise<StudyPlan | null> {
    const supabase = await createClient();
    
    const { data: plan, error: planError } = await supabase
      .from('study_plans')
      .select('*, study_tasks(*)')
      .eq('user_id', userId)
      .single();

    if (planError && planError.code !== 'PGRST116') {
      console.error('Error fetching study plan:', planError);
      throw planError;
    }

    if (!plan) return null;

    const tasks = (plan.study_tasks as any[]) || [];

    return {
      userId: plan.user_id,
      targetExamDate: plan.target_exam_date || '',
      daysRemaining: plan.days_remaining,
      overallProgress: plan.overall_progress,
      streak: plan.streak,
      dailyTasks: tasks.map(t => ({
        id: t.id,
        type: t.type as any,
        title: t.title,
        completed: t.completed,
        dueDate: t.due_date || '',
        priority: t.priority as any,
        targetUrl: t.target_url,
      })),
    };
  },

  async updatePlan(userId: string, updates: Partial<StudyPlan>): Promise<StudyPlan> {
    const supabase = await createClient();
    
    const payload: any = {
      user_id: userId,
      updated_at: new Date().toISOString(),
    };

    if (updates.targetExamDate !== undefined) payload.target_exam_date = updates.targetExamDate;
    if (updates.daysRemaining !== undefined) payload.days_remaining = updates.daysRemaining;
    if (updates.overallProgress !== undefined) payload.overall_progress = updates.overallProgress;
    if (updates.streak !== undefined) payload.streak = updates.streak;

    const { error } = await supabase
      .from('study_plans')
      .upsert(payload, { onConflict: 'user_id' });

    if (error) {
      console.error('Error updating study plan:', error);
      throw error;
    }

    const fullPlan = await this.getPlan(userId);
    return fullPlan || { userId, targetExamDate: '', daysRemaining: 0, overallProgress: 0, dailyTasks: [], streak: 0 };
  },

  async setTargetExamDate(userId: string, date: string): Promise<void> {
    const today = new Date();
    const examDate = new Date(date);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Generate daily tasks first to ensure they exist
    await this.generateDailyPlan(userId, ['Grammar: -가 런에']); 
    
    await this.updatePlan(userId, { 
      targetExamDate: date, 
      daysRemaining: diffDays,
    });
  },

  async toggleTask(userId: string, taskId: string, completed: boolean): Promise<void> {
    const supabase = await createClient();
    
    const { error: taskError } = await supabase
      .from('study_tasks')
      .update({ completed })
      .eq('id', taskId);

    if (taskError) {
      console.error('Error toggling task:', taskError);
      throw taskError;
    }

    // Note: overall_progress is now automatically updated via PostgreSQL trigger tr_update_study_plan_progress
  },

  async generateDailyPlan(userId: string, weaknesses: string[] = []): Promise<StudyPlan> {
    const supabase = await createClient();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Ensure plan exists
    const { data: planData } = await supabase
      .from('study_plans')
      .select('id')
      .eq('user_id', userId)
      .single();

    let planId = planData?.id;
    if (!planId) {
      const { data: newPlan } = await supabase
        .from('study_plans')
        .insert({ user_id: userId })
        .select('id')
        .single();
      planId = newPlan?.id;
    }

    if (!planId) throw new Error('Could not find or create study plan');

    // Define tasks
    const dailyTasks: StudyTask[] = [
      {
        id: `vocab-${today.getDate()}`,
        type: 'vocabulary',
        title: 'Review 20 SRS vocabulary words',
        completed: false,
        dueDate: todayStr,
        priority: 'medium',
        targetUrl: '/vocabulary',
      },
      {
        id: `grammar-${today.getDate()}`,
        type: 'grammar',
        title: 'Study 2 new grammar patterns',
        completed: false,
        dueDate: todayStr,
        priority: 'medium',
        targetUrl: '/grammar',
      },
      {
        id: `reading-${today.getDate()}`,
        type: 'reading',
        title: 'Complete 1 Reading comprehension passage',
        completed: false,
        dueDate: todayStr,
        priority: 'low',
        targetUrl: '/reading',
      },
    ];

    if (weaknesses.length > 0) {
      dailyTasks.push({
        id: `weakness-${weaknesses[0]}-${today.getDate()}`,
        type: 'reading',
        title: `Focused practice: ${weaknesses[0]}`,
        completed: false,
        dueDate: todayStr,
        priority: 'high',
        targetUrl: `/reading`,
      });
    }

    if (today.getDay() === 0) {
      dailyTasks.push({
        id: `mock-test-${today.getDate()}`,
        type: 'mock-test',
        title: 'Full Mock Test Simulator',
        completed: false,
        dueDate: todayStr,
        priority: 'high',
        targetUrl: '/mock-test',
      });
    }

    // Convert to database format
    const dbTasks = dailyTasks.map(t => ({
      type: t.type,
      title: t.title,
      completed: t.completed,
      due_date: t.dueDate,
      priority: t.priority,
      target_url: t.targetUrl,
    }));

    // Use RPC to ensure atomic delete and insert in a single transaction
    const { error: rpcError } = await supabase.rpc('generate_daily_tasks', {
      p_plan_id: planId,
      p_tasks: dbTasks,
    });

    if (rpcError) {
      console.error('Error generating daily tasks via RPC:', rpcError);
      throw rpcError;
    }

    const fullPlan = await this.getPlan(userId);
    return fullPlan || { userId, targetExamDate: '', daysRemaining: 0, overallProgress: 0, dailyTasks: [], streak: 0 };
  }
};
