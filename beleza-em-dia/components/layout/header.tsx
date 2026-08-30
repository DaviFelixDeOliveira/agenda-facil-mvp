'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, X, CalendarDays, CreditCard, AlertCircle, Info } from 'lucide-react'

const mockNotifications = [
  {
    id: 1,
    icon: CalendarDays,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Novo agendamento de Ana Silva',
    desc: 'Corte Feminino + Escova - 14/11 às 14:00.',
    time: 'Há 10 min',
  },
  {
    id: 2,
    icon: AlertCircle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: 'Lembrete Diário',
    desc: 'Você tem 8 atendimentos marcados para hoje. Prepare-se para um dia cheio!',
    time: 'Hoje, 08:00',
  },
  {
    id: 3,
    icon: CreditCard,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Pagamento recebido: R$ 150,00',
    desc: 'Pagamento via PIX referente ao atendimento de Carla Mendes.',
    time: 'Ontem',
  },
  {
    id: 4,
    icon: Info,
    iconBg: 'bg-gray-50',
    iconColor: 'text-gray-500',
    title: 'Atualização do Sistema',
    desc: 'Novas funcionalidades de relatório de marketing disponíveis no menu lateral.',
    time: '10/11',
  },
]

export function Header() {
  const [showNotif, setShowNotif] = useState(false)

  return (
    <>
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
        <button
          onClick={() => setShowNotif(true)}
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Notificações"
        >
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" />
        </button>
      </header>

      {/* Painel de Notificações */}
      {showNotif && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center" onClick={() => setShowNotif(false)}>
          <div
            className="bg-white w-full max-w-md mt-0 lg:mt-16 rounded-b-2xl lg:rounded-2xl max-h-[85vh] overflow-y-auto shadow-xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Painel */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-bold text-[#111827] text-lg">Notificações</h3>
                <p className="text-xs text-gray-500">Acompanhe seus últimos alertas e atualizações.</p>
              </div>
              <button onClick={() => setShowNotif(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Fechar">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Lista de Notificações */}
            <div className="divide-y divide-gray-100">
              {mockNotifications.map((n) => {
                const Icon = n.icon
                return (
                  <div key={n.id} className="flex items-start gap-3.5 px-5 py-4 hover:bg-gray-50/60 transition-colors">
                    <div className={`w-10 h-10 rounded-xl ${n.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${n.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[#111827]">{n.title}</p>
                        <span className="text-[10px] text-gray-400 shrink-0 pt-0.5">{n.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
