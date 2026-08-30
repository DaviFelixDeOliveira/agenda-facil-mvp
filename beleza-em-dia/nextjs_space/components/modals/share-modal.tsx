'use client'

import { X, Link2, Copy, QrCode } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  open: boolean
  onClose: () => void
}

export function ShareModal({ open, onClose }: Props) {
  if (!open) return null

  const link = typeof window !== 'undefined' ? `${window?.location?.origin ?? ''}/agendar` : '/agendar'

  const handleCopy = () => {
    navigator?.clipboard?.writeText?.(link)
    toast.success('Link copiado!')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-brand" />
            <h2 className="text-lg font-bold text-[#111827]">Compartilhar Link</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={link}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-[#111827]"
            />
            <button
              onClick={handleCopy}
              className="p-2 bg-brand text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center gap-3">
            <div className="w-32 h-32 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
              <QrCode className="w-20 h-20 text-gray-300" />
            </div>
            <p className="text-xs text-gray-500">Escaneie para acessar</p>
          </div>
        </div>
      </div>
    </div>
  )
}
