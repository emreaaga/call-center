import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  const res = await fetch('https://app.robotcall.uz/api/campaigns', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const data = await res.json()

  return NextResponse.json(data, {
    status: res.status,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
