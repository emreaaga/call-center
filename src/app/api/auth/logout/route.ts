import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (token) {
    await fetch('https://app.robotcall.uz/api/auth/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'accept': 'application/json' },
    })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    maxAge: 0,
  })

  return res
}
