'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Wallet,
  Store,
  Settings,
  LogOut,
  Bell,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMockStore } from '@/context/mock-store'
import {
  NotificationsModal,
  initialNotifications,
  NotificationItem,
} from './notifications-modal'
import { LogoutModal } from '../logout-modal'

const navItems = [
  { label: 'Início', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Agenda', href: '/agenda', icon: CalendarDays },
  { label: 'Clientes', href: '/clientes', icon: Users },
  { label: 'Financeiro', href: '/financeiro', icon: Wallet },
  { label: 'Perfil', href: '/perfil', icon: Store },
  { label: 'Configurações', href: '/configuracoes', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { professional } = useMockStore()
  const [showNotif, setShowNotif] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-[#111827] text-white fixed left-0 top-0 z-40">
        {/* Logo e Nome */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <Image
                src="/Logo Sem fundo texto branco.png"
                alt="Beleza em Dia"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight">Beleza em Dia</span>
          </div>

          {/* Sino de Notificações Desktop */}
          <button
            onClick={() => setShowNotif(true)}
            className="relative p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="Notificações"
            aria-label="Notificações"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full ring-2 ring-[#111827]" />
            )}
          </button>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-brand text-white shadow-lg shadow-brand/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Perfil resumido + Sair */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
              {professional.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{professional.name}</p>
              <p className="text-xs text-gray-400 truncate">{professional.studioName}</p>
            </div>
          </div>
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Modais Compartilhados */}
      <NotificationsModal
        isOpen={showNotif}
        onClose={() => setShowNotif(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onMarkAsRead={handleMarkAsRead}
      />

      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          window.location.href = '/boas-vindas'
        }}
      />
    </>
  )
}
