import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BASE = 'https://backend.icall.uz/api/sip'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
  }

  const { uuid, name, endpoint, channel_count, status_ru } = await req.json()
  if (!uuid) {
    return NextResponse.json({ detail: 'UUID is required' }, { status: 400 })
  }

  const externalRes = await fetch(`${BASE}/${uuid}`, {
    method: 'PUT',
    headers: {
      Accept:        'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, endpoint, channel_count, status_ru }),
    cache: 'no-store',
  })

  const data = await externalRes.json()
  return NextResponse.json(data, { status: externalRes.status })
}
