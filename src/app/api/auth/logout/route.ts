// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  // если нужно — оповестить внешний API о логауте
  const token = request.cookies.get('token')?.value
  if (token) {
    await fetch('https://backend.icall.uz/api/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    })
  }

  // теперь удаляем куку правильно
  const res = NextResponse.json({ ok: true })
  // вариант 1 — set с пустым значением и maxAge: 0
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  // или вариант 2 — delete (Next.js ≥13.4.2)
  // res.cookies.delete('token', { path: '/' })

  return res
}
