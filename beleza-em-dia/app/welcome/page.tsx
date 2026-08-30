'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Link2, DollarSign, ArrowRight } from 'lucide-react'

const carouselImages = [
  { src: '/carousel/carousel-close.png', alt: 'Nail art detalhada' },
  { src: '/carousel/carousel-extre.png', alt: 'Manicure e estética' },
  { src: '/carousel/carousel-intim.png', alt: 'Atendimento de beleza' },
  { src: '/carousel/carousel-over-.png', alt: 'Trabalho de manicure' },
]

export default function WelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        {/* Header com Logo em Destaque */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-24 h-24 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center overflow-hidden shadow-sm mb-1">
            <Image src="/logo.png" alt="Beleza em Dia" width={96} height={96} className="object-cover" priority />
          </div>
          <h1 className="text-xl font-bold text-[#111827]">Sua agenda profissional em um só lugar.</h1>
        </div>

        {/* Carrossel de Fotos Reais com Indicadores */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-inner border border-gray-100">
          {carouselImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}

          {/* Dots indicadores */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-brand w-5' : 'bg-white/80'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 3 Benefícios Principais com Ícones */}
        <div className="space-y-3.5 py-1">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">Gestão de horários</p>
              <p className="text-xs text-gray-500">Controle total da sua agenda.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">Link para Instagram/WhatsApp</p>
              <p className="text-xs text-gray-500">Facilite o agendamento para clientes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">Controle financeiro</p>
              <p className="text-xs text-gray-500">Acompanhe seus ganhos facilmente.</p>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3 pt-2">
          <Link
            href="/signup"
            className="w-full py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-center"
          >
            Criar minha conta
          </Link>

          <Link
            href="/login"
            className="w-full py-3.5 border border-gray-300 bg-white text-[#111827] rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center text-center"
          >
            Já tenho uma conta / Entrar
          </Link>
        </div>
      </div>
    </div>
  )
}
