'use client'

import { useState, useMemo } from 'react'
import { useMockStore } from '@/context/mock-store'
import { StatusBadge } from '@/components/ui/status-badge'
import { brl, initials } from '@/lib/utils'
import {
  Search,
  Phone,
  MessageCircle,
  ChevronLeft,
  CalendarDays,
  Users,
  TrendingUp,
  StickyNote,
  Edit3,
  Check,
  X,
} from 'lucide-react'
import type { MockClient } from '@/lib/mock-data'

export default function ClientesPage() {
  const { clients, appointments } = useMockStore()
  const [search, setSearch] = useState('')
  const [selectedClient, setSelectedClient] = useState<MockClient | null>(null)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesValue, setNotesValue] = useState('')

  const filteredClients = useMemo(() =>
    clients.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phoneFormatted.includes(search)
    ),
    [clients, search]
  )

  const getClientHistory = (clientId: string) =>
    appointments
      .filter(a => a.clientId === clientId)
      .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`))

  const openClientDetail = (client: MockClient) => {
    setSelectedClient(client)
    setNotesValue(client.notes)
    setEditingNotes(false)
  }

  // ===== LISTAGEM =====
  if (!selectedClient) {
    return (
      <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Clientes</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{clients.length} clientes cadastrados</p>
        </div>

        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome, email ou telefone..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-sm text-[#111827] dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all shadow-sm"
          />
        </div>

        {/* Lista */}
        <div className="space-y-2">
          {filteredClients.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm py-14 text-center">
              <Users className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">Nenhum cliente encontrado</p>
            </div>
          ) : (
            filteredClients.map(c => {
              const lastAppt = appointments
                .filter(a => a.clientId === c.id)
                .sort((a, b) => b.date.localeCompare(a.date))[0]

              return (
                <button
                  key={c.id}
                  onClick={() => openClientDetail(c)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-rose-50 dark:bg-rose-950/50 text-brand text-sm font-bold flex items-center justify-center shrink-0">
                      {initials(c.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">{c.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.phoneFormatted}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-[#111827] dark:text-white">{c.totalVisits} visitas</p>
                    <p className="text-[10px] text-gray-400">
                      {lastAppt ? `Último: ${lastAppt.date.split('-').reverse().join('/')}` : 'Sem agendamentos'}
                    </p>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    )
  }

  // ===== FICHA DETALHADA DA CLIENTE =====
  const history = getClientHistory(selectedClient.id)

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Voltar */}
      <button
        onClick={() => setSelectedClient(null)}
        className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-[#111827] dark:hover:text-white font-medium transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar para clientes
      </button>

      {/* Cabeçalho da ficha */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 transition-colors">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/50 text-brand text-xl font-bold flex items-center justify-center shrink-0">
            {initials(selectedClient.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-[#111827] dark:text-white">{selectedClient.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{selectedClient.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedClient.phoneFormatted}</p>
            <p className="text-xs text-gray-400 mt-1">
              Cliente desde {new Date(selectedClient.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Botões de contato */}
        <div className="flex gap-3 mt-4">
          <a
            href={`https://wa.me/55${selectedClient.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors border border-emerald-100 dark:border-emerald-800"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={`tel:+55${selectedClient.phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-100 dark:border-blue-800"
          >
            <Phone className="w-4 h-4" />
            Ligar
          </a>
        </div>
      </div>

      {/* Notas internas */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StickyNote className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-[#111827] dark:text-white text-sm">Notas Internas</h3>
          </div>
          {!editingNotes ? (
            <button
              onClick={() => setEditingNotes(true)}
              className="flex items-center gap-1 text-xs text-brand hover:text-rose-700 font-medium transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editar
            </button>
          ) : (
            <div className="flex gap-1.5">
              <button onClick={() => setEditingNotes(false)} className="p-1 rounded hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-emerald-600 transition-colors" aria-label="Salvar">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => { setNotesValue(selectedClient.notes); setEditingNotes(false) }} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/50 text-red-500 transition-colors" aria-label="Cancelar">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {editingNotes ? (
          <textarea
            value={notesValue}
            onChange={e => setNotesValue(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-3 text-sm text-[#111827] dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent outline-none resize-none"
            rows={3}
            placeholder="Adicione observações sobre a cliente..."
          />
        ) : (
          <p className={`text-sm ${notesValue ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 italic'}`}>
            {notesValue || 'Nenhuma nota adicionada.'}
          </p>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-4 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#111827] dark:text-white">{selectedClient.totalVisits}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Total de Visitas</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-4 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#111827] dark:text-white">{brl(selectedClient.averageTicket)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ticket Médio</p>
        </div>
      </div>

      {/* Histórico de Agendamentos */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-[#111827] dark:text-white text-sm">Histórico de Agendamentos</h3>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {history.length === 0 ? (
            <div className="py-10 text-center">
              <CalendarDays className="w-10 h-10 text-gray-200 dark:text-gray-700 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Nenhum agendamento registrado</p>
            </div>
          ) : (
            history.map(a => (
              <div key={a.id} className="px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-center min-w-[40px]">
                    <p className="text-xs font-bold text-[#111827] dark:text-white">{a.date.split('-')[2]}</p>
                    <p className="text-[10px] text-gray-400 uppercase">
                      {new Date(a.date + 'T12:00:00').toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#111827] dark:text-white truncate">{a.serviceName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{a.time} • {a.duration}min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold text-[#111827] dark:text-white">{brl(a.price)}</span>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
