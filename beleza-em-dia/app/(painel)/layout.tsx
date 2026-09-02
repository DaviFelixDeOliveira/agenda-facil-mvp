import { Sidebar } from '@/components/layout/sidebar'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Header } from '@/components/layout/header'
import { TourWalkthrough } from '@/components/tour-walkthrough'

export default function PainelLayout({ children }: { children: React.ReactNode }) {
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
