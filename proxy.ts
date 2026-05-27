import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (use Redis/Upstash in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 1000;    // Increased significantly for development

function getIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // blocked
  }

  entry.count++;
  return true; // allowed
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Security headers for all responses
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self' https://*.supabase.co",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com ws://* wss://*",
      "frame-src https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; ')
  );

  // Rate limiting for sensitive paths
  const sensitiveRoutes = ['/api/', '/staff', '/login', '/order', '/reservations'];
  const isSensitive = sensitiveRoutes.some(r => pathname.startsWith(r));

  if (isSensitive) {
    const ip = getIp(request);
    const allowed = rateLimit(ip);

    if (!allowed) {
      return new NextResponse('Too many requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  // Block obviously malicious patterns
  const blockedPatterns = [
    /\.\./,        // path traversal
    /<script/i,    // XSS in URL
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /union\s+select/i, // SQL injection
    /drop\s+table/i,
    /exec\s*\(/i,
    /base64/i,
    /eval\s*\(/i,
  ];

  const fullUrl = request.nextUrl.pathname + request.nextUrl.search;
  for (const pattern of blockedPatterns) {
    if (pattern.test(decodeURIComponent(fullUrl))) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Protect staff dashboard – require auth session cookie
  if (pathname.startsWith('/staff')) {
    const supabaseAuth = request.cookies.get('sb-access-token') ||
      request.cookies.getAll().some(c => c.name.includes('auth-token') && c.value);

    // In demo mode (no Supabase), allow access
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isDemo = !supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL';

    if (!isDemo && !supabaseAuth) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|public/).*)',
  ],
};