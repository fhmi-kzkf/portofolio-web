'use client';

import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ImageIcon, Loader2, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const inputClass =
  'bg-white/[0.04] border-white-01/15 text-white-01 placeholder:text-white-01/30 focus-visible:ring-green-01/60 focus-visible:ring-offset-0';

export function Panel({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-white-01/10 bg-white-01/[0.02]">
      <header className="flex flex-col gap-3 border-b border-white-01/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div>
          <h2 className="text-base font-medium text-white-01">{title}</h2>
          {description && (
            <p className="mt-1 text-xs leading-relaxed text-white-01/40">{description}</p>
          )}
        </div>
        {actions}
      </header>
      <div className="space-y-5 p-5 md:p-6">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-xs font-medium uppercase tracking-[0.14em] text-white-01/60">
        {label}
      </Label>
      {children}
      {hint && <p className="text-[11px] leading-relaxed text-white-01/35">{hint}</p>}
    </div>
  );
}

export function AdminInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <Input className={cn(inputClass, className)} {...props} />;
}

export function AdminTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <Textarea className={cn(inputClass, 'min-h-[96px]', className)} {...props} />;
}

export function LocalizedField({
  label,
  value,
  onChange,
  multiline = false,
  hint,
}: {
  label: string;
  value: { en: string; id: string };
  onChange: (value: { en: string; id: string }) => void;
  multiline?: boolean;
  hint?: string;
}) {
  const Control = multiline ? AdminTextarea : AdminInput;

  return (
    <Field label={label} hint={hint}>
      <div className="grid gap-3 md:grid-cols-2">
        {(['en', 'id'] as const).map((locale) => (
          <div key={locale} className="space-y-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-green-01/70">
              {locale === 'en' ? 'English' : 'Indonesia'}
            </span>
            <Control
              value={value[locale]}
              onChange={(event) =>
                onChange({ ...value, [locale]: event.target.value })
              }
              rows={multiline ? 5 : undefined}
            />
          </div>
        ))}
      </div>
    </Field>
  );
}

export function TagsField({
  label,
  value,
  onChange,
  hint,
  placeholder = 'Python, Streamlit, AI',
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  hint?: string;
  placeholder?: string;
}) {
  const [text, setText] = useState(value.join(', '));

  return (
    <Field label={label} hint={hint}>
      <AdminInput
        value={text}
        placeholder={placeholder}
        onChange={(event) => {
          const nextText = event.target.value;
          setText(nextText);
          onChange(
            nextText
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean)
          );
        }}
        onBlur={() => setText(value.join(', '))}
      />
    </Field>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Gagal mengunggah gambar.');
      }

      onChange(data.url);
      toast.success('Gambar berhasil diunggah.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal mengunggah gambar.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden border border-white-01/10 bg-white-01/5">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-6 w-6 text-white-01/25" />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <AdminInput
            value={value}
            placeholder="/projects/nama-file.png atau https://..."
            onChange={(event) => onChange(event.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="border-white-01/15 bg-transparent text-white-01 hover:bg-white-01/10 hover:text-white-01"
            >
              {uploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              {uploading ? 'Mengunggah...' : 'Unggah gambar'}
            </Button>
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange('')}
                className="text-white-01/50 hover:bg-white-01/10 hover:text-white-01"
              >
                Kosongkan
              </Button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void upload(file);
              }
            }}
          />
        </div>
      </div>
    </Field>
  );
}

export function ItemActions({
  onUp,
  onDown,
  onDelete,
  canUp,
  canDown,
  deleteLabel,
}: {
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  canUp: boolean;
  canDown: boolean;
  deleteLabel: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onUp}
        disabled={!canUp}
        aria-label="Naikkan"
        className="h-8 w-8 text-white-01/50 hover:bg-white-01/10 hover:text-white-01"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDown}
        disabled={!canDown}
        aria-label="Turunkan"
        className="h-8 w-8 text-white-01/50 hover:bg-white-01/10 hover:text-white-01"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        aria-label={`Hapus ${deleteLabel}`}
        className="h-8 w-8 text-red-300/70 hover:bg-red-500/10 hover:text-red-300"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-white-01/10 px-6 py-12 text-center">
      <p className="text-sm font-medium text-white-01/70">{title}</p>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-white-01/35">{description}</p>
    </div>
  );
}
