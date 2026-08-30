'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('bia@studiobian.com.br')
  const [password, setPassword] = useState('123456')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.replace('/dashboard')
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        {/* Logo Grande Centralizada — Fiel ao Protótipo */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-rose-50/50 border border-rose-100 flex items-center justify-center overflow-hidden shadow-md">
            <Image src="/logo.png" alt="Beleza em Dia" width={128} height={128} className="object-cover" priority />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Beleza em Dia</h1>
            <p className="text-sm text-gray-500 mt-0.5">Acesse sua conta profissional</p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Senha</label>
              <Link href="/esqueceu-senha" className="text-xs text-gray-500 hover:text-brand font-medium transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-11 rounded-2xl border border-gray-200 bg-white text-sm text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPw ? 'Ocultar senha' : 'Ver senha'}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#111827] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                Entrar <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Ainda não tem conta?{' '}
          <Link href="/signup" className="text-[#111827] font-bold hover:text-brand transition-colors">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
