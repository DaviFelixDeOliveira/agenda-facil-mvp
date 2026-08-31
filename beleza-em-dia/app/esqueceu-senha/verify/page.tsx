'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

export default function VerifyResetCodePage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Recuperar email da sessão
    const storedEmail = sessionStorage.getItem('resetEmail')
    if (!storedEmail) {
      toast.error('Acesso inválido. Solicite um novo código.')
      router.replace('/esqueceu-senha/request')
      return
    }
    setEmail(storedEmail)
  }, [router])

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1]
    const updated = [...code]
    updated[index] = value
    setCode(updated)

    // Foco no próximo input automaticamente
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const codeString = code.join('')
    if (codeString.length !== 6) {
      toast.error('Digite todos os 6 dígitos')
      return
    }

    setLoading(true)

    try {
      // Validar código (mock/real)
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: codeString }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Código inválido ou expirado')
        setLoading(false)
        return
      }

      // Sucesso: salvar token e ir para página de nova senha
      sessionStorage.setItem('resetToken', data.token || codeString)
      toast.success('Código validado! Defina sua nova senha.')
      router.push('/esqueceu-senha/new-password')
    } catch (error) {
      console.error('Verify error:', error)
      toast.error('Erro ao validar código')
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success('Novo código enviado para seu e-mail!')
      } else {
        toast.error('Erro ao reenviar código')
      }
    } catch (error) {
      console.error('Resend error:', error)
      toast.error('Erro ao reenviar código')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4 sm:p-8">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-6 text-center">
        {/* Logo / Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative w-44 h-44 flex items-center justify-center mb-3">
            <Image 
              src="/Logo Sem fundo texto preto.png" 
              alt="Beleza em Dia" 
              width={176} 
              height={176} 
              className="w-full h-full object-contain" 
              priority 
            />
          </div>
          <h1 className="text-xl font-bold text-brand">Verifique seu e-mail</h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            Enviamos um código de 6 dígitos para <strong>{email}</strong>. Insira-o abaixo para continuar.
          </p>
        </div>

        {/* 6 Caixinhas de OTP */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-2.5">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`digit-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-xl border border-gray-200 bg-white text-[#111827] focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all shadow-sm"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2" />
                Verificando...
              </>
            ) : (
              'Verificar Código'
            )}
          </button>
        </form>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleResend}
            className="text-xs text-gray-500 hover:text-brand transition-colors"
          >
            Não recebeu o código? <span className="font-bold text-[#111827]">Reenviar</span>
          </button>

          <div>
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
    </div>
  )
}
