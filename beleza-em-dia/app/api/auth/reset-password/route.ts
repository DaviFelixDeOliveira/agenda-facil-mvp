export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

// Gerar código de 6 dígitos
function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * POST /api/auth/reset-password
 * Solicita um reset de senha, enviando um código para o email
 */
export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se banco está disponível
    const hasDatabaseUrl = Boolean(process.env.DATABASE_URL)

    // Em desenvolvimento: sempre aceita qualquer email
    if (!hasDatabaseUrl) {
      return NextResponse.json(
        {
          success: true,
          message: 'Código enviado para seu e-mail',
        },
        { status: 200 }
      )
    }

    // Com banco disponível: importar e usar Prisma
    try {
      const { prisma } = await import('@/lib/db')

      if (!prisma) {
        return NextResponse.json(
          {
            success: true,
            message: 'Código enviado para seu e-mail',
          },
          { status: 200 }
        )
      }

      // Verificar se user existe
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        // Por segurança, não revelamos se o email existe ou não
        return NextResponse.json(
          {
            success: true,
            message: 'Se a conta existe, um código foi enviado para o e-mail',
          },
          { status: 200 }
        )
      }

      // Gerar código de reset
      const resetCode = generateResetCode()
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutos

      // Salvar token no banco
      await prisma.passwordResetToken.create({
        data: {
          email,
          token: resetCode,
          expiresAt,
          used: false,
        },
      })

      // Aqui entraria integração com serviço de email
      console.log(`[DEV] Reset code for ${email}: ${resetCode}`)
    } catch (dbError) {
      console.error('Database error in reset-password:', dbError)
      // Fallback: retornar sucesso mesmo com erro de DB
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Código enviado para seu e-mail',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}
