'use client'

import { useState } from 'react'
import { useMockStore } from '@/context/mock-store'
import { brl } from '@/lib/utils'
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Download,
  CreditCard,
  Banknote,
  Smartphone,
} from 'lucide-react'

type FilterTab = 'today' | 'week' | 'month'

const methodIcons: Record<string, React.ReactNode> = {
  PIX: <Smartphone className="w-4 h-4" />,
  'CRÉDITO': <CreditCard className="w-4 h-4" />,
  'DÉBITO': <CreditCard className="w-4 h-4" />,
  DINHEIRO: <Banknote className="w-4 h-4" />,
}

const methodColors: Record<string, string> = {
  PIX: 'bg-emerald-50 text-emerald-700',
  'CRÉDITO': 'bg-blue-50 text-blue-700',
  'DÉBITO': 'bg-purple-50 text-purple-700',
  DINHEIRO: 'bg-amber-50 text-amber-700',
}

export default function FinanceiroPage() {
  const { financial, transactions } = useMockStore()
  const [activeTab, setActiveTab] = useState<FilterTab>('month')

  const displayValue = activeTab === 'today' ? financial.today
    : activeTab === 'week' ? financial.week
    : financial.month

  const maxBarValue = Math.max(...financial.weeklyChart.map(d => d.value))

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Financeiro</h1>
          <p className="text-gray-500 text-sm mt-0.5">Acompanhe seu faturamento e transações</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-[#111827] hover:bg-gray-50 transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Exportar</span>
        </button>
      </div>

      {/* Card Faturamento Principal */}
      <div className="bg-[#111827] rounded-2xl p-5 text-white relative overflow-hidden">
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
                    ? 'bg-brand text-white'
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
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
            +{financial.growth}%
            <ArrowUpRight className="w-4 h-4" />
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Crescimento vs. mês anterior</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-brand" />
            </div>
          </div>
          <p className="text-lg font-bold text-[#111827]">{brl(financial.averageTicket)}</p>
          <p className="text-xs text-gray-500 mt-0.5">Ticket Médio</p>
        </div>
      </div>

      {/* Gráfico de Barras Semanal */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="font-bold text-[#111827] text-sm mb-4">Faturamento Semanal</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {financial.weeklyChart.map((d, i) => {
            const height = maxBarValue > 0 ? (d.value / maxBarValue) * 100 : 0
            const isHighest = d.value === maxBarValue && d.value > 0
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-gray-500 font-medium">{d.value > 0 ? brl(d.value) : ''}</span>
                <div className="w-full relative flex-1 flex items-end justify-center">
                  <div
                    className={`w-full max-w-[36px] rounded-t-lg transition-all ${
                      isHighest ? 'bg-brand' : 'bg-rose-100'
                    }`}
                    style={{ height: `${Math.max(height, 4)}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-semibold">{d.day}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Transações Recentes */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#111827] text-sm">Transações Recentes</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {transactions.map(tx => (
            <div key={tx.id} className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${methodColors[tx.method] || 'bg-gray-50 text-gray-600'}`}>
                  {methodIcons[tx.method] || <DollarSign className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#111827] truncate">{tx.clientName}</p>
                  <p className="text-xs text-gray-500 truncate">{tx.serviceName}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-emerald-600">+{brl(tx.amount)}</p>
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${methodColors[tx.method] || 'bg-gray-100 text-gray-600'}`}>
                  {tx.method}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
