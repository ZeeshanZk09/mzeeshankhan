import connectDB from '@/lib/db/connect';
import User from '@/models/User';
import generateAccessAndRefreshTokens from '@/utils/generateToken';
import { NextRequest, NextResponse } from 'next/server';
import { validateSignUpInput } from '@/utils/validators';
import mongoose from 'mongoose';
import { ApiError } from '@/utils/NextApiError';
import { ApiSuccess } from '@/utils/NextApiSuccess';
import { IUser } from '@/types/userSchemaType';

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Validate Content-Type
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type', details: 'Expected application/json' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Parse JSON safely
    let input: Pick<
      IUser,
      | 'firstName'
      | 'lastName'
      | 'username'
      | 'email'
      | 'password'
      | 'phone'
      | 'profilePic'
      | 'coverPic'
    >;
    try {
      input = await request.json();
    } catch (err) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          details: {
            message: 'Unable to parse request body as JSON',
            err,
          },
        },
        { status: 400 }
      );
    }

    // 3. Validate input (custom validator)
    const validationError = validateSignUpInput(
      input as Pick<IUser, 'firstName' | 'lastName' | 'username' | 'email' | 'password' | 'phone'>
    );
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // 4. Check required env variables
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      console.error('Missing token secrets in environment');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // 5. Ensure DB connected (use mongoose connection state)
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    // 6. Check for existing user (atomic / compact query)
    const existingUser = (await User.findOne(
      {
        $or: [
          { email: input.email as string },
          { username: input.username },
          ...(input.phone ? [{ phone: input.phone }] : []),
        ],
      },
      { email: 1, username: 1, phone: 1 }
    ).lean()) as { email?: string; username?: string; phone?: string } | null;

    if (existingUser) {
      const conflictingFields: string[] = [];
      if (existingUser.email === input.email) conflictingFields.push('email');
      if (existingUser.username === input.username) conflictingFields.push('username');
      if (input.phone && existingUser.phone === input.phone) conflictingFields.push('phone');

      const message =
        conflictingFields.length === 1
          ? `User with this ${conflictingFields[0]} already exists`
          : `User with these fields already exists: ${conflictingFields.join(', ')}`;

      return NextResponse.json(
        { error: message, conflictingFields },
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 7. Create user (pre-save hook should handle password hashing)
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

    // 8. Generate tokens (access + refresh)
    const tokens = await generateAccessAndRefreshTokens(user._id);

    // 9. Build safe user payload (do NOT expose password)
    const safeUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
      coverPic: user.coverPic,
      isAdmin: user.isAdmin ?? false,
    };

    // 10. Construct ApiSuccess and NextResponse
    const responseBody = {
      user: safeUser,
    };

    const apiSuccess = new ApiSuccess(responseBody, 201, {
      responseTime: `${Date.now() - startTime}ms`,
    });

    const res = apiSuccess.toNextResponse();

    // 11. Cookie options (maxAge is in seconds)
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      path: '/',
    };

    // Access token: short lived (15 minutes)
    res.cookies.set('accessToken', tokens.accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24, // seconds
    });

    return res;
  } catch (error) {
    console.error('Registration error:', {
      timestamp: new Date().toISOString(),
      duration: `${Date.now() - startTime}ms`,
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
    });

    // Handle mongoose duplicate key race (E11000)
    type MongoDuplicateError = {
      code?: number;
      keyValue?: Record<string, unknown>;
    };
    const mongoErr = error as MongoDuplicateError;
    if (
      mongoErr &&
      typeof mongoErr === 'object' &&
      mongoErr !== null &&
      'code' in mongoErr &&
      'keyValue' in mongoErr &&
      mongoErr.code === 11000 &&
      mongoErr.keyValue
    ) {
      const conflictingFields = Object.keys(mongoErr.keyValue);
      return NextResponse.json(
        { error: 'Duplicate field error', conflictingFields, details: mongoErr.keyValue },
        { status: 409 }
      );
    }

    if (error instanceof ApiError) {
      const errorFromApi = ApiError.getDefaultMessage(error.statusCode);
      const details =
        error.errors && typeof error.errors === 'object'
          ? Object.values(error.errors as Record<string, mongoose.Error.ValidatorError>).map(
              (err) => err.message
            )
          : undefined;

      return NextResponse.json(
        { error: errorFromApi, details },
        { status: error.statusCode, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
