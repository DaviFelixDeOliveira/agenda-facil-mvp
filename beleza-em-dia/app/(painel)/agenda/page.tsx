'use client'

import { useState, useMemo } from 'react'
import { useMockStore } from '@/context/mock-store'
import { StatusBadge } from '@/components/ui/status-badge'
import { brl, initials } from '@/lib/utils'
import {
  CalendarDays,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type { MockAppointment } from '@/lib/mock-data'
import { useModalManager } from '@/context/modal-manager'
import { AppointmentModal } from '@/components/appointment-modal'

const DAY_LABELS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

function getWeekDays(baseDate: Date): Date[] {
  const day = baseDate.getDay()
  const monday = new Date(baseDate)
  monday.setDate(baseDate.getDate() - ((day === 0 ? 7 : day) - 1))
  const week: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    week.push(d)
  }
  return week
}

function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0]
}

// Cor da barra lateral por status
const statusBarColor: Record<string, string> = {
  finalizado: 'bg-blue-500',
  confirmado: 'bg-emerald-500',
  pendente: 'bg-amber-400',
  cancelado: 'bg-red-400',
}

export default function AgendaPage() {
  const { appointments, professional } = useMockStore()
  const { open } = useModalManager()
  const [baseDate, setBaseDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(toDateStr(new Date()))

  const weekDays = useMemo(() => getWeekDays(baseDate), [baseDate])

  const dayAppts = useMemo(() =>
    appointments
      .filter(a => a.date === selectedDate)
      .sort((a, b) => a.time.localeCompare(b.time)),
    [appointments, selectedDate]
  )

  const prevWeek = () => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() - 7)
    setBaseDate(d)
  }
  const nextWeek = () => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + 7)
    setBaseDate(d)
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 || e.deltaX > 0) {
      nextWeek()
    } else if (e.deltaY < 0 || e.deltaX < 0) {
      prevWeek()
    }
  }

  const todayStr = toDateStr(new Date())
  const openAppointmentModal = (appt: MockAppointment) => open('appointment', appt)

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Minha Agenda</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Gerencie seus horários e atendimentos</p>
      </div>

      {/* Seletor de Semana com Navegação por Setas e Scroll do Mouse (onWheel) */}
      <div
        onWheel={handleWheel}
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-3 transition-colors select-none"
        title="Dica: use as setas ou a roda do mouse sobre os dias para navegar"
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <button
            onClick={prevWeek}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-[#111827] dark:text-white">
            {weekDays[0].toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
          </span>
          <button
            onClick={nextWeek}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Próxima semana"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((d) => {
            const ds = toDateStr(d)
            const isSelected = ds === selectedDate
            const isToday = ds === todayStr
            const dayApptCount = appointments.filter(a => a.date === ds && a.status !== 'cancelado').length

            return (
              <button
                key={ds}
                onClick={() => setSelectedDate(ds)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all text-center ${
                  isSelected
                    ? 'bg-brand text-white shadow-md shadow-brand/20'
                    : isToday
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-brand'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-400'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                  {DAY_LABELS[d.getDay()]}
                </span>
                <span className={`text-lg font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-[#111827] dark:text-gray-200'}`}>
                  {d.getDate()}
                </span>
                {dayApptCount > 0 && (
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-brand'}`} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Data selecionada e contagem */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#111827] dark:text-white">
          {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase())}
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {dayAppts.filter(a => a.status !== 'cancelado').length} agendamento{dayAppts.filter(a => a.status !== 'cancelado').length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Lista de agendamentos do dia - com barra lateral de status */}
      <div className="space-y-3">
        {dayAppts.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm py-16 text-center transition-colors">
            <CalendarDays className="w-14 h-14 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Nenhum agendamento neste dia</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Aproveite para descansar ou adicionar novos horários!</p>
          </div>
        ) : (
          dayAppts.map((a) => (
            <button
              key={a.id}
              onClick={() => openAppointmentModal(a)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all flex overflow-hidden text-left"
            >
              {/* Barra lateral de status */}
              <div className={`w-1.5 shrink-0 ${statusBarColor[a.status] || 'bg-gray-300'}`} />

              <div className="flex-1 flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {/* Horário */}
                  <div className="text-center min-w-[48px]">
                    <p className="text-lg font-bold text-[#111827] dark:text-white">{a.time}</p>
                    <p className="text-[10px] text-gray-400">{a.duration}min</p>
                  </div>
                  {/* Divisor */}
                  <div className="w-px h-10 bg-gray-100 dark:bg-gray-800" />
                  {/* Avatar + info */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-rose-50 dark:bg-rose-950/50 text-brand text-xs font-bold flex items-center justify-center shrink-0">
                      {initials(a.clientName)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">{a.clientName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{a.serviceName}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-[#111827] dark:text-white hidden sm:block">{brl(a.price)}</span>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* ===== Modal de Detalhes do Agendamento ===== */}
      <AppointmentModal
        professionalStudioName={professional.studioName}
        onClose={() => {}}
      />
    </div>
  )
}
