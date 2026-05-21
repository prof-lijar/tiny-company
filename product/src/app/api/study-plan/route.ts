import { NextRequest, NextResponse } from 'next/server';
import { studyPlanDb } from '@/lib/study-plan-db';

export async function GET() {
  const userId = '1'; // Mocked user ID for now
  
  try {
    const plan = await studyPlanDb.getPlan(userId);
    if (!plan) {
      // Generate a default plan if none exists
      return NextResponse.json({ 
        error: 'No study plan found. Please set your exam date in profile.' 
      }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userId = '1'; // Mocked user ID for now
  
  try {
    const body = await request.json();
    const { targetExamDate } = body;
    
    if (!targetExamDate) {
      return NextResponse.json({ error: 'Target exam date is required' }, { status: 400 });
    }
    
    await studyPlanDb.setTargetExamDate(userId, targetExamDate);
    const updatedPlan = await studyPlanDb.getPlan(userId);
    
    return NextResponse.json(updatedPlan);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const userId = '1'; // Mocked user ID for now
  
  try {
    const body = await request.json();
    const { taskId, completed } = body;
    
    if (!taskId || completed === undefined) {
      return NextResponse.json({ error: 'Task completion status is required' }, { status: 400 });
    }
    
    await studyPlanDb.toggleTask(userId, taskId, completed);
    const updatedPlan = await studyPlanDb.getPlan(userId);
    
    return NextResponse.json(updatedPlan);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
