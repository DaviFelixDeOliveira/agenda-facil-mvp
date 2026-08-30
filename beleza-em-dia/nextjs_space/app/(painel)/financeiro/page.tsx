'use client'

import { useEffect, useState } from 'react'
import { Wallet, TrendingUp, ArrowDownRight, ArrowUpRight, Receipt } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { brl } from '@/lib/utils'
import { motion } from 'framer-motion'
import { chartData } from '@/lib/data/chart-data'
import dynamic from 'next/dynamic'

const FinanceChart = dynamic(() => import('@/components/charts/finance-chart'), { ssr: false, loading: () => <div className="h-64 bg-white rounded-xl animate-pulse" /> })

interface Tx {
  id: string
  date: string
  description: string
  value: number
  type: string
}

const typeLabels: Record<string, { label: string; color: string }> = {
  servico: { label: 'Serviço', color: 'text-emerald-600' },
  sinal: { label: 'Sinal', color: 'text-brand' },
  produto: { label: 'Produto', color: 'text-blue-600' },
}

export default function FinanceiroPage() {
  const [transactions, setTransactions] = useState<Tx[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/transactions')
      .then((r: any) => r.json())
      .then((data: any) => setTransactions(data ?? []))
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false))
  }, [])

  const total = (transactions ?? []).reduce((s: number, t: Tx) => s + (t?.value ?? 0), 0)
  const serviceTotal = (transactions ?? []).filter((t: Tx) => t?.type === 'servico').reduce((s: number, t: Tx) => s + (t?.value ?? 0), 0)
  const otherTotal = total - serviceTotal

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
          <Wallet className="w-6 h-6 text-brand" /> Financeiro
        </h1>
        <p className="text-gray-500 text-sm mt-1">Acompanhe seus ganhos e transações</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total" value={brl(total)} icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard label="Serviços" value={brl(serviceTotal)} icon={<ArrowUpRight className="w-5 h-5" />} trend="Principal fonte" trendUp />
        <StatCard label="Outros" value={brl(otherTotal)} icon={<ArrowDownRight className="w-5 h-5" />} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-5"
      >
        <h2 className="font-bold text-[#111827] mb-4">Faturamento Semanal</h2>
        <div className="h-64">
          <FinanceChart data={chartData} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm"
      >
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#111827]">Transações Recentes</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {loading ? (
            <div className="p-5 space-y-3">
              {[1,2,3].map((i: number) => <div key={i} className="h-10 bg-gray-50 rounded animate-pulse" />)}
            </div>
          ) : (transactions?.length ?? 0) === 0 ? (
            <div className="p-10 text-center">
              <Receipt className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Nenhuma transação registrada</p>
            </div>
          ) : (
            (transactions ?? []).map((t: Tx) => {
              const info = typeLabels[t?.type ?? ''] ?? { label: t?.type ?? '', color: 'text-gray-600' }
              return (
                <div key={t.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{t.description}</p>
                    <p className="text-xs text-gray-400">{t.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#111827]">{brl(t.value)}</p>
                    <p className={`text-xs font-medium ${info.color}`}>{info.label}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </motion.div>
    </div>
  )
}
