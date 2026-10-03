import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { Sidebar } from '@/components/layout/sidebar'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Header } from '@/components/layout/header'
import { TourWalkthrough } from '@/components/tour-walkthrough'

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
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

  // Guarda server-side de Termos e Privacidade
  if (!user?.termsAcceptedAt || !user?.privacyAcceptedAt) {
    redirect('/termos')
  }

  // Guarda server-side de Onboarding
  if (!user?.onboardingCompletedAt) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#090D16] text-[#111827] dark:text-[#F9FAFB] transition-colors">
      <Sidebar />
      <Header />
      <main className="lg:ml-60 pb-20 lg:pb-6">
        {children}
      </main>
      <BottomNav />
      <TourWalkthrough />
    </div>
  )
}
