export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const appointments = await prisma.appointment.findMany({
      where: { userId: session.user.id },
      include: { client: true, service: true },
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    })
    const mapped = (appointments ?? []).map((a: any) => ({
      id: a.id,
      date: a.date,
      time: a.time,
      clientName: a.client?.name ?? '',
      clientId: a.clientId,
      serviceName: a.service?.name ?? '',
      serviceId: a.serviceId,
      price: a.price,
      duration: a.duration,
      status: a.status,
      paymentMode: a.paymentMode ?? 'Sem sinal',
    }))
    return NextResponse.json(mapped)
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const { clientId, serviceId, date, time } = await req.json()
    const service = await prisma.service.findUnique({ where: { id: serviceId } })
    if (!service) return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 })
    const appointment = await prisma.appointment.create({
      data: {
        clientId, serviceId, date, time,
        price: service.price,
        duration: service.duration,
        status: 'pendente',
        paymentMode: 'Sem sinal',
        userId: session.user.id,
      },
    })
    return NextResponse.json(appointment, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
