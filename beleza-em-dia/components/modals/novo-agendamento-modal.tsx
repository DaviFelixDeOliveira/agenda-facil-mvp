'use client'

import { useState, useEffect } from 'react'
import { X, CalendarPlus, Check, Copy, MessageCircle, ExternalLink, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface Service { id: string; name: string; price: number; duration: number }
interface Client { id: string; name: string; phone: string; phoneFormatted: string }

interface Props {
  open?: boolean
  onClose: () => void
  onSave: (data: {
    clientName: string
    clientPhone: string
    serviceId: string
    date: string
    time: string
    signalPrice: number
  }) => string | void
  services: Service[]
  clients?: Client[]
  apptId?: string | null
  initialClient?: Client | null
}

export function NovoAgendamentoModal({ open = true, onClose, onSave, services, initialClient }: Props) {
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [signalPrice, setSignalPrice] = useState('')

  // State after generation
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)
  const [copiedMsg, setCopiedMsg] = useState(false)
  const [savedData, setSavedData] = useState<{
    clientName: string
    clientPhone: string
    serviceName: string
    date: string
    time: string
    signalPrice: number
    url: string
  } | null>(null)

  useEffect(() => {
    if (open) {
      setClientName(initialClient?.name || '')
      setClientPhone(initialClient?.phoneFormatted || initialClient?.phone || '')
      setServiceId('')
      setDate('')
      setTime('')
      setSignalPrice('')
      setGeneratedLink(null)
      setSavedData(null)
      setCopiedMsg(false)
    }
  }, [open])

  if (!open) return null

  const maskPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  const selectedService = services?.find?.((s: Service) => s.id === serviceId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName.trim() || !clientPhone.trim() || !serviceId || !date || !time) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    const payload = {
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      serviceId,
      date,
      time,
      signalPrice: Number(signalPrice) || 0,
    }

    const createdId = onSave(payload) || `${Date.now()}`
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const confirmationUrl = `${origin}/confirmar/${createdId}`

    setGeneratedLink(confirmationUrl)
    setSavedData({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      serviceName: selectedService?.name || 'Serviço',
      date,
      time,
      signalPrice: Number(signalPrice) || 0,
      url: confirmationUrl,
    })

    toast.success('Agendamento criado e link de confirmação gerado!')
  }

  const getWhatsAppMessage = () => {
    if (!savedData) return ''
    const formattedDate = savedData.date.split('-').reverse().join('/')
    return `Olá ${savedData.clientName}! Seu agendamento para *${savedData.serviceName}* no dia *${formattedDate} às ${savedData.time}* foi pré-reservado no Beleza em Dia. ✨\n\nPara confirmar seu horário${savedData.signalPrice > 0 ? ' e realizar o sinal' : ''}, acesse o link:\n${savedData.url}`
  }

  const handleCopyMessage = () => {
    const msg = getWhatsAppMessage()
    navigator.clipboard.writeText(msg)
    setCopiedMsg(true)
    toast.success('Mensagem com link copiada para a área de transferência!')
    setTimeout(() => setCopiedMsg(false), 2500)
  }

  const cleanPhone = savedData?.clientPhone.replace(/\D/g, '') || ''
  const whatsAppUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(getWhatsAppMessage())}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[#111827] dark:text-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-7 space-y-5 transition-colors">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <CalendarPlus className="w-5 h-5 text-brand" />
            <h2 className="text-lg font-bold text-[#111827] dark:text-white">
              {generatedLink ? 'Link de Confirmação Gerado' : 'Novo Agendamento'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!generatedLink ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome da Cliente */}
            <div>
              <label className="block text-xs font-semibold text-[#111827] dark:text-gray-200 mb-1.5">Nome da Cliente *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nome da cliente"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-brand outline-none"
                required
              />
            </div>

            {/* WhatsApp / Telefone */}
            <div>
              <label className="block text-xs font-semibold text-[#111827] dark:text-gray-200 mb-1.5">WhatsApp / Telefone *</label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(maskPhone(e.target.value))}
                placeholder="(00) 00000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-brand outline-none"
                required
              />
            </div>

            {/* Serviço */}
            <div>
              <label className="block text-xs font-semibold text-[#111827] dark:text-gray-200 mb-1.5">Serviço *</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-brand outline-none"
                required
              >
                <option value="" className="text-gray-400">Selecione um serviço</option>
                {(services ?? []).filter((s: Service) => s !== undefined && s !== null).map((s: Service) => (
                  <option key={s.id} value={s.id} className="text-[#111827] dark:text-white bg-white dark:bg-gray-800">
                    {s.name} — R$ {s?.price?.toFixed?.(2) ?? '0'}
                  </option>
                ))}
              </select>
            </div>

            {selectedService && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Duração: {selectedService.duration}min • Valor: R$ {selectedService.price?.toFixed?.(2)}
              </p>
            )}

            {/* Data e Horário */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#111827] dark:text-gray-200 mb-1.5">Data *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-brand outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] dark:text-gray-200 mb-1.5">Horário *</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-brand outline-none"
                  required
                />
              </div>
            </div>

            {/* Valor do Sinal Pix */}
            <div>
              <label className="block text-xs font-semibold text-[#111827] dark:text-gray-200 mb-1.5">Valor do Sinal Pix (Opcional)</label>
              <input
                type="number"
                value={signalPrice}
                onChange={(e) => setSignalPrice(e.target.value)}
                placeholder="0,00"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white text-sm focus:ring-2 focus:ring-brand outline-none"
                min="0"
                step="5"
              />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Se preenchido, o agendamento ficará pendente até o sinal ser confirmado.</p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
              >
                Salvar e Gerar Link
              </button>
            </div>
          </form>
        ) : (
          /* Tela de Link Gerado e Compartilhamento com Cliente */
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-xs text-emerald-900 dark:text-emerald-200">
                <p className="font-bold text-sm">Pré-reserva cadastrada!</p>
                <p className="mt-0.5">Envie o link abaixo para a cliente confirmar o horário e efetuar o sinal Pix.</p>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Link de Confirmação:</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink)
                    toast.success('Link copiado!')
                  }}
                  className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copiar Link
                </button>
              </div>
              <p className="text-xs font-mono bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-[#111827] dark:text-gray-200 truncate select-all">
                {generatedLink}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar Mensagem no WhatsApp
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#111827] dark:text-white rounded-xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4 text-brand" />
                {copiedMsg ? 'Mensagem Copiada!' : 'Copiar Texto Pronto para WhatsApp'}
              </button>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-[#111827] dark:bg-brand text-white rounded-xl text-xs font-bold hover:bg-black dark:hover:bg-rose-700 transition-colors"
              >
                Concluir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
