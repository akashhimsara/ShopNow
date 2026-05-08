"use client";

import React, { useState } from 'react';
import { register } from '@/actions/auth';

export default function RegisterPageClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    const result = await register(formData);
    setLoading(false);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    // On success, redirect to login
    window.location.href = '/login';
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-4 text-2xl font-semibold">Create an account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
            {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
          </label>

          <label className="block">
            <span className="text-sm">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
            {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}
          </label>

          <label className="block">
            <span className="text-sm">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2"
            />
            {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}
          </label>

          {errors.unknown && <div className="text-sm text-red-600">{errors.unknown}</div>}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      </div>
    </main>
  );
}
