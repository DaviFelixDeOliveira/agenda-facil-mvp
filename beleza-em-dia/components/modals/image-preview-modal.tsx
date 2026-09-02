'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, Trash2 } from 'lucide-react'

interface ImagePreviewModalProps {
  isOpen: boolean
  image: { id: string; src: string; alt: string } | null
  onClose: () => void
  onDelete: (id: string) => void
}

export function ImagePreviewModal({ isOpen, image, onClose, onDelete }: ImagePreviewModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !image) return null

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-[92vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <p className="text-sm font-bold text-[#111827] dark:text-white truncate max-w-md">
            {image.alt || 'Foto do Portfólio'}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onDelete(image.id)
                onClose()
              }}
              className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Excluir foto"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Excluir Foto</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Container da Imagem */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] bg-black/5 dark:bg-black/40 flex items-center justify-center p-2">
          <Image
            src={image.src}
            alt={image.alt || 'Foto expandida'}
            fill
            unoptimized
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      </div>
    </div>
  )
}
