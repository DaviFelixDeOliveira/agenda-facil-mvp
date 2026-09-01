'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { ArrowLeft, Mail } from 'lucide-react'

export default function ResetPasswordRequestPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Por favor, digite seu e-mail')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Erro ao enviar código')
        setLoading(false)
        return
      }

      toast.success('Código enviado! Verifique seu e-mail.')
      
      sessionStorage.setItem('resetEmail', email)
      
      router.push('/esqueceu-senha/verify')
    } catch (error) {
      console.error('Reset error:', error)
      toast.error('Erro ao processar solicitação')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-8">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <Image 
              src="/Logo Sem fundo texto preto.png" 
              alt="Beleza em Dia" 
              width={176} 
              height={176} 
              className="w-full h-full object-contain" 
              priority 
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Redefinir Senha</h1>
            <p className="text-sm text-gray-500 mt-1">Digite o e-mail da sua conta profissional</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#111827] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2" />
                Enviando...
              </>
            ) : (
              'Enviar Código'
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#111827] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}