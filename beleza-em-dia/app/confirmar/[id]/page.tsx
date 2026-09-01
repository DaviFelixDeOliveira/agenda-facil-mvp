'use client'

import { useState, useEffect, useCallback } from 'react'
import { useMockStore } from '@/context/mock-store'
import { QrCode, Mail, Phone, CheckCircle2, X, Calendar, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface Appointment {
  id: string
  clientName: string
  clientPhone: string
  serviceName: string
  price: number
  date: string
  time: string
  status: 'confirmado' | 'pendente' | 'finalizado' | 'cancelado'
  signalPaid: boolean
  signalAmount: number
}

export default function ConfirmationPage() {
  const { professional, appointments, updateAppointmentStatus } = useMockStore()

  const params = new URLSearchParams(window.location.search)
  const appointmentId = params.get('id')

  const [appt, setAppt] = useState<Appointment | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  useEffect(() => {
    if (appointmentId) {
      const found = appointments.find((a: any) => a.id === appointmentId)
      if (found) {
        setAppt({
          id: found.id,
          clientName: found.clientName,
          clientPhone: found.clientPhone,
          serviceName: found.serviceName,
          price: found.price,
          date: found.date,
          time: found.time,
          status: found.status,
          signalPaid: found.signalPaid,
          signalAmount: found.signalAmount,
        })
      }
    }
  }, [appointmentId])

  const handlePaymentConfirm = useCallback(() => {
    if (!appt) return
    updateAppointmentStatus(appt.id, 'confirmado')
    setPaymentConfirmed(true)
    toast.success('Pagamento confirmado!', {
      description: 'O status do agendamento foi atualizado para Confirmado.',
    })
  }, [appt, updateAppointmentStatus])

  if (!appt) return <div className="min-h-screen flex items-center justify-center p-4">Agendamento não encontrado</div>

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 sm:p-6">
      <div className="max-w-lg w-full space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Confirmação de Reserva</h1>
              <p className="text-sm text-gray-500">Link de confirmação recebido</p>
            </div>
            <button onClick={() => window.history.back()} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Resumo da Reserva */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Profissional</p>
              <p className="text-sm font-bold text-[#111827]">{professional.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Serviço</p>
              <p className="text-sm font-bold text-[#111827]">{appt.serviceName}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Data</p>
              <p className="text-sm font-bold text-[#111827]">{appt.date}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Horário</p>
              <p className="text-sm font-bold text-[#111827]">{appt.time}</p>
            </div>
          </div>

          {/* Status do Agendamento */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              appt.status === 'confirmado' ? 'bg-brand text-white' : appt.status === 'pendente' ? 'bg-brand/20 text-brand' : 'bg-gray-200 text-gray-500'
            }`}>
              {appt.status === 'confirmado' ? 'Confirmado' : appt.status === 'pendente' ? 'Pendente de Sinal' : appt.status}
            </span>
          </div>

          {/* Sinal Pix - Se Pendente */}
          {appt.status === 'pendente' && (
            <div className="p-5 bg-brand/10 border border-brand rounded-2xl space-y-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Pagamento do Sinal</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand">Valor do Sinal</span>
                  <span className="text-2xl font-bold text-brand">R$ {appt.signalAmount.toFixed(2).replace('.', ',')}</span>
                </div>

                <div className="flex items-center gap-3">
                  <QrCode className="w-10 h-10 text-brand" />
                  <div>
                    <p className="font-medium text-brand">Chave Pix Copia e Cola</p>
                    <p className="text-xs text-gray-500 monospace bg-gray-100 p-3 rounded copy-text">chave.pix@exemplo.com</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  O valor do sinal deve ser pago via Pix para confirmar o horário. Após o pagamento, o status será atualizado para 'Confirmado'.
                </p>

                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full py-2.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
                >
                  Confirmar Pagamento
                </button>
              </div>
            </div>
          )}

          {/* Tela de Sucesso após Pagamento */}
          {paymentConfirmed && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-green-500 text-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#111827]">Reserva Confirmada!</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Obrigado, {appt.clientName}! Seu agendamento foi confirmado.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left space-y-2 text-xs">
                <p><strong>Profissional:</strong> {professional.name}</p>
                <p><strong>Serviço:</strong> {appt.serviceName}</p>
                <p><strong>Data:</strong> {appt.date}</p>
                <p><strong>Horário:</strong> {appt.time}</p>
              </div>

              <button
                onClick={() => window.history.back()}
                className="w-full py-3.5 bg-[#111827] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
              >
                Fechar
              </button>
            </div>
          )}

          {/* QR Code e PIX Details Modal */}
          {showPayment && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPayment(false)}>
              <div
                className="bg-white rounded-3xl p-6 max-w-sm w-full animate-fade-in"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-[#111827] text-center mb-4">Detalhes do Pagamento Pix</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-12 h-12 text-brand" />
                    <div>
                      <p className="font-medium text-brand">Chave Pix Copia e Cola</p>
                      <p className="text-xs text-gray-500 monospace bg-gray-100 p-3 rounded">
                        chave.pix@exemplo.com
                        <br />
                        Copiar: <span className="text-brand font-medium" onClick={() => navigator.clipboard.copyText('chave.pix@exemplo.com')}>Copiar</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium text-brand">Valor do Sinal</p>
                    <p className="text-3xl font-bold text-brand">R$ {appt.signalAmount.toFixed(2).replace('.', ',')}</p>
                  </div>

                  <p className="text-sm text-gray-500">
                    Escaneie o QR Code ou copie a chave Pix para realizar o pagamento. Após o pagamento, clique em "Confirmar Pagamento" abaixo.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={handlePaymentConfirm}
                    className="w-full py-2.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
                  >
                    Confirmar Pagamento e Atualizar Status
                  </button>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}