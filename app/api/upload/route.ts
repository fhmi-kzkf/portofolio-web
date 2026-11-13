import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { saveImage } from '@/lib/upload-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Sesi berakhir. Silakan login ulang.' }, { status: 401 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);

  if (contentLength > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Ukuran gambar maksimal 6 MB.' }, { status: 413 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File gambar tidak ditemukan.' }, { status: 400 });
    }

    const url = await saveImage(file);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Gagal mengunggah gambar.' },
      { status: 400 }
    );
  }
}
