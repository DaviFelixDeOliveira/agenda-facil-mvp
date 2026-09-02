export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, image: true, googleImage: true, businessName: true, businessPhone: true, businessAddress: true },
    })
    return NextResponse.json(user)
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    const body = await req.json()
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: body,
    })
    return NextResponse.json({ id: user.id })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
