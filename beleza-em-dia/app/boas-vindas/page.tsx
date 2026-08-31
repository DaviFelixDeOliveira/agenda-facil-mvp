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

export default function BoasVindasPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ========================================================
          LADO ESQUERDO — HERO ESCURO COM CARROSSEL (Desktop/Notebooks)
         ======================================================== */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111827] text-white flex-col items-center justify-start xl:justify-center py-8 px-8 xl:px-12 relative min-h-screen lg:h-screen overflow-y-auto scrollbar-thin">
        {/* Logo Grande com Texto Branco */}
        <div className="flex flex-col items-center text-center space-y-1 mb-4 z-10 shrink-0">
          <div className="relative w-[260px] h-[260px] xl:w-[280px] xl:h-[280px] flex items-center justify-center">
            <Image
              src="/Logo Sem fundo texto branco.png"
              alt="Beleza em Dia"
              width={300}
              height={300}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xs leading-relaxed">
            Sua agenda organizada, clientes satisfeitos e finanças sob controle — tudo em um só lugar.
          </p>
        </div>

        {/* Carrossel de Fotos Desktop */}
        <div className="relative rounded-2xl overflow-hidden w-full max-w-[340px] xl:max-w-[360px] aspect-[16/10] bg-gray-800 shadow-2xl z-10 shrink-0 mb-4">
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
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
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

        {/* 3 Benefícios Desktop (Com rolagem livre se a tela for compacta) */}
        <div className="space-y-2 z-10 w-full max-w-[340px] xl:max-w-[360px] pb-6 shrink-0">
          {[
            { icon: CalendarDays, title: 'Gestão completa de horários', desc: 'Controle total da sua agenda' },
            { icon: Link2, title: 'Link público para agendamento', desc: 'Facilite o agendamento para clientes' },
            { icon: DollarSign, title: 'Controle financeiro simplificado', desc: 'Acompanhe seus ganhos facilmente' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3.5 py-2.5">
              <b.icon className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">{b.title}</p>
                <p className="text-[11px] text-gray-400 leading-tight">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          LADO DIREITO (Desktop) / TELA COMPLETA (Mobile & Tablets iPad)
         ======================================================== */}
      <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-8 md:p-12 min-h-screen lg:h-screen lg:overflow-y-auto">
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-md space-y-6 py-4">
          
          {/* ========== Versão Mobile & Tablet (iPad Mini/Air) ========== */}
          <div className="lg:hidden bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-gray-100 space-y-6">
            {/* Logo Grande com Texto Preto */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mx-auto">
                <Image
                  src="/Logo Sem fundo texto preto.png"
                  alt="Beleza em Dia"
                  width={224}
                  height={224}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                Sua agenda profissional e gestão de salão em um só lugar.
              </p>
            </div>

            {/* Carrossel Mobile / Tablet */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-gray-100 shadow-inner border border-gray-100">
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
              {/* Dots Mobile / Tablet */}
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

            {/* 3 Benefícios Mobile / Tablet */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: CalendarDays, title: 'Gestão de horários', desc: 'Controle total da sua agenda.' },
                { icon: Link2, title: 'Link Instagram/WhatsApp', desc: 'Facilite para clientes.' },
                { icon: DollarSign, title: 'Controle financeiro', desc: 'Acompanhe seus ganhos.' },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
                  <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-brand shrink-0 shadow-2xs">
                    <b.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111827]">{b.title}</p>
                    <p className="text-[11px] text-gray-500 leading-tight">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========== Bloco Centralizado de Ações (Login / Cadastro) ========== */}
          <div className="space-y-4 text-center">
            {/* Desktop: Título e subtítulo */}
            <div className="hidden lg:block space-y-1.5 mb-6">
              <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">Comece agora</h2>
              <p className="text-sm text-gray-500">Crie sua conta ou acesse o seu painel profissional.</p>
            </div>

            <div className="space-y-3">
              <Link
                href="/signup"
                className="w-full py-4 bg-brand text-white rounded-2xl font-bold text-sm hover:bg-rose-700 transition-all shadow-sm flex items-center justify-center gap-2 text-center transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Criar minha conta
              </Link>

              <Link
                href="/login"
                className="w-full py-4 border border-gray-200 bg-white text-[#111827] rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all shadow-xs flex items-center justify-center text-center transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Já tenho uma conta / Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
