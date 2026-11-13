import { NextRequest, NextResponse } from 'next/server';
import {
  getSessionCookieOptions,
  isSecureRequest,
  SESSION_COOKIE,
} from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, '', {
    ...getSessionCookieOptions(isSecureRequest(request)),
    maxAge: 0,
  });

  return response;
}
