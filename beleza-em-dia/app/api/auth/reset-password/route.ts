export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { isDatabaseReady, prisma } from '@/lib/db'

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

    // Em desenvolvimento: sempre aceita qualquer email
    if (!isDatabaseReady() || !prisma) {
      return NextResponse.json(
        {
          success: true,
          message:
            'Código enviado para seu e-mail (modo de desenvolvimento - código: 123456)',
          code: '123456', // Mock code para testes
        },
        { status: 200 }
      )
    }

    // Verificar se user existe (quando DB estiver disponível)
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

    // Aqui entraria integração com serviço de email (sendgrid, nodemailer, etc)
    console.log(`[DEV] Reset code for ${email}: ${resetCode}`)

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
