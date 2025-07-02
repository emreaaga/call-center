// app/api/calls/outgoing/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = req.nextUrl
  const page     = searchParams.get('page')     ?? '1'
  const per_page = searchParams.get('per_page') ?? '10'

  const externalRes = await fetch(
    `https://app.robotcall.uz/api/calls/outgoing?page=${page}&per_page=${per_page}`,
    {
      method: 'GET',
      headers: {
        Accept:        'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  )
  const payload = await externalRes.json()

  return NextResponse.json(payload, {
    status: externalRes.status,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  })
}
