export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const { id } = await params
    const body = await req.json()
    const appointment = await prisma.appointment.updateMany({
      where: { id, userId: session.user.id },
      data: body,
    })
    return NextResponse.json({ updated: appointment.count })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
