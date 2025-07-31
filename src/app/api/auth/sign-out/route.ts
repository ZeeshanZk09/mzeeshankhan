import { NextResponse } from 'next/server';
import userService from '@/services/userServices';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logout successful' });
    const options = await userService.clearAuthCookie();
    response.cookies.set('token', '', options); // remove the token
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
