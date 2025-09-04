// src/app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createAccessToken, verifyRefreshToken } from '@/utils/token';
import { ApiError } from '@/utils/NextApiError';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || '';
    const user = await User.findById(userId).select('refreshToken');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const refreshToken = await user.refreshToken;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
    }

    // Verify refresh token
    const { valid, payload, error } = await verifyRefreshToken(refreshToken);

    if (error) {
      console.error('Refresh token verification error:', error);
      return NextResponse.json(ApiError.getDefaultMessage(401), { status: 401 });
    }

    if (!valid || !payload) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    // Create new access token
    const newAccessToken = await createAccessToken({
      _id: payload._id,
      isAdmin: payload.isAdmin,
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Token refreshed successfully',
    });

    // Set new access token in cookie
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
    });

    return response;
  } catch (error) {
    console.error('Error in /api/auth/refresh:', error);

    return NextResponse.json(ApiError.getDefaultMessage(500), { status: 500 });
  }
}
