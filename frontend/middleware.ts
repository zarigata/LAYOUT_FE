// CODEX: Next.js Middleware for Route Protection (JWT session)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Protect dashboard routes
  if (pathname.startsWith('/teacher') || pathname.startsWith('/student') || pathname.startsWith('/admin')) {
    const token = req.cookies.get('token');
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/teacher/:path*', '/student/:path*', '/admin/:path*'],
};
