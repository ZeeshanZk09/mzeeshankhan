import userService from '@/services/userServices';
import { IUser } from '@/types/userSchemaType';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const result = await userService.getCurrentUser(request);

    if (!result || result instanceof NextResponse) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const user = (await result) as Partial<IUser>;
    const userData = typeof user.toJSON === 'function' ? user.toJSON() : user;
    return NextResponse.json(userData);
  } catch (error) {
    console.error('current-user error:', {
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
      errors: (error as { errors?: unknown })?.errors,
    });
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Failed to get current user info.' }, { status: 500 });
  }
}
