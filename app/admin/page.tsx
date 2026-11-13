'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { AdminLogin } from '@/components/admin/login';
import { AdminDashboard } from '@/components/admin/dashboard';
import type { SiteContent } from '@/lib/content-types';

type Status = 'loading' | 'guest' | 'ready';

export default function AdminPage() {
  const [status, setStatus] = useState<Status>('loading');
  const [configured, setConfigured] = useState(true);
  const [content, setContent] = useState<SiteContent | null>(null);

  const loadContent = useCallback(async () => {
    setStatus('loading');

    try {
      const response = await fetch('/api/content', { cache: 'no-store' });

      if (response.status === 401) {
        setStatus('guest');
        return;
      }

      const data = (await response.json()) as SiteContent & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Gagal memuat konten.');
      }

      setContent(data);
      setStatus('ready');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal memuat konten.');
      setStatus('guest');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/auth/session', { cache: 'no-store' })
      .then(async (response) => {
        const data = (await response.json()) as {
          authenticated?: boolean;
          configured?: boolean;
        };

        if (cancelled) {
          return;
        }

        setConfigured(Boolean(data.configured));

        if (data.authenticated) {
          void loadContent();
        } else {
          setStatus('guest');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('guest');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [loadContent]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-01 text-white-01">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-green-01" />
          <p className="text-xs uppercase tracking-[0.24em] text-white-01/35">
            Memuat CMS
          </p>
        </div>
      </div>
    );
  }

  if (status === 'guest' || !content) {
    return (
      <>
        <AdminLogin
          configured={configured}
          onSuccess={() => {
            void loadContent();
          }}
        />
        <Toaster theme="dark" position="bottom-right" richColors />
      </>
    );
  }

  return (
    <>
      <AdminDashboard
        initialContent={content}
        onLogout={() => {
          setContent(null);
          setStatus('guest');
        }}
        onUnauthorized={() => {
          setContent(null);
          setStatus('guest');
          toast.error('Sesi berakhir. Silakan login ulang.');
        }}
      />
      <Toaster theme="dark" position="bottom-right" richColors />
    </>
  );
}
