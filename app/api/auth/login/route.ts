import { NextRequest, NextResponse } from 'next/server';
import {
  canAttemptLogin,
  clearLoginAttempts,
  createSessionToken,
  getSessionCookieOptions,
  isPasswordConfigured,
  isSecureRequest,
  recordFailedLogin,
  SESSION_COOKIE,
  verifyPassword,
} from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!isPasswordConfigured()) {
    return NextResponse.json(
      { error: 'Login belum dikonfigurasi. Set ADMIN_PASSWORD di server.' },
      { status: 500 }
    );
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientKey = forwardedFor?.split(',')[0]?.trim() || 'local';

  if (!canAttemptLogin(clientKey)) {
    return NextResponse.json(
      { error: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.' },
      { status: 429 }
    );
  }

  let password = '';

  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return NextResponse.json({ error: 'Permintaan tidak valid.' }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    recordFailedLogin(clientKey);
    return NextResponse.json({ error: 'Password salah.' }, { status: 401 });
  }

  clearLoginAttempts(clientKey);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    SESSION_COOKIE,
    createSessionToken(),
    getSessionCookieOptions(isSecureRequest(request))
  );

  return response;
}
