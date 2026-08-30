'use client'

import { useState, useEffect } from 'react'
import { X, CalendarPlus } from 'lucide-react'
import { toast } from 'sonner'

interface Service { id: string; name: string; price: number; duration: number }
interface Client { id: string; name: string }

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: any) => void
  services: Service[]
  clients: Client[]
}

export function NovoAgendamentoModal({ open, onClose, onSave, services, clients }: Props) {
  const [clientId, setClientId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    if (open) {
      setClientId('')
      setServiceId('')
      setDate('')
      setTime('')
    }
  }, [open])

  if (!open) return null

  const selectedService = services?.find?.((s: Service) => s.id === serviceId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientId || !serviceId || !date || !time) {
      toast.error('Preencha todos os campos')
      return
    }
    onSave({ clientId, serviceId, date, time })
    toast.success('Agendamento criado!')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarPlus className="w-5 h-5 text-brand" />
            <h2 className="text-lg font-bold text-[#111827]">Novo Agendamento</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">Cliente</label>
            <select
              value={clientId}
              onChange={(e: any) => setClientId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[#111827] text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
              required
            >
              <option value="">Selecionar cliente</option>
              {(clients ?? []).map((c: Client) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1">Serviço</label>
            <select
              value={serviceId}
              onChange={(e: any) => setServiceId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[#111827] text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
              required
            >
              <option value="">Selecionar serviço</option>
              {(services ?? []).filter((s: Service) => s).map((s: Service) => (
                <option key={s.id} value={s.id}>{s.name} — R$ {s?.price?.toFixed?.(2) ?? '0'}</option>
              ))}
            </select>
          </div>

          {selectedService && (
            <p className="text-xs text-gray-500">Duração: {selectedService.duration}min • Valor: R$ {selectedService.price?.toFixed?.(2)}</p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Data</label>
              <input
                type="date"
                value={date}
                onChange={(e: any) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[#111827] text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Horário</label>
              <input
                type="time"
                value={time}
                onChange={(e: any) => setTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[#111827] text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-brand text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors"
          >
            Agendar
          </button>
        </form>
      </div>
    </div>
  )
}
