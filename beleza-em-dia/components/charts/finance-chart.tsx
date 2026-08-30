'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { ChartDataType } from '@/lib/types'

export default function FinanceChart({ data }: { data: ChartDataType[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data ?? []} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <XAxis
          dataKey="d"
          tickLine={false}
          tick={{ fontSize: 11, fill: '#6B7280' }}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          tick={{ fontSize: 10, fill: '#6B7280' }}
          axisLine={false}
          tickFormatter={(v: number) => `R$${v}`}
        />
        <Tooltip
          formatter={(v: any) => [`R$ ${Number(v ?? 0).toLocaleString('pt-BR')}`, 'Faturamento']}
          contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
        />
        <Bar dataKey="v" fill="#E11D48" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
