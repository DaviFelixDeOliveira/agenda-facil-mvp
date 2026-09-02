'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { UploadCloud, X, Check, FileImage, Trash2, Plus, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useMockStore } from '@/context/mock-store'

interface UploadFileItem {
  id: string
  file: File
  previewUrl: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
}

interface PortfolioUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PortfolioUploadModal({ isOpen, onClose }: PortfolioUploadModalProps) {
  const { addPortfolioItems, portfolio } = useMockStore()
  const [dragActive, setDragActive] = useState(false)
  const [fileList, setFileList] = useState<UploadFileItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxTotalPhotos = 20
  const remainingSlots = Math.max(0, maxTotalPhotos - portfolio.length)

  // Suporte a ESC para fechar modal
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

  // Limpar lista quando o modal fechar
  useEffect(() => {
    if (!isOpen) {
      setFileList([])
      setIsProcessing(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const selectedFiles = Array.from(files).filter(f => f.type.startsWith('image/'))
    
    if (selectedFiles.length === 0) {
      toast.error('Por favor, selecione apenas arquivos de imagem.')
      return
    }

    if (fileList.length + selectedFiles.length > remainingSlots) {
      toast.error(`Você só pode adicionar mais ${remainingSlots} foto(s). Limite total de ${maxTotalPhotos}.`)
      return
    }

    const newItems: UploadFileItem[] = selectedFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      status: 'uploading',
    }))

    setFileList((prev) => [...prev, ...newItems])

    // Simula progresso individual de upload para cada arquivo
    newItems.forEach((item) => {
      simulateUploadProgress(item.id)
    })
  }

  const simulateUploadProgress = (itemId: string) => {
    let current = 0
    const step = Math.floor(Math.random() * 20) + 15
    const interval = setInterval(() => {
      current += step
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setFileList((prev) =>
          prev.map((it) =>
            it.id === itemId ? { ...it, progress: 100, status: 'completed' } : it
          )
        )
      } else {
        setFileList((prev) =>
          prev.map((it) =>
            it.id === itemId ? { ...it, progress: current } : it
          )
        )
      }
    }, 150)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleRemoveItem = (id: string) => {
    setFileList((prev) => prev.filter((it) => it.id !== id))
  }

  const handleFinishUpload = () => {
    if (fileList.length === 0) {
      toast.error('Nenhuma imagem selecionada.')
      return
    }

    const isAnyStillUploading = fileList.some((it) => it.status === 'uploading' && it.progress < 100)
    if (isAnyStillUploading) {
      toast.info('Aguarde a conclusão do envio de todas as fotos.')
      return
    }

    setIsProcessing(true)

    const newPortfolioEntries = fileList.map((item) => ({
      id: item.id,
      src: item.previewUrl,
      alt: item.file.name.replace(/\.[^/.]+$/, ''),
    }))

    addPortfolioItems(newPortfolioEntries)
    toast.success(`${newPortfolioEntries.length} foto(s) adicionada(s) ao portfólio!`)
    setIsProcessing(false)
    onClose()
  }

  const allCompleted = fileList.length > 0 && fileList.every((it) => it.progress >= 100)

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[#111827] dark:text-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-bold text-[#111827] dark:text-white">Adicionar Fotos ao Portfólio</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Disponível: {remainingSlots} vaga(s) de {maxTotalPhotos} fotos.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Área de Drag & Drop */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
            dragActive
              ? 'border-brand bg-rose-50/50 dark:bg-rose-950/30 scale-[1.01]'
              : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/40 hover:border-brand/60 hover:bg-rose-50/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-brand flex items-center justify-center shadow-xs">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-[#111827] dark:text-white">
              Arraste e solte suas fotos aqui
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ou <span className="text-brand font-semibold underline">abra os arquivos do dispositivo</span>
            </p>
          </div>

          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            Formatos suportados: JPG, PNG, WebP (máx. 10MB cada)
          </p>
        </div>

        {/* Lista de Arquivos com Barra de Progresso */}
        {fileList.length > 0 && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
              <span>Fotos selecionadas ({fileList.length})</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-brand hover:underline flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar mais
              </button>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {fileList.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700/60 flex items-center gap-3 animate-fade-in"
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0 bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={item.previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Informações e Progresso */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-[#111827] dark:text-white truncate">
                        {item.file.name}
                      </p>
                      <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 shrink-0">
                        {item.progress}%
                      </span>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          item.progress === 100
                            ? 'bg-emerald-500'
                            : 'bg-brand'
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Ação / Status */}
                  <div className="shrink-0 flex items-center gap-1">
                    {item.progress === 100 ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rodapé / Botões de Ação */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={fileList.length === 0 || !allCompleted || isProcessing}
            onClick={handleFinishUpload}
            className="py-2.5 px-5 bg-brand text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {isProcessing ? (
              'Processando...'
            ) : (
              <>
                <Check className="w-4 h-4" />
                Salvar no Portfólio ({fileList.length})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
