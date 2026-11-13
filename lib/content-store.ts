import { promises as fs } from 'node:fs';
import path from 'node:path';
import seedContent from '@/data/content.json';
import { siteContentSchema, siteContentSectionsSchema } from '@/lib/cms-schema';
import type { SiteContent } from '@/lib/content-types';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

const seed: SiteContent = siteContentSchema.parse(seedContent);

function isNotFound(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === 'ENOENT'
  );
}

export async function getContent(): Promise<SiteContent> {
  let raw: string;

  try {
    raw = await fs.readFile(CONTENT_FILE, 'utf8');
  } catch (error) {
    if (isNotFound(error)) {
      return structuredClone(seed);
    }
    throw error;
  }

  let json: unknown;

  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error('File data/content.json bukan JSON yang valid.');
  }

  const parsed = siteContentSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error(
      `Data CMS tidak valid: ${parsed.error.issues
        .map((issue) => `${issue.path.join('.') || 'root'} - ${issue.message}`)
        .join('; ')}`
    );
  }

  return parsed.data;
}

export async function saveContent(input: unknown): Promise<SiteContent> {
  const parsed = siteContentSchema.safeParse(input);

  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || 'root'} - ${issue.message}`)
      .join('; ');
    throw new Error(`Data CMS tidak valid: ${message}`);
  }

  await fs.mkdir(DATA_DIR, { recursive: true });

  const tempFile = `${CONTENT_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tempFile, `${JSON.stringify(parsed.data, null, 2)}\n`, 'utf8');
  await fs.rename(tempFile, CONTENT_FILE);

  return parsed.data;
}

export async function saveContentSections(input: unknown): Promise<SiteContent> {
  const parsed = siteContentSectionsSchema.safeParse(input);

  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || 'root'} - ${issue.message}`)
      .join('; ');
    throw new Error(`Data CMS tidak valid: ${message}`);
  }

  const current = await getContent();
  return saveContent({ ...current, ...parsed.data });
}
