// /app/api/auth/sign-up/route.ts
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@/lib/constants';
import User from '@/models/User';
import { IUser } from '@/types/userSchemaType';
import generateAccessAndRefreshTokens from '@/utils/generateToken';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, username, email, password, profilePic, coverPic, phone } = body;

    // ✅ Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // ✅ Prepare user object
    const userData: Partial<IUser> = {
      firstName,
      lastName,
      username,
      email,
      password,
      isAdmin: false,
    };

    if (profilePic) userData.profilePic = profilePic;

    if (coverPic) userData.coverPic = coverPic;

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      return NextResponse.json(
        {
          error: 'Server secret keys missing',
        },
        { status: 500 }
      );
    }

    // ✅ Create user
    const createdUser = await User.create(userData as IUser);
    const user = await User.findById(createdUser._id).select('-password -refreshToken');

    const tokens = await generateAccessAndRefreshTokens(user._id);

    const response = NextResponse.json({ success: true, userId: user._id }, { status: 201 });

    response.cookies.set('token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', {
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
      errors: (error as mongoose.Error.ValidationError)?.errors,
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

    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
