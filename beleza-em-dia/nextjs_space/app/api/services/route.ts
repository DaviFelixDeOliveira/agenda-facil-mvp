export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const services = await prisma.service.findMany({
      where: { userId: session.user.id },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(services ?? [])
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const { name, price, duration } = await req.json()
    const service = await prisma.service.create({
      data: { name, price: Number(price), duration: Number(duration), userId: session.user.id },
    })
    return NextResponse.json(service, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
