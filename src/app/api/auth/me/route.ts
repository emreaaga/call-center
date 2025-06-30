// pages/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Buffer } from 'buffer';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    // 1. Разбиваем JWT на части
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token format');

    // 2. Декодируем payload (часть [1])
    const payloadJson = Buffer.from(parts[1], 'base64').toString('utf8');
    const payload = JSON.parse(payloadJson) as { sub?: string; exp?: number };

    // 3. Проверяем срок действия
    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      throw new Error('Token expired');
    }

    // 4. Возвращаем результат
    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.sub,
      },
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
