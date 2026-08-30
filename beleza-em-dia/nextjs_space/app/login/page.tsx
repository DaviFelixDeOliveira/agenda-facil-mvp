'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('bia@studiobian.com.br')
  const [password, setPassword] = useState('123456')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simula delay de login
    setTimeout(() => {
      router.replace('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen flex">
      {/* Painel esquerdo - branding (desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111827] relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-brand blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-rose-400 blur-3xl" />
        </div>
        <div className="relative z-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image src="/logo.png" alt="Beleza em Dia" width={56} height={56} className="rounded-xl" />
            <span className="text-3xl font-bold text-white tracking-tight">Beleza em Dia</span>
          </div>
          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            Sua agenda organizada, clientes satisfeitos e finanças sob controle — tudo em um só lugar.
          </p>

          {/* Preview de funcionalidades */}
          <div className="space-y-3 mt-8 max-w-sm mx-auto">
            {[
              { emoji: '📅', text: 'Gestão completa de horários' },
              { emoji: '💅', text: 'Link público para agendamento' },
              { emoji: '💰', text: 'Controle financeiro simplificado' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel direito - formulário */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FAFAFA]">
        <div className="w-full max-w-md space-y-8">
          {/* Logo mobile */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-4">
            <Image src="/logo.png" alt="Beleza em Dia" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-bold text-[#111827]">Beleza em Dia</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Entrar na conta</h1>
            <p className="text-gray-500 mt-1">Acesse seu painel profissional</p>
          </div>

          {/* Alerta de protótipo */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2">
            <span className="text-sm">⚡</span>
            <div>
              <p className="text-xs text-amber-800 font-medium">Modo Protótipo</p>
              <p className="text-xs text-amber-700 mt-0.5">Clique em "Entrar" para acessar o painel com dados simulados.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#111827]">Senha</label>
                <button type="button" className="text-xs text-brand hover:underline font-medium">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-white text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand text-white rounded-xl font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Não tem conta?{' '}
            <button className="text-brand font-semibold hover:underline">Criar conta</button>
          </p>
        </div>
      </div>
    </div>
  )
}
