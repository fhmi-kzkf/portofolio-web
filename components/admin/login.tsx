'use client';

import { FormEvent, useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AdminLogin({
  configured,
  onSuccess,
}: {
  configured: boolean;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Gagal masuk.');
      }

      setPassword('');
      onSuccess();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Gagal masuk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-01 px-4 py-12 text-white-01">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white-01/10" />
        <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white-01/[0.06]" />
        <div className="absolute left-1/2 top-1/2 h-[980px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white-01/[0.03]" />
      </div>

      <div className="relative w-full max-w-md border border-white-01/15 bg-white-01/[0.03] p-8 backdrop-blur-sm md:p-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-01 text-xl font-bold text-dark-01">
            F.
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white-01/40">
              Portfolio CMS
            </div>
            <div className="text-lg font-medium">Admin Access</div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="admin-password"
              className="text-xs font-medium uppercase tracking-[0.14em] text-white-01/60"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white-01/30" />
              <Input
                id="admin-password"
                type="password"
                autoFocus
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan password admin"
                className="h-11 border-white-01/15 bg-white-01/[0.04] pl-10 text-white-01 placeholder:text-white-01/30 focus-visible:ring-green-01/60 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {!configured && (
            <p className="border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-xs leading-relaxed text-amber-200">
              ADMIN_PASSWORD belum diset di server. Tambahkan ke file .env.local lalu
              restart server.
            </p>
          )}

          {error && (
            <p className="border border-red-400/20 bg-red-400/5 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading || !password || !configured}
            className="h-11 w-full bg-green-01 font-semibold text-dark-01 hover:bg-green-01/90 disabled:bg-green-01/40 disabled:text-dark-01/60"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? 'Memeriksa...' : 'Masuk'}
          </Button>
        </form>

        <p className="mt-6 text-[11px] leading-relaxed text-white-01/30">
          Halaman ini hanya untuk pemilik situs. Password diatur lewat variabel
          ADMIN_PASSWORD di server.
        </p>
      </div>
    </div>
  );
}
