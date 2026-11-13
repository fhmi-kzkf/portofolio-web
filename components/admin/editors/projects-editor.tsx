'use client';

import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/content-types';
import {
  AdminInput,
  AdminTextarea,
  EmptyState,
  Field,
  ImageField,
  ItemActions,
  Panel,
  TagsField,
} from '@/components/admin/fields';
import { FormDialog } from '@/components/admin/form-dialog';
import { createId, moveItem } from '@/components/admin/utils';

type EditingProject = {
  index: number | null;
  item: Project;
};

const emptyProject = (): Project => ({
  id: createId('project'),
  title: '',
  description: '',
  tags: [],
  image: '',
  githubUrl: '',
  demoUrl: '',
});

export function ProjectsEditor({
  items,
  onChange,
}: {
  items: Project[];
  onChange: (items: Project[]) => void;
}) {
  const [editing, setEditing] = useState<EditingProject | null>(null);

  const updateDraft = (patch: Partial<Project>) => {
    setEditing((current) =>
      current ? { ...current, item: { ...current.item, ...patch } } : current
    );
  };

  const commit = () => {
    if (!editing) {
      return;
    }

    if (!editing.item.title.trim()) {
      toast.error('Judul project wajib diisi.');
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
    const project = items[index];

    if (
      window.confirm(`Hapus project "${project.title}"? Perubahan mengikuti tombol Simpan.`)
    ) {
      onChange(items.filter((_, itemIndex) => itemIndex !== index));
    }
  };

  return (
    <>
      <Panel
        title="Projects"
        description="Tambah, edit, hapus, dan atur urutan project yang tampil di website."
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() => setEditing({ index: null, item: emptyProject() })}
            className="bg-green-01 font-semibold text-dark-01 hover:bg-green-01/90"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Tambah project
          </Button>
        }
      >
        {items.length === 0 ? (
          <EmptyState
            title="Belum ada project"
            description="Tambahkan project pertama. Setelah selesai, klik Simpan di kanan atas."
          />
        ) : (
          <div className="space-y-3">
            {items.map((project, index) => (
              <div
                key={project.id}
                className="flex flex-col gap-3 border border-white-01/10 bg-white-01/[0.02] p-3 sm:flex-row sm:items-center"
              >
                <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden border border-white-01/10 bg-white-01/5">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium text-white-01/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white-01">
                    {project.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-white-01/35">
                    {project.description || 'Tanpa deskripsi'}
                  </p>
                  {project.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="border border-white-01/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white-01/45"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing({ index, item: { ...project } })}
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
                    deleteLabel={project.title}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <FormDialog
        open={Boolean(editing)}
        title={editing?.index === null ? 'Tambah project' : 'Edit project'}
        description="Data project akan tampil di section Projects halaman utama."
        onClose={() => setEditing(null)}
        onSubmit={commit}
      >
        {editing && (
          <>
            <Field label="Judul project">
              <AdminInput
                autoFocus
                value={editing.item.title}
                onChange={(event) => updateDraft({ title: event.target.value })}
                placeholder="Nama project"
              />
            </Field>
            <Field label="Deskripsi">
              <AdminTextarea
                value={editing.item.description}
                onChange={(event) => updateDraft({ description: event.target.value })}
                placeholder="Deskripsi singkat project"
              />
            </Field>
            <TagsField
              label="Tags"
              value={editing.item.tags}
              onChange={(tags) => updateDraft({ tags })}
              hint="Tag pertama dan kedua tampil di sudut atas, tag ketiga di sudut bawah."
            />
            <ImageField
              label="Gambar project"
              value={editing.item.image}
              onChange={(image) => updateDraft({ image })}
              hint="Kosongkan untuk memakai placeholder nomor project."
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="GitHub URL">
                <AdminInput
                  value={editing.item.githubUrl}
                  onChange={(event) => updateDraft({ githubUrl: event.target.value })}
                  placeholder="https://github.com/..."
                />
              </Field>
              <Field label="Demo URL">
                <AdminInput
                  value={editing.item.demoUrl}
                  onChange={(event) => updateDraft({ demoUrl: event.target.value })}
                  placeholder="https://..."
                />
              </Field>
            </div>
          </>
        )}
      </FormDialog>
    </>
  );
}
