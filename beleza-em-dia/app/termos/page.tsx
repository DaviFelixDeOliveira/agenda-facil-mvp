'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
export default function TermosPage() {
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeMarketing, setAgreeMarketing] = useState(false)
  const router = useRouter()

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreeTerms) {
      toast.error('Você precisa aceitar os Termos de Uso e Política de Privacidade.')
      return
    }
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#090D16] p-4 sm:p-6 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6 transition-colors">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#111827] dark:bg-gray-800 text-white flex items-center justify-center mb-1">
            <span className="text-xl">⚡</span>
          </div>
          <h1 className="text-lg font-bold text-[#111827] dark:text-white">Termos de Uso e Política de Privacidade</h1>
          <p className="text-[11px] text-gray-400">Última atualização: 24 de Outubro de 2026</p>
        </div>

        {/* Texto rolável dos termos */}
        <div className="h-64 overflow-y-auto border border-gray-100 dark:border-gray-800 rounded-2xl p-4 bg-gray-50/50 dark:bg-gray-800/50 space-y-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed scrollbar-thin">
          <div>
            <h2 className="font-bold text-[#111827] dark:text-white mb-1">1. Introdução</h2>
            <p>
              Bem-vindo ao Beleza em Dia. Estes Termos de Uso e Política de Privacidade regem o uso do nosso aplicativo de gestão para profissionais de beleza. Ao acessar ou usar nosso serviço, você concorda em ficar vinculado a estes termos.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-[#111827] dark:text-white mb-1">2. Uso do Serviço</h2>
            <p>
              Você deve usar o aplicativo apenas para fins legais e de acordo com estes Termos. É proibido usar o serviço para transmitir material ilegal, assediante ou difamatório.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-[#111827] dark:text-white mb-1">3. Conformidade com a LGPD</h2>
            <p>
              O Beleza em Dia está comprometido em proteger seus dados pessoais e dados de seus clientes, cumprindo integralmente as exigências da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
          </div>
        </div>

        {/* Checkboxes de aceite */}
        <form onSubmit={handleContinue} className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-brand"
              required
            />
            <span className="text-xs font-semibold text-[#111827] dark:text-white">
              Li e concordo com os Termos de Uso e Política de Privacidade *
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeMarketing}
              onChange={(e) => setAgreeMarketing(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-brand"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Aceito receber comunicações de novidades e ofertas do Beleza em Dia. <span className="font-bold text-gray-400">(OPCIONAL)</span>
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            Aceitar e Continuar <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
