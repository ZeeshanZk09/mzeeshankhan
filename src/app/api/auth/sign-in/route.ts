import { NextResponse } from 'next/server';
import User from '@/models/User';
import userService from '@/services/userServices';
import { IUser } from '@/types/userSchemaType';
import generateAccessAndRefreshTokens from '@/utils/generateToken';
import mongoose from 'mongoose';
import connectDB from '@/lib/db/connect';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { username, email, password, phone } = await request.json();

    if ((!username && !email && !phone) || !password) {
      return NextResponse.json(
        { error: 'Email or username and password are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const user: IUser | null = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await userService.comparePasswords(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const tokens = await generateAccessAndRefreshTokens(user._id);

    const response = NextResponse.json(
      { success: true, userId: user._id },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    response.cookies.set('token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Login error:', {
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
