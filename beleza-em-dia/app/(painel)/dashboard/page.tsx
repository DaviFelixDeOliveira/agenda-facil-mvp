'use client'

import { useState } from 'react'
import { useMockStore } from '@/context/mock-store'
import { StatusBadge } from '@/components/ui/status-badge'
import { brl, initials } from '@/lib/utils'
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

export default function DashboardPage() {
  const { professional, appointments, updateAppointmentStatus } = useMockStore()
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
    .filter(a => a.status !== 'cancelado')
    .sort((a, b) => a.time.localeCompare(b.time))

  const handleCopy = () => {
    navigator.clipboard.writeText(professional.publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openShareModal = () => open('share')
  const openAppointmentModal = (appt: MockAppointment) => open('appointment', appt)

  const selectedAppt = getData<MockAppointment>('appointment')

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Saudação */}
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">
          Olá, {professional.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Aqui está o resumo do seu dia</p>
      </div>

      {/* Card Resumo de Hoje - fiel ao PDF */}
      <div className="bg-[#111827] rounded-2xl p-5 text-white relative overflow-hidden">
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
              <p className="text-2xl font-bold text-brand">{brl(todayRevenue)}</p>
              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">Ganhos estimados</p>
            </div>
          </div>

          <button
            onClick={openShareModal}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-brand hover:bg-rose-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar Link da Agenda
          </button>
          <button
            onClick={() => open('novo-agendamento')}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Agendamento Manual
          </button>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard icon={<CalendarDays className="w-5 h-5" />} label="Confirmados" value={String(confirmed)} color="text-emerald-600" bgColor="bg-emerald-50" />
        <MetricCard icon={<Clock className="w-5 h-5" />} label="Pendentes" value={String(pending)} color="text-amber-600" bgColor="bg-amber-50" />
        <MetricCard icon={<DollarSign className="w-5 h-5" />} label="Faturamento" value={brl(todayRevenue)} color="text-brand" bgColor="bg-rose-50" />
        <MetricCard icon={<TrendingUp className="w-5 h-5" />} label="Horas Ocupadas" value={`${Math.floor(todayMinutes / 60)}h${todayMinutes % 60 > 0 ? todayMinutes % 60 + 'min' : ''}`} color="text-blue-600" bgColor="bg-blue-50" />
      </div>

      {/* Lista de Agendamentos do Dia */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#111827]">Próximos Agendamentos</h2>
          <a href="/agenda" className="text-xs text-brand font-semibold hover:underline flex items-center gap-0.5">
            Ver agenda <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {upcomingAppts.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <CalendarDays className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-medium">Nenhum agendamento para hoje</p>
              <p className="text-gray-400 text-xs mt-1">Aproveite para organizar sua agenda!</p>
            </div>
          ) : (
            upcomingAppts.map((a) => (
              <button
                key={a.id}
                onClick={() => openAppointmentModal(a)}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/80 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar com iniciais */}
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-brand text-xs font-bold flex items-center justify-center shrink-0">
                    {initials(a.clientName)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">{a.clientName}</p>
                    <p className="text-xs text-gray-500 truncate">{a.serviceName} • {a.duration}min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold text-[#111827]">{a.time}</span>
                  <StatusBadge status={a.status} />
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ===== Modal de Detalhes do Agendamento (Tela 12 do PDF) ===== */}
      {isOpen('appointment') && selectedAppt && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end lg:items-center justify-center p-4" onClick={() => close('appointment')}>
          <div
            className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-2xl animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Header do modal */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-[#111827] text-lg">Detalhes do Agendamento</h3>
              <button onClick={() => close('appointment')} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Fechar">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Status */}
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedAppt.status} />
                {selectedAppt.signalPaid && (
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                    ✓ Sinal pago ({brl(selectedAppt.signalAmount)})
                  </span>
                )}
              </div>

              {/* Dados da cliente */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-brand text-sm font-bold flex items-center justify-center">
                  {initials(selectedAppt.clientName)}
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{selectedAppt.clientName}</p>
                  <p className="text-xs text-gray-500">
                    {selectedAppt.clientPhone.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3')}
                  </p>
                </div>
              </div>

              {/* Card do serviço */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#111827] text-sm">{selectedAppt.serviceName}</p>
                  <p className="font-bold text-brand text-lg">{brl(selectedAppt.price)}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
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
                  <p className="text-xs text-gray-500 mt-1 italic">"{selectedAppt.notes}"</p>
                )}
              </div>

              {/* Botão WhatsApp */}
              <a
                href={`https://wa.me/55${selectedAppt.clientPhone}?text=${encodeURIComponent(`Olá ${selectedAppt.clientName.split(' ')[0]}! Tudo bem? Seu agendamento de ${selectedAppt.serviceName} está confirmado para ${selectedAppt.date.split('-').reverse().join('/')} às ${selectedAppt.time}. Te espero! ✨ — ${professional.studioName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Enviar Mensagem WhatsApp
              </a>

              {/* Ações */}
              <div className="flex gap-3">
                {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
                  <button
                    onClick={() => { updateAppointmentStatus(selectedAppt.id, 'finalizado'); close('appointment') }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-medium text-sm hover:bg-emerald-100 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Concluído
                  </button>
                )}
                {selectedAppt.status !== 'finalizado' && selectedAppt.status !== 'cancelado' && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-100 transition-colors">
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

      {/* ===== Modal de Compartilhamento (Tela 11 do PDF) ===== */}
      {isOpen('share') && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end lg:items-center justify-center p-4" onClick={() => close('share')}>
          <div
            className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-2xl animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-[#111827] text-lg">Compartilhar Agenda</h3>
              <button onClick={() => close('share')} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Fechar">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* QR Code placeholder visual */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="text-center">
                    <Share2 className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">QR Code</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Mostre para clientes na recepção</p>
              </div>

              {/* Link para copiar */}
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                <span className="text-sm text-gray-600 truncate flex-1">{professional.publicUrl}</span>
                <button
                  onClick={handleCopy}
                  className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              {/* Botões de compartilhamento */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário? Acesse meu link oficial: ${professional.publicUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 py-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold hover:bg-emerald-100 transition-colors border border-emerald-100"
                >
                  <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  WhatsApp
                </a>

                <button
                  onClick={handleCopy}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 bg-pink-50 text-pink-800 rounded-2xl text-xs font-bold hover:bg-pink-100 transition-colors border border-pink-100"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  Instagram
                </button>

                <a
                  href={`mailto:?subject=Agende comigo no ${professional.studioName}&body=${encodeURIComponent(`Olá! Agende online comigo pelo link: ${professional.publicUrl}`)}`}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 bg-blue-50 text-blue-800 rounded-2xl text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-100"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  E-mail
                </a>
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
          onSave={({ clientId, serviceId, date, time, signalPrice }) => {
            const client = clients?.find((c: any) => c.id === clientId)
            const service = services?.find((s: any) => s.id === serviceId)
            const newAppt = {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
              clientId,
              clientName: client?.name || '',
              clientPhone: client?.phoneFormatted || '',
              serviceId,
              serviceName: service?.name || '',
              price: service?.price || 0,
              duration: service?.duration || 30,
              date,
              time,
              status: Number(signalPrice) > 0 ? 'pendente' : 'confirmado',
              signalPaid: Number(signalPrice) > 0,
              signalAmount: Number(signalPrice) || 0,
              notes: '',
            }
            setAppointments(prev => [...prev, newAppt])
            localStorage.setItem('beleza-em-dia-appointments', JSON.stringify([...appointments, newAppt]))
            setLastApptId(newAppt.id)
            toast.success('Agendamento criado!')
          }}
          services={services}
          clients={clients}
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
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className={`text-xl font-bold text-[#111827]`}>{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
