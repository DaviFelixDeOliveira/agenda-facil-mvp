import { Sidebar } from '@/components/layout/sidebar'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Header } from '@/components/layout/header'

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <Header />
      <main className="lg:ml-60 pb-20 lg:pb-6">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
