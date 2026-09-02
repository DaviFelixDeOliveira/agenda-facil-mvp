'use client'

import { StatusBadge } from '@/components/ui/status-badge'
import { useState } from 'react'
import { brl, initials } from '@/lib/utils'
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  CalendarClock,
  XCircle,
  X,
} from 'lucide-react'
import type { MockAppointment } from '@/lib/mock-data'
import { useModalManager } from '@/context/modal-manager'
import { useMockStore } from '@/context/mock-store'
import { toast } from 'sonner'

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15c-1.49 0-2.94-.4-4.22-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.21 8.21 0 01-1.26-4.38c0-4.54 3.7-8.24 8.27-8.24 2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 012.43 5.84c0 4.55-3.7 8.23-8.27 8.23zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.98.69.46-.04 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.12-.22-.19-.47-.31z" />
    </svg>
  )
}

interface AppointmentModalProps {
  professionalStudioName: string
  onClose: () => void
}

export function AppointmentModal({ professionalStudioName, onClose }: AppointmentModalProps) {
  const { close, getData, isOpen } = useModalManager()
  const { updateAppointment, addTransaction } = useMockStore()
  const [showReschedule, setShowReschedule] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [confirmation, setConfirmation] = useState<'signal' | 'complete' | 'cancel' | null>(null)
  const [cancelReason, setCancelReason] = useState('')
  const [notifyCancellation, setNotifyCancellation] = useState(true)
  const selectedAppt = getData<MockAppointment>('appointment')

  if (!isOpen('appointment') || !selectedAppt) return null

  const handleClose = () => {
    close('appointment')
    onClose?.()
  }

  const formatPhone = (phone: string) => phone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3')
  const whatsappMessage = selectedAppt.status === 'cancelado'
    ? `Olá ${selectedAppt.clientName.split(' ')[0]}, seu agendamento de ${selectedAppt.serviceName} foi cancelado. Motivo: ${selectedAppt.motivoCancelamento || 'indisponibilidade da agenda'}.`
    : `Olá ${selectedAppt.clientName.split(' ')[0]}! Seu agendamento de ${selectedAppt.serviceName} está confirmado para ${selectedAppt.date.split('-').reverse().join('/')} às ${selectedAppt.time}. Te espero! ✨ — ${professionalStudioName}`

  const confirmSignal = () => {
    updateAppointment(selectedAppt.id, { signalPaid: true, status: 'confirmado' })
    toast.success('Sinal confirmado e agendamento atualizado.')
    handleClose()
  }

  const completeAppointment = () => {
    if (selectedAppt.status === 'finalizado') return
    updateAppointment(selectedAppt.id, { status: 'finalizado' })
    const remaining = Math.max(0, selectedAppt.price - (selectedAppt.signalPaid ? selectedAppt.signalAmount : 0))
    if (remaining > 0) {
      addTransaction({
        id: `tx_${Date.now()}`,
        date: 'Hoje, agora',
        clientName: selectedAppt.clientName,
        serviceName: selectedAppt.serviceName,
        amount: remaining,
        method: 'PIX',
        type: 'servico',
      })
    }
    toast.success('Atendimento concluído e saldo lançado no financeiro.')
    handleClose()
  }

  const cancelAppointment = () => {
    if (!cancelReason.trim()) return
    updateAppointment(selectedAppt.id, { status: 'cancelado', motivoCancelamento: cancelReason.trim() })
    toast.success('Agendamento cancelado.')
    handleClose()
  }

  const reschedule = (event: React.FormEvent) => {
    event.preventDefault()
    if (!newDate || !newTime) return
    updateAppointment(selectedAppt.id, { date: newDate, time: newTime, status: 'confirmado' })
    toast.success('Agendamento remarcado com sucesso.')
    setShowReschedule(false)
    handleClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end lg:items-center justify-center p-4" onClick={handleClose}>
      <div
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[#111827] dark:text-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-2xl animate-fade-in shadow-2xl transition-colors"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-[#111827] dark:text-white text-lg">Detalhes do Agendamento</h3>
          <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Fechar">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Status + sinal */}
          <div className="flex items-center justify-between">
            <StatusBadge status={selectedAppt.status} />
            {selectedAppt.signalPaid ? (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full font-medium border border-emerald-200 dark:border-emerald-800">
                ✓ Sinal pago ({brl(selectedAppt.signalAmount)})
              </span>
            ) : (
              <span className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-full font-medium border border-amber-200 dark:border-amber-800">
                Sinal pendente ({brl(selectedAppt.signalAmount)})
              </span>
            )}
          </div>

          {/* Dados da cliente */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/50 text-brand text-sm font-bold flex items-center justify-center">
              {initials(selectedAppt.clientName)}
            </div>
            <div>
              <p className="font-semibold text-[#111827] dark:text-white">{selectedAppt.clientName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formatPhone(selectedAppt.clientPhone)}</p>
            </div>
          </div>

          {/* Card do serviço */}
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#111827] dark:text-white text-sm">{selectedAppt.serviceName}</p>
              <p className="font-bold text-brand text-lg">{brl(selectedAppt.price)}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">&ldquo;{selectedAppt.notes}&rdquo;</p>
            )}
          </div>

          {/* Botão WhatsApp */}
          <a
            href={`https://wa.me/55${selectedAppt.clientPhone}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Enviar Mensagem WhatsApp
          </a>

          {/* Ações */}
          {selectedAppt.status === 'cancelado' && selectedAppt.motivoCancelamento && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              <p className="font-bold">Motivo do cancelamento</p>
              <p className="mt-1">{selectedAppt.motivoCancelamento}</p>
            </div>
          )}

          {selectedAppt.status === 'finalizado' && (
            <p className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" /> Atendimento concluído
            </p>
          )}

          {selectedAppt.status === 'pendente' && !selectedAppt.signalPaid && (
            <button onClick={() => setConfirmation('signal')} className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-xl font-semibold text-sm hover:bg-amber-100 transition-colors">
              <CheckCircle2 className="w-4 h-4" /> Confirmar Sinal
            </button>
          )}

          {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmation('complete')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl font-medium text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Concluído
              </button>
              <button
                onClick={() => {
                  setNewDate(selectedAppt.date)
                  setNewTime(selectedAppt.time)
                  setShowReschedule(true)
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-xl font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <CalendarClock className="w-4 h-4" />
                Remarcar
              </button>
            </div>
          )}
          {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
            <button onClick={() => setConfirmation('cancel')} className="w-full text-center text-sm text-red-500 hover:text-red-700 font-medium py-2 transition-colors">
              <XCircle className="w-4 h-4 inline mr-1" /> Cancelar Agendamento
            </button>
          )}

          {showReschedule && (
            <form onSubmit={reschedule} className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3">
              <p className="text-sm font-bold">Escolha o novo horário</p>
              <div className="grid grid-cols-2 gap-3">
                <input required type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
                <input required type="time" value={newTime} onChange={(event) => setNewTime(event.target.value)} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm" />
              </div>
              <button type="submit" className="w-full rounded-xl bg-brand py-2.5 text-sm font-bold text-white">Salvar novo horário</button>
            </form>
          )}

          {confirmation && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4" onClick={() => setConfirmation(null)}>
              <div className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-900" onClick={(event) => event.stopPropagation()}>
                <h4 className="text-base font-bold text-[#111827] dark:text-white">
                  {confirmation === 'cancel' ? 'Cancelar agendamento' : 'Confirmar ação'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {confirmation === 'cancel' ? 'Tem certeza que deseja cancelar? Informe o motivo.' : confirmation === 'complete' ? 'Tem certeza que deseja marcar este atendimento como concluído e lançar o saldo no financeiro?' : 'Tem certeza que deseja confirmar o recebimento do sinal?'}
                </p>
                {confirmation === 'cancel' && (
                  <>
                    <textarea required autoFocus value={cancelReason} onChange={(event) => setCancelReason(event.target.value)} placeholder="Motivo do cancelamento" className="min-h-20 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800" />
                    <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"><input type="checkbox" checked={notifyCancellation} onChange={(event) => setNotifyCancellation(event.target.checked)} /> Enviar mensagem automática pelo WhatsApp</label>
                  </>
                )}
                <div className="flex gap-2">
                  <button type="button" onClick={() => setConfirmation(null)} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold dark:border-gray-700">Voltar</button>
                  {confirmation === 'cancel' && notifyCancellation ? (
                    <button type="button" onClick={() => { if (!cancelReason.trim()) return; cancelAppointment(); window.open(`https://wa.me/55${selectedAppt.clientPhone}?text=${encodeURIComponent(`Olá ${selectedAppt.clientName.split(' ')[0]}, seu agendamento de ${selectedAppt.serviceName} foi cancelado. Motivo: ${cancelReason.trim()}`)}`, '_blank', 'noopener,noreferrer') }} className="flex-1 rounded-xl bg-red-600 py-2.5 text-center text-sm font-bold text-white">Cancelar e avisar</button>
                  ) : (
                    <button type="button" onClick={() => { if (confirmation === 'signal') confirmSignal(); else if (confirmation === 'complete') completeAppointment(); else cancelAppointment() }} className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-bold text-white">Confirmar</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}