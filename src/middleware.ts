import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

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
  '/api/upload',
];

export const config = {
  matcher: [
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
  // console.log(token);
  // ✅ Check if token is valid format (3 dot-separated parts)
  if (!token || token.split('.').length !== 3) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );
    // console.log(payload);

    response.headers.set('x-user-id', String(payload._id));
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (e) {
    console.error('JWT verification failed:', e);
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
}
