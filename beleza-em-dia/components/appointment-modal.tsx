'use client'

import { StatusBadge } from '@/components/ui/status-badge'
import { brl, initials } from '@/lib/utils'
import {
  CalendarDays,
  Clock,
  MessageCircle,
  CheckCircle2,
  CalendarClock,
  XCircle,
  X,
} from 'lucide-react'
import type { MockAppointment } from '@/lib/mock-data'
import { useModalManager } from '@/context/modal-manager'

interface AppointmentModalProps {
  professionalStudioName: string
  onClose: () => void
}

export function AppointmentModal({ professionalStudioName, onClose }: AppointmentModalProps) {
  const { close, getData } = useModalManager()
  const selectedAppt = getData<MockAppointment>('appointment')

  if (!selectedAppt) return null

  const handleClose = () => {
    close('appointment')
    onClose()
  }

  const formatPhone = (phone: string) => phone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3')

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end lg:items-center justify-center p-4" onClick={handleClose}>
      <div
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#111827] text-lg">Detalhes do Agendamento</h3>
          <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Fechar">
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
              <p className="text-xs text-gray-500">{formatPhone(selectedAppt.clientPhone)}</p>
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
            href={`https://wa.me/55${selectedAppt.clientPhone}?text=${encodeURIComponent(`Olá ${selectedAppt.clientName.split(' ')[0]}! Seu agendamento de ${selectedAppt.serviceName} está confirmado para ${selectedAppt.date.split('-').reverse().join('/')} às ${selectedAppt.time}. Te espero! ✨ — ${professionalStudioName}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar Mensagem WhatsApp
          </a>

          {/* Ações */}
          {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
            <div className="flex gap-3">
              <button
                onClick={() => { /* updateAppointmentStatus will be called from parent */ handleClose() }}
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
          )}
          <button
            onClick={handleClose}
            className="w-full text-center text-sm text-red-500 hover:text-red-700 font-medium py-2 transition-colors"
          >
            <XCircle className="w-4 h-4 inline mr-1" />
            Cancelar Agendamento
          </button>
        </div>
      </div>
    </div>
  )
}