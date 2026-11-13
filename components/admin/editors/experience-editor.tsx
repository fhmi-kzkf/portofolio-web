'use client';

import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { Experience } from '@/lib/content-types';
import {
  AdminInput,
  AdminTextarea,
  EmptyState,
  Field,
  ItemActions,
  Panel,
  TagsField,
} from '@/components/admin/fields';
import { FormDialog } from '@/components/admin/form-dialog';
import { createId, moveItem } from '@/components/admin/utils';

type EditingExperience = {
  index: number | null;
  item: Experience;
};

const emptyExperience = (): Experience => ({
  id: createId('experience'),
  role: '',
  company: '',
  period: '',
  description: '',
  tags: [],
  url: '',
});

export function ExperienceEditor({
  items,
  onChange,
}: {
  items: Experience[];
  onChange: (items: Experience[]) => void;
}) {
  const [editing, setEditing] = useState<EditingExperience | null>(null);

  const updateDraft = (patch: Partial<Experience>) => {
    setEditing((current) =>
      current ? { ...current, item: { ...current.item, ...patch } } : current
    );
  };

  const commit = () => {
    if (!editing) {
      return;
    }

    if (!editing.item.role.trim()) {
      toast.error('Posisi/role wajib diisi.');
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
    const experience = items[index];

    if (
      window.confirm(
        `Hapus pengalaman "${experience.role}"? Perubahan mengikuti tombol Simpan.`
      )
    ) {
      onChange(items.filter((_, itemIndex) => itemIndex !== index));
    }
  };

  return (
    <>
      <Panel
        title="Pengalaman"
        description="Section Experience otomatis muncul di website setelah ada minimal satu pengalaman."
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => setEditing({ index: null, item: emptyExperience() })}
            className="bg-green-01 font-semibold text-dark-01 hover:bg-green-01/90"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Tambah pengalaman
          </Button>
        }
      >
        {items.length === 0 ? (
          <EmptyState
            title="Belum ada pengalaman"
            description="Tambahkan pengalaman kerja, magang, organisasi, freelance, atau kontribusi lainnya."
          />
        ) : (
          <div className="space-y-3">
            {items.map((experience, index) => (
              <div
                key={experience.id}
                className="flex flex-col gap-3 border border-white-01/10 bg-white-01/[0.02] p-3 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white-01">
                    {experience.role}
                  </p>
                  <p className="mt-1 text-xs text-white-01/40">
                    {[experience.company, experience.period]
                      .filter(Boolean)
                      .join(' · ') || 'Tanpa perusahaan/periode'}
                  </p>
                  {experience.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-white-01/30">
                      {experience.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setEditing({ index, item: { ...experience } })
                    }
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
                    deleteLabel={experience.role}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <FormDialog
        open={Boolean(editing)}
        title={editing?.index === null ? 'Tambah pengalaman' : 'Edit pengalaman'}
        description="Tampil di section Experience pada halaman utama."
        onClose={() => setEditing(null)}
        onSubmit={commit}
      >
        {editing && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Posisi / role">
                <AdminInput
                  autoFocus
                  value={editing.item.role}
                  onChange={(event) => updateDraft({ role: event.target.value })}
                  placeholder="AI Engineer"
                />
              </Field>
              <Field label="Perusahaan / organisasi">
                <AdminInput
                  value={editing.item.company}
                  onChange={(event) => updateDraft({ company: event.target.value })}
                  placeholder="Nama perusahaan"
                />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Periode">
                <AdminInput
                  value={editing.item.period}
                  onChange={(event) => updateDraft({ period: event.target.value })}
                  placeholder="2024 — Sekarang"
                />
              </Field>
              <Field label="Link (opsional)">
                <AdminInput
                  value={editing.item.url}
                  onChange={(event) => updateDraft({ url: event.target.value })}
                  placeholder="https://..."
                />
              </Field>
            </div>
            <Field label="Deskripsi">
              <AdminTextarea
                value={editing.item.description}
                onChange={(event) => updateDraft({ description: event.target.value })}
                placeholder="Ceritakan peran, tanggung jawab, atau pencapaian."
              />
            </Field>
            <TagsField
              label="Tags"
              value={editing.item.tags}
              onChange={(tags) => updateDraft({ tags })}
              hint="Contoh: Python, Leadership, Data Pipeline"
            />
          </>
        )}
      </FormDialog>
    </>
  );
}
