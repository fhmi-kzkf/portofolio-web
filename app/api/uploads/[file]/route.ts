import { NextRequest, NextResponse } from 'next/server';
import { readImage } from '@/lib/upload-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  const image = await readImage(file);

  if (!image) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      'Content-Type': image.contentType,
      'Content-Length': String(image.data.length),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'",
    },
  });
}
