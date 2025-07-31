import { NextResponse } from 'next/server';
import userService from '@/services/userServices';

export async function POST(response: NextResponse) {
  try {
    const options = await userService.clearAuthCookie();
    return response.cookies.set('token', '', options);
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}
