'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
  prefix?: string
  animate?: boolean
}

export function StatCard({ label, value, icon, trend, trendUp, prefix = '', animate = false }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!animate || !inView || typeof value !== 'number') return
    let start = 0
    const end = value as number
    const duration = 800
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setDisplayValue(end)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [animate, inView, value])

  return (
    <div ref={ref} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-[#111827]">
            {prefix}{typeof displayValue === 'number' ? displayValue.toLocaleString('pt-BR') : displayValue}
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-brand">
          {icon}
        </div>
      </div>
      {trend && (
        <p className={cn('text-xs mt-2 font-medium', trendUp ? 'text-success' : 'text-gray-500')}>
          {trend}
        </p>
      )}
    </div>
  )
}
