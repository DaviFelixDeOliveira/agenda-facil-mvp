'use client'

import { useState } from 'react'
import { useMockStore } from '@/context/mock-store'
import { useTheme } from 'next-themes'
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
  Percent,
  DollarSign,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react'
import { LogoutModal } from '@/components/logout-modal'

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15c-1.49 0-2.94-.4-4.22-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.21 8.21 0 01-1.26-4.38c0-4.54 3.7-8.24 8.27-8.24 2.2 0 4.28.86 5.84 2.42a8.2 8.2 0 012.43 5.84c0 4.55-3.7 8.23-8.27 8.23zm4.53-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.98.69.46-.04 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.12-.22-.19-.47-.31z" />
    </svg>
  )
}

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

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
  const { professional, schedule, updateProfessional } = useMockStore()
  const { theme, setTheme } = useTheme()
  const [showLogout, setShowLogout] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
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
  const [pixTipo, setPixTipo] = useState<'fixo' | 'porcentagem'>(professional.pixSinalTipo || 'fixo')
  const [pixValue, setPixValue] = useState(professional.pixSinalValor)
  const [pixPorcentagem, setPixPorcentagem] = useState(professional.pixSinalPorcentagem || 30)
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
  const [loginType, setLoginType] = useState<'email' | 'google'>('email') // 'email' ou 'google'

  // --- Estados Gerais ---
  const [hasChanges, setHasChanges] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const triggerChange = () => setHasChanges(true)

  const handleSave = (sectionName: string) => {
    updateProfessional({
      studioName,
      name: profName,
      phoneFormatted: phone,
      email,
      address,
      cnpj,
      bio,
      specialty,
      pixSinal: pixEnabled,
      pixSinalTipo: pixTipo,
      pixSinalValor: pixValue,
      pixSinalPorcentagem: pixPorcentagem,
      toleranciaAtraso: Number(delayTolerance) || 15,
      cancelamentoSemPerda: Number(cancelPolicyHours) || 24,
    })
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
              {/* Escolha entre Valor Fixo ou Porcentagem */}
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                  Como você prefere cobrar o sinal?
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => {
                      setPixTipo('fixo')
                      triggerChange()
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      pixTipo === 'fixo'
                        ? 'border-brand bg-rose-50/50 text-brand shadow-xs'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    Valor Fixo (R$)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPixTipo('porcentagem')
                      triggerChange()
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      pixTipo === 'porcentagem'
                        ? 'border-brand bg-rose-50/50 text-brand shadow-xs'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Percent className="w-4 h-4" />
                    Porcentagem (%)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pixTipo === 'fixo' ? (
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1.5">Valor do Sinal Fixo (R$)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">R$</span>
                      <input
                        type="number"
                        min="5"
                        max="500"
                        value={pixValue}
                        onChange={(e) => {
                          setPixValue(Number(e.target.value))
                          triggerChange()
                        }}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#111827] focus:ring-2 focus:ring-brand outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Valor fixo cobrado em qualquer serviço agendado.</p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1.5">Porcentagem do Serviço (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={pixPorcentagem}
                        onChange={(e) => {
                          const value = Number(e.target.value)
                          setPixPorcentagem(Math.min(100, Math.max(0, isNaN(value) ? 0 : value)))
                          triggerChange()
                        }}
                        onBlur={(e) => {
                          const value = Number(e.target.value)
                          if (isNaN(value) || value < 0) setPixPorcentagem(0)
                          else if (value > 100) setPixPorcentagem(100)
                        }}
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#111827] focus:ring-2 focus:ring-brand outline-none"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">%</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Calculado automaticamente sobre o valor de cada serviço.</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1.5">Prazo de Cancelamento sem Perda</label>
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

              {/* Prévia de Simulação do Sinal */}
              <div className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  {pixTipo === 'porcentagem' ? `${pixPorcentagem}%` : `R$`}
                </div>
                <div className="text-xs text-gray-700">
                  <span className="font-bold text-[#111827]">Exemplo Prático: </span>
                  {pixTipo === 'porcentagem' ? (
                    <>
                      Para um serviço de <strong>R$ 100,00</strong>, a cliente pagará <strong>R$ {(100 * (pixPorcentagem / 100)).toFixed(2).replace('.', ',')}</strong> antecipado via Pix e o restante no local.
                    </>
                  ) : (
                    <>
                      A cliente pagará <strong>R$ {pixValue.toFixed(2).replace('.', ',')}</strong> antecipado via Pix para garantir o horário, independente do serviço.
                    </>
                  )}
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
                className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-center hover:bg-emerald-100 transition-colors flex flex-col items-center justify-center gap-1.5 shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <WhatsAppIcon className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-bold">WhatsApp</span>
              </a>

              <button
                onClick={handleCopy}
                className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200 text-pink-800 text-center hover:bg-pink-100 transition-colors flex flex-col items-center justify-center gap-1.5 shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs">
                  <InstagramIcon className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-bold">Instagram Bio</span>
              </button>

              <a
                href={`mailto:?subject=Agendamento no ${professional.studioName}&body=Acesse: ${professional.publicUrl}`}
                className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-800 text-center hover:bg-blue-100 transition-colors flex flex-col items-center justify-center gap-1.5 shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-bold">E-mail</span>
              </a>

              <a
                href={`/${professional.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-200 text-gray-800 text-center hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-1.5 shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center shadow-xs">
                  <ExternalLink className="w-4 h-4" />
                </div>
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

          {/* Tipo de Login */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Método de Acesso</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLoginType('email')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  loginType === 'email'
                    ? 'border-brand bg-rose-50/50 shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="font-bold text-sm text-[#111827]">E-mail e Senha</span>
                  </div>
                  {loginType === 'email' && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Acesso tradicional com e-mail e senha pessoal
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLoginType('google')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  loginType === 'google'
                    ? 'border-brand bg-rose-50/50 shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="font-bold text-sm text-[#111827]">Google</span>
                  </div>
                  {loginType === 'google' && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Acesso via conta Google (sem senha própria)
                </p>
              </button>
            </div>
          </div>

          {/* Alterar Senha - apenas para login com e-mail */}
          {loginType === 'email' && (
            <div className="space-y-3 pt-2 border-t border-gray-100">
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
          )}

          {/* Info para login Google */}
          {loginType === 'google' && (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-800">Login via Google</p>
                <p className="text-xs text-blue-700 mt-1">
                  Como você acessa com sua conta Google, não há senha própria para alterar.
                  A segurança é gerenciada diretamente pelo Google (incluindo 2FA).
                </p>
              </div>
            </div>
          )}

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

          {/* Preferências de Tema / Aparência */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aparência do Painel</p>
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-2">Tema de Exibição</label>
              <div className="grid grid-cols-3 gap-2.5 max-w-md">
                <button
                  type="button"
                  onClick={() => {
                    setTheme('light')
                    toast.success('Tema Claro ativado!')
                  }}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-1.5 ${
                    theme === 'light'
                      ? 'border-brand bg-rose-50/50 text-brand shadow-xs'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Claro</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTheme('dark')
                    toast.success('Tema Escuro ativado!')
                  }}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-1.5 ${
                    theme === 'dark'
                      ? 'border-brand bg-rose-50/50 text-brand shadow-xs'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Escuro</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTheme('system')
                    toast.info('Tema Padrão do Sistema selecionado!')
                  }}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-1.5 ${
                    theme === 'system'
                      ? 'border-brand bg-rose-50/50 text-brand shadow-xs'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                  <span>Sistema</span>
                </button>
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
                onClick={() => setShowLogout(true)}
                className="py-3 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair da Conta (Logout)
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteAccount(true)}
                className="py-3 px-4 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                Excluir Conta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Logout */}
      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          window.location.href = '/boas-vindas'
        }}
      />

      {/* Modal de Confirmação de Exclusão de Conta */}
      {showDeleteAccount && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowDeleteAccount(false)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 border border-gray-100 text-center relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-xs">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#111827]">Excluir sua conta definitivamente?</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Esta ação é irreversível. Todos os seus agendamentos, clientes cadastrados e configurações serão excluídos.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteAccount(false)}
                className="py-3 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success('Conta excluída com sucesso.')
                  setTimeout(() => {
                    window.location.href = '/boas-vindas'
                  }, 500)
                }}
                className="py-3 px-4 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
