'use client'

import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 lg:ml-60">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <Image
            src="/Logo Sem fundo texto preto.png"
            alt="Beleza em Dia"
            width={40}
            height={40}
            className="w-full h-full object-contain dark:hidden"
          />
          <Image
            src="/Logo Sem fundo texto branco.png"
            alt="Beleza em Dia"
            width={40}
            height={40}
            className="w-full h-full object-contain hidden dark:block"
          />
        </div>
        <span className="font-bold text-[#111827] dark:text-white text-sm">Beleza em Dia</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
