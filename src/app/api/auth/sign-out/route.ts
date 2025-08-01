import { NextResponse } from 'next/server';
import userService from '@/services/userServices';
import mongoose from 'mongoose';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logout successful' });
    const options = await userService.clearAuthCookie();
    response.cookies.set('token', '', options); // remove the token
    return response;
  } catch (error) {
    console.error('Logout error:', {
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
    return NextResponse.json({ error: 'Failed to Logout user' }, { status: 500 });
  }
}
