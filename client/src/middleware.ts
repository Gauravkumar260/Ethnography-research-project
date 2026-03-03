import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, importSPKI, importJWK } from 'jose';

// Helper to determine if we're using asymmetric keys or falling back to symmetric (dev mode)
const isRS256 = !!process.env.RS256_PUBLIC_KEY;

// Security Headers Setup
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.pwnedpasswords.com http://localhost:5000 https://ethnography-research-project.vercel.app;",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Apply Security Headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Define protected route patterns
  const isProtectedPath = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/thesis') || 
                          pathname.startsWith('/research') || 
                          pathname.startsWith('/admin') ||
                          pathname.startsWith('/supervisor') ||
                          pathname.startsWith('/examiner');

  if (isProtectedPath) {
    // Attempt to read the access token from cookies or Authorization header
    // Depending on your implementation, it might be stored in a cookie for Next.js SSR
    const token = request.cookies.get('accessToken')?.value || 
                  request.headers.get('authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      // Verify Token using 'jose' (Edge compatible)
      let payload;
      
      if (isRS256) {
        const publicKey = await importSPKI(process.env.RS256_PUBLIC_KEY as string, 'RS256');
        const result = await jwtVerify(token, publicKey, { algorithms: ['RS256'] });
        payload = result.payload;
      } else {
        // Fallback for dev (matches HS256 dummy implementation from Phase 2)
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dummy_private_key');
        const result = await jwtVerify(token, secret, { algorithms: ['HS256'] });
        payload = result.payload;
      }

      const userRole = payload.role as string;

      // Role-based path enforcement
      if (pathname.startsWith('/admin') && !['DEPARTMENT_ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      if (pathname.startsWith('/supervisor') && !['SUPERVISOR', 'DEPARTMENT_ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      if (pathname.startsWith('/examiner') && userRole !== 'EXAMINER') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return response;
}

export const config = {
  // Matcher for paths to run middleware on (avoids running on static assets)
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets/|.*\.svg$).*)',
  ],
};
