export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const clients = await prisma.client.findMany({
      where: { userId: session.user.id },
      orderBy: { name: 'asc' },
    })
    const mapped = (clients ?? []).map((c: any) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      visits: c.visits,
      avgTicket: c.avgTicket,
      notes: c.notes,
      lastVisit: c.lastVisit ? new Date(c.lastVisit).toLocaleDateString('pt-BR') : null,
    }))
    return NextResponse.json(mapped)
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
