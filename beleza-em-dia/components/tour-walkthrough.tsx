'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import {
  CalendarDays,
  Users,
  DollarSign,
  Link2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
} from 'lucide-react'

export interface TourStep {
  title: string
  subtitle: string
  description: string
  icon: typeof CalendarDays
  highlight: string
  tips: string[]
}

const tourSteps: TourStep[] = [
  {
    title: 'Agenda Inteligente',
    subtitle: 'Passo 1 de 4',
    description: 'Visualize seus agendamentos por dia, semana ou mês. Crie novos horários rapidamente e controle intervalos com facilidade.',
    icon: CalendarDays,
    highlight: 'Controle total dos seus horários',
    tips: ['Arraste para reagendar horários', 'Status em tempo real de cada cliente'],
  },
  {
    title: 'Gestão de Clientes',
    subtitle: 'Passo 2 de 4',
    description: 'Cadastre suas clientes, acompanhe o histórico de visitas, serviços favoritos, notas personalizadas e contato direto por WhatsApp.',
    icon: Users,
    highlight: 'Fidelize e organize sua base',
    tips: ['Ficha completa de cada cliente', 'Botão direto de WhatsApp com 1 clique'],
  },
  {
    title: 'Controle Financeiro',
    subtitle: 'Passo 3 de 4',
    description: 'Acompanhe seus ganhos diários, semanais e mensais. Configure cobrança de sinal via Pix e reduza faltas e cancelamentos de última hora.',
    icon: DollarSign,
    highlight: 'Mais segurança e previsibilidade',
    tips: ['Gráficos automáticos de faturamento', 'Cobrança de sinal Pix personalizada'],
  },
  {
    title: 'Link Público de Agendamento',
    subtitle: 'Passo 4 de 4',
    description: 'Compartilhe seu link exclusivo na bio do Instagram ou no WhatsApp para suas clientes agendarem sozinhas 24 horas por dia.',
    icon: Link2,
    highlight: 'Seu salão aberto 24 horas',
    tips: ['Link rápido para bio e status', 'Confirmação automática de horário'],
  },
]

export function TourWalkthrough() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Exibir apenas no 1º acesso na tela de dashboard
    if (typeof window !== 'undefined') {
      const tourDone = localStorage.getItem('beleza-em-dia-tour-done')
      if (!tourDone && pathname === '/dashboard') {
        const timer = setTimeout(() => {
          setIsOpen(true)
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [pathname])

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('beleza-em-dia-tour-done', 'true')
    }
    setIsOpen(false)
  }

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleClose()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  if (!mounted || !isOpen) return null

  const step = tourSteps[currentStep]
  const Icon = step.icon
  const isLast = currentStep === tourSteps.length - 1

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border border-gray-100 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topo: Badge de Boas-vindas e Botão Fechar */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-brand text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bem-vinda ao seu novo painel</span>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Pular tutorial"
            title="Pular tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Indicador de Passos */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-gray-400 uppercase tracking-wider">{step.subtitle}</span>
            <span className="text-brand font-extrabold">{step.title}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx <= currentStep ? 'bg-brand' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Conteúdo do Passo */}
        <div className="space-y-4 pt-1">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-brand flex items-center justify-center shrink-0 shadow-xs border border-rose-100/50">
              <Icon className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#111827]">{step.title}</h3>
              <p className="text-xs text-brand font-semibold">{step.highlight}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {step.description}
          </p>

          {/* Destaques / Dicas */}
          <div className="space-y-2 pt-2">
            {step.tips.map((tip, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3.5 py-2 text-xs font-medium text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé: Navegação */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={currentStep === 0 ? handleClose : handlePrev}
            className="px-4 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            {currentStep === 0 ? 'Pular' : (
              <>
                <ArrowLeft className="w-3.5 h-3.5" /> Anterior
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {isLast ? (
              <>
                Começar a usar meu Painel <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Próximo <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
