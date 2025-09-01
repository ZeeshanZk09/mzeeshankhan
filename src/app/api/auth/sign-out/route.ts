import { NextResponse } from 'next/server';
import userService from '@/services/userServices';
import mongoose from 'mongoose';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { ApiError } from '@/utils/NextApiError';

export async function POST() {
  const startTime = Date.now();
  try {
    const response = NextResponse.json({ message: 'Logout successfully' });
    const options = await userService.clearAuthCookie();
    response.cookies.set('token', '', options as Partial<ResponseCookie>); // remove the token
    return response;
  } catch (error) {
    console.error('Logout error:', {
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

    return NextResponse.json({ error: 'Failed to logout user' }, { status: 500 });
  }
}
