'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useMockStore } from '@/context/mock-store'
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Check,
  ChevronRight,
  Phone,
  ArrowRight,
  ShieldCheck,
  QrCode,
} from 'lucide-react'
export default function PublicBookingPage() {
  const { professional, services, schedule } = useMockStore()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState('2026-11-15')
  const [selectedTime, setSelectedTime] = useState('14:00')
  const [step, setStep] = useState<'service' | 'datetime' | 'confirm' | 'success'>('service')

  // Customer Form
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')

  const activeServices = services.filter((s) => s.active)
  const currentService = services.find((s) => s.id === selectedService)

  const calculateDeposit = (price: number) => {
    if (!professional.pixSinal) return 0
    if (professional.pixSinalTipo === 'porcentagem') {
      return (price * (professional.pixSinalPorcentagem / 100))
    }
    return professional.pixSinalValor
  }

  const depositValue = currentService ? calculateDeposit(currentService.price) : 0
  const remainingValue = currentService ? Math.max(0, currentService.price - depositValue) : 0

  const handleFinishBooking = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('success')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#090D16] text-[#111827] dark:text-white flex flex-col items-center py-6 px-4 sm:px-6 transition-colors">
      <div className="w-full max-w-lg space-y-6">
        {/* Header da Vitrine / Perfil */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center space-y-3 transition-colors">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <Image
              src={professional.avatar}
              alt={professional.studioName}
              width={112}
              height={112}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] dark:text-white">{professional.studioName}</h1>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand" />
              <span>{professional.address}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 leading-relaxed">
            {professional.bio}
          </p>
        </div>

        {/* Passo 1: Selecionar Serviço */}
        {step === 'service' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 space-y-4 animate-fade-in transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#111827] dark:text-white">Escolha o Serviço</h2>
              <span className="text-xs text-gray-400">Passo 1 de 3</span>
            </div>

            <div className="space-y-2.5">
              {activeServices.map((svc) => {
                const isSelected = selectedService === svc.id
                const svcDeposit = calculateDeposit(svc.price)
                return (
                  <div
                    key={svc.id}
                    onClick={() => setSelectedService(svc.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-brand bg-rose-50/40 dark:bg-rose-950/40 shadow-xs'
                        : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm text-[#111827] dark:text-white">{svc.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Duração: {svc.duration} min</p>
                      {professional.pixSinal && (
                        <span className="inline-block mt-1 text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200 dark:border-emerald-800">
                          Sinal Pix: R$ {svcDeposit.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-base text-brand">
                        R$ {svc.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              disabled={!selectedService}
              onClick={() => setStep('datetime')}
              className="w-full py-4 bg-brand text-white rounded-2xl font-bold text-sm hover:bg-rose-700 transition-all shadow-md shadow-brand/20 disabled:opacity-40 flex items-center justify-center gap-2"
            >
              Continuar <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Passo 2: Data e Horário */}
        {step === 'datetime' && currentService && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 space-y-5 animate-fade-in transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#111827] dark:text-white">Escolha a Data e Horário</h2>
              <span className="text-xs text-gray-400">Passo 2 de 3</span>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Data Disponível</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#111827] dark:text-white font-semibold outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Horários Livres</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {['09:00', '10:00', '11:30', '14:00', '15:30', '17:00'].map((time) => {
                  const isSelected = selectedTime === time
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'border-brand bg-brand text-white shadow-xs'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('service')}
                className="px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep('confirm')}
                className="flex-1 py-3.5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-all shadow-md shadow-brand/20 flex items-center justify-center gap-2"
              >
                Avançar para Confirmação <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Passo 3: Confirmação & Pagamento de Sinal */}
        {step === 'confirm' && currentService && (
          <form onSubmit={handleFinishBooking} className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 space-y-5 animate-fade-in transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#111827] dark:text-white">Seus Dados e Pagamento</h2>
              <span className="text-xs text-gray-400">Passo 3 de 3</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Seu Nome Completo *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Ana Clara"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Seu WhatsApp *</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#111827] dark:text-white outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>
            </div>

            {/* Resumo Financeiro */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-[#111827] dark:text-white text-sm">
                <span>Serviço:</span>
                <span>{currentService.name}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Horário Reservado:</span>
                <span>{selectedDate} às {selectedTime}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Valor Total:</span>
                <span className="font-bold">R$ {currentService.price.toFixed(2).replace('.', ',')}</span>
              </div>

              {professional.pixSinal && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
                  <div className="flex justify-between text-brand font-bold text-sm">
                    <span>Taxa de Sinal via Pix ({professional.pixSinalTipo === 'porcentagem' ? `${professional.pixSinalPorcentagem}%` : 'Fixo'}):</span>
                    <span>R$ {depositValue.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 text-[11px]">
                    <span>Restante a pagar no salão:</span>
                    <span>R$ {remainingValue.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              )}
            </div>

            {professional.pixSinal && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <p>
                  O pagamento do sinal de <strong>R$ {depositValue.toFixed(2).replace('.', ',')}</strong> garante a sua reserva e evita que outra pessoa ocupe o mesmo horário.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-brand text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-all shadow-md shadow-brand/20 flex items-center justify-center gap-2"
              >
                Confirmar e Pagar Sinal <Check className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Passo 4: Sucesso */}
        {step === 'success' && currentService && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 text-center space-y-5 animate-fade-in transition-colors">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#111827] dark:text-white">Agendamento Solicitado!</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Obrigada, {clientName || 'Cliente'}! Enviamos todos os detalhes para seu WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-left space-y-2 text-xs">
              <p><strong>Serviço:</strong> {currentService.name}</p>
              <p><strong>Horário:</strong> Hoje às {selectedTime}</p>
              <p><strong>Local:</strong> {professional.address}</p>
              {professional.pixSinal && (
                <p className="text-emerald-700 dark:text-emerald-400 font-bold">
                  Sinal Pix Pago: R$ {depositValue.toFixed(2).replace('.', ',')}
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setStep('service')
                setSelectedService(null)
              }}
              className="w-full py-3.5 bg-[#111827] dark:bg-brand text-white rounded-xl text-xs font-bold hover:bg-black dark:hover:bg-rose-700 transition-colors shadow-sm"
            >
              Fazer Novo Agendamento
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
