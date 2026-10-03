export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function POST() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        termsAcceptedAt: true,
        privacyAcceptedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    if (!user.termsAcceptedAt || !user.privacyAcceptedAt) {
      return NextResponse.json(
        { error: 'Aceite os Termos de Uso e a Política de Privacidade antes de concluir o onboarding.' },
        { status: 403 }
      )
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        onboardingCompletedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao concluir onboarding:', error)

    return NextResponse.json(
      { error: 'Erro interno ao registrar conclusão do onboarding' },
      { status: 500 }
    )
  }
}