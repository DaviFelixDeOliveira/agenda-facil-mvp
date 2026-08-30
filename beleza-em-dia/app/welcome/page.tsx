'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Link2, DollarSign } from 'lucide-react'

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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ========== LADO ESQUERDO — HERO ESCURO COM CARROSSEL (Desktop) ========== */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111827] text-white flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Logo Grande */}
        <div className="flex flex-col items-center text-center space-y-4 mb-10 z-10">
          <div className="w-28 h-28 rounded-full bg-rose-50/10 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg">
            <Image src="/logo.png" alt="Beleza em Dia" width={112} height={112} className="object-cover" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Beleza em Dia</h1>
          <p className="text-gray-400 text-sm max-w-xs">
            Sua agenda organizada, clientes satisfeitos e finanças sob controle — tudo em um só lugar.
          </p>
        </div>

        {/* Carrossel de Fotos Desktop */}
        <div className="relative rounded-2xl overflow-hidden w-full max-w-sm aspect-[4/3] bg-gray-800 shadow-2xl z-10">
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
          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-brand w-5' : 'bg-white/50'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Benefícios Desktop */}
        <div className="mt-8 space-y-3 z-10 w-full max-w-sm">
          {[
            { icon: CalendarDays, title: 'Gestão completa de horários', desc: 'Controle total da sua agenda' },
            { icon: Link2, title: 'Link público para agendamento', desc: 'Facilite o agendamento para clientes' },
            { icon: DollarSign, title: 'Controle financeiro simplificado', desc: 'Acompanhe seus ganhos facilmente' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
              <b.icon className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">{b.title}</p>
                <p className="text-xs text-gray-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== LADO DIREITO (Desktop) / TELA INTEIRA (Mobile) ========== */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-6 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md space-y-6">
          {/* Versão Mobile: Logo + Carrossel + Benefícios (Tudo junto) */}
          <div className="lg:hidden bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            {/* Logo Grande Mobile */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-28 h-28 rounded-full bg-rose-50/50 border border-rose-100 flex items-center justify-center overflow-hidden shadow-md">
                <Image src="/logo.png" alt="Beleza em Dia" width={112} height={112} className="object-cover" priority />
              </div>
              <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wider">Beleza em Dia</h2>
              <p className="text-sm text-gray-500">Sua agenda profissional em um só lugar.</p>
            </div>

            {/* Carrossel Mobile */}
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

            {/* 3 Benefícios Mobile */}
            <div className="space-y-3">
              {[
                { icon: CalendarDays, title: 'Gestão de horários', desc: 'Controle total da sua agenda.' },
                { icon: Link2, title: 'Link para Instagram/WhatsApp', desc: 'Facilite o agendamento para clientes.' },
                { icon: DollarSign, title: 'Controle financeiro', desc: 'Acompanhe seus ganhos facilmente.' },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
                    <b.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#111827]">{b.title}</p>
                    <p className="text-xs text-gray-500">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação (Ambos: Mobile e Desktop) */}
          <div className="space-y-3">
            {/* Desktop: Título acima dos botões */}
            <div className="hidden lg:block text-center mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">Comece agora</h2>
              <p className="text-sm text-gray-500 mt-1">Crie sua conta ou acesse o seu painel.</p>
            </div>

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
    </div>
  )
}
