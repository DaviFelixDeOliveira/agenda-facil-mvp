'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import type { MockService } from '@/lib/mock-data'
import { validateServiceName } from '@/lib/validation'

export const SERVICE_CATEGORIES: Record<string, string[]> = {
  Manicure: ['Manicure simples', 'Esmaltacao em gel', 'Alongamento em gel', 'Manutencao de alongamento', 'Blindagem'],
  Pedicure: ['Pedicure tradicional', 'Spa dos pes', 'Esmaltacao dos pes'],
  Sobrancelhas: ['Design de sobrancelhas', 'Henna', 'Brow lamination'],
  Cabelo: ['Corte', 'Escova', 'Hidratacao', 'Coloracao'],
  Estetica: ['Limpeza de pele', 'Depilacao', 'Massagem'],
}

interface ServicoModalProps {
  isOpen: boolean
  service?: MockService | null
  onClose: () => void
  onSave: (data: Pick<MockService, 'name' | 'category' | 'price' | 'duration' | 'active'>) => void
}

export function ServicoModal({ isOpen, service, onClose, onSave }: ServicoModalProps) {
  const [category, setCategory] = useState('Manicure')
  const [customCategory, setCustomCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [active, setActive] = useState(true)
  const [error, setError] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const currentCategory = service?.category && SERVICE_CATEGORIES[service.category] ? service.category : 'Manicure'
    setCategory(currentCategory)
    setCustomCategory(service?.category && !SERVICE_CATEGORIES[service.category] ? service.category : '')
    setName(service?.name || '')
    setPrice(service?.price.toString() || '')
    setDuration(service?.duration.toString() || '')
    setActive(service?.active ?? true)
    setError('')
  }, [isOpen, service])

  if (!isOpen) return null

  const subservices = SERVICE_CATEGORIES[category] || []
  const save = (event: React.FormEvent) => {
    event.preventDefault()
    const numericPrice = Number(price)
    const numericDuration = Number(duration)
    const nameError = validateServiceName(name)
    if (nameError) {
      setError(nameError)
      window.setTimeout(() => {
        nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        nameRef.current?.focus({ preventScroll: true })
      }, 0)
      return
    }
    if (!Number.isFinite(numericPrice) || numericPrice < 0 || !Number.isInteger(numericDuration) || numericDuration <= 0) {
      setError('Informe preço válido e duração inteira maior que zero.')
      window.setTimeout(() => {
        nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        nameRef.current?.focus({ preventScroll: true })
      }, 0)
      return
    }
    setError('')
    onSave({ name: name.trim(), category: customCategory.trim() || category, price: numericPrice, duration: numericDuration, active })
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <form onSubmit={save} onClick={(event) => event.stopPropagation()} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#111827] dark:text-white">{service ? 'Editar serviço' : 'Novo serviço'}</h3>
          <button type="button" onClick={onClose} aria-label="Fechar" className="p-1.5 text-gray-400 hover:text-gray-700"><X className="h-5 w-5" /></button>
        </div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300">Categoria pai
          <select value={category} onChange={(event) => { setCategory(event.target.value); setName('') }} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800">
            {Object.keys(SERVICE_CATEGORIES).map((item) => <option key={item}>{item}</option>)}
            <option value="Outra">Outra categoria</option>
          </select>
        </label>
        {category === 'Outra' && <input required value={customCategory} onChange={(event) => setCustomCategory(event.target.value)} placeholder="Digite a categoria" className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800" />}
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300">Subserviço
          <select value={name} onChange={(event) => setName(event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800">
            <option value="">Selecione ou escolha um nome abaixo</option>
            {subservices.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <input ref={nameRef} required value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome exibido do serviço" className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800" />
        <div className="grid grid-cols-2 gap-3">
          <input required type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Preço (R$)" className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800" />
          <input required type="number" min="1" step="1" value={duration} onChange={(event) => setDuration(event.target.value)} placeholder="Duração (min)" className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800" />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} /> Serviço ativo na vitrine</label>
        {error && <p className="text-xs font-semibold text-red-600 dark:text-red-400" role="alert">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-brand py-2.5 text-sm font-bold text-white hover:bg-rose-700">Salvar serviço</button>
      </form>
    </div>
  )
}
