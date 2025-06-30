'use client';

export const dynamic = 'force-dynamic';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/admin-panel/login-form';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get('from') || '/outgoing';

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (res.ok) router.replace(redirectTo);
      })
      .catch(() => {});
  }, [redirectTo, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const phone = formData.get('login')?.toString();
    const password = formData.get('password')?.toString();

    if (!phone || !password) {
      setError('Пожалуйста, заполните все поля.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone, password }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Ошибка авторизации');

      router.replace(redirectTo);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* ... ваш JSX ... */}
      <LoginForm onSubmit={handleSubmit} loading={loading} />
      {/* ... */}
    </div>
  );
}
