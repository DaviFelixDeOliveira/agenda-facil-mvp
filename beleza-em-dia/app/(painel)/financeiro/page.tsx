'use client'

import { useState } from 'react'
import { useMockStore } from '@/context/mock-store'
import { brl } from '@/lib/utils'
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  CreditCard,
  Banknote,
  Smartphone,
} from 'lucide-react'
import { toast } from 'sonner'
import { TransactionDetailModal } from '@/components/modals/transaction-detail-modal'

type FilterTab = 'today' | 'week' | 'month'

const methodIcons: Record<string, React.ReactNode> = {
  PIX: <Smartphone className="w-4 h-4" />,
  'CRÉDITO': <CreditCard className="w-4 h-4" />,
  'DÉBITO': <CreditCard className="w-4 h-4" />,
  DINHEIRO: <Banknote className="w-4 h-4" />,
}

const methodColors: Record<string, string> = {
  PIX: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
  'CRÉDITO': 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
  'DÉBITO': 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
  DINHEIRO: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
}

export default function FinanceiroPage() {
  const { financial, transactions } = useMockStore()
  const [activeTab, setActiveTab] = useState<FilterTab>('month')
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[number] | null>(null)

  const displayValue = activeTab === 'today' ? financial.today
    : activeTab === 'week' ? financial.week
    : financial.month

  const maxBarValue = Math.max(...financial.weeklyChart.map(d => d.value))

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Financeiro</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Acompanhe seu faturamento e transações</p>
        </div>
      </div>

      {/* Card Faturamento Principal */}
      <div className="bg-[#111827] dark:bg-gray-900 border border-gray-800 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg transition-colors">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand/10 blur-2xl" />
        <div className="relative z-10">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Faturamento Total</p>
          <p className="text-3xl font-bold mt-2">{brl(displayValue)}</p>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {([
              { key: 'today', label: 'Hoje' },
              { key: 'week', label: 'Semana' },
              { key: 'month', label: 'Mês' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-brand text-white shadow-xs'
                    : 'bg-white/10 text-gray-300 hover:bg-white/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-4 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            +{financial.growth}%
            <ArrowUpRight className="w-4 h-4" />
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Crescimento vs. mês anterior</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-4 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-brand" />
            </div>
          </div>
          <p className="text-lg font-bold text-[#111827] dark:text-white">{brl(financial.averageTicket)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ticket Médio</p>
        </div>
      </div>

      {/* Gráfico de Barras Semanal */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 transition-colors">
        <h3 className="font-bold text-[#111827] dark:text-white text-sm mb-4">Faturamento Semanal</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {financial.weeklyChart.map((d) => {
            const height = maxBarValue > 0 ? (d.value / maxBarValue) * 100 : 0
            const isHighest = d.value === maxBarValue && d.value > 0
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{d.value > 0 ? brl(d.value) : ''}</span>
                <div className="w-full relative flex-1 flex items-end justify-center">
                  <div
                    className={`w-full max-w-[36px] rounded-t-lg transition-all ${
                      isHighest ? 'bg-brand' : 'bg-rose-100 dark:bg-rose-950/60'
                    }`}
                    style={{ height: `${Math.max(height, 4)}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold">{d.day}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Transações Recentes */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-[#111827] dark:text-white text-sm">Transações Recentes</h3>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {transactions.map(tx => (
            <button type="button" key={tx.id} onClick={() => setSelectedTransaction(tx)} className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors text-left">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${methodColors[tx.method] || 'bg-gray-50 text-gray-600'}`}>
                  {methodIcons[tx.method] || <DollarSign className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#111827] dark:text-white truncate">{tx.clientName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tx.serviceName}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+{brl(tx.amount)}</p>
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${methodColors[tx.method] || 'bg-gray-100 text-gray-600'}`}>
                  {tx.method}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <TransactionDetailModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
    </div>
  )
}
