'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Profile } from '@/lib/content-types';
import {
  AdminInput,
  EmptyState,
  Field,
  ImageField,
  LocalizedField,
  Panel,
} from '@/components/admin/fields';
import { createId } from '@/components/admin/utils';

export function ProfileEditor({
  value,
  onChange,
}: {
  value: Profile;
  onChange: (value: Profile) => void;
}) {
  return (
    <div className="space-y-6">
      <Panel
        title="Identitas"
        description="Nama, role di hero, dan foto profil yang tampil di halaman utama."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nama lengkap">
            <AdminInput
              value={value.name}
              onChange={(event) => onChange({ ...value, name: event.target.value })}
              placeholder="Fahmi Raditya"
            />
          </Field>
          <Field
            label="Roles di hero"
            hint="Pisahkan dengan koma. Role ditampilkan berpasangan di bagian atas hero."
          >
            <AdminInput
              value={value.roles.join(', ')}
              onChange={(event) =>
                onChange({
                  ...value,
                  roles: event.target.value
                    .split(',')
                    .map((role) => role.trim())
                    .filter(Boolean),
                })
              }
              placeholder="AI Engineer, Fullstack Developer"
            />
          </Field>
        </div>

        <ImageField
          label="Foto profil"
          value={value.photoUrl}
          onChange={(photoUrl) => onChange({ ...value, photoUrl })}
          hint="Upload gambar baru atau isi path/URL manual."
        />
      </Panel>

      <Panel
        title="Hero & About"
        description="Teks ini mendukung dua bahasa dan mengikuti tombol bahasa di website."
      >
        <LocalizedField
          label="Deskripsi hero"
          value={value.heroDescription}
          onChange={(heroDescription) => onChange({ ...value, heroDescription })}
          multiline
          hint="Muncul di bawah judul besar 'Crafting digital experiences'."
        />
        <LocalizedField
          label="Sapaan about"
          value={value.aboutGreeting}
          onChange={(aboutGreeting) => onChange({ ...value, aboutGreeting })}
          hint="Contoh: Hello 👋 / Halo 👋"
        />
        <LocalizedField
          label="Isi about"
          value={value.aboutContent}
          onChange={(aboutContent) => onChange({ ...value, aboutContent })}
          multiline
          hint="Pisahkan paragraf dengan satu baris kosong."
        />
      </Panel>

      <Panel
        title="Social links"
        description="Tampil di section Contact dan footer."
        actions={
          <Button
            type="button"
            size="sm"
            onClick={() =>
              onChange({
                ...value,
                socials: [
                  ...value.socials,
                  { id: createId('social'), name: '', url: '' },
                ],
              })
            }
            className="bg-green-01 font-semibold text-dark-01 hover:bg-green-01/90"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Tambah sosial
          </Button>
        }
      >
        {value.socials.length === 0 ? (
          <EmptyState
            title="Belum ada social link"
            description="Tambahkan GitHub, LinkedIn, Instagram, atau link lain yang ingin ditampilkan."
          />
        ) : (
          <div className="space-y-3">
            {value.socials.map((social, index) => (
              <div
                key={social.id}
                className="grid gap-3 border border-white-01/10 bg-white-01/[0.02] p-3 md:grid-cols-[1fr_2fr_auto] md:items-end"
              >
                <Field label="Nama">
                  <AdminInput
                    value={social.name}
                    onChange={(event) =>
                      onChange({
                        ...value,
                        socials: value.socials.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, name: event.target.value }
                            : item
                        ),
                      })
                    }
                    placeholder="GitHub"
                  />
                </Field>
                <Field label="URL">
                  <AdminInput
                    value={social.url}
                    onChange={(event) =>
                      onChange({
                        ...value,
                        socials: value.socials.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, url: event.target.value }
                            : item
                        ),
                      })
                    }
                    placeholder="https://..."
                  />
                </Field>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Hapus ${social.name || 'social link'}`}
                  onClick={() =>
                    onChange({
                      ...value,
                      socials: value.socials.filter(
                        (_, itemIndex) => itemIndex !== index
                      ),
                    })
                  }
                  className="mb-0.5 h-10 w-10 text-red-300/70 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
