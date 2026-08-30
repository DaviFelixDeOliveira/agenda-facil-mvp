import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function brl(v: number | null | undefined): string {
  return (v ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  const parts = dateStr?.split?.('-') ?? []
  if (parts?.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
  return dateStr ?? ''
}

export function initials(name: string | null | undefined): string {
  if (!name) return '??'
  return (name ?? '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w?.[0]?.toUpperCase?.() ?? '')
    .join('')
}

export function timeToMinutes(time: string | null | undefined): number {
  if (!time) return 0
  const [h, m] = (time ?? '00:00').split(':').map(Number)
  return (h ?? 0) * 60 + (m ?? 0)
}
