'use client'

import { X, MessageCircle, Receipt } from 'lucide-react'
import { brl } from '@/lib/utils'
import type { MockTransaction } from '@/lib/mock-data'

interface Props {
  transaction: MockTransaction | null
  onClose: () => void
}

export function TransactionDetailModal({ transaction, onClose }: Props) {
  if (!transaction) return null

  const message = `Olá ${transaction.clientName}! Segue o recibo do atendimento de ${transaction.serviceName}: ${brl(transaction.amount)} via ${transaction.method}.`
  const phone = transaction.clientPhone?.replace(/\D/g, '')

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-md space-y-5 rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-900" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
          <div className="flex items-center gap-2"><Receipt className="h-5 w-5 text-brand" /><h3 className="font-bold text-[#111827] dark:text-white">Detalhes da transação</h3></div>
          <button type="button" onClick={onClose} aria-label="Fechar" className="text-gray-400 hover:text-gray-700"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Cliente</span><strong className="text-[#111827] dark:text-white">{transaction.clientName}</strong></div>
          <div className="flex justify-between gap-4"><span className="text-gray-500">Serviço</span><strong className="text-right text-[#111827] dark:text-white">{transaction.serviceName}</strong></div>
          <div className="flex justify-between"><span className="text-gray-500">Valor</span><strong className="text-emerald-600">{brl(transaction.amount)}</strong></div>
          <div className="flex justify-between"><span className="text-gray-500">Pagamento</span><strong className="text-[#111827] dark:text-white">{transaction.method}</strong></div>
          <div className="flex justify-between"><span className="text-gray-500">Data e horário</span><strong className="text-[#111827] dark:text-white">{transaction.date}</strong></div>
        </div>
        {phone && <a href={`https://wa.me/55${phone}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"><MessageCircle className="h-4 w-4" /> Enviar recibo pelo WhatsApp</a>}
      </div>
    </div>
  )
}
