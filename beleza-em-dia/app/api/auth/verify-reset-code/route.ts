export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

/**
 * POST /api/auth/verify-reset-code
 * Verifica se o código de reset é válido
 */
export async function POST(req: Request) {
  try {
    const { email, code } = await req.json()

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email e código são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se banco está disponível
    const hasDatabaseUrl = Boolean(process.env.DATABASE_URL)

    // Em desenvolvimento: aceita o código 123456
    if (!hasDatabaseUrl) {
      if (code === '123456') {
        return NextResponse.json(
          {
            success: true,
            token: `mock-token-${Date.now()}`,
          },
          { status: 200 }
        )
      }
      return NextResponse.json(
        { error: 'Código inválido' },
        { status: 400 }
      )
    }

    // Com banco disponível: buscar token
    try {
      const { prisma } = await import('@/lib/db')

      if (!prisma) {
        return NextResponse.json(
          { error: 'Código inválido' },
          { status: 400 }
        )
      }

      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          email,
          token: code,
          used: false,
        },
      })

      if (!resetToken) {
        return NextResponse.json(
          { error: 'Código inválido ou já utilizado' },
          { status: 400 }
        )
      }

      // Verificar se expirou (15 minutos)
      if (new Date() > resetToken.expiresAt) {
        return NextResponse.json(
          { error: 'Código expirado. Solicite um novo código.' },
          { status: 400 }
        )
      }

      // Código válido: retornar token para próxima etapa
      return NextResponse.json(
        {
          success: true,
          token: resetToken.id,
        },
        { status: 200 }
      )
    } catch (dbError) {
      console.error('Database error in verify-reset-code:', dbError)
      return NextResponse.json(
        { error: 'Código inválido' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Verify reset code error:', error)
    return NextResponse.json(
      { error: 'Erro ao verificar código' },
      { status: 500 }
    )
  }
}
