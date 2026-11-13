import { z } from 'zod';
import type { SiteContent } from './content-types';

const localizedSchema = z.object({
  en: z.string(),
  id: z.string(),
});

const socialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Nama sosial wajib diisi'),
  url: z.string().min(1, 'URL sosial wajib diisi'),
});

const profileSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  roles: z.array(z.string()),
  photoUrl: z.string(),
  heroDescription: localizedSchema,
  aboutGreeting: localizedSchema,
  aboutContent: localizedSchema,
  socials: z.array(socialSchema),
});

const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Judul project wajib diisi'),
  description: z.string(),
  tags: z.array(z.string()),
  image: z.string(),
  githubUrl: z.string(),
  demoUrl: z.string(),
});

const experienceSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1, 'Posisi wajib diisi'),
  company: z.string(),
  period: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  url: z.string(),
});

const educationSchema = z.object({
  id: z.string().min(1),
  degree: z.string().min(1, 'Jenjang/jurusan wajib diisi'),
  institution: z.string(),
  year: z.string(),
  icon: z.string(),
  description: z.string(),
});

const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Nama skill wajib diisi'),
  tag1: z.string(),
  tag2: z.string(),
  icon: z.string(),
  description: z.string(),
});

export const siteContentSchema: z.ZodType<SiteContent> = z.object({
  version: z.literal(1),
  profile: profileSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
});

export const siteContentSectionsSchema = z
  .object({
    profile: profileSchema.optional(),
    experience: z.array(experienceSchema).optional(),
    education: z.array(educationSchema).optional(),
    skills: z.array(skillSchema).optional(),
    projects: z.array(projectSchema).optional(),
  })
  .strict();
