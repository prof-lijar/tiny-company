import { NextRequest, NextResponse } from 'next/server';
import { studyPlanDb } from '@/lib/study-plan-db';
import { auth } from '@/auth';
import { logger } from '@/lib/logger';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  
  try {
    const plan = await studyPlanDb.getPlan(userId);
    if (!plan) {
      // Generate a default plan if none exists
      return NextResponse.json({ 
        error: 'No study plan found. Please set your exam date in profile.' 
      }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch (error) {
    logger.error('Error fetching study plan', error, { route: 'GET /api/study-plan', userId });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  
  try {
    const body = await request.json();
    const { targetExamDate } = body;
    
    if (!targetExamDate) {
      return NextResponse.json({ error: 'Target exam date is required' }, { status: 400 });
    }
    
    await studyPlanDb.setTargetExamDate(userId, targetExamDate);
    const updatedPlan = await studyPlanDb.getPlan(userId);
    
    return NextResponse.json(updatedPlan);
  } catch (error) {
    logger.error('Error creating study plan', error, { route: 'POST /api/study-plan', userId });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  
  try {
    const body = await request.json();
    const { taskId, completed } = body;
    
    if (!taskId || completed === undefined) {
      return NextResponse.json({ error: 'Task completion status is required' }, { status: 400 });
    }
    
    await studyPlanDb.toggleTask(userId, taskId, completed);
    const updatedPlan = await studyPlanDb.getPlan(userId);
    
    return NextResponse.json(updatedPlan);
  } catch (error) {
    logger.error('Error updating study plan task', error, { route: 'PATCH /api/study-plan', userId });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
