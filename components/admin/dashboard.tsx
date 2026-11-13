'use client';

import { useEffect, useState } from 'react';
import {
  Briefcase,
  ExternalLink,
  FolderKanban,
  GraduationCap,
  Loader2,
  LogOut,
  Save,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { AdminSection, SiteContent } from '@/lib/content-types';
import { cn } from '@/lib/utils';
import { ProfileEditor } from '@/components/admin/editors/profile-editor';
import { ProjectsEditor } from '@/components/admin/editors/projects-editor';
import { ExperienceEditor } from '@/components/admin/editors/experience-editor';
import { EducationEditor } from '@/components/admin/editors/education-editor';
import { SkillsEditor } from '@/components/admin/editors/skills-editor';

const sections: {
  key: AdminSection;
  label: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    key: 'profile',
    label: 'Profil',
    description: 'Identitas, teks hero/about, dan social links.',
    icon: UserRound,
  },
  {
    key: 'projects',
    label: 'Projects',
    description: 'Kelola project yang tampil di website.',
    icon: FolderKanban,
  },
  {
    key: 'experience',
    label: 'Pengalaman',
    description: 'Pengalaman kerja, magang, freelance, dan lainnya.',
    icon: Briefcase,
  },
  {
    key: 'education',
    label: 'Pendidikan',
    description: 'Riwayat pendidikan dan institusi.',
    icon: GraduationCap,
  },
  {
    key: 'skills',
    label: 'Skills',
    description: 'Daftar keahlian beserta ikon dan deskripsi.',
    icon: Sparkles,
  },
];

export function AdminDashboard({
  initialContent,
  onLogout,
  onUnauthorized,
}: {
  initialContent: SiteContent;
  onLogout: () => void;
  onUnauthorized: () => void;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [section, setSection] = useState<AdminSection>('profile');
  const [dirtySections, setDirtySections] = useState<Set<AdminSection>>(
    () => new Set()
  );
  const dirty = dirtySections.size > 0;
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const activeSection = sections.find((item) => item.key === section) ?? sections[0];

  useEffect(() => {
    if (!dirty) {
      return;
    }

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const update = (section: AdminSection, patch: Partial<SiteContent>) => {
    setContent((current) => ({ ...current, ...patch }));
    setDirtySections((current) => new Set(current).add(section));
  };

  const save = async () => {
    if (!dirty || saving) {
      return;
    }

    setSaving(true);

    try {
      const sections: Partial<Record<AdminSection, unknown>> = {};
      dirtySections.forEach((key) => {
        sections[key] = content[key];
      });

      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      });
      const data = (await response.json()) as SiteContent & { error?: string };

      if (response.status === 401) {
        onUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Gagal menyimpan konten.');
      }

      setContent(data);
      setDirtySections(new Set());
      toast.success('Perubahan berhasil disimpan.');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Gagal menyimpan konten.'
      );
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    if (dirty && !window.confirm('Ada perubahan yang belum disimpan. Tetap keluar?')) {
      return;
    }

    setLoggingOut(true);

    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setLoggingOut(false);
      onLogout();
    }
  };

  const counts: Record<AdminSection, number | null> = {
    profile: null,
    projects: content.projects.length,
    experience: content.experience.length,
    education: content.education.length,
    skills: content.skills.length,
  };

  return (
    <div className="min-h-screen bg-dark-01 text-white-01">
      <div className="flex min-h-screen w-full">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white-01/10 p-6 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-01 text-lg font-bold text-dark-01">
              F.
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white-01/35">
                Portfolio
              </p>
              <p className="text-sm font-medium">Content Manager</p>
            </div>
          </div>

          <nav className="mt-10 space-y-1">
            {sections.map((item) => {
              const Icon = item.icon;
              const isActive = section === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSection(item.key)}
                  className={cn(
                    'flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-green-01 font-medium text-dark-01'
                      : 'text-white-01/55 hover:bg-white-01/5 hover:text-white-01'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {counts[item.key] !== null && (
                    <span
                      className={cn(
                        'text-[10px] tabular-nums',
                        isActive ? 'text-dark-01/60' : 'text-white-01/25'
                      )}
                    >
                      {counts[item.key]}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-white-01/10 pt-5">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-white-01/45 transition-colors hover:text-green-01"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Lihat website
            </a>
            <Button
              type="button"
              variant="ghost"
              onClick={logout}
              disabled={loggingOut}
              className="w-full justify-start px-2 text-xs text-white-01/45 hover:bg-white-01/5 hover:text-white-01"
            >
              {loggingOut ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-3.5 w-3.5" />
              )}
              Keluar
            </Button>
            <p className="px-2 text-[10px] leading-relaxed text-white-01/20">
              Data disimpan ke data/content.json di server.
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex flex-col gap-3 border-b border-white-01/10 bg-dark-01/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div>
              <h1 className="text-lg font-medium">{activeSection.label}</h1>
              <p
                className={cn(
                  'mt-0.5 text-xs',
                  dirty ? 'text-amber-300/80' : 'text-white-01/35'
                )}
              >
                {dirty
                  ? 'Ada perubahan yang belum disimpan.'
                  : 'Semua perubahan sudah tersimpan.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={save}
                disabled={!dirty || saving}
                className="bg-green-01 font-semibold text-dark-01 hover:bg-green-01/90 disabled:bg-green-01/30 disabled:text-dark-01/50"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {saving ? 'Menyimpan...' : 'Simpan'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={logout}
                aria-label="Keluar"
                className="text-white-01/40 hover:bg-white-01/5 hover:text-white-01 lg:hidden"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div className="flex gap-2 overflow-x-auto border-b border-white-01/10 px-4 py-3 lg:hidden">
            {sections.map((item) => {
              const Icon = item.icon;
              const isActive = section === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSection(item.key)}
                  className={cn(
                    'flex shrink-0 items-center gap-2 border px-3 py-2 text-xs transition-colors',
                    isActive
                      ? 'border-green-01 bg-green-01 font-medium text-dark-01'
                      : 'border-white-01/10 text-white-01/50'
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-5xl">
              <p className="mb-6 text-xs leading-relaxed text-white-01/30">
                {activeSection.description}
              </p>

              {section === 'profile' && (
                <ProfileEditor
                  value={content.profile}
                  onChange={(profile) => update('profile', { profile })}
                />
              )}

              {section === 'projects' && (
                <ProjectsEditor
                  items={content.projects}
                  onChange={(projects) => update('projects', { projects })}
                />
              )}

              {section === 'experience' && (
                <ExperienceEditor
                  items={content.experience}
                  onChange={(experience) => update('experience', { experience })}
                />
              )}

              {section === 'education' && (
                <EducationEditor
                  items={content.education}
                  onChange={(education) => update('education', { education })}
                />
              )}

              {section === 'skills' && (
                <SkillsEditor
                  items={content.skills}
                  onChange={(skills) => update('skills', { skills })}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
