import { NextResponse } from 'next/server';
import User from '@/models/User';
import { compare } from 'bcryptjs'; // Directly import compare
import generateAccessAndRefreshTokens from '@/utils/generateToken';
import connectDB from '@/lib/db/connect';
import { validateSignInInput } from '@/utils/validators'; // Move validation to separate file
import { IUser } from '@/types/userSchemaType';
import mongoose, { ObjectId } from 'mongoose';

// Cache DB connection status
let dbConnected = false;

export async function POST(request: Request) {
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
    const validationError = validateSignInInput(input);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { username, email, phone, password } = input;

    // 3. Connect to DB if not already connected
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
    }

    // 4. Optimized query - only select needed fields
    const projection = {
      _id: 1,
      password: 1,
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

    // 5. Compare passwords
    const isMatch = await compare(password, user.password as string);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 6. Generate tokens
    const tokens = await generateAccessAndRefreshTokens(user._id as ObjectId);

    // 7. Create response
    const response = NextResponse.json(
      {
        success: true,
        userId: user._id,
        metadata: {
          responseTime: `${Date.now() - startTime}ms`,
        },
      },
      { status: 200 }
    );

    // 8. Set cookies
    response.cookies.set('token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error, {
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
    return NextResponse.json({ error: 'Failed to Login user' }, { status: 500 });
  }
}
