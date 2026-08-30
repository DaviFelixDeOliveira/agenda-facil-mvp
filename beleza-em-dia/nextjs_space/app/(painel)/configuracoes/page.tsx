'use client'

import { useState } from 'react'
import { useMockStore } from '@/context/mock-store'
import {
  Building2,
  Clock,
  CreditCard,
  Bell,
  Shield,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Hash,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
} from 'lucide-react'

type Section = 'menu' | 'negocio' | 'expediente' | 'pagamento' | 'notificacoes' | 'seguranca'

const menuItems = [
  { key: 'negocio' as Section, label: 'Dados do Negócio', desc: 'Endereço, CNPJ e contato', icon: Building2 },
  { key: 'expediente' as Section, label: 'Agenda e Expediente', desc: 'Grade semanal de horários', icon: Clock },
  { key: 'pagamento' as Section, label: 'Pagamento e Sinal Pix', desc: 'Configurar taxa de sinal', icon: CreditCard },
  { key: 'notificacoes' as Section, label: 'Notificações', desc: 'E-mail, push e lembretes', icon: Bell },
  { key: 'seguranca' as Section, label: 'Segurança e Conta', desc: 'Senha, dados e exclusão', icon: Shield },
]

export default function ConfiguracoesPage() {
  const { professional, schedule } = useMockStore()
  const [section, setSection] = useState<Section>('menu')
  const [pixEnabled, setPixEnabled] = useState(professional.pixSinal)
  const [pixValue, setPixValue] = useState(professional.pixSinalValor)
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [reminderNotif, setReminderNotif] = useState(true)

  // ===== MENU PRINCIPAL =====
  if (section === 'menu') {
    return (
      <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Configurações</h1>
          <p className="text-gray-500 text-sm mt-0.5">Ajuste as preferências do seu salão</p>
        </div>

        <div className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ===== HEADER DE SEÇÃO =====
  const backButton = (
    <button
      onClick={() => setSection('menu')}
      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#111827] font-medium transition-colors mb-4"
    >
      <ChevronRight className="w-4 h-4 rotate-180" />
      Voltar
    </button>
  )

  // ===== DADOS DO NEGÓCIO =====
  if (section === 'negocio') {
    return (
      <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
        {backButton}
        <h2 className="text-xl font-bold text-[#111827]">Dados do Negócio</h2>
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <InfoRow icon={<Building2 className="w-4 h-4" />} label="Nome" value={professional.studioName} />
          <InfoRow icon={<MapPin className="w-4 h-4" />} label="Endereço" value={professional.address} />
          <InfoRow icon={<Hash className="w-4 h-4" />} label="CNPJ" value={professional.cnpj} />
          <InfoRow icon={<Phone className="w-4 h-4" />} label="Telefone" value={professional.phoneFormatted} />
          <InfoRow icon={<Mail className="w-4 h-4" />} label="E-mail" value={professional.email} />
        </div>
        <button className="w-full py-3 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-rose-700 transition-colors">
          Editar Dados
        </button>
      </div>
    )
  }

  // ===== EXPEDIENTE =====
  if (section === 'expediente') {
    return (
      <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
        {backButton}
        <h2 className="text-xl font-bold text-[#111827]">Agenda e Expediente</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {schedule.map((day, idx) => (
            <div key={day.day} className={`flex items-center justify-between px-5 py-3.5 ${idx < schedule.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-brand transition-colors">
                  {day.active ? (
                    <ToggleRight className="w-6 h-6 text-brand" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-300" />
                  )}
                </button>
                <span className={`text-sm font-medium ${day.active ? 'text-[#111827]' : 'text-gray-400'}`}>
                  {day.day}
                </span>
              </div>
              {day.active ? (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="time"
                    defaultValue={day.start}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs w-[90px] focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                  />
                  <span className="text-gray-400">até</span>
                  <input
                    type="time"
                    defaultValue={day.end}
                    className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs w-[90px] focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                  />
                </div>
              ) : (
                <span className="text-xs text-gray-400">Fechado</span>
              )}
            </div>
          ))}
        </div>
        <button className="w-full py-3 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-rose-700 transition-colors">
          Salvar Alterações
        </button>
      </div>
    )
  }

  // ===== PAGAMENTO E SINAL PIX =====
  if (section === 'pagamento') {
    return (
      <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
        {backButton}
        <h2 className="text-xl font-bold text-[#111827]">Pagamento e Sinal Pix</h2>

        <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">
          {/* Toggle sinal */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#111827]">Cobrar sinal via Pix</p>
              <p className="text-xs text-gray-500 mt-0.5">Cobrar taxa antecipada para confirmar agendamento</p>
            </div>
            <button
              onClick={() => setPixEnabled(!pixEnabled)}
              className="text-gray-400 hover:text-brand transition-colors"
            >
              {pixEnabled ? (
                <ToggleRight className="w-8 h-8 text-brand" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-gray-300" />
              )}
            </button>
          </div>

          {pixEnabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1.5">Valor do sinal (R$)</label>
                <input
                  type="number"
                  value={pixValue}
                  onChange={e => setPixValue(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-lg font-semibold"
                  min={1}
                  step={5}
                />
                <p className="text-xs text-gray-400 mt-1">Referência: R$ 30,00 (baseado em pesquisa de campo)</p>
              </div>

              <div className="bg-amber-50 rounded-xl p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800">
                  Cancelamento sem perda do sinal até {professional.cancelamentoSemPerda}h antes. Após este prazo, o sinal é retido.
                </p>
              </div>
            </>
          )}
        </div>

        <button className="w-full py-3 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-rose-700 transition-colors">
          Salvar Configurações
        </button>
      </div>
    )
  }

  // ===== NOTIFICAÇÕES =====
  if (section === 'notificacoes') {
    return (
      <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
        {backButton}
        <h2 className="text-xl font-bold text-[#111827]">Notificações</h2>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <NotifToggle
            label="Notificações por e-mail"
            desc="Receber confirmações e lembretes por e-mail"
            enabled={emailNotif}
            onToggle={() => setEmailNotif(!emailNotif)}
          />
          <NotifToggle
            label="Notificações push"
            desc="Alertas no navegador sobre novos agendamentos"
            enabled={pushNotif}
            onToggle={() => setPushNotif(!pushNotif)}
            border
          />
          <NotifToggle
            label="Lembretes automáticos"
            desc="Enviar lembrete ao cliente 24h antes"
            enabled={reminderNotif}
            onToggle={() => setReminderNotif(!reminderNotif)}
            border
          />
        </div>

        <button className="w-full py-3 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-rose-700 transition-colors">
          Salvar Preferências
        </button>
      </div>
    )
  }

  // ===== SEGURANÇA =====
  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      {backButton}
      <h2 className="text-xl font-bold text-[#111827]">Segurança e Conta</h2>

      <div className="space-y-3">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-[#111827] mb-3">Alterar Senha</h3>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Senha atual"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
            />
            <input
              type="password"
              placeholder="Nova senha"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
            />
            <button className="w-full py-3 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-rose-700 transition-colors">
              Atualizar Senha
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-red-600 mb-2">Zona de Perigo</h3>
          <p className="text-xs text-gray-500 mb-3">
            Ao excluir sua conta, todos os dados serão permanentemente removidos. Esta ação não pode ser desfeita.
          </p>
          <button className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors border border-red-200">
            Excluir Minha Conta
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== Componentes auxiliares =====
function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm text-[#111827] font-medium">{value}</p>
      </div>
    </div>
  )
}

function NotifToggle({ label, desc, enabled, onToggle, border }: {
  label: string; desc: string; enabled: boolean; onToggle: () => void; border?: boolean
}) {
  return (
    <div className={`flex items-center justify-between px-5 py-4 ${border ? 'border-t border-gray-50' : ''}`}>
      <div>
        <p className="text-sm font-medium text-[#111827]">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <button onClick={onToggle} className="transition-colors">
        {enabled ? (
          <ToggleRight className="w-7 h-7 text-brand" />
        ) : (
          <ToggleLeft className="w-7 h-7 text-gray-300" />
        )}
      </button>
    </div>
  )
}
