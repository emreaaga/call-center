// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(
    '[MW] path=',
    request.nextUrl.pathname,
    ' token=',
    request.cookies.get('token')?.value
  )

  // Точные URL, которые нужно защищать
  const protectedRoutes = [
    '/',             // главная, если нужно
    '/collections',
    '/collections/',
    '/incoming',
    '/incoming/',
    '/outgoing',
    '/outgoing/',
    '/sip-settings',
    '/sip-settings/',
    '/admin',
  ]

  const pathname = request.nextUrl.pathname

  // если не начинаем с одного из защищённых — пускаем
  if (!protectedRoutes.some(p => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // иначе смотрим куку
  const token = request.cookies.get('token')?.value
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',       
    '/collections',         
    '/collections/:path*',  
    '/incoming',            
    '/incoming/:path*',
    '/outgoing',
    '/outgoing/:path*',
    '/sip-settings',
    '/sip-settings/:path*',
    '/admin',
    '/admin/:path*',
  ],
}
