'use client'

import { useState } from 'react'
import { useMockStore } from '@/context/mock-store'
import Image from 'next/image'
import {
  Camera,
  Plus,
  ExternalLink,
  Copy,
  MapPin,
  Clock,
  Star,
  Edit3,
  ImageIcon,
} from 'lucide-react'
import { initials } from '@/lib/utils'

export default function PerfilPage() {
  const { professional, services, portfolio, schedule } = useMockStore()
  const [copied, setCopied] = useState(false)
  const maxFiles = 20

  const handleCopyLink = () => {
    navigator.clipboard.writeText(professional.publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const activeServices = services.filter(s => s.active)
  const activeDays = schedule.filter(d => d.active)

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Meu Perfil</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gerencie sua vitrine e informações públicas</p>
        </div>
        <a
          href={`/${professional.slug}`}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">Ver Perfil Público</span>
        </a>
      </div>

      {/* Card do Perfil */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center overflow-hidden">
              <Image
                src={professional.avatar}
                alt={professional.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-brand text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-700 transition-colors" aria-label="Alterar foto">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#111827]">{professional.studioName}</h2>
              <button className="p-1 rounded hover:bg-gray-100 transition-colors" aria-label="Editar">
                <Edit3 className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-500">{professional.specialty}</p>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{professional.address}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 leading-relaxed">{professional.bio}</p>
        </div>

        {/* Link Público */}
        <div className="mt-4 flex items-center gap-2 bg-gray-50 rounded-xl p-3">
          <span className="text-xs text-gray-500 truncate flex-1">{professional.publicUrl}</span>
          <button
            onClick={handleCopyLink}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Horários de Funcionamento */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-brand" />
          <h3 className="font-bold text-[#111827] text-sm">Horário de Funcionamento</h3>
        </div>
        <div className="space-y-2">
          {schedule.map(day => (
            <div key={day.day} className="flex items-center justify-between py-1.5">
              <span className={`text-sm font-medium ${day.active ? 'text-[#111827]' : 'text-gray-400'}`}>
                {day.day}
              </span>
              <span className={`text-sm ${day.active ? 'text-gray-600' : 'text-gray-400'}`}>
                {day.active ? `${day.start} - ${day.end}` : 'Fechado'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Serviços Ativos */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-[#111827] text-sm">Serviços Oferecidos</h3>
          </div>
          <span className="text-xs text-gray-500">{activeServices.length} ativos</span>
        </div>
        <div className="space-y-2">
          {activeServices.map(svc => (
            <div key={svc.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#111827]">{svc.name}</p>
                <p className="text-xs text-gray-500">{svc.duration}min</p>
              </div>
              <p className="text-sm font-bold text-brand">R$ {svc.price.toFixed(2).replace('.', ',')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfólio / Galeria */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-brand" />
            <h3 className="font-bold text-[#111827] text-sm">Portfólio</h3>
          </div>
          <span className="text-xs text-gray-500">{portfolio.length} / {maxFiles} arquivos</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {portfolio.map(img => (
            <div key={img.id} className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
          {/* Botão adicionar */}
          <button className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:text-brand hover:border-brand transition-colors">
            <Plus className="w-6 h-6" />
            <span className="text-xs font-medium">Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
