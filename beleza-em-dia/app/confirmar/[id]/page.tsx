'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useMockStore } from '@/context/mock-store'
import { QrCode, CheckCircle2, Check, X, Calendar, Clock, ShieldCheck, Copy } from 'lucide-react'
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
  const params = useParams()
  const searchParams = useSearchParams()

  const appointmentId = (params?.id as string) || searchParams?.get('id')

  const [appt, setAppt] = useState<Appointment | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [copiedPix, setCopiedPix] = useState(false)

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
      } else {
        // Mock fallback if not found
        setAppt({
          id: appointmentId,
          clientName: 'Cliente Especial',
          clientPhone: '(11) 99999-8888',
          serviceName: 'Manicure Completa',
          price: 65,
          date: '2026-11-15',
          time: '14:00',
          status: 'pendente',
          signalPaid: false,
          signalAmount: 30,
        })
      }
    }
  }, [appointmentId, appointments])

  const handlePaymentConfirm = useCallback(() => {
    if (!appt) return
    updateAppointmentStatus(appt.id, 'confirmado')
    setPaymentConfirmed(true)
    setShowPayment(false)
    setAppt(prev => prev ? { ...prev, status: 'confirmado', signalPaid: true } : null)
    toast.success('Pagamento confirmado!', {
      description: 'O status do agendamento foi atualizado para Confirmado.',
    })
  }, [appt, updateAppointmentStatus])

  const handleCopyPix = () => {
    navigator.clipboard.writeText('chave.pix@studiobian.com.br')
    setCopiedPix(true)
    toast.success('Chave Pix copiada!')
    setTimeout(() => setCopiedPix(false), 2000)
  }

  if (!appt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#090D16] p-4 text-[#111827] dark:text-white">
        <p className="text-sm font-medium">Carregando agendamento...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#090D16] text-[#111827] dark:text-white flex flex-col items-center py-8 px-4 sm:px-6 transition-colors">
      <div className="max-w-lg w-full space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6 transition-colors">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h1 className="text-xl font-bold text-[#111827] dark:text-white">Confirmação de Reserva</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Revise os detalhes do seu agendamento</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
              appt.status === 'confirmado'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            }`}>
              {appt.status === 'confirmado' ? 'Confirmado' : 'Pendente de Sinal'}
            </span>
          </div>

          {/* Resumo da Reserva */}
          <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Profissional / Salão:</span>
              <span className="font-bold text-[#111827] dark:text-white">{professional.studioName} ({professional.name})</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Serviço Escolhido:</span>
              <span className="font-bold text-[#111827] dark:text-white">{appt.serviceName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Data e Horário:</span>
              <span className="font-bold text-[#111827] dark:text-white">{appt.date} às {appt.time}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Valor Total:</span>
              <span className="font-bold text-brand text-sm">R$ {appt.price.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Sinal Pix - Se Pendente */}
          {appt.status === 'pendente' && !paymentConfirmed && (
            <div className="p-5 bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand uppercase tracking-wider">Sinal Necessário</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Para garantir sua vaga na agenda</p>
                </div>
                <span className="text-2xl font-extrabold text-brand">R$ {appt.signalAmount.toFixed(2).replace('.', ',')}</span>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Chave Pix Copia e Cola:</span>
                  <button
                    onClick={handleCopyPix}
                    className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedPix ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <p className="text-xs font-mono bg-gray-50 dark:bg-gray-900 p-2.5 rounded-lg text-[#111827] dark:text-gray-200 break-all select-all">
                  chave.pix@studiobian.com.br
                </p>
              </div>

              <button
                onClick={() => setShowPayment(true)}
                className="w-full py-3.5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-colors shadow-md shadow-brand/20 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Informar Pagamento do Sinal
              </button>
            </div>
          )}

          {/* Tela de Sucesso após Pagamento */}
          {paymentConfirmed && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Reserva Confirmada com Sucesso!</h2>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Seu horário está garantido. Te esperamos no horário agendado! ✨
              </p>
            </div>
          )}

          {/* Modal de Detalhes Pix */}
          {showPayment && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={() => setShowPayment(false)}>
              <div
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[#111827] dark:text-white rounded-3xl p-6 max-w-sm w-full animate-fade-in shadow-2xl space-y-4"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-center">Pagamento do Sinal Pix</h3>

                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <QrCode className="w-24 h-24 text-brand mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Aponte a câmera no app do seu banco</p>
                  <p className="text-xl font-bold text-brand mt-1">R$ {appt.signalAmount.toFixed(2).replace('.', ',')}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handlePaymentConfirm}
                    className="w-full py-3 bg-brand text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
                  >
                    Confirmar Pagamento Realizado
                  </button>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="w-full py-2.5 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                  >
                    Fechar
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