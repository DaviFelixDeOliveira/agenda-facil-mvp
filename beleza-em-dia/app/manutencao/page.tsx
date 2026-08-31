'use client'

import { Wrench, Mail, Clock } from 'lucide-react'
import Image from 'next/image'

export default function ManutencaoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 text-center">
        {/* Logo / Imagem institucional */}
        <div className="flex flex-col items-center">
          <div className="relative w-44 h-44 flex items-center justify-center mb-4">
            <Image src="/Logo Sem fundo texto preto.png" alt="Beleza em Dia" width={176} height={176} className="w-full h-full object-contain" priority />
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gray-100 text-[#111827] flex items-center justify-center mb-3">
            <Wrench className="w-7 h-7" />
          </div>

          <h1 className="text-sm font-bold uppercase tracking-wider text-gray-400">Beleza em Dia</h1>
          <h2 className="text-xl font-bold text-[#111827] mt-1">Sistema em Manutenção</h2>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
            Estamos preparando novidades para você. Voltaremos em breve.
          </p>
        </div>

        {/* Badge de Previsão */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50/80 text-xs font-semibold text-[#111827]">
          <Clock className="w-3.5 h-3.5 text-gray-500" />
          <span>Previsão: Hoje às 14:00</span>
        </div>

        {/* Suporte */}
        <div className="pt-4 border-t border-gray-100 space-y-1 text-xs">
          <p className="text-gray-400">Precisa de ajuda urgente?</p>
          <a
            href="mailto:suporte@belezaemdia.com"
            className="font-bold text-[#111827] hover:text-brand transition-colors inline-flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-brand" />
            suporte@belezaemdia.com
          </a>
        </div>
      </div>
    </div>
  )
}
