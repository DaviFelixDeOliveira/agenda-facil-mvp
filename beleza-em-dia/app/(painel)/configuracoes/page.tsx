'use client'

import { useState } from 'react'
import { useMockStore } from '@/context/mock-store'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Building2,
  Clock,
  CreditCard,
  Bell,
  Shield,
  Share2,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Camera,
  Phone,
  Mail,
  Instagram,
  Copy,
  Download,
  AlertTriangle,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  LogOut,
  Trash2,
  ExternalLink,
} from 'lucide-react'

type ConfigSection =
  | 'menu'
  | 'negocio'
  | 'agenda'
  | 'pagamento'
  | 'local'
  | 'notificacoes'
  | 'compartilhamento'
  | 'seguranca'

export default function ConfiguracoesPage() {
  const { professional, schedule } = useMockStore()
  const [activeSection, setActiveSection] = useState<ConfigSection>('menu')

  // --- 1. Dados do Negócio ---
  const [studioName, setStudioName] = useState(professional.studioName)
  const [profName, setProfName] = useState(professional.name)
  const [phone, setPhone] = useState(professional.phoneFormatted)
  const [email, setEmail] = useState(professional.email)
  const [address, setAddress] = useState(professional.address)
  const [cnpj, setCnpj] = useState(professional.cnpj)
  const [instagram, setInstagram] = useState('@studiobianails')
  const [bio, setBio] = useState(professional.bio)
  const [specialty, setSpecialty] = useState(professional.specialty)

  // --- 2. Regras de Agenda ---
  const [agendaType, setAgendaType] = useState<'fixa' | 'livre'>('fixa')
  const [weekSchedule, setWeekSchedule] = useState(schedule)
  const [serviceDuration, setServiceDuration] = useState('45')
  const [serviceInterval, setServiceInterval] = useState('10')
  const [delayTolerance, setDelayTolerance] = useState(professional.toleranciaAtraso.toString())
  const [cancelPolicyHours, setCancelPolicyHours] = useState(professional.cancelamentoSemPerda.toString())

  // --- 3. Pagamento e Sinal Pix ---
  const [pixEnabled, setPixEnabled] = useState(professional.pixSinal)
  const [pixValue, setPixValue] = useState(professional.pixSinalValor)
  const [refundPolicy, setRefundPolicy] = useState('24h')
  const [acceptCards, setAcceptCards] = useState(true)
  const [acceptCash, setAcceptCash] = useState(true)

  // --- 4. Local de Atendimento ---
  const [locationType, setLocationType] = useState<'salao' | 'domicilio' | 'ambos'>('salao')
  const [travelFee, setTravelFee] = useState('15')
  const [travelRadius, setTravelRadius] = useState('10')

  // --- 5. Notificações ---
  const [notifPushNew, setNotifPushNew] = useState(true)
  const [notifPushCancel, setNotifPushCancel] = useState(true)
  const [notifPushReminder, setNotifPushReminder] = useState(true)
  const [notifPushWeekly, setNotifPushWeekly] = useState(false)
  const [notifEmailNew, setNotifEmailNew] = useState(false)
  const [notifEmailCancel, setNotifEmailCancel] = useState(true)
  const [notifEmailWeekly, setNotifEmailWeekly] = useState(true)
  const [reminderTime, setReminderTime] = useState('2') // horas antes

  // --- 6. Segurança ---
  const [twoFactor, setTwoFactor] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [themeMode, setThemeMode] = useState<'claro' | 'escuro'>('claro')
  const [language, setLanguage] = useState('pt-BR')

  // --- Estados Gerais ---
  const [hasChanges, setHasChanges] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const triggerChange = () => setHasChanges(true)

  const handleSave = (sectionName: string) => {
    toast.success(`${sectionName} salvas com sucesso!`, {
      description: 'As alterações foram sincronizadas no painel.',
    })
    setHasChanges(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(professional.publicUrl)
    setCopiedLink(true)
    toast.info('Link copiado para a área de transferência!')
    setTimeout(() => setCopiedLink(false), 2500)
  }

  // --- Navegação Mobile / Desktop ---
  const menuItems = [
    { key: 'negocio' as ConfigSection, label: 'Dados do Negócio', desc: 'Nome, CNPJ, bio e contatos', icon: Building2 },
    { key: 'agenda' as ConfigSection, label: 'Agenda e Expediente', desc: 'Tipo de agenda, horários e intervalos', icon: Clock },
    { key: 'pagamento' as ConfigSection, label: 'Pagamento e Sinal Pix', desc: 'Regras de sinal antecipado e taxas', icon: CreditCard },
    { key: 'local' as ConfigSection, label: 'Local de Atendimento', desc: 'No salão, domicílio ou ambos', icon: MapPin },
    { key: 'notificacoes' as ConfigSection, label: 'Notificações', desc: 'Alertas push, WhatsApp e e-mail', icon: Bell },
    { key: 'compartilhamento' as ConfigSection, label: 'Compartilhamento & QR Code', desc: 'Link da bio e divulgação', icon: Share2 },
    { key: 'seguranca' as ConfigSection, label: 'Segurança e Conta', desc: 'Senha, 2FA e preferências', icon: Shield },
  ]

  const renderBackButton = (title: string) => (
    <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-5">
      <button
        onClick={() => {
          setActiveSection('menu')
          setHasChanges(false)
        }}
        className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#111827] transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Voltar para o Menu
      </button>
      <h2 className="text-base font-bold text-[#111827]">{title}</h2>
    </div>
  )

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Configurações</h1>
          <p className="text-gray-500 text-sm mt-0.5">Centro de controle e parametrização do seu negócio</p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-800 text-xs font-semibold animate-fade-in">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            Alterações pendentes
          </div>
        )}
      </div>

      {/* ========================================================
          VISUALIZAÇÃO 1: MENU PRINCIPAL (LISTA DE SEÇÕES)
         ======================================================== */}
      {activeSection === 'menu' && (
        <div className="space-y-4">
          {/* Card Pro-Tip / Destaque */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50/50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">Dica do Beleza em Dia</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Mantenha a taxa de sinal ativada (sugerido R$ 30,00) para reduzir em até 85% as faltas e cancelamentos de última hora!
              </p>
            </div>
          </div>

          {/* Grid de Itens do Menu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-md hover:border-gray-200 transition-all text-left group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-rose-50 text-brand flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111827] group-hover:text-brand transition-colors">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          SEÇÃO 1: DADOS DO NEGÓCIO (Tela 17 do PDF)
         ======================================================== */}
      {activeSection === 'negocio' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 space-y-6">
          {renderBackButton('Dados do Negócio')}

          {/* Foto / Logo do Salão */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center overflow-hidden">
                <Image src={professional.avatar} alt="Logo" width={80} height={80} className="object-cover" />
              </div>
              <button
                onClick={() => toast.info('Clique para selecionar nova imagem (WebP otimizado)')}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-700 transition-colors"
                title="Trocar Foto"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">Foto / Logo do Estabelecimento</p>
              <p className="text-xs text-gray-500 mt-0.5">Recomendado: Formato quadrado (500x500px, PNG ou JPG)</p>
            </div>
          </div>

          {/* Bloco de Identificação */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Identificação</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Nome do Negócio / Salão *</label>
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => {
                    setStudioName(e.target.value)
                    triggerChange()
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                  placeholder="Ex: Studio Elegance"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Nome da Profissional Responsável *</label>
                <input
                  type="text"
                  value={profName}
                  onChange={(e) => {
                    setProfName(e.target.value)
                    triggerChange()
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                  placeholder="Ex: Bia Silva"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">CNPJ ou CPF (Opcional)</label>
                <input
                  type="text"
                  value={cnpj}
                  onChange={(e) => {
                    setCnpj(e.target.value)
                    triggerChange()
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                  placeholder="12.345.678/0001-90"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Especialidade Principal</label>
                <select
                  value={specialty}
                  onChange={(e) => {
                    setSpecialty(e.target.value)
                    triggerChange()
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                >
                  <option value="Nail Art & Estética">Manicure / Nail Art</option>
                  <option value="Cabelereira & Colorista">Cabelereira & Colorista</option>
                  <option value="Design de Sobrancelhas & Cílios">Sobrancelhas & Cílios</option>
                  <option value="Estética Facial & Corporal">Estética Facial & Corporal</option>
                  <option value="Salão de Beleza Completo">Salão Completo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bloco de Contatos & Redes */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contato & Redes Sociais</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Telefone Comercial (WhatsApp)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      triggerChange()
                    }}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">E-mail de Contato</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      triggerChange()
                    }}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Instagram Profissional</label>
                <div className="relative">
                  <Instagram className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => {
                      setInstagram(e.target.value)
                      triggerChange()
                    }}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                    placeholder="@seuperfil"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Endereço Completo */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Endereço do Estabelecimento</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Rua / Avenida e Número</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                    triggerChange()
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Cidade / UF</label>
                <input
                  type="text"
                  defaultValue="São Paulo - SP"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bio / Resumo */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-[#111827]">Bio Profissional (Visível para clientes)</label>
              <span className="text-[10px] text-gray-400">{bio.length}/150 caracteres</span>
            </div>
            <textarea
              value={bio}
              maxLength={150}
              onChange={(e) => {
                setBio(e.target.value)
                triggerChange()
              }}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none resize-none"
              placeholder="Conte um pouco sobre sua experiência e diferenciais..."
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveSection('menu')}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSave('Dados do Negócio')}
              className="px-6 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SEÇÃO 2: REGRAS DE AGENDA & EXPEDIENTE (Tela 20 do PDF)
         ======================================================== */}
      {activeSection === 'agenda' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 space-y-6">
          {renderBackButton('Agenda e Expediente')}

          {/* Info Box — Diferença entre Configuração e Agenda */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>Esta tela define as regras de funcionamento da sua agenda</strong> — os dias, horários e intervalos que você trabalha. A tela de &ldquo;Agenda&rdquo; no menu é onde você visualiza e gerencia os agendamentos com clientes.
            </p>
          </div>

          {/* Modelo de Atendimento */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Modelo de Atendimento</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setAgendaType('fixa')
                  triggerChange()
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  agendaType === 'fixa'
                    ? 'border-[#111827] bg-gray-50 ring-1 ring-[#111827]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-[#111827]">Agenda Fixa</p>
                  {agendaType === 'fixa' && <div className="w-2.5 h-2.5 rounded-full bg-[#111827]" />}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Seus horários se repetem semanalmente. Ideal para rotinas estabelecidas.
                </p>
                <p className="text-[10px] text-gray-400 mt-1.5 italic">
                  Ex: Segunda a sexta, 09:00 às 18:00
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAgendaType('livre')
                  triggerChange()
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  agendaType === 'livre'
                    ? 'border-[#111827] bg-gray-50 ring-1 ring-[#111827]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-[#111827]">Agenda Livre / Flexível</p>
                  {agendaType === 'livre' && <div className="w-2.5 h-2.5 rounded-full bg-[#111827]" />}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Configure os horários dia a dia no calendário. Ideal para freelancers e atendimento sob demanda.
                </p>
                <p className="text-[10px] text-gray-400 mt-1.5 italic">
                  Ex: Segunda 10:00–14:00, Quarta 15:00–20:00
                </p>
              </button>
            </div>
          </div>

          {/* Grade Semanal com Intervalos */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dias e Horários da Semana</p>
              <span className="text-xs text-gray-500">Ative os dias em que você atende</span>
            </div>

            <div className="space-y-2.5">
              {weekSchedule.map((day, idx) => (
                <div
                  key={day.day}
                  className={`p-4 rounded-2xl border transition-all ${
                    day.active ? 'border-gray-200 bg-white shadow-sm' : 'border-gray-100 bg-gray-50/50 opacity-60'
                  }`}
                >
                  {/* Toggle e Nome do Dia */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#111827]">{day.day}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...weekSchedule]
                        updated[idx].active = !updated[idx].active
                        setWeekSchedule(updated)
                        triggerChange()
                      }}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                        day.active ? 'bg-brand' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          day.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Horários + Intervalo */}
                  {day.active ? (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className="flex-1 w-full">
                          <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Início</label>
                          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200">
                            <input
                              type="time"
                              defaultValue={day.start}
                              className="w-full text-xs font-bold text-[#111827] outline-none bg-transparent"
                              onChange={triggerChange}
                            />
                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          </div>
                        </div>

                        <div className="flex-1 w-full">
                          <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Fim</label>
                          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200">
                            <input
                              type="time"
                              defaultValue={day.end}
                              className="w-full text-xs font-bold text-[#111827] outline-none bg-transparent"
                              onChange={triggerChange}
                            />
                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          </div>
                        </div>
                      </div>

                      {/* Botão Adicionar Intervalo */}
                      <button
                        type="button"
                        onClick={() => {
                          toast.info(`Intervalo de almoço adicionado para ${day.day}: 12:00 – 13:00`)
                          triggerChange()
                        }}
                        className="text-xs text-brand font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        + Adicionar intervalo
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400 italic">Fechado / Folga</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Regras de Tempo, Intervalo e Políticas */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Regras de Tempo e Pausas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Duração Padrão dos Serviços</label>
                <select
                  value={serviceDuration}
                  onChange={(e) => {
                    setServiceDuration(e.target.value)
                    triggerChange()
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-brand outline-none"
                >
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60">60 minutos (1 hora)</option>
                  <option value="90">90 minutos (1h 30min)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Intervalo entre Atendimentos</label>
                <select
                  value={serviceInterval}
                  onChange={(e) => {
                    setServiceInterval(e.target.value)
                    triggerChange()
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-brand outline-none"
                >
                  <option value="0">Sem intervalo (direto)</option>
                  <option value="5">5 minutos</option>
                  <option value="10">10 minutos (padrão)</option>
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Tolerância de Atraso da Cliente</label>
                <select
                  value={delayTolerance}
                  onChange={(e) => {
                    setDelayTolerance(e.target.value)
                    triggerChange()
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-brand outline-none"
                >
                  <option value="10">10 minutos</option>
                  <option value="15">15 minutos (recomendado)</option>
                  <option value="20">20 minutos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Antecedência Mínima para Agendamento</label>
                <select
                  defaultValue="2"
                  onChange={triggerChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-brand outline-none"
                >
                  <option value="1">1 hora antes</option>
                  <option value="2">2 horas antes (recomendado)</option>
                  <option value="4">4 horas antes</option>
                  <option value="24">24 horas antes (1 dia)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Política de Cancelamento */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Política de Cancelamento</p>
            <select
              defaultValue="24"
              onChange={triggerChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-brand outline-none"
            >
              <option value="2">Cliente pode cancelar até 2 horas antes</option>
              <option value="12">Cliente pode cancelar até 12 horas antes</option>
              <option value="24">Cliente pode cancelar até 24 horas antes (padrão)</option>
              <option value="48">Cliente pode cancelar até 48 horas antes</option>
            </select>
            <p className="text-[11px] text-gray-400">
              Cancelamentos fora desse prazo podem resultar na retenção do sinal Pix, se ativado.
            </p>
          </div>

          {/* Resumo Visual da Agenda Configurada */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <p className="text-xs font-bold text-[#111827] mb-2">📋 Resumo da configuração atual:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Modelo: <strong>{agendaType === 'fixa' ? 'Agenda Fixa (Semanal)' : 'Agenda Livre (Flexível)'}</strong></li>
              <li>• Dias ativos: <strong>{weekSchedule.filter(d => d.active).map(d => d.day).join(', ') || 'Nenhum'}</strong></li>
              <li>• Duração padrão do serviço: <strong>{serviceDuration} min</strong></li>
              <li>• Intervalo entre atendimentos: <strong>{serviceInterval === '0' ? 'Sem intervalo' : `${serviceInterval} min`}</strong></li>
            </ul>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveSection('menu')}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSave('Agenda e Expediente')}
              className="px-6 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm"
            >
              Salvar Agenda
            </button>
          </div>
        </div>
      )}



      {/* ========================================================
          SEÇÃO 3: PAGAMENTO & SINAL PIX (Regra Crítica)
         ======================================================== */}
      {activeSection === 'pagamento' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 space-y-6">
          {renderBackButton('Pagamento e Sinal Pix')}

          {/* Toggle de Sinal Pix */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#111827]">Exigir taxa de sinal antecipada (Pix)</span>
                <span className="px-2 py-0.5 rounded-full bg-brand text-white text-[10px] font-bold uppercase tracking-wider">
                  Anti No-Show
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Ao ativar, a cliente só terá o horário reservado definitivamente após confirmação do pagamento do sinal via Pix.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPixEnabled(!pixEnabled)
                triggerChange()
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                pixEnabled ? 'bg-brand' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  pixEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {pixEnabled && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">Valor do Sinal Antecipado (R$)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">R$</span>
                    <input
                      type="number"
                      value={pixValue}
                      onChange={(e) => {
                        setPixValue(Number(e.target.value))
                        triggerChange()
                      }}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#111827] focus:ring-2 focus:ring-brand outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">Valor médio recomendado na pesquisa: R$ 30,00</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">Prazo de Cancelamento sem Perda do Sinal</label>
                  <select
                    value={cancelPolicyHours}
                    onChange={(e) => {
                      setCancelPolicyHours(e.target.value)
                      triggerChange()
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-brand outline-none"
                  >
                    <option value="12">Até 12 horas antes</option>
                    <option value="24">Até 24 horas antes (Padrão recomendado)</option>
                    <option value="48">Até 48 horas antes</option>
                  </select>
                </div>
              </div>

              {/* Box Informativo da Política */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Regra de Reembolso:</strong> Se a cliente cancelar com antecedência superior a {cancelPolicyHours} horas, o sinal é reembolsado automaticamente. Em caso de falta sem aviso prévio (No-Show), o valor do sinal é retido como compensação pelo horário bloqueado.
                </p>
              </div>
            </div>
          )}

          {/* Formas de Pagamento Aceitas no Salão */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Formas de Pagamento no Salão / Balcão</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                <input type="checkbox" defaultChecked disabled className="accent-brand" />
                <span className="text-xs font-semibold text-[#111827]">Pix (Obrigatório)</span>
              </label>
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={acceptCards}
                  onChange={(e) => {
                    setAcceptCards(e.target.checked)
                    triggerChange()
                  }}
                  className="accent-brand"
                />
                <span className="text-xs font-semibold text-[#111827]">Cartão de Crédito / Débito</span>
              </label>
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={acceptCash}
                  onChange={(e) => {
                    setAcceptCash(e.target.checked)
                    triggerChange()
                  }}
                  className="accent-brand"
                />
                <span className="text-xs font-semibold text-[#111827]">Dinheiro em Espécie</span>
              </label>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveSection('menu')}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSave('Configurações de Pagamento')}
              className="px-6 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm"
            >
              Salvar Pagamento
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SEÇÃO 4: LOCAL DE ATENDIMENTO
         ======================================================== */}
      {activeSection === 'local' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 space-y-6">
          {renderBackButton('Local de Atendimento')}

          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Onde você realiza seus serviços?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'salao', label: 'Apenas no Salão / Studio', desc: 'Cliente se desloca até o seu espaço' },
                { key: 'domicilio', label: 'Apenas em Domicílio', desc: 'Você vai até a residência da cliente' },
                { key: 'ambos', label: 'Ambos (Salão e Domicílio)', desc: 'Cliente escolhe a modalidade no agendamento' },
              ].map((loc) => (
                <button
                  key={loc.key}
                  type="button"
                  onClick={() => {
                    setLocationType(loc.key as any)
                    triggerChange()
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    locationType === loc.key
                      ? 'border-brand bg-rose-50/50 ring-1 ring-brand'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className="font-bold text-sm text-[#111827]">{loc.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{loc.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {(locationType === 'domicilio' || locationType === 'ambos') && (
            <div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 animate-fade-in">
              <p className="text-xs font-bold text-[#111827] uppercase tracking-wider">Regras de Deslocamento Domiciliar</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">Taxa de Deslocamento Padrão (R$)</label>
                  <input
                    type="number"
                    value={travelFee}
                    onChange={(e) => {
                      setTravelFee(e.target.value)
                      triggerChange()
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold bg-white outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Ex: 15,00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">Raio Máximo de Atendimento (km)</label>
                  <input
                    type="number"
                    value={travelRadius}
                    onChange={(e) => {
                      setTravelRadius(e.target.value)
                      triggerChange()
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold bg-white outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Ex: 10 km"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveSection('menu')}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSave('Local de Atendimento')}
              className="px-6 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm"
            >
              Salvar Local
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SEÇÃO 5: CONFIGURAÇÕES DE NOTIFICAÇÃO (Tela 18 do PDF)
         ======================================================== */}
      {activeSection === 'notificacoes' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 space-y-6">
          {renderBackButton('Configurações de Notificação')}

          {/* Push no App */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Notificações no Aplicativo (Push)</p>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {[
                { label: 'Novos Agendamentos', desc: 'Seja avisada em tempo real quando uma cliente agendar', state: notifPushNew, set: setNotifPushNew },
                { label: 'Cancelamentos e Desmarcações', desc: 'Receba alertas imediatos sobre horários liberados', state: notifPushCancel, set: setNotifPushCancel },
                { label: 'Lembretes de Início de Atendimento', desc: 'Aviso sonoro/notificação 15 minutos antes de cada cliente', state: notifPushReminder, set: setNotifPushReminder },
                { label: 'Relatórios Semanais de Faturamento', desc: 'Resumo consolidado toda segunda-feira de manhã', state: notifPushWeekly, set: setNotifPushWeekly },
              ].map((n, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/60 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{n.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      n.set(!n.state)
                      triggerChange()
                    }}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                      n.state ? 'bg-brand' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        n.state ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notificações por E-mail */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Notificações por E-mail</p>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {[
                { label: 'Novos Agendamentos por E-mail', desc: 'Receber cópia do comprovante na caixa de entrada', state: notifEmailNew, set: setNotifEmailNew },
                { label: 'Avisos de Cancelamento', desc: 'Receber detalhes do cancelamento por e-mail', state: notifEmailCancel, set: setNotifEmailCancel },
                { label: 'Relatório Mensal Financeiro (PDF)', desc: 'Envio mensal do relatório contábil do salão', state: notifEmailWeekly, set: setNotifEmailWeekly },
              ].map((n, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/60 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{n.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      n.set(!n.state)
                      triggerChange()
                    }}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                      n.state ? 'bg-brand' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        n.state ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActiveSection('menu')}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSave('Preferências de Notificação')}
              className="px-6 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm"
            >
              Salvar Notificações
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          SEÇÃO 6: COMPARTILHAMENTO & QR CODE (Tela 21 do PDF)
         ======================================================== */}
      {activeSection === 'compartilhamento' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 space-y-6">
          {renderBackButton('Compartilhamento')}

          {/* Link Público com botão Copiar */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seu Link Público de Agendamento</p>
            <p className="text-xs text-gray-500">Cole este link na sua Bio do Instagram ou envie diretamente para as clientes.</p>
            <div className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 bg-gray-50">
              <span className="text-sm font-semibold text-[#111827] px-2 truncate flex-1">{professional.publicUrl}</span>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedLink ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* QR Code para Recepção */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">QR Code para Recepção / Balcão</p>
            <p className="text-xs text-gray-500">Imprima e coloque na sua recepção para que clientes agendem direto pelo celular.</p>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
              {/* QR Code Visual */}
              <div className="w-36 h-36 bg-white rounded-2xl border border-gray-200 p-3 flex flex-col items-center justify-center shadow-sm">
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center p-2">
                  <Share2 className="w-6 h-6 text-brand mb-1" />
                  <span className="text-[10px] font-bold text-gray-600">QR CODE</span>
                  <span className="text-[8px] text-gray-400">{professional.studioName}</span>
                </div>
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <p className="text-sm font-bold text-[#111827]">Placa de Balcão (A6)</p>
                <p className="text-xs text-gray-500 max-w-sm">
                  Gera uma arte pronta para impressão com a sua logo, cores e QR Code oficial de agendamento.
                </p>
                <button
                  onClick={() => toast.success('Download do QR Code em alta resolução iniciado!')}
                  className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-xs font-bold text-[#111827] hover:bg-gray-50 transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Baixar Imagem para Impressão
                </button>
              </div>
            </div>
          </div>

          {/* Compartilhamento Rápido */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Compartilhamento Rápido</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário? Confira meus serviços e horários disponíveis aqui: ${professional.publicUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-center hover:bg-emerald-100 transition-colors flex flex-col items-center justify-center gap-1"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold">WhatsApp</span>
              </a>

              <button
                onClick={handleCopy}
                className="p-3.5 rounded-xl bg-pink-50 border border-pink-100 text-pink-800 text-center hover:bg-pink-100 transition-colors flex flex-col items-center justify-center gap-1"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-bold">Instagram Bio</span>
              </button>

              <a
                href={`mailto:?subject=Agendamento no ${professional.studioName}&body=Acesse: ${professional.publicUrl}`}
                className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-center hover:bg-blue-100 transition-colors flex flex-col items-center justify-center gap-1"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">E-mail</span>
              </a>

              <a
                href={`/${professional.slug}`}
                target="_blank"
                className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-center hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-1"
              >
                <ExternalLink className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-bold">Ver Vitrine</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SEÇÃO 7: SEGURANÇA E CONTA (Tela 22 do PDF)
         ======================================================== */}
      {activeSection === 'seguranca' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 space-y-6">
          {renderBackButton('Segurança e Conta')}

          {/* Alterar Senha */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alterar Senha</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Senha Atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Nova Senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => {
                  if (!newPassword || newPassword !== confirmPassword) {
                    toast.error('As senhas não coincidem!')
                    return
                  }
                  toast.success('Senha atualizada com sucesso!')
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
                }}
                className="px-5 py-2 bg-[#111827] text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Atualizar Senha
              </button>
            </div>
          </div>

          {/* Autenticação em 2 Etapas */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Autenticação & Acesso</p>
            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#111827]">Autenticação em 2 Etapas (Código no E-mail)</p>
                <p className="text-xs text-gray-500 mt-0.5">Adiciona uma camada extra exigindo código OTP de 6 dígitos ao logar</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTwoFactor(!twoFactor)
                  toast.info(twoFactor ? '2FA desativado' : '2FA ativado com sucesso')
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  twoFactor ? 'bg-brand' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    twoFactor ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Preferências de Conta */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preferências do Sistema</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Idioma da Interface</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white outline-none"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">Modo de Exibição</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setThemeMode('claro')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      themeMode === 'claro' ? 'border-[#111827] bg-[#111827] text-white' : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    Claro
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setThemeMode('escuro')
                      toast.info('Tema escuro simulado!')
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      themeMode === 'escuro' ? 'border-[#111827] bg-[#111827] text-white' : 'border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    Escuro
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Zona de Perigo */}
          <div className="space-y-3 pt-4 border-t border-red-100">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Zona de Perigo</p>
            <p className="text-xs text-gray-500">Ações com impacto na sessão e nos dados cadastrados.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/login'
                }}
                className="py-3 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair da Conta (Logout)
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.error('Exclusão de conta simulada no modo protótipo.')
                }}
                className="py-3 px-4 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                Excluir Conta Corporativa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
