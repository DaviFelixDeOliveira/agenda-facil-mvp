'use client'

import { useState, useMemo } from 'react'
import { useMockStore } from '@/context/mock-store'
import { StatusBadge } from '@/components/ui/status-badge'
import { brl, initials } from '@/lib/utils'
import {
  CalendarDays,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  CalendarClock,
  XCircle,
  X,
  Phone,
} from 'lucide-react'
import type { MockAppointment } from '@/lib/mock-data'

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
  const { appointments, professional, updateAppointmentStatus } = useMockStore()
  const [baseDate, setBaseDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(toDateStr(new Date()))
  const [selectedAppt, setSelectedAppt] = useState<MockAppointment | null>(null)

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

  const todayStr = toDateStr(new Date())

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Minha Agenda</h1>
        <p className="text-gray-500 text-sm mt-0.5">Gerencie seus horários e atendimentos</p>
      </div>

      {/* Seletor de Semana - fiel ao PDF */}
      <div className="bg-white rounded-xl shadow-sm p-3">
        <div className="flex items-center justify-between mb-3 px-1">
          <button onClick={prevWeek} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Semana anterior">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-sm font-semibold text-[#111827]">
            {weekDays[0].toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
          </span>
          <button onClick={nextWeek} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Próxima semana">
            <ChevronRight className="w-5 h-5 text-gray-500" />
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
                      ? 'bg-rose-50 text-brand'
                      : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                  {DAY_LABELS[d.getDay()]}
                </span>
                <span className={`text-lg font-bold mt-0.5 ${isSelected ? 'text-white' : ''}`}>
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
        <p className="text-sm font-semibold text-[#111827]">
          {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase())}
        </p>
        <span className="text-xs text-gray-500 font-medium">
          {dayAppts.filter(a => a.status !== 'cancelado').length} agendamento{dayAppts.filter(a => a.status !== 'cancelado').length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Lista de agendamentos do dia - com barra lateral de status */}
      <div className="space-y-3">
        {dayAppts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm py-16 text-center">
            <CalendarDays className="w-14 h-14 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Nenhum agendamento neste dia</p>
            <p className="text-gray-400 text-sm mt-1">Aproveite para descansar ou adicionar novos horários!</p>
          </div>
        ) : (
          dayAppts.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAppt(a)}
              className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex overflow-hidden text-left"
            >
              {/* Barra lateral de status */}
              <div className={`w-1.5 shrink-0 ${statusBarColor[a.status] || 'bg-gray-300'}`} />

              <div className="flex-1 flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {/* Horário */}
                  <div className="text-center min-w-[48px]">
                    <p className="text-lg font-bold text-[#111827]">{a.time}</p>
                    <p className="text-[10px] text-gray-400">{a.duration}min</p>
                  </div>
                  {/* Divisor */}
                  <div className="w-px h-10 bg-gray-100" />
                  {/* Avatar + info */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-rose-50 text-brand text-xs font-bold flex items-center justify-center shrink-0">
                      {initials(a.clientName)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#111827] truncate">{a.clientName}</p>
                      <p className="text-xs text-gray-500 truncate">{a.serviceName}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-[#111827] hidden sm:block">{brl(a.price)}</span>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* ===== Modal de Detalhes do Agendamento ===== */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end lg:items-center justify-center" onClick={() => setSelectedAppt(null)}>
          <div
            className="bg-white w-full max-w-lg rounded-t-2xl lg:rounded-2xl max-h-[90vh] overflow-y-auto animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-[#111827] text-lg">Detalhes do Agendamento</h3>
              <button onClick={() => setSelectedAppt(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Fechar">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Status + sinal */}
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedAppt.status} />
                {selectedAppt.signalPaid && (
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                    ✓ Sinal pago ({brl(selectedAppt.signalAmount)})
                  </span>
                )}
              </div>

              {/* Dados da cliente */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-brand text-sm font-bold flex items-center justify-center">
                  {initials(selectedAppt.clientName)}
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{selectedAppt.clientName}</p>
                  <p className="text-xs text-gray-500">
                    {selectedAppt.clientPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
                  </p>
                </div>
              </div>

              {/* Card do serviço */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#111827] text-sm">{selectedAppt.serviceName}</p>
                  <p className="font-bold text-brand text-lg">{brl(selectedAppt.price)}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {selectedAppt.date.split('-').reverse().join('/')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedAppt.time} • {selectedAppt.duration}min
                  </span>
                </div>
                {selectedAppt.notes && (
                  <p className="text-xs text-gray-500 mt-1 italic">&ldquo;{selectedAppt.notes}&rdquo;</p>
                )}
              </div>

              {/* Botão WhatsApp */}
              <a
                href={`https://wa.me/55${selectedAppt.clientPhone}?text=${encodeURIComponent(`Olá ${selectedAppt.clientName.split(' ')[0]}! Seu agendamento de ${selectedAppt.serviceName} está confirmado para ${selectedAppt.date.split('-').reverse().join('/')} às ${selectedAppt.time}. Te espero! ✨ — ${professional.studioName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar Mensagem WhatsApp
              </a>

              {/* Ações */}
              {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
                <>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { updateAppointmentStatus(selectedAppt.id, 'finalizado'); setSelectedAppt(null) }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-medium text-sm hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Concluído
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-100 transition-colors">
                      <CalendarClock className="w-4 h-4" />
                      Remarcar
                    </button>
                  </div>
                  <button
                    onClick={() => { updateAppointmentStatus(selectedAppt.id, 'cancelado'); setSelectedAppt(null) }}
                    className="w-full text-center text-sm text-red-500 hover:text-red-700 font-medium py-2 transition-colors"
                  >
                    <XCircle className="w-4 h-4 inline mr-1" />
                    Cancelar Agendamento
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
