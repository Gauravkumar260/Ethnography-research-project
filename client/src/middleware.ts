import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, importSPKI } from 'jose';

// Helper to determine if we're using asymmetric keys or falling back to symmetric (dev mode)
const isRS256 = !!process.env.RS256_PUBLIC_KEY;

// Example university deadline for examiner thesis access
const SUBMISSION_DEADLINE = new Date('2026-05-01T00:00:00Z'); 

// Security Headers Setup
const getSecurityHeaders = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  return {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.pwnedpasswords.com ${apiUrl} ${appUrl} https://ethnography-research-project.vercel.app;`,
  };
};

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Apply Security Headers to all responses
  const headers = getSecurityHeaders();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Strict Origin Validation for API Routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const allowedOrigins = [process.env.NEXT_PUBLIC_APP_URL, 'http://localhost:3000'].filter(Boolean);
    
    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse(JSON.stringify({ error: 'Forbidden: Invalid Origin' }), { 
        status: 403, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
  }

  // Define protected route patterns
  const isProtectedPath = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/thesis') || 
                          pathname.startsWith('/research') || 
                          pathname.startsWith('/admin') ||
                          pathname.startsWith('/supervisor') ||
                          pathname.startsWith('/examiner');

  if (isProtectedPath) {
    const token = request.cookies.get('accessToken')?.value || 
                  request.headers.get('authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      let payload;
      
      if (isRS256) {
        const publicKey = await importSPKI(process.env.RS256_PUBLIC_KEY as string, 'RS256');
        const result = await jwtVerify(token, publicKey, { algorithms: ['RS256'] });
        payload = result.payload;
      } else {
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

      if (pathname.startsWith('/examiner')) {
        if (userRole !== 'EXAMINER') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        
        // Time-gated access constraint
        if (new Date() < SUBMISSION_DEADLINE) {
          return NextResponse.redirect(new URL('/dashboard?error=pre-release-access-denied', request.url));
        }
      }

    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.svg$).*)',
  ],
};