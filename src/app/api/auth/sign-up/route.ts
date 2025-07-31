import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@/lib/constants';
import User from '@/models/User';
import userService from '@/services/userServices';
import { IUser } from '@/types/userSchemaType';
import generateAccessAndRefreshTokens from '@/utils/generateToken';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // const profilePic = formData.get('profilePic') as File | null;
    // const coverPic = formData.get('coverPic') as File | null;

    // Check if user exists
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
      // profilePic: profilePicUrl || undefined,
      // coverPic: coverPicUrl || undefined,
      isAdmin: false,
    };

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      return NextResponse.json({
        error: 'ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET  is not defined',
        status: 500,
      });
    }

    const createdUser = await User.create(userData as IUser);

    const user = await User.findById(createdUser._id).select('-password -refreshToken');
    const tokens = await generateAccessAndRefreshTokens(user._id);

    const response = NextResponse.json(
      { success: true, userId: user._id },
      {
        status: 201,
      }
    );

    response.cookies.set('token', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Registration error:', {
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
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
