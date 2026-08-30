'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function ErroPage() {
  const [retrying, setRetrying] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => {
      setRetrying(false)
      window.location.href = '/dashboard'
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-[#111827] flex items-center justify-center overflow-hidden shadow-sm mb-4">
            <Image src="/logo.png" alt="Beleza em Dia" width={48} height={48} className="object-cover" />
          </div>

          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-brand flex items-center justify-center mb-3">
            <AlertCircle className="w-9 h-9" />
          </div>

          <h1 className="text-2xl font-bold text-[#111827]">Algo deu errado.</h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
            Desculpe o transtorno, estamos trabalhando para resolver o problema rapidamente.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="w-full py-3.5 bg-[#111827] text-white rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <RotateCcw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
            {retrying ? 'Recarregando...' : 'Tentar novamente'}
          </button>

          <div>
            <Link
              href="/dashboard"
              className="text-xs font-bold text-gray-500 hover:text-[#111827] transition-colors"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            Se o erro persistir, <a href="mailto:suporte@belezaemdia.com" className="font-semibold text-gray-600 hover:underline">contate o suporte</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
