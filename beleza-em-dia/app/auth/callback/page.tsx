import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AuthCallbackPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      termsAcceptedAt: true,
      privacyAcceptedAt: true,
      onboardingCompletedAt: true,
    },
  })

  // 1. Se ainda não aceitou termos/privacidade -> /termos
  if (!user?.termsAcceptedAt || !user?.privacyAcceptedAt) {
    redirect('/termos')
  }

  // 2. Se aceitou termos mas não concluiu onboarding -> /onboarding
  if (!user?.onboardingCompletedAt) {
    redirect('/onboarding')
  }

  // 3. Usuário recorrente completo -> /dashboard
  redirect('/dashboard')
}
