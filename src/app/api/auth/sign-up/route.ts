import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import generateAccessAndRefreshTokens from '@/utils/generateToken';
import { NextRequest, NextResponse } from 'next/server';
import { validateSignUpInput } from '@/utils/validators'; // New validation utility
import mongoose from 'mongoose';
import { ApiError } from '@/utils/NextApiError';
import { ApiSuccess } from '@/utils/NextApiSuccess';

// Cache DB connection status
let dbConnected = false;

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Validate Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const error = ApiError.getDefaultMessage(400);
      return NextResponse.json(
        { error, details: 'Invalid content type' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Parse and validate input
    const input = await request.json();
    const validationError = validateSignUpInput(input);
    if (validationError) {
      const error = ApiError.getDefaultMessage(400);
      return NextResponse.json({ error, details: validationError }, { status: 400 });
    }

    // 3. Check for required environment variables early
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      const error = ApiError.getDefaultMessage(500);
      return NextResponse.json({ error }, { status: 500 });
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
      { email: 1, username: 1, phone: 1 }
    );

    if (existingUser) {
      const conflictingFields = [];

      if (existingUser.email === input.email) {
        conflictingFields.push('email');
      }
      if (existingUser.username === input.username) {
        conflictingFields.push('username');
      }
      if (input.phone && existingUser.phone === input.phone) {
        conflictingFields.push('phone');
      }

      let errorMessage;
      if (conflictingFields.length === 1) {
        errorMessage = `User with this ${conflictingFields[0]} already exists`;
      } else {
        errorMessage = `User with this ${conflictingFields.join(', ')} already exists`;
      }
      const error = ApiError.getDefaultMessage(409);

      return NextResponse.json(
        {
          error: errorMessage,
          details: error,
          conflictingFields,
        },
        { status: 409 }
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

    const response = ApiSuccess.created(
      {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phone: user.phone,
          password: user.password,
          profilePic: user.profilePic,
          coverPic: user.coverPic,
        },
      },
      { responseTime: `${Date.now() - startTime}ms` }
    );

    return response.toNextResponse().cookies.set('token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // More compatible than 'strict'
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });
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

    if (error instanceof ApiError) {
      const errorFromApi = ApiError.getDefaultMessage(error.statusCode);

      return NextResponse.json(
        {
          error: errorFromApi,
          details: Object.values(error.errors as Record<string, mongoose.Error.ValidatorError>).map(
            (err) => err.message
          ),
        },
        { status: error.statusCode, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
