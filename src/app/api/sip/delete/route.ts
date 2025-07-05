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

  const { uuid } = await req.json()
  const externalRes = await fetch(`${BASE}/${uuid}`, {
    method: 'DELETE',
    headers: {
      Accept:        'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })
  const body = await externalRes.json()
  return NextResponse.json(body, { status: externalRes.status })
}
