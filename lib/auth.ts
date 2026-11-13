import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export const SESSION_COOKIE = 'portfolio_admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const LOGIN_WINDOW = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;

type LoginAttempt = {
  count: number;
  resetAt: number;
};

const loginAttempts = new Map<string, LoginAttempt>();

function getSecret() {
  return process.env.AUTH_SECRET || 'development-only-secret-change-me';
}

function hash(value: string) {
  return createHash('sha256').update(value, 'utf8').digest();
}

export function verifyPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return false;
  }

  return timingSafeEqual(hash(input), hash(expected));
}

export function isPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function createSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 }),
    'utf8'
  ).toString('base64url');

  const signature = createHmac('sha256', getSecret())
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split('.');

  if (!payload || !signature) {
    return false;
  }

  const expected = createHmac('sha256', getSecret())
    .update(payload)
    .digest('base64url');

  const incomingBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    incomingBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(incomingBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    ) as { exp?: unknown };

    return typeof parsed.exp === 'number' && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export function isSecureRequest(request: NextRequest) {
  const forwardedProto = request.headers
    .get('x-forwarded-proto')
    ?.split(',')[0]
    ?.trim();

  return forwardedProto === 'https' || request.nextUrl.protocol === 'https:';
}

export function getSessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure,
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
}

export function canAttemptLogin(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);

  if (!attempt || attempt.resetAt <= now) {
    loginAttempts.delete(key);
    return true;
  }

  return attempt.count < LOGIN_MAX_ATTEMPTS;
}

export function recordFailedLogin(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);

  if (!attempt || attempt.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW });
    return;
  }

  attempt.count += 1;
}

export function clearLoginAttempts(key: string) {
  loginAttempts.delete(key);
}
