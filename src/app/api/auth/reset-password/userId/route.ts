import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import userService from '@/services/userServices';
import { IUser } from '@/types/userSchemaType';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

let dbConnected = false;

export default async function PATCH(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const input = await request.json();

    const { password } = input;

    const result = await userService.getCurrentUser(request);

    if (!result || result instanceof NextResponse) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const user = result as Partial<IUser>;
    const userData = typeof user.toJSON === 'function' ? user.toJSON() : user;

    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
    }

    const userWithUpdatedPassword: IUser | null = await User.findByIdAndUpdate(
      userData?._id,
      password
    );
    return NextResponse.json(
      {
        success: 'Password updated successfully',
        userId: userWithUpdatedPassword?._id || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error, {
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
    return NextResponse.json({ error: 'Failed to find user' }, { status: 500 });
  }
}
