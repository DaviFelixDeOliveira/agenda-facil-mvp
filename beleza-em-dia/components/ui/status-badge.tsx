'use client'

import { cn } from '@/lib/utils'

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  confirmado: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Confirmado' },
  pendente: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Pendente' },
  finalizado: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Finalizado' },
  cancelado: { bg: 'bg-red-50', text: 'text-red-700', label: 'Cancelado' },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status ?? ''] ?? statusConfig.pendente
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', config?.bg, config?.text)}>
      {config?.label ?? status}
    </span>
  )
}
