// app/api/sip/get-sip/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BASE = 'https://app.robotcall.uz/api/sip'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function POST(req: NextRequest) {
  // читаем токен
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
  }

  // достаём uuid из тела
  const { uuid } = await req.json()
  if (!uuid) {
    return NextResponse.json({ detail: 'UUID is required' }, { status: 400 })
  }

  // проксируем запрос к внешнему API
  const externalRes = await fetch(`${BASE}/${uuid}`, {
    method: 'GET',
    headers: {
      Accept:        'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const data = await externalRes.json()
  return NextResponse.json(data, { status: externalRes.status })
}
