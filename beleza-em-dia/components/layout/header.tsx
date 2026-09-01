'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Bell } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  NotificationsModal,
  initialNotifications,
  NotificationItem,
} from './notifications-modal'

export function Header() {
  const [showNotif, setShowNotif] = useState(false)
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
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image
              src="/Logo Sem fundo texto preto.png"
              alt="Beleza em Dia"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-bold text-[#111827] text-sm">Beleza em Dia</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setShowNotif(true)}
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full ring-2 ring-white" />
            )}
          </button>
        </div>
      </header>

      <NotificationsModal
        isOpen={showNotif}
        onClose={() => setShowNotif(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onMarkAsRead={handleMarkAsRead}
      />
    </>
  )
}

