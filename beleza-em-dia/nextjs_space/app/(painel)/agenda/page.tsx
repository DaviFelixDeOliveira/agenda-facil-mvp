'use client'

import { useEffect, useState, useMemo } from 'react'
import { CalendarDays, Plus, Check, X, CheckCircle2, Clock, Ban } from 'lucide-react'
import { StatusBadge } from '@/components/ui/status-badge'
import { NovoAgendamentoModal } from '@/components/modals/novo-agendamento-modal'
import { brl } from '@/lib/utils'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import type { AppointmentType } from '@/lib/types'

export default function AgendaPage() {
  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date().toISOString().split('T')[0])
    }
  }, [selectedDate])

  const fetchAll = () => {
    Promise.all([
      fetch('/api/appointments').then((r: any) => r.json()),
      fetch('/api/clients').then((r: any) => r.json()),
      fetch('/api/services').then((r: any) => r.json()),
    ])
      .then(([appts, cls, svcs]: any) => {
        setAppointments(appts ?? [])
        setClients(cls ?? [])
        setServices(svcs ?? [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchAll() }, [])

  const dates = useMemo(() => {
    const allDates = [...new Set((appointments ?? []).map((a: AppointmentType) => a?.date).filter(Boolean))]
    if (!allDates.includes(selectedDate)) allDates.push(selectedDate)
    return allDates.sort()
  }, [appointments, selectedDate])

  const filtered = useMemo(() => {
    return (appointments ?? [])
      .filter((a: AppointmentType) => a?.date === selectedDate)
      .sort((a: AppointmentType, b: AppointmentType) => (a?.time ?? '').localeCompare(b?.time ?? ''))
  }, [appointments, selectedDate])

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setAppointments((prev: AppointmentType[]) =>
        (prev ?? []).map((a: AppointmentType) => a?.id === id ? { ...a, status: status as any } : a)
      )
      toast.success(`Agendamento ${status}!`)
    } catch {
      toast.error('Erro ao atualizar')
    }
  }

  const handleNewAppointment = async (data: any) => {
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      fetchAll()
    } catch {
      toast.error('Erro ao criar agendamento')
    }
  }

  const formatDateLabel = (d: string) => {
    try {
      const date = new Date(d + 'T12:00:00')
      const day = date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
      return day
    } catch { return d }
  }

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-brand" /> Agenda
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie seus horários</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand text-white rounded-lg font-semibold text-sm hover:bg-rose-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Novo
        </button>
      </div>

      {/* Date tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {dates.map((d: string) => (
          <button
            key={d}
            onClick={() => setSelectedDate(d)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedDate === d
                ? 'bg-brand text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {formatDateLabel(d)}
          </button>
        ))}
      </div>

      {/* Appointments */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map((i: number) => <div key={i} className="bg-white rounded-xl h-24 animate-pulse" />)}
        </div>
      ) : (filtered?.length ?? 0) === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow-sm">
          <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum agendamento neste dia</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {filtered.map((a: AppointmentType, i: number) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                  a.status === 'confirmado' ? 'border-l-success' :
                  a.status === 'pendente' ? 'border-l-warning' :
                  a.status === 'cancelado' ? 'border-l-danger' :
                  'border-l-blue-400'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-50 rounded-lg px-3 py-2 text-center min-w-[60px]">
                      <p className="text-sm font-bold text-[#111827]">{a.time}</p>
                      <p className="text-[10px] text-gray-500">{a.duration}min</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827]">{a.clientName}</p>
                      <p className="text-sm text-gray-500">{a.serviceName}</p>
                      <p className="text-xs text-gray-400 mt-1">{a.paymentMode} • {brl(a.price)}</p>
                    </div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>

                {a.status === 'pendente' && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => updateStatus(a.id, 'confirmado')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Confirmar
                    </button>
                    <button
                      onClick={() => updateStatus(a.id, 'cancelado')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
                    >
                      <Ban className="w-3.5 h-3.5" /> Cancelar
                    </button>
                  </div>
                )}
                {a.status === 'confirmado' && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => updateStatus(a.id, 'finalizado')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Concluir
                    </button>
                    <button
                      onClick={() => updateStatus(a.id, 'cancelado')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors"
                    >
                      <Ban className="w-3.5 h-3.5" /> Cancelar
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <NovoAgendamentoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleNewAppointment}
        services={(services ?? []).filter((s: any) => s?.active !== false)}
        clients={clients ?? []}
      />
    </div>
  )
}
