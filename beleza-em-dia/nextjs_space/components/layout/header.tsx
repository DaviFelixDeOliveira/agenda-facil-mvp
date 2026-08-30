'use client'

import Image from 'next/image'
import { Bell } from 'lucide-react'
import { useMockStore } from '@/context/mock-store'
import { initials } from '@/lib/utils'

export function Header() {
  const { professional } = useMockStore()

  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="flex items-center gap-2.5">
        <Image
          src="/logo.png"
          alt="Beleza em Dia"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="font-bold text-[#111827] text-sm">Beleza em Dia</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Notificações">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
          {initials(professional.name)}
        </div>
      </div>
    </header>
  )
}
