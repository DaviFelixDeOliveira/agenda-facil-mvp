'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  Camera,
  Plus,
  Trash2,
  Clock,
  ArrowRight,
  Check,
  Calendar,
  Home,
  Sun,
  Moon,
  Laptop,
  MessageCircle,
  X,
  Info,
} from 'lucide-react'
import { useMockStore } from '@/context/mock-store'
import { validateServiceName, validateRequiredText } from '@/lib/validation'

type TimeBlock = {
  start: string
  end: string
}

type DayConfig = {
  name: string
  active: boolean
  fixedMode: 'continuo' | 'pontual'
  slots: string[]
  flexibleMode: 'faixas' | 'whatsapp'
  blocks: TimeBlock[]
}

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { upsertService } = useMockStore()

  // Passo 1: Perfil
  const [studioName, setStudioName] = useState('Studio Bela Face')
  const [studioNameError, setStudioNameError] = useState('')
  const [bio, setBio] = useState('')
  const [domicilio, setDomicilio] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [avatarDragActive, setAvatarDragActive] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedAvatar = localStorage.getItem('beleza-em-dia-onboarding-avatar')
    if (savedAvatar) setAvatar(savedAvatar)
    fetch('/api/profile')
      .then((response) => response.ok ? response.json() : null)
      .then((profile) => {
        if (!savedAvatar && (profile?.image || profile?.googleImage)) setAvatar(profile.image || profile.googleImage)
      })
      .catch(() => {})
  }, [])

  const handleAvatarFile = (file: File | undefined) => {
    if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return
    const reader = new FileReader()
    reader.onload = () => {
      const value = String(reader.result)
      setAvatar(value)
      localStorage.setItem('beleza-em-dia-onboarding-avatar', value)
    }
    reader.readAsDataURL(file)
  }

  // Passo 2: Agenda
  const [agendaType, setAgendaType] = useState<'fixa' | 'flexivel' | null>(null)
  const [newSlotInputs, setNewSlotInputs] = useState<Record<number, string>>({})
  const [days, setDays] = useState<DayConfig[]>([
    {
      name: 'Segunda-feira',
      active: true,
      fixedMode: 'continuo',
      slots: ['14:00', '16:00', '19:00'],
      flexibleMode: 'faixas',
      blocks: [
        { start: '07:00', end: '11:00' },
        { start: '15:00', end: '17:00' },
      ],
    },
    {
      name: 'Terça-feira',
      active: true,
      fixedMode: 'continuo',
      slots: ['09:00', '11:00', '15:00'],
      flexibleMode: 'faixas',
      blocks: [{ start: '09:00', end: '11:00' }],
    },
    {
      name: 'Quarta-feira',
      active: true,
      fixedMode: 'continuo',
      slots: ['09:00', '14:00', '16:00'],
      flexibleMode: 'faixas',
      blocks: [{ start: '09:00', end: '18:00' }],
    },
    {
      name: 'Quinta-feira',
      active: true,
      fixedMode: 'continuo',
      slots: ['09:00', '14:00', '17:00'],
      flexibleMode: 'faixas',
      blocks: [{ start: '09:00', end: '18:00' }],
    },
    {
      name: 'Sexta-feira',
      active: true,
      fixedMode: 'continuo',
      slots: ['09:00', '14:00', '18:00'],
      flexibleMode: 'faixas',
      blocks: [{ start: '09:00', end: '18:00' }],
    },
    {
      name: 'Sábado',
      active: false,
      fixedMode: 'continuo',
      slots: ['09:00', '11:00', '13:00'],
      flexibleMode: 'whatsapp',
      blocks: [{ start: '09:00', end: '14:00' }],
    },
    {
      name: 'Domingo',
      active: false,
      fixedMode: 'continuo',
      slots: [],
      flexibleMode: 'whatsapp',
      blocks: [],
    },
  ])

  // Passo 3: Serviços
  const defaultCategories = ['Unhas', 'Cabelos', 'Sobrancelhas e Cílios', 'Depilação e Estética', 'Maquiagem']
  const [categories, setCategories] = useState(defaultCategories)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [services, setServices] = useState([
    { id: 1, category: 'Unhas', name: 'Manicure Simples', description: '', price: '35,00', duration: '45', checked: false },
    { id: 2, category: 'Unhas', name: 'Pedicure Tradicional', description: '', price: '40,00', duration: '45', checked: false },
    { id: 3, category: 'Unhas', name: 'Combo Manicure + Pedicure', description: '', price: '70,00', duration: '90', checked: false },
    { id: 4, category: 'Unhas', name: 'Alongamento em Fibra de Vidro', description: '', price: '150,00', duration: '120', checked: false },
    { id: 5, category: 'Unhas', name: 'Manutenção de Alongamento', description: '', price: '90,00', duration: '90', checked: false },
    { id: 6, category: 'Unhas', name: 'Esmaltação em Gel', description: '', price: '60,00', duration: '50', checked: false },
    { id: 7, category: 'Unhas', name: 'Banho de Gel', description: '', price: '80,00', duration: '60', checked: false },
    { id: 8, category: 'Cabelos', name: 'Corte Feminino + Escova', description: '', price: '90,00', duration: '60', checked: false },
    { id: 9, category: 'Cabelos', name: 'Escova Modelada', description: '', price: '50,00', duration: '45', checked: false },
    { id: 10, category: 'Cabelos', name: 'Hidratação Profunda + Escova', description: '', price: '100,00', duration: '60', checked: false },
    { id: 11, category: 'Cabelos', name: 'Nutrição / Reconstrução Capilar', description: '', price: '130,00', duration: '75', checked: false },
    { id: 12, category: 'Cabelos', name: 'Retoque de Raiz / Coloração', description: '', price: '120,00', duration: '90', checked: false },
    { id: 13, category: 'Cabelos', name: 'Meias Luzes / Morena Iluminada', description: '', price: '280,00', duration: '180', checked: false },
    { id: 14, category: 'Cabelos', name: 'Botox Capilar', description: '', price: '150,00', duration: '120', checked: false },
    { id: 15, category: 'Sobrancelhas e Cílios', name: 'Design de Sobrancelhas Simples', description: '', price: '35,00', duration: '30', checked: false },
    { id: 16, category: 'Sobrancelhas e Cílios', name: 'Design de Sobrancelhas com Henna', description: '', price: '55,00', duration: '45', checked: false },
    { id: 17, category: 'Sobrancelhas e Cílios', name: 'Brow Lamination', description: '', price: '110,00', duration: '60', checked: false },
    { id: 18, category: 'Sobrancelhas e Cílios', name: 'Extensão de Cílios - Fio a Fio', description: '', price: '140,00', duration: '120', checked: false },
    { id: 19, category: 'Sobrancelhas e Cílios', name: 'Extensão de Cílios - Volume Russo', description: '', price: '180,00', duration: '150', checked: false },
    { id: 20, category: 'Sobrancelhas e Cílios', name: 'Lash Lifting + Tintura', description: '', price: '120,00', duration: '60', checked: false },
    { id: 21, category: 'Sobrancelhas e Cílios', name: 'Manutenção de Cílios', description: '', price: '90,00', duration: '90', checked: false },
    { id: 22, category: 'Depilação e Estética', name: 'Depilação Buço / Rosto', description: '', price: '25,00', duration: '20', checked: false },
    { id: 23, category: 'Depilação e Estética', name: 'Depilação Axilas', description: '', price: '30,00', duration: '20', checked: false },
    { id: 24, category: 'Depilação e Estética', name: 'Depilação Meia Perna', description: '', price: '45,00', duration: '30', checked: false },
    { id: 25, category: 'Depilação e Estética', name: 'Depilação Íntima / Virilha Completa', description: '', price: '65,00', duration: '40', checked: false },
    { id: 26, category: 'Depilação e Estética', name: 'Limpeza de Pele Profunda', description: '', price: '130,00', duration: '75', checked: false },
    { id: 27, category: 'Depilação e Estética', name: 'Drenagem Linfática Corporal', description: '', price: '100,00', duration: '60', checked: false },
    { id: 28, category: 'Depilação e Estética', name: 'Massagem Relaxante', description: '', price: '110,00', duration: '60', checked: false },
    { id: 29, category: 'Maquiagem', name: 'Maquiagem Social / Evento', description: '', price: '150,00', duration: '60', checked: false },
    { id: 30, category: 'Maquiagem', name: 'Maquiagem Express / Casual', description: '', price: '90,00', duration: '40', checked: false },
    { id: 31, category: 'Maquiagem', name: 'Maquiagem para Noiva / Pré-Wedding', description: '', price: '300,00', duration: '90', checked: false },
    { id: 32, category: 'Maquiagem', name: 'Aplicação de Cílios Postiços', description: '', price: '30,00', duration: '15', checked: false },
  ])
  const [serviceErrorId, setServiceErrorId] = useState<number | null>(null)
  const [serviceError, setServiceError] = useState('')
  const serviceRefs = useRef<Record<number, HTMLInputElement | null>>({})
  const categoryRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const draft = localStorage.getItem('beleza-em-dia-onboarding-services')
    if (!draft) return
    try {
      const parsed = JSON.parse(draft)
      if (Array.isArray(parsed)) setServices(parsed)
    } catch {
      localStorage.removeItem('beleza-em-dia-onboarding-services')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('beleza-em-dia-onboarding-services', JSON.stringify(services))
  }, [services])

  const addOnboardingService = () => {
    setServices((prev) => [...prev, { id: Date.now(), category: selectedCategories[0] || 'Outra', name: 'Novo serviço', description: '', price: '0,00', duration: '30', checked: true }])
  }

  const saveSelectedServices = () => {
    services.filter((service) => service.checked && selectedCategories.includes(service.category) && service.name.trim()).forEach((service) => {
      upsertService({
        id: `onboarding-${service.id}`,
        name: service.name.trim(),
        category: service.category.trim(),
        description: service.description.trim() || undefined,
        price: Number(service.price.replace(',', '.')) || 0,
        duration: Number(service.duration),
        icon: 'Sparkles',
        active: true,
      })
    })
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category])
  }

  const addCategory = () => {
    const value = newCategory.trim()
    if (!value || categories.includes(value)) return
    setCategories((prev) => [...prev, value])
    setSelectedCategories((prev) => [...prev, value])
    setNewCategory('')
  }

  // Passo 4: Tema
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>(
    (theme as 'light' | 'dark' | 'system') || 'system'
  )

  const handleSelectTheme = (mode: 'light' | 'dark' | 'system') => {
    setSelectedTheme(mode)
    setTheme(mode)
  }

  const finishOnboarding = () => {
    setIsSaving(true)
    window.setTimeout(() => {
      setIsSaving(false)
      setStep(5)
    }, 900)
  }

  const goToAgenda = () => {
    const error = validateRequiredText(studioName, 'O nome do estúdio ou salão')
    if (error) {
      setStudioNameError(error)
      return
    }
    setStudioNameError('')
    setStep(2)
  }

  const continueFromServices = () => {
    const selected = services.filter((service) => service.checked && selectedCategories.includes(service.category))
    if (selected.length === 0) {
      setServiceErrorId(-1)
      setServiceError('Selecione pelo menos um serviço para continuar.')
      window.setTimeout(() => {
        categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        categoryRef.current?.focus({ preventScroll: true })
      }, 0)
      return
    }
    const invalid = selected.find((service) => validateServiceName(service.name) || !Number.isInteger(Number(service.duration)) || Number(service.duration) <= 0 || Number(service.price.replace(',', '.')) < 0)
    if (invalid) {
      setServiceErrorId(invalid.id)
      setServiceError(validateServiceName(invalid.name) || 'Informe preço válido e duração inteira maior que zero.')
      window.setTimeout(() => {
        const field = serviceRefs.current[invalid.id]
        field?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        field?.focus({ preventScroll: true })
      }, 0)
      return
    }
    setServiceErrorId(null)
    setServiceError('')
    saveSelectedServices()
    setStep(4)
  }

  const handleAddSlot = (dayIdx: number) => {
    const timeToAdd = newSlotInputs[dayIdx] || '14:00'
    const updated = [...days]
    if (!updated[dayIdx].slots.includes(timeToAdd)) {
      updated[dayIdx].slots = [...updated[dayIdx].slots, timeToAdd].sort()
      setDays(updated)
    }
  }

  const handleRemoveSlot = (dayIdx: number, slotIdx: number) => {
    const updated = [...days]
    updated[dayIdx].slots.splice(slotIdx, 1)
    setDays(updated)
  }

  const handleLogout = () => {
    try {
      sessionStorage.clear()
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    } catch (_) {}
    router.replace('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#090D16] text-[#111827] dark:text-[#F9FAFB] p-4 sm:p-6 transition-colors">
      <div className="w-full max-w-lg bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
        {/* Header com navegação do wizard */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
          <span className="font-bold text-[#111827] dark:text-white text-base">Beleza em Dia</span>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 font-semibold transition-colors"
          >
            Sair
          </button>
        </div>

        {/* Indicador de Passos */}
        {step < 5 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-gray-400 dark:text-gray-500">PASSO {step} DE 4</span>
              <span className="text-brand uppercase tracking-wider">
                {step === 1 ? 'PERFIL' : step === 2 ? 'AGENDA' : step === 3 ? 'SERVIÇOS' : 'APARÊNCIA'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ========================================================
            PASSO 1: CONFIGURAÇÕES INICIAIS DE PERFIL
           ======================================================== */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-[#111827] dark:text-white">Configure seu Perfil</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Adicione suas informações profissionais para que os clientes conheçam seu trabalho.</p>
            </div>

            {/* Upload de Foto */}
            <div
              onDragOver={(event) => { event.preventDefault(); setAvatarDragActive(true) }}
              onDragLeave={() => setAvatarDragActive(false)}
              onDrop={(event) => { event.preventDefault(); setAvatarDragActive(false); handleAvatarFile(event.dataTransfer.files[0]) }}
              onClick={() => avatarInputRef.current?.click()}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-colors ${avatarDragActive ? 'border-brand bg-rose-50 dark:bg-rose-950/30' : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40'}`}
            >
              <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center relative shadow-sm mb-2 overflow-hidden">
                {avatar ? <Image src={avatar} alt="Foto de perfil" fill unoptimized className="object-cover" /> : <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />}
                {!avatar && <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand text-white rounded-full flex items-center justify-center shadow"><Plus className="w-3.5 h-3.5" /></div>}
              </div>
              <input ref={avatarInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={(event) => handleAvatarFile(event.target.files?.[0])} />
              <p className="text-xs font-bold text-brand">{avatar ? 'Trocar Foto' : 'Adicionar Foto'}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">Arraste ou selecione JPG, PNG ou WEBP</p>
              {avatar && <button type="button" onClick={(event) => { event.stopPropagation(); setAvatar(''); localStorage.removeItem('beleza-em-dia-onboarding-avatar') }} className="mt-2 text-[10px] font-bold text-red-500 hover:text-red-700">Remover foto</button>}
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Nome do Estúdio/Salão</label>
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-brand outline-none"
                  placeholder="Ex: Studio Bela Face"
                  required
                />
                {studioNameError && <p className="mt-1 text-xs font-semibold text-red-600">{studioNameError}</p>}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Bio Profissional</label>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{bio.length}/150</span>
                </div>
                <textarea
                  value={bio}
                  maxLength={150}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-brand outline-none resize-none"
                  placeholder="Conte um pouco sobre sua experiência e diferenciais..."
                />
              </div>

              {/* Toggle Domicílio */}
              <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-brand" />
                  <div>
                    <p className="text-sm font-bold text-[#111827] dark:text-white">Atendimento a Domicílio</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ofereço serviços na casa do cliente</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDomicilio(!domicilio)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    domicilio ? 'bg-brand' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      domicilio ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={goToAgenda}
              className="w-full py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Próximo Passo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            PASSO 2: DEFINA SUA AGENDA
           ======================================================== */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-[#111827] dark:text-white">Defina sua Agenda</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Escolha o modelo de funcionamento da sua agenda e personalize os horários por dia.
              </p>
            </div>

            {/* Seletor de Tipo de Agenda (Clique no mesmo para desmarcar) */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAgendaType(prev => (prev === 'fixa' ? null : 'fixa'))}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  agendaType === 'fixa'
                    ? 'border-brand bg-rose-50/40 dark:bg-rose-950/30 text-brand shadow-xs'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">Agenda Fixa</span>
                  {agendaType === 'fixa' && (
                    <div className="w-4 h-4 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2">
                  Horários exatos na grade (contínuo ou pontual).
                </p>
              </button>

              <button
                type="button"
                onClick={() => setAgendaType(prev => (prev === 'flexivel' ? null : 'flexivel'))}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  agendaType === 'flexivel'
                    ? 'border-brand bg-rose-50/40 dark:bg-rose-950/30 text-brand shadow-xs'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">Agenda Flexível</span>
                  {agendaType === 'flexivel' && (
                    <div className="w-4 h-4 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2">
                  Faixas livres de horário ou combinar no WhatsApp.
                </p>
              </button>
            </div>

            {/* Explicação detalhada de cada modelo */}
            {agendaType === 'fixa' && (
              <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-[#111827] dark:text-blue-100 space-y-2 text-xs animate-fade-in">
                <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Agenda Fixa (Para quem trabalha com horários exatos)</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    <strong>Como funciona:</strong> Você define seus dias de atendimento e os horários precisos da sua grade — seja um expediente contínuo (ex: das 09h às 18h) ou horários pontuais pré-determinados (ex: atendo apenas às 14h, 16h e 19h).
                  </p>
                  <p>
                    <strong>Para a cliente:</strong> Ela acessa o seu link, vê exatamente as vagas livres que você cadastrou e reserva o horário sozinha.
                  </p>
                  <p>
                    <strong>Ideal para:</strong> Profissionais com atendimento em local fixo (studio/salão) que querem total controle e autossuficiência na escolha da cliente.
                  </p>
                </div>
              </div>
            )}

            {agendaType === 'flexivel' && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60 text-[#111827] dark:text-amber-100 space-y-2 text-xs animate-fade-in">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
                  <MessageCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Agenda Flexível (Para quem precisa negociar o horário)</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    <strong>Como funciona:</strong> Você define faixas variadas por dia ou pode preferir não cadastrar nenhum horário, apenas indicando os dias em que estará atendendo e avisando que o horário precisa ser combinado.
                  </p>
                  <p>
                    <strong>Para a cliente:</strong> Ela seleciona o dia em que você está disponível e clica no botão para alinhar o horário diretamente com você no WhatsApp (sem travar uma hora no site).
                  </p>
                  <p>
                    <strong>Ideal para:</strong> Quem atende a domicílio, faz encaixes manuais ou precisa calcular o deslocamento antes de fechar a agenda.
                  </p>
                </div>
              </div>
            )}

            {agendaType === null && (
              <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Seleção opcional:</strong> Você pode clicar em um dos tipos acima para visualizar a explicação ou configurar os horários abaixo livremente e ajustar depois nas configurações.
                </p>
              </div>
            )}

            {/* Lista dos dias da semana */}
            {!agendaType && <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300">Agenda vazia. Selecione Agenda Fixa ou Agenda Flexível para configurar dias e horários.</div>}
            <div className={`space-y-3 max-h-80 overflow-y-auto pr-1 ${!agendaType ? 'hidden' : ''}`}>
              {days.map((day, idx) => (
                <div key={day.name} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/70 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#111827] dark:text-white">{day.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...days]
                        updated[idx].active = !updated[idx].active
                        setDays(updated)
                      }}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                        day.active ? 'bg-brand' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          day.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {day.active && agendaType ? (
                    <div className="space-y-3 pt-1 border-t border-gray-50 dark:border-gray-700/60">
                      {/* === MODO AGENDA FIXA === */}
                      {agendaType === 'fixa' && (
                        <div className="space-y-3">
                          {/* Seletor de modo do dia: Contínuo vs Pontual */}
                          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...days]
                                updated[idx].fixedMode = 'continuo'
                                setDays(updated)
                              }}
                              className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-all ${
                                day.fixedMode === 'continuo'
                                  ? 'bg-white dark:bg-gray-700 text-[#111827] dark:text-white shadow-xs'
                                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                              }`}
                            >
                              Expediente Contínuo
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...days]
                                updated[idx].fixedMode = 'pontual'
                                setDays(updated)
                              }}
                              className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-all ${
                                day.fixedMode === 'pontual'
                                  ? 'bg-white dark:bg-gray-700 text-[#111827] dark:text-white shadow-xs'
                                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                              }`}
                            >
                              Horários Pontuais
                            </button>
                          </div>

                          {/* Se Contínuo */}
                          {day.fixedMode === 'continuo' ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Início</label>
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                  <input
                                    type="time"
                                    value={day.blocks[0]?.start || '09:00'}
                                    onChange={(e) => {
                                      const updated = [...days]
                                      if (!updated[idx].blocks[0]) {
                                        updated[idx].blocks = [{ start: e.target.value, end: '18:00' }]
                                      } else {
                                        updated[idx].blocks[0].start = e.target.value
                                      }
                                      setDays(updated)
                                    }}
                                    className="w-full text-xs font-bold text-gray-900 dark:text-white outline-none bg-transparent"
                                  />
                                  <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                                </div>
                              </div>

                              <div className="flex-1">
                                <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Fim</label>
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                  <input
                                    type="time"
                                    value={day.blocks[0]?.end || '18:00'}
                                    onChange={(e) => {
                                      const updated = [...days]
                                      if (!updated[idx].blocks[0]) {
                                        updated[idx].blocks = [{ start: '09:00', end: e.target.value }]
                                      } else {
                                        updated[idx].blocks[0].end = e.target.value
                                      }
                                      setDays(updated)
                                    }}
                                    className="w-full text-xs font-bold text-gray-900 dark:text-white outline-none bg-transparent"
                                  />
                                  <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Se Pontual (ex: 14h, 16h, 19h) */
                            <div className="space-y-2.5">
                              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                Horários cadastrados para este dia:
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {day.slots.length > 0 ? (
                                  day.slots.map((slot, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-brand border border-rose-100 dark:border-rose-900/60 text-xs font-bold"
                                    >
                                      <Clock className="w-3 h-3" />
                                      {slot}
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveSlot(idx, sIdx)}
                                        className="hover:text-red-700 p-0.5 rounded-full"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[11px] text-gray-400 italic">Nenhum horário adicionado.</span>
                                )}
                              </div>

                              {/* Input para adicionar novo horário pontual */}
                              <div className="flex items-center gap-2 pt-1">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                  <input
                                    type="time"
                                    value={newSlotInputs[idx] || '14:00'}
                                    onChange={(e) =>
                                      setNewSlotInputs(prev => ({ ...prev, [idx]: e.target.value }))
                                    }
                                    className="text-xs font-bold text-gray-900 dark:text-white outline-none bg-transparent"
                                  />
                                  <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAddSlot(idx)}
                                  className="px-3 py-1.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-rose-700 transition-colors flex items-center gap-1 shadow-xs"
                                >
                                  <Plus className="w-3 h-3" /> Adicionar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* === MODO AGENDA FLEXÍVEL === */}
                      {agendaType === 'flexivel' && (
                        <div className="space-y-3">
                          {/* Alternador de modalidade no dia */}
                          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...days]
                                updated[idx].flexibleMode = 'faixas'
                                if (updated[idx].blocks.length === 0) {
                                  updated[idx].blocks = [{ start: '07:00', end: '11:00' }]
                                }
                                setDays(updated)
                              }}
                              className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-all ${
                                day.flexibleMode === 'faixas'
                                  ? 'bg-white dark:bg-gray-700 text-[#111827] dark:text-white shadow-xs'
                                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                              }`}
                            >
                              Faixas de Horário
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...days]
                                updated[idx].flexibleMode = 'whatsapp'
                                setDays(updated)
                              }}
                              className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-all ${
                                day.flexibleMode === 'whatsapp'
                                  ? 'bg-white dark:bg-gray-700 text-[#111827] dark:text-white shadow-xs'
                                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                              }`}
                            >
                              Combinar no WhatsApp
                            </button>
                          </div>

                          {day.flexibleMode === 'faixas' ? (
                            <div className="space-y-2">
                              {day.blocks.map((block, bdx) => (
                                <div key={bdx} className="flex items-center gap-2">
                                  <div className="flex-1">
                                    <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">
                                      Turno / Início
                                    </label>
                                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                      <input
                                        type="time"
                                        value={block.start}
                                        onChange={(e) => {
                                          const updated = [...days]
                                          updated[idx].blocks[bdx].start = e.target.value
                                          setDays(updated)
                                        }}
                                        className="w-full text-xs font-bold text-gray-900 dark:text-white outline-none bg-transparent"
                                      />
                                      <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                                    </div>
                                  </div>

                                  <div className="flex-1">
                                    <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">
                                      Fim
                                    </label>
                                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                      <input
                                        type="time"
                                        value={block.end}
                                        onChange={(e) => {
                                          const updated = [...days]
                                          updated[idx].blocks[bdx].end = e.target.value
                                          setDays(updated)
                                        }}
                                        className="w-full text-xs font-bold text-gray-900 dark:text-white outline-none bg-transparent"
                                      />
                                      <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...days]
                                      updated[idx].blocks.splice(bdx, 1)
                                      setDays(updated)
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg mt-4"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}

                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...days]
                                  updated[idx].blocks.push({ start: '15:00', end: '17:00' })
                                  setDays(updated)
                                }}
                                className="text-xs text-brand font-semibold hover:underline inline-flex items-center gap-1 pt-1"
                              >
                                <Plus className="w-3.5 h-3.5" /> Adicionar Faixa / Turno
                              </button>
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60 flex items-center gap-2">
                              <MessageCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                              <p className="text-[11px] text-amber-900 dark:text-amber-200 font-medium">
                                Dia aberto: A cliente solicitará o agendamento e você combina o horário exato no WhatsApp.
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* === MODO SEM TIPO DEFINIDO (PADRÃO) === */}
                      {agendaType === null && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Início</label>
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                              <input
                                type="time"
                                value={day.blocks[0]?.start || '09:00'}
                                onChange={(e) => {
                                  const updated = [...days]
                                  if (!updated[idx].blocks[0]) {
                                    updated[idx].blocks = [{ start: e.target.value, end: '18:00' }]
                                  } else {
                                    updated[idx].blocks[0].start = e.target.value
                                  }
                                  setDays(updated)
                                }}
                                className="w-full text-xs font-bold text-gray-900 dark:text-white outline-none bg-transparent"
                              />
                              <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <label className="block text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Fim</label>
                            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                              <input
                                type="time"
                                value={day.blocks[0]?.end || '18:00'}
                                onChange={(e) => {
                                  const updated = [...days]
                                  if (!updated[idx].blocks[0]) {
                                    updated[idx].blocks = [{ start: '09:00', end: e.target.value }]
                                  } else {
                                    updated[idx].blocks[0].end = e.target.value
                                  }
                                  setDays(updated)
                                }}
                                className="w-full text-xs font-bold text-gray-900 dark:text-white outline-none bg-transparent"
                              />
                              <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 italic">{day.active ? 'Escolha um tipo de agenda para configurar os horários' : 'Fechado / Folga'}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                disabled={!days.some(d => d.active)}
              >
                Próximo Passo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            PASSO 3: SEUS SERVIÇOS
           ======================================================== */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-[#111827] dark:text-white">Seus Serviços</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Selecione os serviços que você oferece ou adicione novos. Ajuste o preço e a duração média de cada um.</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">A. Especialidades atendidas</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button ref={categoryRef} key={category} type="button" onClick={() => toggleCategory(category)} className={`rounded-xl border p-3 text-left text-xs font-bold transition-colors ${selectedCategories.includes(category) ? 'border-brand bg-rose-50 text-brand dark:bg-rose-950/30' : 'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-300'}`}>
                    {selectedCategories.includes(category) ? '✓ ' : ''}{category}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addCategory()} placeholder="Outra categoria (ex: Podologia)" className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs dark:border-gray-700 dark:bg-gray-800" />
                <button type="button" onClick={addCategory} className="rounded-xl border border-brand px-3 py-2 text-xs font-bold text-brand">+ Outra</button>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">B. Sugestões de serviços</p>

            <div className="space-y-3">
              {services.filter((svc) => selectedCategories.includes(svc.category)).map((svc, idx) => (
                <div
                  key={svc.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    svc.checked
                      ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 shadow-sm'
                      : 'border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30'
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer mb-3">
                    <input
                      type="checkbox"
                      checked={svc.checked}
                      onChange={(e) => {
                        setServices((prev) => prev.map((item) => item.id === svc.id ? { ...item, checked: e.target.checked } : item))
                      }}
                      className="w-4 h-4 rounded accent-brand"
                    />
                    <span className="text-sm font-bold text-[#111827] dark:text-white">{svc.name}</span>
                  </label>

                  {svc.checked && (
                    <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-700 animate-fade-in">
                      <div>
                        <label className="block text-[10px] text-gray-700 dark:text-gray-300 uppercase font-bold mb-1">Nome do Serviço</label>
                        <input
                          type="text"
                          ref={(field) => { serviceRefs.current[svc.id] = field }}
                          value={svc.name}
                          onChange={(e) => setServices((prev) => prev.map((item) => item.id === svc.id ? { ...item, name: e.target.value } : item))}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none"
                        />
                      </div>
                      {serviceErrorId === svc.id && <p className="text-xs font-semibold text-red-600 dark:text-red-400" role="alert">{serviceError}</p>}
                      <div>
                        <label className="block text-[10px] text-gray-700 dark:text-gray-300 uppercase font-bold mb-1">Observação / Descrição (opcional)</label>
                        <textarea
                          value={svc.description}
                          onChange={(e) => setServices((prev) => prev.map((item) => item.id === svc.id ? { ...item, description: e.target.value } : item))}
                          rows={2}
                          placeholder="Adicione informações sobre este serviço"
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-700 dark:text-gray-300 uppercase font-bold mb-1">Preço (R$)</label>
                            <input
                              type="text"
                              value={svc.price}
                              onChange={(e) => setServices((prev) => prev.map((item) => item.id === svc.id ? { ...item, price: e.target.value } : item))}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-700 dark:text-gray-300 uppercase font-bold mb-1">Duração (min)</label>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={svc.duration}
                            onChange={(e) => setServices((prev) => prev.map((item) => item.id === svc.id ? { ...item, duration: e.target.value } : item))}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addOnboardingService}
                className="w-full py-3.5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Adicionar Novo Serviço
              </button>
            </div>

            <div className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">Revisão Final dos Serviços</p>
                <span className="text-xs font-bold text-brand">{services.filter((service) => service.checked && service.name.trim()).length} cadastrados</span>
              </div>
              {Array.from(new Set(services.filter((service) => service.checked && service.name.trim()).map((service) => service.category))).map((category) => (
                <div key={category}>
                  <p className="text-sm font-bold text-[#111827] dark:text-white">{category}</p>
                  <div className="mt-1 space-y-1">
                    {services.filter((service) => service.checked && service.name.trim() && service.category === category).map((service) => (
                      <p key={service.id} className="text-xs text-gray-600 dark:text-gray-300">{service.name} - R$ {service.price} - {service.duration} min</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Voltar
              </button>
              <button
                onClick={continueFromServices}
                className="flex-1 py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Próximo Passo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {serviceErrorId === -1 && <p className="text-xs font-semibold text-red-600 dark:text-red-400" role="alert">{serviceError}</p>}
          </div>
        )}

        {/* ========================================================
            PASSO 4: ESCOLHA DA APARÊNCIA / TEMA DO SISTEMA
           ======================================================== */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-[#111827] dark:text-white">Escolha a Aparência do Painel</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Personalize como você prefere visualizar sua plataforma durante o dia a dia.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Opção Claro */}
              <button
                type="button"
                onClick={() => handleSelectTheme('light')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  selectedTheme === 'light'
                    ? 'border-brand bg-rose-50/50 dark:bg-rose-950/30 shadow-xs'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedTheme === 'light' ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827] dark:text-white">Tema Claro</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Visual limpo, leve e iluminado.</p>
                  </div>
                </div>
                {selectedTheme === 'light' && (
                  <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>

              {/* Opção Escuro */}
              <button
                type="button"
                onClick={() => handleSelectTheme('dark')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  selectedTheme === 'dark'
                    ? 'border-brand bg-rose-50/50 dark:bg-rose-950/30 shadow-xs'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedTheme === 'dark' ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827] dark:text-white">Tema Escuro</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Visual moderno e confortável para os olhos.</p>
                  </div>
                </div>
                {selectedTheme === 'dark' && (
                  <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>

              {/* Opção Padrão do Sistema */}
              <button
                type="button"
                onClick={() => handleSelectTheme('system')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  selectedTheme === 'system'
                    ? 'border-brand bg-rose-50/50 dark:bg-rose-950/30 shadow-xs'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedTheme === 'system' ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827] dark:text-white">Padrão do Sistema</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Adapta-se automaticamente ao seu dispositivo.</p>
                  </div>
                </div>
                {selectedTheme === 'system' && (
                  <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Voltar
              </button>
              <button
                onClick={finishOnboarding}
                className="flex-1 py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                disabled={isSaving}
              >
                {isSaving ? 'Salvando dados...' : 'Concluir Configuração'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {isSaving && <div className="h-1.5 w-full overflow-hidden rounded-full bg-rose-100 dark:bg-rose-950/40"><div className="h-full w-1/2 animate-pulse rounded-full bg-brand" /></div>}
          </div>
        )}

        {/* ========================================================
            PASSO 5: CONTA CONFIGURADA COM SUCESSO
           ======================================================== */}
        {step === 5 && (
          <div className="text-center space-y-6 animate-fade-in py-4">
            <div className="w-20 h-20 rounded-3xl bg-brand text-white flex items-center justify-center mx-auto shadow-lg shadow-brand/20 animate-pulse">
              <Check className="w-10 h-10" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Tudo pronto, {studioName.split(' ')[0]}!</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
                Sua conta foi configurada com sucesso. Agora você já pode gerenciar sua agenda e receber novos clientes.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827] dark:text-white">Painel Otimizado</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tudo pronto para alavancar seu negócio de beleza.</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 bg-brand text-white rounded-2xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-lg shadow-brand/20 flex items-center justify-center gap-2"
            >
              Ir para o Início <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
