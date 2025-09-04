import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './utils/token';
import { safeLocalStorage } from './lib/redux/slices/authSlice';

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
    request.cookies.get('accessToken')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  // console.log(token);
  // ✅ Check if token is valid format (3 dot-separated parts)
  if (!token || token.split('.').length !== 3) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload, valid, error } = await verifyAccessToken(token);
    const user = safeLocalStorage.getItem('userData');
    if (typeof user !== 'object' || user === null) {
      console.log(user);
      safeLocalStorage.removeItem('userData');
    }

    if (!valid) {
      if (typeof error === 'object' && 'code' in error! && error?.code === 'ERR_JWT_EXPIRED') {
        // Try to refresh token
        const refreshResponse = await fetch(new URL('/api/auth/refresh', request.url), {
          method: 'POST',
          headers: {
            Cookie: request.headers.get('cookie') || '',
          },
        });

        if (refreshResponse.ok) {
          // Get new token from response and continue
          return NextResponse.next();
        }
      }
      const response = NextResponse.redirect(new URL('/sign-in', request.url));
      response.cookies.delete('accessToken');
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // console.log(payload);
    if (payload || typeof payload === 'object') {
      response.headers.set('x-user-id', String(payload._id));
      response.headers.set('x-user-is-admin', String(payload.isAdmin));
      // response.headers.set('x-refresh-token', String(payload.refreshToken));

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      });

      return response;
    }
    console.error('JWT verification failed:', 'Invalid payload structure');
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  } catch (e) {
    console.error('JWT verification failed:', e);
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
}
