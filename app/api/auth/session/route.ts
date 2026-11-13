import { NextResponse } from 'next/server';
import { isAuthenticated, isPasswordConfigured } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      authenticated: await isAuthenticated(),
      configured: isPasswordConfigured(),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
