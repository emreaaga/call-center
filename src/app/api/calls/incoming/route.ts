import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  const res = await fetch(
    'https://app.robotcall.uz/api/calls/incoming?page=1&per_page=10',
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
