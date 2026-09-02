'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CalendarDays, Users, Wallet, User, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Início', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Agenda', href: '/agenda', icon: CalendarDays },
  { label: 'Clientes', href: '/clientes', icon: Users },
  { label: 'Finanças', href: '/financeiro', icon: Wallet },
  { label: 'Perfil', href: '/perfil', icon: User },
  { label: 'Configurações', href: '/configuracoes', icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 transition-colors" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 text-[9px] font-medium py-1 px-1 transition-colors min-w-[48px]',
                active ? 'text-brand' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              )}
            >
              <div className={cn(
                'flex items-center justify-center w-7 h-7 rounded-lg transition-colors',
                active && 'bg-rose-50 dark:bg-rose-950/50'
              )}>
                <Icon className={cn('w-[18px] h-[18px]', active && 'text-brand')} />
              </div>
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
