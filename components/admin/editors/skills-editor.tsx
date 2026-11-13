'use client';

import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { Skill } from '@/lib/content-types';
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

type EditingSkill = {
  index: number | null;
  item: Skill;
};

const emptySkill = (): Skill => ({
  id: createId('skill'),
  name: '',
  tag1: '',
  tag2: '',
  icon: '',
  description: '',
});

export function SkillsEditor({
  items,
  onChange,
}: {
  items: Skill[];
  onChange: (items: Skill[]) => void;
}) {
  const [editing, setEditing] = useState<EditingSkill | null>(null);

  const updateDraft = (patch: Partial<Skill>) => {
    setEditing((current) =>
      current ? { ...current, item: { ...current.item, ...patch } } : current
    );
  };

  const commit = () => {
    if (!editing) {
      return;
    }

    if (!editing.item.name.trim()) {
      toast.error('Nama skill wajib diisi.');
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
    const skill = items[index];

    if (
      window.confirm(
        `Hapus skill "${skill.name}"? Perubahan mengikuti tombol Simpan.`
      )
    ) {
      onChange(items.filter((_, itemIndex) => itemIndex !== index));
    }
  };

  return (
    <>
      <Panel
        title="Skills"
        description="Atur daftar keahlian, label, ikon, dan deskripsinya."
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => setEditing({ index: null, item: emptySkill() })}
            className="bg-green-01 font-semibold text-dark-01 hover:bg-green-01/90"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Tambah skill
          </Button>
        }
      >
        {items.length === 0 ? (
          <EmptyState
            title="Belum ada skill"
            description="Tambahkan keahlian yang ingin ditampilkan di section Skills."
          />
        ) : (
          <div className="space-y-3">
            {items.map((skill, index) => (
              <div
                key={skill.id}
                className="flex flex-col gap-3 border border-white-01/10 bg-white-01/[0.02] p-3 sm:flex-row sm:items-center"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white-01/10 bg-white-01/5">
                  {skill.icon.startsWith('/') ? (
                    <img src={skill.icon} alt="" className="h-7 w-7 invert" />
                  ) : (
                    <span className="text-lg">{skill.icon || '⚡'}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white-01">{skill.name}</p>
                  <p className="mt-1 text-xs text-white-01/40">
                    {[skill.tag1, skill.tag2].filter(Boolean).join(' · ')}
                  </p>
                  {skill.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-white-01/30">
                      {skill.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing({ index, item: { ...skill } })}
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
                    deleteLabel={skill.name}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <FormDialog
        open={Boolean(editing)}
        title={editing?.index === null ? 'Tambah skill' : 'Edit skill'}
        description="Tampil di section Skills pada halaman utama."
        onClose={() => setEditing(null)}
        onSubmit={commit}
      >
        {editing && (
          <>
            <Field label="Nama skill">
              <AdminInput
                autoFocus
                value={editing.item.name}
                onChange={(event) => updateDraft({ name: event.target.value })}
                placeholder="Python"
              />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Label kiri atas">
                <AdminInput
                  value={editing.item.tag1}
                  onChange={(event) => updateDraft({ tag1: event.target.value })}
                  placeholder="LANGUAGE"
                />
              </Field>
              <Field label="Label kanan atas">
                <AdminInput
                  value={editing.item.tag2}
                  onChange={(event) => updateDraft({ tag2: event.target.value })}
                  placeholder="CORE"
                />
              </Field>
            </div>
            <Field
              label="Ikon"
              hint="Path SVG di folder public (contoh /mesh.svg) atau emoji."
            >
              <AdminInput
                value={editing.item.icon}
                onChange={(event) => updateDraft({ icon: event.target.value })}
                placeholder="/mesh.svg atau ⚡"
              />
            </Field>
            <Field label="Deskripsi">
              <AdminTextarea
                value={editing.item.description}
                onChange={(event) =>
                  updateDraft({ description: event.target.value })
                }
                placeholder="Deskripsi singkat skill."
              />
            </Field>
          </>
        )}
      </FormDialog>
    </>
  );
}
