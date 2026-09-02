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
  X,
  Trash2,
  CheckSquare,
  Square,
  Eye,
  Check,
} from 'lucide-react'
import { toast } from 'sonner'
import { useModalManager } from '@/context/modal-manager'
import { PortfolioUploadModal } from '@/components/modals/portfolio-upload-modal'
import { ImagePreviewModal } from '@/components/modals/image-preview-modal'

export default function PerfilPage() {
  const { professional, services, portfolio, schedule, updateProfessional, removePortfolioItems } = useMockStore()
  const { open, close, isOpen } = useModalManager()
  const [copied, setCopied] = useState(false)
  const maxFiles = 20

  // Preview e Exclusão em Massa
  const [previewImage, setPreviewImage] = useState<{ id: string; src: string; alt: string } | null>(null)
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([])

  // Form states
  const [formStudio, setFormStudio] = useState(professional.studioName)
  const [formAddress, setFormAddress] = useState(professional.address)
  const [formBio, setFormBio] = useState(professional.bio)
  const [formPhone, setFormPhone] = useState(professional.phoneFormatted)

  const toggleSelectPhoto = (id: string) => {
    setSelectedPhotoIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedPhotoIds.length === portfolio.length) {
      setSelectedPhotoIds([])
    } else {
      setSelectedPhotoIds(portfolio.map((p) => p.id))
    }
  }

  const handleDeleteSingle = (id: string) => {
    removePortfolioItems([id])
    setSelectedPhotoIds((prev) => prev.filter((i) => i !== id))
    toast.success('Foto removida do portfólio com sucesso!')
  }

  const handleDeleteSelected = () => {
    if (selectedPhotoIds.length === 0) return
    const count = selectedPhotoIds.length
    removePortfolioItems(selectedPhotoIds)
    setSelectedPhotoIds([])
    setIsSelectionMode(false)
    toast.success(`${count} foto(s) removida(s) do portfólio!`)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(professional.publicUrl)
    setCopied(true)
    toast.success('Link do perfil copiado com sucesso!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenEdit = () => {
    setFormStudio(professional.studioName)
    setFormAddress(professional.address)
    setFormBio(professional.bio)
    setFormPhone(professional.phoneFormatted)
    open('edit-profile')
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfessional({
      studioName: formStudio,
      address: formAddress,
      bio: formBio,
      phoneFormatted: formPhone,
    })
    close('edit-profile')
    toast.success('Perfil atualizado com sucesso!')
  }

  const activeServices = services.filter(s => s.active)

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Meu Perfil</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Gerencie sua vitrine e informações públicas</p>
        </div>
        <a
          href={`/${professional.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors shadow-sm"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">Ver Perfil Público</span>
        </a>
      </div>

      {/* Card do Perfil */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 transition-colors">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-rose-50/50 dark:bg-rose-950/40 flex items-center justify-center overflow-hidden border border-rose-100/60 dark:border-rose-900/60">
              <Image
                src={professional.avatar}
                alt={professional.name}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={handleOpenEdit}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-700 transition-colors"
              aria-label="Alterar foto"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#111827] dark:text-white truncate">{professional.studioName}</h2>
              <button
                onClick={handleOpenEdit}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Editar informações"
                aria-label="Editar"
              >
                <Edit3 className="w-4 h-4 text-brand" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400 dark:text-gray-500">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-brand" />
              <span className="truncate">{professional.address}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 p-3.5 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100/60 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{professional.bio}</p>
        </div>

        {/* Link Público */}
        <div className="mt-4 flex items-center gap-2 bg-gray-50 dark:bg-gray-800/60 rounded-xl p-3 border border-gray-100/60 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1 font-mono">{professional.publicUrl}</span>
          <button
            onClick={handleCopyLink}
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors shadow-xs"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Horários de Funcionamento */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-brand" />
          <h3 className="font-bold text-[#111827] dark:text-white text-sm">Horário de Funcionamento</h3>
        </div>
        <div className="space-y-2">
          {schedule.map(day => (
            <div key={day.day} className="flex items-center justify-between py-1.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <span className={`text-sm font-medium ${day.active ? 'text-[#111827] dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'}`}>
                {day.day}
              </span>
              <span className={`text-sm ${day.active ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>
                {day.active ? `${day.start} - ${day.end}` : 'Fechado'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Serviços Ativos */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-[#111827] dark:text-white text-sm">Serviços Oferecidos</h3>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{activeServices.length} ativos</span>
        </div>
        <div className="space-y-2">
          {activeServices.map(svc => (
            <div key={svc.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100/60 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-[#111827] dark:text-white">{svc.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{svc.duration}min</p>
              </div>
              <p className="text-sm font-bold text-brand">R$ {svc.price.toFixed(2).replace('.', ',')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfólio / Galeria */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-brand" />
            <h3 className="font-bold text-[#111827] dark:text-white text-sm">Portfólio</h3>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              ({portfolio.length} / {maxFiles} fotos)
            </span>
          </div>

          {/* Barra de Ações do Portfólio */}
          <div className="flex items-center gap-2 flex-wrap">
            {portfolio.length > 0 && !isSelectionMode && (
              <button
                type="button"
                onClick={() => setIsSelectionMode(true)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Gerenciar Fotos
              </button>
            )}

            {isSelectionMode && (
              <>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5"
                >
                  {selectedPhotoIds.length === portfolio.length ? (
                    <>
                      <CheckSquare className="w-3.5 h-3.5 text-brand" />
                      Desmarcar Todas
                    </>
                  ) : (
                    <>
                      <Square className="w-3.5 h-3.5" />
                      Selecionar Todas ({portfolio.length})
                    </>
                  )}
                </button>

                {selectedPhotoIds.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Excluir ({selectedPhotoIds.length})
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsSelectionMode(false)
                    setSelectedPhotoIds([])
                  }}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>

        {/* Grade de Fotos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {portfolio.map((img) => {
            const isSelected = selectedPhotoIds.includes(img.id)
            return (
              <div
                key={img.id}
                onClick={() => {
                  if (isSelectionMode) {
                    toggleSelectPhoto(img.id)
                  } else {
                    setPreviewImage(img)
                  }
                }}
                className={`aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative group cursor-pointer border-2 transition-all ${
                  isSelected
                    ? 'border-brand ring-2 ring-brand/40 shadow-md scale-[0.98]'
                    : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || 'Foto do portfólio'}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay no Hover / Modo Seleção */}
                <div
                  className={`absolute inset-0 transition-opacity flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-brand/20 opacity-100'
                      : 'bg-black/30 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {!isSelectionMode && (
                    <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-white flex items-center justify-center shadow-md">
                      <Eye className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Botão de Excluir Individual no Canto Superior Direito (quando fora do modo seleção) */}
                {!isSelectionMode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteSingle(img.id)
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
                    title="Excluir foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Checkbox de Seleção Múltipla */}
                {isSelectionMode && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSelectPhoto(img.id)
                    }}
                    className={`absolute top-2 left-2 w-6 h-6 rounded-lg flex items-center justify-center transition-all z-10 ${
                      isSelected
                        ? 'bg-brand text-white shadow-md'
                        : 'bg-black/40 border border-white/60 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </div>
            )
          })}

          {/* Botão Adicionar Fotos */}
          {portfolio.length < maxFiles && (
            <button
              onClick={() => open('portfolio-upload')}
              className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-brand hover:border-brand dark:hover:border-brand hover:bg-rose-50/20 dark:hover:bg-rose-950/20 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:text-brand group-hover:bg-rose-50 dark:group-hover:bg-rose-950/60 flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-brand transition-colors">
                Adicionar
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Modal de Edição de Perfil */}
      {isOpen('edit-profile') && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 animate-fade-in" onClick={() => close('edit-profile')}>
          <div
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[#111827] dark:text-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-lg font-bold text-[#111827] dark:text-white">Editar Perfil & Vitrine</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Atualize as informações públicas vistas pelos clientes.</p>
              </div>
              <button
                onClick={() => close('edit-profile')}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Nome do Estabelecimento / Studio
                </label>
                <input
                  type="text"
                  value={formStudio}
                  onChange={(e) => setFormStudio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-semibold text-[#111827] dark:text-white focus:ring-2 focus:ring-brand outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Endereço do Local de Atendimento
                </label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#111827] dark:text-white focus:ring-2 focus:ring-brand outline-none"
                  placeholder="Rua, número, bairro, cidade - UF"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  WhatsApp / Telefone de Contato
                </label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#111827] dark:text-white focus:ring-2 focus:ring-brand outline-none"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Biografia & Apresentação
                </label>
                <textarea
                  rows={3}
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#111827] dark:text-white focus:ring-2 focus:ring-brand outline-none resize-none"
                  placeholder="Conte um pouco sobre sua experiência e diferenciais..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => close('edit-profile')}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Upload de Fotos no Portfólio */}
      <PortfolioUploadModal
        isOpen={isOpen('portfolio-upload')}
        onClose={() => close('portfolio-upload')}
      />

      {/* Modal de Preview Expandido da Imagem */}
      <ImagePreviewModal
        isOpen={!!previewImage}
        image={previewImage}
        onClose={() => setPreviewImage(null)}
        onDelete={handleDeleteSingle}
      />
    </div>
  )
}
