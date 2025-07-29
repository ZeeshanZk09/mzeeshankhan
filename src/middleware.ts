import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
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
];

export const config = {
  matcher: [
    // Match all paths except the specified ones
    '/((?!_next/static|_next/image|favicon\\.ico|images/|models/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|glb|gltf)$|fonts/|api/trpc).*)',
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => {
    const regex = new RegExp(`^${route}$`.replace('*', '.*'));
    return regex.test(pathname);
  });

  // Skip middleware for public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = request.cookies.get('auth-token')?.value;

  // If no token and route is not public, redirect to login
  if (!token) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
