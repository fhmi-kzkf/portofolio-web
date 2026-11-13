'use client';

import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { Education } from '@/lib/content-types';
import {
  AdminInput,
  AdminTextarea,
  EmptyState,
  Field,
  ItemActions,
  Panel,
} from '@/components/admin/fields';
import { FormDialog } from '@/components/admin/form-dialog';
import { createId, moveItem } from '@/components/admin/utils';

type EditingEducation = {
  index: number | null;
  item: Education;
};

const emptyEducation = (): Education => ({
  id: createId('education'),
  degree: '',
  institution: '',
  year: '',
  icon: '🎓',
  description: '',
});

export function EducationEditor({
  items,
  onChange,
}: {
  items: Education[];
  onChange: (items: Education[]) => void;
}) {
  const [editing, setEditing] = useState<EditingEducation | null>(null);

  const updateDraft = (patch: Partial<Education>) => {
    setEditing((current) =>
      current ? { ...current, item: { ...current.item, ...patch } } : current
    );
  };

  const commit = () => {
    if (!editing) {
      return;
    }

    if (!editing.item.degree.trim()) {
      toast.error('Jenjang/jurusan wajib diisi.');
      return;
    }

    const next = [...items];

    if (editing.index === null) {
      next.push(editing.item);
    } else {
      next[editing.index] = editing.item;
    }

    onChange(next);
    setEditing(null);
  };

  const remove = (index: number) => {
    const education = items[index];

    if (
      window.confirm(
        `Hapus pendidikan "${education.degree}"? Perubahan mengikuti tombol Simpan.`
      )
    ) {
      onChange(items.filter((_, itemIndex) => itemIndex !== index));
    }
  };

  return (
    <>
      <Panel
        title="Pendidikan"
        description="Bisa lebih dari satu. Urutan di sini mengikuti urutan di website."
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => setEditing({ index: null, item: emptyEducation() })}
            className="bg-green-01 font-semibold text-dark-01 hover:bg-green-01/90"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Tambah pendidikan
          </Button>
        }
      >
        {items.length === 0 ? (
          <EmptyState
            title="Belum ada pendidikan"
            description="Tambahkan riwayat pendidikan yang ingin ditampilkan."
          />
        ) : (
          <div className="space-y-3">
            {items.map((education, index) => (
              <div
                key={education.id}
                className="flex flex-col gap-3 border border-white-01/10 bg-white-01/[0.02] p-3 sm:flex-row sm:items-center"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white-01/10 bg-white-01/5 text-xl">
                  {education.icon.startsWith('/') ? (
                    <img src={education.icon} alt="" className="h-7 w-7" />
                  ) : (
                    education.icon || '🎓'
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white-01">
                    {education.degree}
                  </p>
                  <p className="mt-1 text-xs text-white-01/40">
                    {[education.institution, education.year]
                      .filter(Boolean)
                      .join(' · ') || 'Tanpa institusi/tahun'}
                  </p>
                </div>
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing({ index, item: { ...education } })}
                    className="border-white-01/15 bg-transparent text-white-01/70 hover:bg-white-01/10 hover:text-white-01"
                  >
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <ItemActions
                    onUp={() => onChange(moveItem(items, index, index - 1))}
                    onDown={() => onChange(moveItem(items, index, index + 1))}
                    onDelete={() => remove(index)}
                    canUp={index > 0}
                    canDown={index < items.length - 1}
                    deleteLabel={education.degree}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <FormDialog
        open={Boolean(editing)}
        title={editing?.index === null ? 'Tambah pendidikan' : 'Edit pendidikan'}
        description="Tampil di section Education pada halaman utama."
        onClose={() => setEditing(null)}
        onSubmit={commit}
      >
        {editing && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Jenjang / jurusan">
                <AdminInput
                  autoFocus
                  value={editing.item.degree}
                  onChange={(event) => updateDraft({ degree: event.target.value })}
                  placeholder="Computer Science Student"
                />
              </Field>
              <Field label="Institusi">
                <AdminInput
                  value={editing.item.institution}
                  onChange={(event) =>
                    updateDraft({ institution: event.target.value })
                  }
                  placeholder="Nama kampus/sekolah"
                />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Tahun / periode">
                <AdminInput
                  value={editing.item.year}
                  onChange={(event) => updateDraft({ year: event.target.value })}
                  placeholder="2023 — Sekarang"
                />
              </Field>
              <Field
                label="Ikon"
                hint="Emoji atau path SVG di folder public, contoh /star.svg."
              >
                <AdminInput
                  value={editing.item.icon}
                  onChange={(event) => updateDraft({ icon: event.target.value })}
                  placeholder="🎓"
                />
              </Field>
            </div>
            <Field label="Deskripsi (opsional)">
              <AdminTextarea
                value={editing.item.description}
                onChange={(event) =>
                  updateDraft({ description: event.target.value })
                }
                placeholder="Jurusan, fokus studi, atau prestasi."
              />
            </Field>
          </>
        )}
      </FormDialog>
    </>
  );
}
