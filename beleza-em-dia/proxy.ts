import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const { auth } = NextAuth(authConfig)

export async function proxy(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  const protectedRoutes = [
    '/dashboard',
    '/agenda',
    '/clientes',
    '/financeiro',
    '/perfil',
    '/configuracoes',
    '/termos',
    '/onboarding',
  ]

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !session?.user) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|carousel|.*\\.(?:png|jpg|jpeg|svg|webp|gif)$).*)',
  ],
}
