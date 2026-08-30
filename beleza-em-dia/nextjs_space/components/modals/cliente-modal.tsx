'use client'

import { useState, useEffect } from 'react'
import { X, Phone, FileText, Calendar, Save } from 'lucide-react'
import { initials } from '@/lib/utils'
import { toast } from 'sonner'

interface ClientType {
  id: string
  name: string
  phone: string | null
  visits: number
  avgTicket: number
  notes: string | null
  lastVisit: string | null
}

interface Props {
  client: ClientType | null
  open: boolean
  onClose: () => void
  onSaveNotes: (clientId: string, notes: string) => void
}

export function ClienteModal({ client, open, onClose, onSaveNotes }: Props) {
  const [notes, setNotes] = useState('')
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setNotes(client?.notes ?? '')
    setEditing(false)
  }, [client])

  if (!open || !client) return null

  const handleSave = () => {
    onSaveNotes(client.id, notes)
    setEditing(false)
    toast.success('Notas atualizadas!')
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm h-full shadow-xl overflow-y-auto">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#111827]">Detalhes do Cliente</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand text-white text-lg font-bold flex items-center justify-center">
              {initials(client.name)}
            </div>
            <div>
              <h3 className="font-bold text-[#111827] text-lg">{client.name}</h3>
              {client.phone && (
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span suppressHydrationWarning>{client.phone}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-[#111827]">{client.visits ?? 0}</p>
              <p className="text-xs text-gray-500">Visitas</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-[#111827]">R$ {(client.avgTicket ?? 0).toFixed?.(0)}</p>
              <p className="text-xs text-gray-500">Ticket Méd.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm font-bold text-[#111827] flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {client.lastVisit ?? '—'}
              </p>
              <p className="text-xs text-gray-500">Última</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-[#111827] flex items-center gap-1">
                <FileText className="w-4 h-4" /> Notas internas
              </label>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs text-brand font-semibold hover:underline"
                >
                  Editar
                </button>
              )}
            </div>
            {editing ? (
              <div className="space-y-2">
                <textarea
                  value={notes}
                  onChange={(e: any) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-[#111827] text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none resize-none"
                  rows={4}
                  placeholder="Anotações sobre o cliente..."
                />
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white text-sm rounded-lg hover:bg-rose-700 transition-colors"
                >
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                {client.notes || 'Nenhuma nota adicionada.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
