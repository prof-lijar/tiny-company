import { NextRequest, NextResponse } from 'next/server';
import { vocabularyDb } from '@/lib/vocabulary-db';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    const progress = await vocabularyDb.getProgress(userId);
    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching vocabulary progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
    const { wordId, state } = await req.json();
    
    if (!wordId || !state) {
      return NextResponse.json({ error: 'Word ID and state are required' }, { status: 400 });
    }
    
    await vocabularyDb.updateWordProgress(userId, wordId, state);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating vocabulary progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
