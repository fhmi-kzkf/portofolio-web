import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getContent, saveContent, saveContentSections } from '@/lib/content-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Gagal membaca konten.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Sesi berakhir. Silakan login ulang.' }, { status: 401 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);

  if (contentLength > 2_000_000) {
    return NextResponse.json({ error: 'Ukuran konten terlalu besar.' }, { status: 413 });
  }

  try {
    const body = await request.json();
    const content =
      body && typeof body === 'object' && 'sections' in body
        ? await saveContentSections((body as { sections: unknown }).sections)
        : await saveContent(body);
    return NextResponse.json(content, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Gagal menyimpan konten.' },
      { status: 400 }
    );
  }
}
