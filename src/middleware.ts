import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_SECRET } from './lib/constants';
import { jwtVerify } from 'jose';

// ✅ What is allowed?
// Reading cookies

// Redirects

// Adding headers

// Verifying JWTs (use jose instead of jsonwebtoken)

// Basic string/URL logic

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/projects',
  '/services',
  '/testimonials',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/api/auth/.*',
  '/api/contact',
  '/api/verify-recaptcha',
];

export const config = {
  matcher: [
    // Match all paths except the specified ones
    '/((?!_next/static|_next/image|favicon\\.ico|images/|models/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|glb|gltf)$|fonts/|api/trpc).*)',
  ],
};
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const isPublic = PUBLIC_ROUTES.some((route) => {
    const regex = new RegExp(`^${route}$`.replace('*', '.*'));
    return regex.test(pathname);
  });

  if (isPublic) return response;

  const token =
    request.cookies.get('token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(ACCESS_TOKEN_SECRET));
    response.headers.set('x-user-id', payload._id as string);
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });
    return response;
  } catch (e) {
    console.log('Error while', e);
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
}
