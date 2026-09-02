'use client'

import { useState } from 'react'
import { useMockStore } from '@/context/mock-store'
import { StatusBadge } from '@/components/ui/status-badge'
import { brl, initials } from '@/lib/utils'
import { toast } from 'sonner'
import {
  CalendarDays,
  DollarSign,
  Clock,
  TrendingUp,
  Share2,
  ChevronRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  CalendarClock,
  XCircle,
  Copy,
  X,
  Sparkles,
  Mail,
  Plus,
} from 'lucide-react'
import type { MockAppointment } from '@/lib/mock-data'
import { useModalManager } from '@/context/modal-manager'
import { NovoAgendamentoModal } from '@/components/modals/novo-agendamento-modal'

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15c-1.49 0-2.94-.4-4.22-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.21 8.21 0 01-1.26-4.38c0-4.54 3.7-8.24 8.27-8.24 2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 012.43 5.84c0 4.55-3.7 8.23-8.27 8.23zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.98.69.46-.04 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.12-.22-.19-.47-.31z" />
    </svg>
  )
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export default function DashboardPage() {
  const { professional, appointments, services, clients, updateAppointmentStatus, setAppointments } = useMockStore()
  const { open, close, isOpen, getData } = useModalManager()
  const [copied, setCopied] = useState(false)
  const [lastApptId, setLastApptId] = useState<string | null>(null)

  const today = new Date().toISOString().split('T')[0]
  const todayAppts = appointments.filter(a => a.date === today)
  const activeAppts = todayAppts.filter(a => a.status !== 'cancelado')
  const confirmed = todayAppts.filter(a => a.status === 'confirmado').length
  const pending = todayAppts.filter(a => a.status === 'pendente').length
  const todayRevenue = activeAppts.reduce((sum, a) => sum + a.price, 0)
  const todayMinutes = activeAppts.reduce((sum, a) => sum + a.duration, 0)

  const upcomingAppts = todayAppts
    .filter(a => a.status !== 'cancelado' && a.status !== 'finalizado')
    .sort((a, b) => a.time.localeCompare(b.time))
  const nowTime = new Date().toTimeString().slice(0, 5)
  const nextAppointment = upcomingAppts.find((appointment) => appointment.time >= nowTime) || upcomingAppts[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(professional.publicUrl)
    setCopied(true)
    toast.success('Link copiado com sucesso!')
    setTimeout(() => setCopied(false), 2000)
  }

  const openShareModal = () => open('share')
  const openAppointmentModal = (appt: MockAppointment) => open('appointment', appt)

  const selectedAppt = getData<MockAppointment>('appointment')

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Saudação */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827] dark:text-white">
          Olá, {professional.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Aqui está o resumo do seu dia</p>
      </div>

      {/* Card Resumo de Hoje */}
      <div className="bg-[#111827] dark:bg-gray-900 border border-gray-800 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg">
        {/* Brilhos decorativos sutis */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-rose-400/10 blur-2xl" />

        <div className="relative z-10">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Hoje</p>
          <div className="flex items-end justify-between mt-3">
            <div>
              <p className="text-4xl font-bold">{activeAppts.length}</p>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">Agendamentos</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-brand">{nextAppointment ? `${nextAppointment.time} • ${nextAppointment.clientName}` : 'Nenhum agendamento'}</p>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">Próximo atendimento</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
            <button
              onClick={openShareModal}
              className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-rose-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar Link da Agenda
            </button>
            <button
              onClick={() => open('novo-agendamento')}
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
               Novo Agendamento
            </button>
          </div>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard icon={<CalendarDays className="w-5 h-5" />} label="Confirmados" value={String(confirmed)} color="text-emerald-600 dark:text-emerald-400" bgColor="bg-emerald-50 dark:bg-emerald-950/40" />
        <MetricCard icon={<Clock className="w-5 h-5" />} label="Pendentes" value={String(pending)} color="text-amber-600 dark:text-amber-400" bgColor="bg-amber-50 dark:bg-amber-950/40" />
        <MetricCard icon={<DollarSign className="w-5 h-5" />} label="Faturamento" value={brl(todayRevenue)} color="text-brand" bgColor="bg-rose-50 dark:bg-rose-950/40" />
        <MetricCard icon={<TrendingUp className="w-5 h-5" />} label="Horas Ocupadas" value={`${Math.floor(todayMinutes / 60)}h${todayMinutes % 60 > 0 ? todayMinutes % 60 + 'min' : ''}`} color="text-blue-600 dark:text-blue-400" bgColor="bg-blue-50 dark:bg-blue-950/40" />
      </div>

      {/* Lista de Agendamentos do Dia */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="font-bold text-[#111827] dark:text-white">Próximos Agendamentos</h2>
          <a href="/agenda" className="text-xs text-brand font-semibold hover:underline flex items-center gap-0.5">
            Ver agenda <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {upcomingAppts.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <CalendarDays className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Nenhum agendamento para hoje</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Aproveite para organizar sua agenda!</p>
            </div>
          ) : (
            upcomingAppts.map((a) => (
              <button
                key={a.id}
                onClick={() => openAppointmentModal(a)}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar com iniciais */}
                  <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/50 text-brand text-xs font-bold flex items-center justify-center shrink-0">
                    {initials(a.clientName)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">{a.clientName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{a.serviceName} • {a.duration}min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold text-[#111827] dark:text-white">{a.time}</span>
                  <StatusBadge status={a.status} />
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ===== Modal de Detalhes do Agendamento ===== */}
      {isOpen('appointment') && selectedAppt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end lg:items-center justify-center p-4" onClick={() => close('appointment')}>
          <div
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[#111827] dark:text-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-2xl animate-fade-in shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header do modal */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-[#111827] dark:text-white text-lg">Detalhes do Agendamento</h3>
              <button onClick={() => close('appointment')} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Fechar">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Status */}
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedAppt.status} />
                {selectedAppt.signalPaid && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full font-medium border border-emerald-200 dark:border-emerald-850">
                    ✓ Sinal pago ({brl(selectedAppt.signalAmount)})
                  </span>
                )}
              </div>

              {/* Dados da cliente */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/50 text-brand text-sm font-bold flex items-center justify-center">
                  {initials(selectedAppt.clientName)}
                </div>
                <div>
                  <p className="font-semibold text-[#111827] dark:text-white">{selectedAppt.clientName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedAppt.clientPhone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3')}
                  </p>
                </div>
              </div>

              {/* Card do serviço */}
              <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#111827] dark:text-white text-sm">{selectedAppt.serviceName}</p>
                  <p className="font-bold text-brand text-lg">{brl(selectedAppt.price)}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {selectedAppt.date.split('-').reverse().join('/')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedAppt.time} • {selectedAppt.duration}min
                  </span>
                </div>
                {selectedAppt.notes && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">"{selectedAppt.notes}"</p>
                )}
              </div>

              {/* Botão WhatsApp */}
              <a
                href={`https://wa.me/55${selectedAppt.clientPhone}?text=${encodeURIComponent(`Olá ${selectedAppt.clientName.split(' ')[0]}! Tudo bem? Seu agendamento de ${selectedAppt.serviceName} está confirmado para ${selectedAppt.date.split('-').reverse().join('/')} às ${selectedAppt.time}. Te espero! ✨ — ${professional.studioName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Enviar Mensagem WhatsApp
              </a>

              {/* Ações */}
              <div className="flex gap-3">
                {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
                  <button
                    onClick={() => { updateAppointmentStatus(selectedAppt.id, 'finalizado'); close('appointment') }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl font-medium text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Concluído
                  </button>
                )}
                {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-xl font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                    <CalendarClock className="w-4 h-4" />
                    Remarcar
                  </button>
                )}
              </div>

              {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
                <button
                  onClick={() => { updateAppointmentStatus(selectedAppt.id, 'cancelado'); close('appointment') }}
                  className="w-full text-center text-sm text-red-500 hover:text-red-700 font-medium py-2 transition-colors"
                >
                  <XCircle className="w-4 h-4 inline mr-1" />
                  Cancelar Agendamento
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== Modal de Compartilhamento ===== */}
      {isOpen('share') && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end lg:items-center justify-center p-4" onClick={() => close('share')}>
          <div
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[#111827] dark:text-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-2xl animate-fade-in shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-[#111827] dark:text-white text-lg">Compartilhar Agenda</h3>
              <button onClick={() => close('share')} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Fechar">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* QR Code placeholder visual */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 p-4">
                  <div className="text-center">
                    <Share2 className="w-8 h-8 text-brand mx-auto mb-1" />
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300">QR CODE</p>
                    <p className="text-[10px] text-gray-400 truncate max-w-[120px]">{professional.studioName}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Disponível no link ou para impressão</p>
              </div>

              {/* Link para copiar */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1 font-medium">{professional.publicUrl}</span>
                <button
                  onClick={handleCopy}
                  className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              {/* Botões de compartilhamento com logos oficiais */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário comigo? Acesse meu link oficial de agendamentos: ${professional.publicUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 py-3.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors border border-emerald-200 dark:border-emerald-800 shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  WhatsApp
                </a>

                <button
                  onClick={handleCopy}
                  className="flex flex-col items-center justify-center gap-1.5 py-3.5 bg-pink-50 dark:bg-pink-950/40 text-pink-800 dark:text-pink-300 rounded-2xl text-xs font-bold hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors border border-pink-200 dark:border-pink-800 shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  Copiar p/ Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Novo Agendamento Manual */}
      {isOpen('novo-agendamento') && (
        <NovoAgendamentoModal
          apptId={lastApptId}
          onClose={() => close('novo-agendamento')}
          onSave={({ clientName, clientPhone, serviceId, date, time, signalPrice }) => {
            const service = services?.find((s: any) => s.id === serviceId)
            const newId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
            const newAppt = {
              id: newId,
              clientId: `client-${Date.now()}`,
              clientName: clientName || 'Cliente',
              clientPhone: clientPhone || '',
              serviceId,
              serviceName: service?.name || '',
              price: service?.price || 0,
              duration: service?.duration || 30,
              date,
              time,
              status: (Number(signalPrice) > 0 ? 'pendente' : 'confirmado') as any,
              signalPaid: Number(signalPrice) > 0,
              signalAmount: Number(signalPrice) || 0,
              notes: '',
            }
            setAppointments(prev => [...prev, newAppt])
            if (typeof window !== 'undefined') {
              localStorage.setItem('beleza-em-dia-appointments', JSON.stringify([...appointments, newAppt]))
            }
            setLastApptId(newAppt.id)
            return newId
          }}
          services={services}
        />
      )}
    </div>
  )
}

// ---------- Componente de Métrica ----------
function MetricCard({ icon, label, value, color, bgColor }: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  bgColor: string
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-xl font-bold text-[#111827] dark:text-white">{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center ${color} shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
