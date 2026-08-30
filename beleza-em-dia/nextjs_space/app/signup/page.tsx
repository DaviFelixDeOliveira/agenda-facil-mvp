'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Scissors } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Erro ao criar conta')
        return
      }
      const loginRes = await signIn('credentials', { email, password, redirect: false })
      if (loginRes?.error) {
        setError('Conta criada, mas houve erro ao entrar. Tente fazer login.')
      } else {
        router.replace('/dashboard')
      }
    } catch {
      setError('Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#111827]">Beleza em Dia</span>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827]">Criar conta</h1>
          <p className="text-gray-500 mt-1">Comece a gerenciar sua agenda agora</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              placeholder="Seu nome profissional"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-1.5">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </div>

          {error && <p className="text-sm text-danger bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Já tem conta?{' '}
          <Link href="/login" className="text-brand font-semibold hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
