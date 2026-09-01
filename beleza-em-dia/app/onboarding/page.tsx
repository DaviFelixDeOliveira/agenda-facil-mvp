'use client'

import { useState } from 'react'

type TimeBlock = {
  start: string
  end: string
}

type DayConfig = {
  name: string
  active: boolean
  blocks: TimeBlock[]
}
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
  CheckCircle2,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react'

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // Passo 1: Perfil
  const [studioName, setStudioName] = useState('Studio Bela Face')
  const [specialty, setSpecialty] = useState('Manicure & Estética')
  const [bio, setBio] = useState('')
  const [domicilio, setDomicilio] = useState(false)

  // Passo 2: Agenda
  const [agendaType, setAgendaType] = useState<'fixa' | 'flexivel' | null>(null)
  const [days, setDays] = useState<DayConfig[]>([
    { name: 'Segunda-feira', active: true, blocks: [{ start: '09:00', end: '18:00' }] },
    { name: 'Terça-feira', active: true, blocks: [{ start: '09:00', end: '18:00' }] },
    { name: 'Quarta-feira', active: true, blocks: [{ start: '09:00', end: '18:00' }] },
    { name: 'Quinta-feira', active: true, blocks: [{ start: '09:00', end: '18:00' }] },
    { name: 'Sexta-feira', active: true, blocks: [{ start: '09:00', end: '18:00' }] },
    { name: 'Sábado', active: false, blocks: [{ start: '09:00', end: '14:00' }] },
    { name: 'Domingo', active: false, blocks: [] },
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        {/* Header com navegação do wizard */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <span className="font-bold text-[#111827] text-base">Beleza em Dia</span>
          <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-600 font-semibold">
            Sair
          </Link>
        </div>

        {/* Indicador de Passos */}
        {step < 5 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-gray-400">PASSO {step} DE 4</span>
              <span className="text-brand uppercase tracking-wider">
                {step === 1 ? 'PERFIL' : step === 2 ? 'AGENDA' : step === 3 ? 'SERVIÇOS' : 'APARÊNCIA'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ========================================================
            PASSO 1: CONFIGURAÇÕES INICIAIS DE PERFIL (Tela 7 do PDF)
           ======================================================== */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">Configure seu Perfil</h1>
              <p className="text-xs text-gray-500 mt-0.5">Adicione suas informações profissionais para que os clientes conheçam seu trabalho.</p>
            </div>

            {/* Upload de Foto */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
              <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 flex items-center justify-center relative shadow-sm mb-2">
                <Camera className="w-8 h-8 text-gray-400" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand text-white rounded-full flex items-center justify-center shadow">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-xs font-bold text-brand">Adicionar Foto</p>
              <p className="text-[10px] text-gray-400">Recomendado: 500×500px</p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome do Estúdio/Salão</label>
                <input
                  type="text"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none"
                  placeholder="Ex: Studio Bela Face"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Especialidade Principal</label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-brand outline-none"
                >
                  <option value="Manicure & Estética">Manicure & Nail Art</option>
                  <option value="Cabelereira">Cabelereira</option>
                  <option value="Design de Sobrancelhas">Design de Sobrancelhas</option>
                  <option value="Estética Geral">Estética Geral</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Bio Profissional</label>
                  <span className="text-[10px] text-gray-400">{bio.length}/150</span>
                </div>
                <textarea
                  value={bio}
                  maxLength={150}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand outline-none resize-none"
                  placeholder="Conte um pouco sobre sua experiência e diferenciais..."
                />
              </div>

              {/* Toggle Domicílio */}
              <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-brand" />
                  <div>
                    <p className="text-sm font-bold text-[#111827]">Atendimento a Domicílio</p>
                    <p className="text-xs text-gray-500">Ofereço serviços na casa do cliente</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDomicilio(!domicilio)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    domicilio ? 'bg-brand' : 'bg-gray-300'
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
            PASSO 2: DEFINA SUA AGENDA (Tela 8 do PDF)
           ======================================================== */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">Defina sua Agenda</h1>
              <p className="text-xs text-gray-500 mt-0.5">Configure os dias e horários que você estará disponível para atendimentos.</p>
            </div>

            {/* Seletor de Tipo de Agenda */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setAgendaType(prev => prev === 'fixa' ? null : 'fixa')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                  agendaType === 'fixa' ? 'border-brand bg-gray-50 text-brand' : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <span>Agenda Fixa</span>
                {agendaType === 'fixa' && (
                  <div className="w-3 h-3 rounded-full bg-brand text-white flex items-center justify-center">
                    <Check className="w-2 h-2" />
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={() => setAgendaType(prev => prev === 'flexivel' ? null : 'flexivel')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                  agendaType === 'flexivel' ? 'border-brand bg-gray-50 text-brand' : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                <span>Agenda Flexível</span>
                {agendaType === 'flexivel' && (
                  <div className="w-3 h-3 rounded-full bg-brand text-white flex items-center justify-center">
                    <Check className="w-2 h-2" />
                  </div>
                )}
              </button>
            </div>

            {/* NOTE: Seleção não é obrigatória - pode tirar a seleção a qualquer momento */}
            <p className="text-xs text-gray-500 mt-1 italic">
              Dica: Seleção não é obrigatória. Pode configurar depois ou manter sem tipo definido. Clique no ícone novamente para remover a seleção.
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {days.map((day, idx) => (
                <div key={day.name} className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#111827]">{day.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...days]
                        updated[idx].active = !updated[idx].active
                        setDays(updated)
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

                  {day.active ? (
                    <div className="space-y-3">
                      {agendaType === 'flexivel' ? (
                        <div className="space-y-2">
                          {day.blocks.map((block, bdx) => (
                            <div key={bdx} className="flex items-center gap-2">
                              <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Início</label>
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200">
                                  <input
                                    type="time"
                                    value={block.start}
                                    onChange={(e) => {
                                      const updated = [...days]
                                      updated[idx].blocks[bdx].start = e.target.value
                                      setDays(updated)
                                    }}
                                    className="w-full text-xs font-bold text-[#111827] outline-none bg-transparent"
                                  />
                                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                </div>
                              </div>

                              <div className="flex-1">
                                <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Fim</label>
                                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200">
                                  <input
                                    type="time"
                                    value={block.end}
                                    onChange={(e) => {
                                      const updated = [...days]
                                      updated[idx].blocks[bdx].end = e.target.value
                                      setDays(updated)
                                    }}
                                    className="w-full text-xs font-bold text-[#111827] outline-none bg-transparent"
                                  />
                                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...days]
                                  updated[idx].blocks.splice(bdx, 1)
                                  setDays(updated)
                                }}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...days]
                              updated[idx].blocks.push({ start: '14:00', end: '18:00' })
                              setDays(updated)
                            }}
                            className="text-xs text-brand font-semibold hover:underline inline-flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Bloco
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Início</label>
                              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200">
                                <input
                                  type="time"
                                  value={day.blocks[0]?.start || '09:00'}
                                  onChange={(e) => {
                                    const updated = [...days]
                                    updated[idx].blocks[0].start = e.target.value
                                    setDays(updated)
                                  }}
                                  className="w-full text-xs font-bold text-[#111827] outline-none bg-transparent"
                                />
                                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              </div>
                            </div>

                            <div className="flex-1">
                              <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Fim</label>
                              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200">
                                <input
                                  type="time"
                                  value={day.blocks[0]?.end || '18:00'}
                                  onChange={(e) => {
                                    const updated = [...days]
                                    updated[idx].blocks[0].end = e.target.value
                                    setDays(updated)
                                  }}
                                  className="w-full text-xs font-bold text-[#111827] outline-none bg-transparent"
                                />
                                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...days]
                              updated[idx].blocks = []
                              setDays(updated)
                            }}
                            className="p-2 mt-5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400 italic">Fechado / Folga</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
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
            PASSO 3: SEUS SERVIÇOS (Tela 9 do PDF)
           ======================================================== */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold text-[#111827]">Seus Serviços</h1>
              <p className="text-xs text-gray-500 mt-0.5">Selecione os serviços que você oferece ou adicione novos. Ajuste o preço e a duração média de cada um.</p>
            </div>

            <div className="space-y-3">
              {services.map((svc, idx) => (
                <div
                  key={svc.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    svc.checked ? 'border-gray-200 bg-white shadow-sm' : 'border-gray-100 bg-gray-50/50'
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
                    <span className="text-sm font-bold text-[#111827]">{svc.name}</span>
                  </label>

                  {svc.checked && (
                    <div className="space-y-3 pt-2 border-t border-gray-100 animate-fade-in">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Nome do Serviço</label>
                        <input
                          type="text"
                          defaultValue={svc.name}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Preço (R$)</label>
                          <input
                            type="text"
                            defaultValue={svc.price}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Duração (min)</label>
                          <input
                            type="text"
                            defaultValue={svc.duration}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="w-full py-3.5 rounded-2xl border-2 border-dashed border-gray-200 text-xs font-bold text-gray-600 hover:border-brand hover:text-brand transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Adicionar Novo Serviço
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 bg-[#111827] text-white rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm flex items-center justify-center gap-2"
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
              <h1 className="text-xl font-bold text-[#111827]">Escolha a Aparência do Painel</h1>
              <p className="text-xs text-gray-500 mt-0.5">
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
                    ? 'border-brand bg-rose-50/50 shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedTheme === 'light' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">Tema Claro</p>
                    <p className="text-xs text-gray-500">Visual limpo, leve e iluminado.</p>
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
                    ? 'border-brand bg-rose-50/50 shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedTheme === 'dark' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">Tema Escuro</p>
                    <p className="text-xs text-gray-500">Visual moderno e confortável para os olhos.</p>
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
                    ? 'border-brand bg-rose-50/50 shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedTheme === 'system' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">Padrão do Sistema</p>
                    <p className="text-xs text-gray-500">Adapta-se automaticamente ao seu dispositivo.</p>
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
                className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 py-3.5 bg-[#111827] text-white rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Concluir Configuração <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            PASSO 5: CONTA CONFIGURADA COM SUCESSO (Tela 10 do PDF)
           ======================================================== */}
        {step === 5 && (
          <div className="text-center space-y-6 animate-fade-in py-4">
            <div className="w-20 h-20 rounded-3xl bg-brand text-white flex items-center justify-center mx-auto shadow-lg shadow-brand/20">
              <Check className="w-10 h-10" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Tudo pronto, {studioName.split(' ')[0]}!</h1>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
                Sua conta foi configurada com sucesso. Agora você já pode gerenciar sua agenda e receber novos clientes.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-brand" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">Painel Otimizado</p>
                <p className="text-xs text-gray-500">Tudo pronto para alavancar seu negócio de beleza.</p>
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
