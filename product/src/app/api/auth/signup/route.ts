import { NextResponse } from 'next/server';
import { authDb } from '@/lib/auth-db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, targetLevel } = body;

    if (!name || !email || !password || !targetLevel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await authDb.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await authDb.createUser({
      name,
      email,
      password,
      targetLevel: targetLevel as any,
    });

    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
