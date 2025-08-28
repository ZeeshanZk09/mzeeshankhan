import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import { IUser } from '@/types/userSchemaType';
import { validateForgotPasswordInput } from '@/utils/validators';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

let dbConnected = false;

export default async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const input = await request.json();

    const validationError = validateForgotPasswordInput(input);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { username, email, phone } = input;

    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
    }

    const projection = {
      _id: 1,
      username: 1,
      email: 1,
      phone: 1,
    };

    const user = await User.findOne(
      {
        $or: [email ? { email } : null, username ? { username } : null, phone ?? { phone }].filter(
          Boolean
        ), // Remove undefined conditions
      },
      projection
    ).lean<Partial<IUser>>(); // Use lean() for faster plain JS object

    if (!user) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }
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
