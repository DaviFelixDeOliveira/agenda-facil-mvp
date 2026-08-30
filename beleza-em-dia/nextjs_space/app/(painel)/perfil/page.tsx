'use client'

import { useEffect, useState } from 'react'
import { Store, Plus, ImageIcon, Trash2, ToggleLeft, ToggleRight, Share2 } from 'lucide-react'
import { brl } from '@/lib/utils'
import { toast } from 'sonner'
import { ShareModal } from '@/components/modals/share-modal'
import { motion } from 'framer-motion'

interface ServiceType { id: string; name: string; price: number; duration: number; active: boolean }

export default function PerfilPage() {
  const [services, setServices] = useState<ServiceType[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newDur, setNewDur] = useState('')
  const [shareOpen, setShareOpen] = useState(false)

  const photos = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=300&h=300&fit=crop',
  ]

  useEffect(() => {
    fetch('/api/services')
      .then((r: any) => r.json())
      .then((data: any) => setServices(data ?? []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  const addService = async () => {
    if (!newName || !newPrice || !newDur) { toast.error('Preencha todos os campos'); return }
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, price: Number(newPrice), duration: Number(newDur) }),
      })
      const svc = await res.json()
      setServices((prev: ServiceType[]) => [...(prev ?? []), svc])
      setNewName(''); setNewPrice(''); setNewDur(''); setShowAdd(false)
      toast.success('Serviço adicionado!')
    } catch {
      toast.error('Erro ao adicionar')
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            <Store className="w-6 h-6 text-brand" /> Meu Perfil
          </h1>
          <p className="text-gray-500 text-sm mt-1">Seu portfólio e serviços</p>
        </div>
        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#111827] text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          <Share2 className="w-4 h-4" /> Compartilhar
        </button>
      </div>

      {/* Photo gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm p-5"
      >
        <h2 className="font-bold text-[#111827] mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-brand" /> Portfólio
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {photos.map((url: string, i: number) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative group">
              <img src={url} alt={`Trabalho ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm"
      >
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#111827]">Serviços</h2>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1 px-3 py-1.5 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar
          </button>
        </div>

        {showAdd && (
          <div className="px-5 py-4 bg-rose-50/50 border-b border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                placeholder="Nome do serviço"
                value={newName}
                onChange={(e: any) => setNewName(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
              />
              <input
                placeholder="Preço (R$)"
                type="number"
                value={newPrice}
                onChange={(e: any) => setNewPrice(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
              />
              <input
                placeholder="Duração (min)"
                type="number"
                value={newDur}
                onChange={(e: any) => setNewDur(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
              />
            </div>
            <button
              onClick={addService}
              className="mt-3 px-4 py-2 bg-brand text-white rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors"
            >
              Salvar serviço
            </button>
          </div>
        )}

        <div className="divide-y divide-gray-50">
          {loading ? (
            <div className="p-5 space-y-3">
              {[1,2,3].map((i: number) => <div key={i} className="h-12 bg-gray-50 rounded animate-pulse" />)}
            </div>
          ) : (services?.length ?? 0) === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-500 text-sm">Nenhum serviço cadastrado</p>
            </div>
          ) : (
            (services ?? []).map((s: ServiceType) => (
              <div key={s.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.duration}min</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#111827]">{brl(s.price)}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  )
}
