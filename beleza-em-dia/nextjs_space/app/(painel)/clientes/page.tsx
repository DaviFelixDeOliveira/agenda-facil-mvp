'use client'

import { useEffect, useState, useMemo } from 'react'
import { Users, Search, Phone } from 'lucide-react'
import { ClienteModal } from '@/components/modals/cliente-modal'
import { initials } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { ClientType } from '@/lib/types'

export default function ClientesPage() {
  const [clients, setClients] = useState<ClientType[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    fetch('/api/clients')
      .then((r: any) => r.json())
      .then((data: any) => setClients(data ?? []))
      .catch(() => setClients([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = (search ?? '').toLowerCase()
    return (clients ?? []).filter((c: ClientType) =>
      (c?.name ?? '').toLowerCase().includes(q) ||
      (c?.phone ?? '').includes(q)
    )
  }, [clients, search])

  const handleSaveNotes = async (clientId: string, notes: string) => {
    try {
      await fetch(`/api/clients/${clientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })
      setClients((prev: ClientType[]) =>
        (prev ?? []).map((c: ClientType) => c?.id === clientId ? { ...c, notes } : c)
      )
    } catch {}
  }

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
          <Users className="w-6 h-6 text-brand" /> Clientes
        </h1>
        <p className="text-gray-500 text-sm mt-1">Gerencie sua carteira de clientes</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou telefone..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-[#111827] text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map((i: number) => <div key={i} className="bg-white rounded-xl h-20 animate-pulse" />)}
        </div>
      ) : (filtered?.length ?? 0) === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center shadow-sm">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum cliente encontrado</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c: ClientType, i: number) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => { setSelectedClient(c); setDrawerOpen(true) }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center">
                  {initials(c.name)}
                </div>
                <div>
                  <p className="font-semibold text-[#111827] text-sm">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.visits ?? 0} visitas • Ticket R$ {(c.avgTicket ?? 0).toFixed?.(0)}</p>
                </div>
              </div>
              {c.phone && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline" suppressHydrationWarning>{c.phone}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <ClienteModal
        client={selectedClient}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSaveNotes={handleSaveNotes}
      />
    </div>
  )
}
