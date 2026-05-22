import { NextRequest, NextResponse } from 'next/server';
import { authDb } from '@/lib/auth-db';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  let email: string | undefined;
  try {
    const body = await request.json();
    email = body.email;
    const { name, password, targetLevel } = body;

    if (!name || !email || !password || !targetLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUser = await authDb.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    const user = await authDb.createUser({
      name,
      email,
      password,
      targetLevel,
    });

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    logger.error('Error during user signup', error, { route: 'POST /api/auth/signup', email });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
