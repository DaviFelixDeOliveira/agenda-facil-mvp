'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WifiOff, RotateCcw, Calendar } from 'lucide-react'

export default function OfflinePage() {
  const [retrying, setRetrying] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => {
      setRetrying(false)
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/80 space-y-6 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="relative w-44 h-44 flex items-center justify-center mb-4">
            <Image src="/Logo Sem fundo texto preto.png" alt="Beleza em Dia" width={176} height={176} className="w-full h-full object-contain" priority />
          </div>

          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <WifiOff className="w-8 h-8" />
          </div>

          <h1 className="text-xl font-bold text-[#111827]">Você está sem conexão</h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            Verifique sua internet para continuar navegando.
          </p>
        </div>

        {/* Botões */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="w-full py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <RotateCcw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
            {retrying ? 'Verificando conexão...' : 'Tentar Novamente'}
          </button>

          <Link
            href="/agenda"
            className="w-full py-3.5 border border-gray-300 bg-white text-[#111827] rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-gray-500" />
            Ver agenda de hoje (Offline)
          </Link>
        </div>
      </div>
    </div>
  )
}
