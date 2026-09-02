'use client'

import { useState } from 'react'
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
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // Passo 1: Perfil
  const [studioName, setStudioName] = useState('Studio Bela Face')
  const [bio, setBio] = useState('')
  const [domicilio, setDomicilio] = useState(false)

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
  const [services, setServices] = useState([
    { id: 1, name: 'Manicure', price: '35,00', duration: '45', checked: true },
    { id: 2, name: 'Pedicure', price: '45,00', duration: '50', checked: false },
    { id: 3, name: 'Design de Sobrancelhas', price: '45,00', duration: '30', checked: false },
  ])

  // Passo 4: Tema
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>(
    (theme as 'light' | 'dark' | 'system') || 'light'
  )

  const handleSelectTheme = (mode: 'light' | 'dark' | 'system') => {
    setSelectedTheme(mode)
    setTheme(mode)
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
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40">
              <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center relative shadow-sm mb-2">
                <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand text-white rounded-full flex items-center justify-center shadow">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-xs font-bold text-brand">Adicionar Foto</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">Recomendado: 500×500px</p>
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
                />
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
              onClick={() => setStep(2)}
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
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
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

                  {day.active ? (
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
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 italic">Fechado / Folga</span>
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
              {services.map((svc, idx) => (
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
                        const updated = [...services]
                        updated[idx].checked = e.target.checked
                        setServices(updated)
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
                          defaultValue={svc.name}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-700 dark:text-gray-300 uppercase font-bold mb-1">Preço (R$)</label>
                          <input
                            type="text"
                            defaultValue={svc.price}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-700 dark:text-gray-300 uppercase font-bold mb-1">Duração (min)</label>
                          <input
                            type="text"
                            defaultValue={svc.duration}
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
                className="w-full py-3.5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Adicionar Novo Serviço
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 bg-[#111827] dark:bg-white dark:text-[#111827] text-white rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-100 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Próximo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
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
                onClick={() => setStep(5)}
                className="flex-1 py-3.5 bg-[#111827] dark:bg-white dark:text-[#111827] text-white rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-100 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Concluir Configuração <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            PASSO 5: CONTA CONFIGURADA COM SUCESSO
           ======================================================== */}
        {step === 5 && (
          <div className="text-center space-y-6 animate-fade-in py-4">
            <div className="w-20 h-20 rounded-3xl bg-brand text-white flex items-center justify-center mx-auto shadow-lg shadow-brand/20">
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
