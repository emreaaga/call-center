import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { phone, password } = await request.json()
    const externalRes = await fetch('https://app.robotcall.uz/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    })
    const data = await externalRes.json()

    if (!externalRes.ok) {
      return NextResponse.json(
        { message: data.message || 'Ошибка авторизации' },
        { status: externalRes.status }
      )
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set('token', data.access_token, {
      httpOnly: true,
      path: '/',
      maxAge: data.expires_in, // в секундах, у вас 43200
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    return res
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
