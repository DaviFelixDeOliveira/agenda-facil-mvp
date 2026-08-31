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
import { toast } from 'sonner'

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

  // Calculate Pix deposit value
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
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] flex flex-col items-center py-6 px-4 sm:px-6">
      <div className="w-full max-w-lg space-y-6">
        {/* Header da Vitrine / Perfil */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center space-y-3">
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
            <h1 className="text-2xl font-bold text-[#111827]">{professional.studioName}</h1>
            <p className="text-xs font-semibold text-brand mt-0.5">{professional.specialty}</p>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2">
              <MapPin className="w-3.5 h-3.5 text-brand" />
              <span>{professional.address}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-100 leading-relaxed">
            {professional.bio}
          </p>
        </div>

        {/* Passo 1: Selecionar Serviço */}
        {step === 'service' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#111827]">Escolha o Serviço</h2>
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
                        ? 'border-brand bg-rose-50/40 shadow-xs'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-[#111827]">{svc.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {svc.duration} min
                        </span>
                        {professional.pixSinal && (
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                            Sinal Pix: R$ {svcDeposit.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-bold text-[#111827]">
                        R$ {svc.price.toFixed(2).replace('.', ',')}
                      </p>
                      <div className={`w-5 h-5 rounded-full mt-1 ml-auto flex items-center justify-center ${
                        isSelected ? 'bg-brand text-white' : 'border border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              disabled={!selectedService}
              onClick={() => setStep('datetime')}
              className={`w-full py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                selectedService
                  ? 'bg-brand text-white shadow-md shadow-brand/20 hover:bg-rose-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continuar para Data & Horário <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Passo 2: Data e Horário */}
        {step === 'datetime' && currentService && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#111827]">Selecione a Data e Hora</h2>
              <span className="text-xs text-gray-400">Passo 2 de 3</span>
            </div>

            {/* Serviço Escolhido Resumo */}
            <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center justify-between text-xs">
              <span className="font-bold text-[#111827]">{currentService.name}</span>
              <span className="font-bold text-brand">R$ {currentService.price.toFixed(2).replace('.', ',')}</span>
            </div>

            {/* Horários disponíveis */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-700">Horários disponíveis para Hoje:</label>
              <div className="grid grid-cols-3 gap-2">
                {['09:00', '10:30', '14:00', '15:30', '17:00', '18:30'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedTime === time
                        ? 'border-brand bg-brand text-white shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('service')}
                className="px-4 py-3.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
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
          <form onSubmit={handleFinishBooking} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#111827]">Confirmação do Agendamento</h2>
              <span className="text-xs text-gray-400">Passo 3 de 3</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Seu Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fernanda Lima"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Seu WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="(11) 99999-9999"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                />
              </div>
            </div>

            {/* Box de Resumo Financeiro com Sinal Pix */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Serviço:</span>
                <span className="font-bold text-[#111827]">{currentService.name}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Data e Horário:</span>
                <span className="font-bold text-[#111827]">Hoje às {selectedTime}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Valor Total:</span>
                <span className="font-bold text-[#111827]">R$ {currentService.price.toFixed(2).replace('.', ',')}</span>
              </div>

              {professional.pixSinal && (
                <div className="pt-2 border-t border-gray-200 space-y-1.5">
                  <div className="flex justify-between text-brand font-bold text-sm">
                    <span>Taxa de Sinal via Pix ({professional.pixSinalTipo === 'porcentagem' ? `${professional.pixSinalPorcentagem}%` : 'Fixo'}):</span>
                    <span>R$ {depositValue.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-[11px]">
                    <span>Restante a pagar no salão:</span>
                    <span>R$ {remainingValue.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              )}
            </div>

            {professional.pixSinal && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-xs text-emerald-800">
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
                className="px-4 py-3.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
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
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#111827]">Agendamento Solicitado!</h2>
              <p className="text-xs text-gray-500 mt-1">
                Obrigada, {clientName || 'Cliente'}! Enviamos todos os detalhes para seu WhatsApp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left space-y-2 text-xs">
              <p><strong>Serviço:</strong> {currentService.name}</p>
              <p><strong>Horário:</strong> Hoje às {selectedTime}</p>
              <p><strong>Local:</strong> {professional.address}</p>
              {professional.pixSinal && (
                <p className="text-emerald-700 font-bold">
                  Sinal Pix Pago: R$ {depositValue.toFixed(2).replace('.', ',')}
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setStep('service')
                setSelectedService(null)
              }}
              className="w-full py-3.5 bg-[#111827] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
            >
              Fazer Novo Agendamento
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
