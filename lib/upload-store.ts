import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads');
const MAX_SIZE = 6 * 1024 * 1024;

const IMAGE_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

const CONTENT_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
};

export async function saveImage(file: File): Promise<string> {
  const extension = IMAGE_TYPES[file.type];

  if (!extension) {
    throw new Error('Format gambar harus PNG, JPG, WEBP, GIF, atau AVIF.');
  }

  if (file.size > MAX_SIZE) {
    throw new Error('Ukuran gambar maksimal 6 MB.');
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const fileName = `${Date.now().toString(36)}-${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);

  return `/api/uploads/${fileName}`;
}

export async function readImage(
  fileName: string
): Promise<{ data: Buffer; contentType: string } | null> {
  if (!/^[a-zA-Z0-9._-]+$/.test(fileName)) {
    return null;
  }

  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  const contentType = CONTENT_TYPES[extension];

  if (!contentType) {
    return null;
  }

  try {
    const data = await fs.readFile(path.join(UPLOAD_DIR, fileName));
    return { data, contentType };
  } catch {
    return null;
  }
}
