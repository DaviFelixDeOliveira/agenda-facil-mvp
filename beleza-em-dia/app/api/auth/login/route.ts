export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { isDatabaseReady, prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 })
    }

    if (!isDatabaseReady() || !prisma) {
      return NextResponse.json(
        {
          error:
            'Autenticação em desenvolvimento. Conecte o banco e execute a geração do Prisma para ativar login real.',
        },
        { status: 503 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user?.password) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
    }

    return NextResponse.json({ id: user.id, email: user.email, name: user.name })
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
