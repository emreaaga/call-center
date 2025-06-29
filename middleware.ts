// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

console.log('🛠 middleware.ts загружен')

export function middleware(req: NextRequest) {
  console.log('🛠 middleware fired for', req.nextUrl.pathname)
  return NextResponse.next()
}

// пока что обрабатываем все запросы (для проверки)
export const config = {
  matcher: '/:path*',
}
