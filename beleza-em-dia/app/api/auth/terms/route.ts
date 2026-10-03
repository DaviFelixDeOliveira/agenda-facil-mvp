export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function POST() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const now = new Date()
    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        termsAcceptedAt: now,
        privacyAcceptedAt: now,
      },
      select: {
        id: true,
        termsAcceptedAt: true,
        privacyAcceptedAt: true,
        onboardingCompletedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      onboardingCompleted: Boolean(updated.onboardingCompletedAt),
    })
  } catch (error: any) {
    console.error('Erro ao aceitar termos:', error)
    return NextResponse.json({ error: 'Erro interno ao salvar aceite dos termos' }, { status: 500 })
  }
}
