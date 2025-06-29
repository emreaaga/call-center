import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { sip_uuid: string } }
) {
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.json({ detail: 'Not authenticated' }, { status: 401 })
  }

  const externalRes = await fetch(
    `https://app.robotcall.uz/api/sip/${params.sip_uuid}`,
    {
      method: 'DELETE',
      headers: {
        Accept:        'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const payload = await externalRes.json()
  return NextResponse.json(payload, { status: externalRes.status })
}
