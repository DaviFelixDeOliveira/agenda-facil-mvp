'use client'

import { useEffect, useState } from 'react'
import { Settings, Clock, Bell, Shield, Building2, Save } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface SettingsData {
  sinalObrigatorio: boolean
  sinalPercentual: number
  notifWhatsapp: boolean
  notifEmail: boolean
  antecedenciaMin: number
  horarioInicio: string
  horarioFim: string
  diasAtendimento: string[]
  businessName: string
  businessPhone: string
  businessAddress: string
}

const defaultSettings: SettingsData = {
  sinalObrigatorio: true,
  sinalPercentual: 30,
  notifWhatsapp: true,
  notifEmail: false,
  antecedenciaMin: 60,
  horarioInicio: '08:00',
  horarioFim: '19:00',
  diasAtendimento: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
  businessName: '',
  businessPhone: '',
  businessAddress: '',
}

const DAYS = [
  { key: 'seg', label: 'Seg' },
  { key: 'ter', label: 'Ter' },
  { key: 'qua', label: 'Qua' },
  { key: 'qui', label: 'Qui' },
  { key: 'sex', label: 'Sex' },
  { key: 'sab', label: 'Sáb' },
  { key: 'dom', label: 'Dom' },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-brand' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </button>
  )
}

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage
    try {
      const stored = localStorage?.getItem?.('beleza-settings')
      if (stored) {
        setSettings({ ...defaultSettings, ...(JSON.parse(stored) ?? {}) })
      }
    } catch {}
    // Load business data from API
    fetch('/api/profile')
      .then((r: any) => r.json())
      .then((data: any) => {
        if (data) {
          setSettings((prev: SettingsData) => ({
            ...prev,
            businessName: data?.businessName ?? '',
            businessPhone: data?.businessPhone ?? '',
            businessAddress: data?.businessAddress ?? '',
          }))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const update = (key: keyof SettingsData, value: any) => {
    setSettings((prev: SettingsData) => ({ ...prev, [key]: value }))
  }

  const toggleDay = (day: string) => {
    setSettings((prev: SettingsData) => {
      const dias = prev?.diasAtendimento ?? []
      const newDias = dias.includes(day) ? dias.filter((d: string) => d !== day) : [...dias, day]
      return { ...prev, diasAtendimento: newDias }
    })
  }

  const handleSave = async () => {
    try {
      localStorage?.setItem?.('beleza-settings', JSON.stringify(settings))
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: settings.businessName,
          businessPhone: settings.businessPhone,
          businessAddress: settings.businessAddress,
        }),
      })
      toast.success('Configurações salvas!')
    } catch {
      toast.error('Erro ao salvar')
    }
  }

  if (loading) {
    return (
      <div className="p-4 lg:p-6 space-y-4 max-w-3xl mx-auto">
        {[1,2,3].map((i: number) => <div key={i} className="bg-white rounded-xl h-32 animate-pulse" />)}
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand" /> Configurações
        </h1>
        <p className="text-gray-500 text-sm mt-1">Personalize seu painel</p>
      </div>

      {/* Grade horária */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        <h2 className="font-bold text-[#111827] flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand" /> Grade Horária
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Início</label>
            <input
              type="time"
              value={settings.horarioInicio}
              onChange={(e: any) => update('horarioInicio', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Fim</label>
            <input
              type="time"
              value={settings.horarioFim}
              onChange={(e: any) => update('horarioFim', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-2 block">Dias de atendimento</label>
          <div className="flex gap-2 flex-wrap">
            {DAYS.map((day: any) => (
              <button
                key={day.key}
                type="button"
                onClick={() => toggleDay(day.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  (settings?.diasAtendimento ?? []).includes(day.key)
                    ? 'bg-brand text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Regras de sinal */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        <h2 className="font-bold text-[#111827] flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand" /> Regras de Sinal
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#111827]">Sinal obrigatório</p>
            <p className="text-xs text-gray-500">Exigir sinal para confirmar agendamento</p>
          </div>
          <Toggle checked={settings.sinalObrigatorio} onChange={(v: boolean) => update('sinalObrigatorio', v)} />
        </div>
        {settings.sinalObrigatorio && (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Percentual do sinal</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={10} max={100} step={5}
                value={settings.sinalPercentual}
                onChange={(e: any) => update('sinalPercentual', Number(e.target.value))}
                className="flex-1 accent-brand"
              />
              <span className="text-sm font-bold text-[#111827] w-12 text-right">{settings.sinalPercentual}%</span>
            </div>
          </div>
        )}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Antecedência mínima (min)</label>
          <select
            value={settings.antecedenciaMin}
            onChange={(e: any) => update('antecedenciaMin', Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
          >
            <option value={30}>30 minutos</option>
            <option value={60}>1 hora</option>
            <option value={120}>2 horas</option>
            <option value={240}>4 horas</option>
            <option value={1440}>1 dia</option>
          </select>
        </div>
      </motion.div>

      {/* Notificações */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        <h2 className="font-bold text-[#111827] flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand" /> Notificações
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#111827]">WhatsApp</p>
            <p className="text-xs text-gray-500">Lembrete automático por WhatsApp</p>
          </div>
          <Toggle checked={settings.notifWhatsapp} onChange={(v: boolean) => update('notifWhatsapp', v)} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#111827]">Email</p>
            <p className="text-xs text-gray-500">Lembrete por email</p>
          </div>
          <Toggle checked={settings.notifEmail} onChange={(v: boolean) => update('notifEmail', v)} />
        </div>
      </motion.div>

      {/* Dados do negócio */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        <h2 className="font-bold text-[#111827] flex items-center gap-2">
          <Building2 className="w-5 h-5 text-brand" /> Dados do Negócio
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Nome do estúdio</label>
            <input
              value={settings.businessName}
              onChange={(e: any) => update('businessName', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
              placeholder="Meu Estúdio de Beleza"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Telefone</label>
            <input
              value={settings.businessPhone}
              onChange={(e: any) => update('businessPhone', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Endereço</label>
            <input
              value={settings.businessAddress}
              onChange={(e: any) => update('businessAddress', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#111827] focus:ring-2 focus:ring-brand outline-none"
              placeholder="Rua das Flores, 123"
            />
          </div>
        </div>
      </motion.div>

      <button
        onClick={handleSave}
        className="w-full py-3 bg-brand text-white rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <Save className="w-5 h-5" /> Salvar Configurações
      </button>
    </div>
  )
}
