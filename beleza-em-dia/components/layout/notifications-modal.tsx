'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Bell,
  X,
  CalendarDays,
  CreditCard,
  AlertCircle,
  Info,
  CheckCheck,
  ArrowRight,
  Clock,
} from 'lucide-react'
import Link from 'next/link'

export interface NotificationItem {
  id: number
  icon: any
  iconBg: string
  iconColor: string
  title: string
  desc: string
  time: string
  read: boolean
  category: string
  details: string
  actionHref?: string
  actionLabel?: string
}

export const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    icon: CalendarDays,
    iconBg: 'bg-blue-50 text-blue-600',
    iconColor: 'text-blue-600',
    title: 'Novo agendamento de Ana Silva',
    desc: 'Corte Feminino + Escova - 14/11 às 14:00.',
    time: 'Há 10 min',
    read: false,
    category: 'Agendamento',
    details:
      'A cliente Ana Silva confirmou o agendamento para Corte Feminino + Escova para o dia 14/11 às 14:00. O sinal antecipado foi verificado com sucesso.',
    actionHref: '/agenda',
    actionLabel: 'Ver na Agenda',
  },
  {
    id: 2,
    icon: AlertCircle,
    iconBg: 'bg-amber-50 text-amber-600',
    iconColor: 'text-amber-600',
    title: 'Lembrete Diário',
    desc: 'Você tem 8 atendimentos marcados para hoje. Prepare-se para um dia cheio!',
    time: 'Hoje, 08:00',
    read: false,
    category: 'Lembrete',
    details:
      'Sua agenda está com 8 atendimentos confirmados para o dia de hoje, com o primeiro atendimento iniciando às 09:00. Prepare seus materiais e receba suas clientes com carinho!',
    actionHref: '/agenda',
    actionLabel: 'Abrir Agenda de Hoje',
  },
  {
    id: 3,
    icon: CreditCard,
    iconBg: 'bg-emerald-50 text-emerald-600',
    iconColor: 'text-emerald-600',
    title: 'Pagamento recebido: R$ 150,00',
    desc: 'Pagamento via PIX referente ao atendimento de Carla Mendes.',
    time: 'Ontem',
    read: false,
    category: 'Financeiro',
    details:
      'O pagamento no valor de R$ 150,00 foi recebido com sucesso via Pix e lançado automaticamente no seu fluxo de caixa e relatórios financeiros.',
    actionHref: '/financeiro',
    actionLabel: 'Ver no Financeiro',
  },
  {
    id: 4,
    icon: Info,
    iconBg: 'bg-gray-50 text-gray-500',
    iconColor: 'text-gray-500',
    title: 'Atualização do Sistema',
    desc: 'Novas funcionalidades de relatório de marketing disponíveis no menu lateral.',
    time: '10/11',
    read: true,
    category: 'Novidade',
    details:
      'A plataforma foi atualizada com novas ferramentas de compartilhamento, sinal Pix percentual e suporte a tema claro e escuro para aumentar ainda mais sua produtividade.',
    actionHref: '/configuracoes',
    actionLabel: 'Ver Configurações',
  },
]

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
  notifications: NotificationItem[]
  onMarkAllAsRead: () => void
  onMarkAsRead: (id: number) => void
}

export function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
}: NotificationsModalProps) {
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  const handleItemClick = (n: NotificationItem) => {
    onMarkAsRead(n.id)
    setSelectedNotif(n)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#111827] text-lg">Notificações</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-brand text-white text-xs font-bold">
                  {unreadCount} nova{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Acompanhe seus últimos alertas e avisos.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Botão Marcar todas como lidas */}
        {unreadCount > 0 && (
          <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between shrink-0">
            <span className="text-xs text-gray-500 font-medium">Notificações pendentes</span>
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-bold text-brand hover:text-rose-700 flex items-center gap-1.5 transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Marcar todas como lidas
            </button>
          </div>
        )}

        {/* Lista de Notificações */}
        <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
          {notifications.length === 0 ? (
            <div className="p-10 text-center text-gray-400 text-sm">
              Nenhuma notificação no momento.
            </div>
          ) : (
            notifications.map((n) => {
              const Icon = n.icon
              return (
                <div
                  key={n.id}
                  onClick={() => handleItemClick(n)}
                  className={`flex items-start gap-3.5 p-4.5 cursor-pointer transition-colors ${
                    !n.read ? 'bg-rose-50/20 hover:bg-rose-50/40' : 'hover:bg-gray-50/80'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl ${n.iconBg} flex items-center justify-center shrink-0 shadow-xs relative`}
                  >
                    <Icon className="w-5 h-5" />
                    {!n.read && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand rounded-full ring-2 ring-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!n.read ? 'font-bold text-[#111827]' : 'font-medium text-gray-700'}`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0 pt-0.5">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{n.desc}</p>
                    <span className="inline-block text-[11px] text-brand font-semibold mt-1 hover:underline">
                      Ver detalhes &rarr;
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Modal de Detalhes da Notificação */}
      {selectedNotif && (
        <div
          className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedNotif(null)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-2xl ${selectedNotif.iconBg} flex items-center justify-center shrink-0`}>
                  <selectedNotif.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand">
                    {selectedNotif.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{selectedNotif.time}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotif(null)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 pt-1">
              <h4 className="text-base font-bold text-[#111827]">{selectedNotif.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                {selectedNotif.details}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {selectedNotif.actionHref && (
                <Link
                  href={selectedNotif.actionHref}
                  onClick={() => {
                    setSelectedNotif(null)
                    onClose()
                  }}
                  className="w-full py-3 bg-brand text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-rose-700 transition-colors shadow-sm"
                >
                  {selectedNotif.actionLabel || 'Acessar'} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              <button
                onClick={() => setSelectedNotif(null)}
                className="w-full py-2.5 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  )
}
