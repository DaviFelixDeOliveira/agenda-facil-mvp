'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function NewPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const resetEmail = sessionStorage.getItem('resetEmail')
    const resetToken = sessionStorage.getItem('resetToken')
    
    if (!resetEmail || !resetToken) {
      toast.error('Acesso inválido. Solicite um novo código.')
      router.replace('/esqueceu-senha/request')
      return
    }
    setEmail(resetEmail)
  }, [router])

  const validatePassword = () => {
    if (!password) {
      toast.error('Digite uma nova senha')
      return false
    }
    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres')
      return false
    }
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePassword()) return

    setLoading(true)

    try {
      const token = sessionStorage.getItem('resetToken')
      
      const response = await fetch('/api/auth/reset-password-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          token,
          newPassword: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Erro ao redefinir senha')
        setLoading(false)
        return
      }

      toast.success('Senha redefinida com sucesso!')
      sessionStorage.removeItem('resetEmail')
      sessionStorage.removeItem('resetToken')
      router.push('/login')
    } catch (error) {
      console.error('Reset confirm error:', error)
      toast.error('Erro ao processar solicitação')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#090D16] p-4 sm:p-8 transition-colors">
      <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6 transition-colors">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <Image
              src="/Logo Sem fundo texto preto.png"
              alt="Beleza em Dia"
              width={176}
              height={176}
              className="w-full h-full object-contain dark:hidden"
              priority
            />
            <Image
              src="/Logo Sem fundo texto branco.png"
              alt="Beleza em Dia"
              width={176}
              height={176}
              className="w-full h-full object-contain hidden dark:block"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Criar Nova Senha</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Defina sua nova senha de acesso</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-11 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#111827] dark:text-white focus:ring-2 focus:ring-brand outline-none transition-all"
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-11 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#111827] dark:text-white focus:ring-2 focus:ring-brand outline-none transition-all"
                placeholder="Digite a senha novamente"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showConfirm ? 'Ocultar senha' : 'Ver senha'}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#111827] dark:bg-brand text-white rounded-2xl font-bold text-sm hover:bg-black dark:hover:bg-rose-700 transition-all disabled:opacity-50 shadow-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2" />
                Salvando...
              </>
            ) : (
              'Salvar Nova Senha'
            )}
          </button>
        </form>

        <div className="pt-2">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-[#111827] dark:hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}
