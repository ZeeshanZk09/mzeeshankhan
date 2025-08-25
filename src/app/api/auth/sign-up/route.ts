import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import generateAccessAndRefreshTokens from '@/utils/generateToken';
import { NextRequest, NextResponse } from 'next/server';
import { validateSignUpInput } from '@/utils/validators'; // New validation utility
import mongoose from 'mongoose';

// Cache DB connection status
let dbConnected = false;

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Validate Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Parse and validate input
    const input = await request.json();
    const validationError = validateSignUpInput(input);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // 3. Check for required environment variables early
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // 4. Connect to DB if not already connected
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
    }

    // 5. Check for existing user (optimized query)
    const existingUser = await User.findOne(
      {
        $or: [
          { email: input.email },
          { username: input.username },
          ...(input.phone ? [{ phone: input.phone }] : []),
        ],
      },
      { _id: 1 } // Only return _id for existence check
    );

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email, username or phone already exists' },
        { status: 409 } // 409 Conflict more appropriate than 400
      );
    }

    // 6. Create user (with password hashing in pre-save hook)
    const user = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      username: input.username,
      email: input.email,
      password: input.password,
      ...(input.profilePic && { profilePic: input.profilePic }),
      ...(input.coverPic && { coverPic: input.coverPic }),
      ...(input.phone && { phone: input.phone }),
      isAdmin: false,
    });

    // 7. Generate tokens
    const tokens = await generateAccessAndRefreshTokens(user._id);

    // 8. Create response without sensitive data
    const sanitizedUser = await User.findById(user._id)
      .select('-password -refreshToken -__v')
      .lean();

    const response = NextResponse.json(
      {
        success: true,
        user: sanitizedUser,
        metadata: {
          responseTime: `${Date.now() - startTime}ms`,
        },
      },
      { status: 201 }
    );

    // 9. Set secure cookies
    response.cookies.set('token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // More compatible than 'strict'
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', {
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              ...(error instanceof mongoose.Error.ValidationError && {
                validationErrors: error.errors,
              }),
            }
          : 'Unknown error',
    });

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: Object.values(error.errors).map((err) => err.message),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
