'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { ArrowLeft, AlertCircle, Clock } from 'lucide-react'

function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  if (local.length <= 3) return email
  const firstThree = local.slice(0, 3)
  const lastChar = local.slice(-1)
  return `${firstThree}****${lastChar}@${domain}`
}

function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function VerifyResetCodePage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  // Limite de 3 tentativas de código inválido -> Bloqueio de 5 minutos
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lockoutSeconds, setLockoutSeconds] = useState(0)

  // Cooldown de reenvio de código (1ª vez 30s, 2ª vez 60s, 3ª vez 300s/5min)
  const [resendCount, setResendCount] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('resetEmail')
    if (!storedEmail) {
      toast.error('Acesso inválido. Solicite um novo código.')
      router.replace('/esqueceu-senha/request')
      return
    }
    setEmail(storedEmail)
  }, [router])

  // Timer para o lockout de tentativas de código (5 minutos)
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (lockoutSeconds > 0) {
      timer = setInterval(() => {
        setLockoutSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setFailedAttempts(0)
            setErrorMessage('')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [lockoutSeconds])

  // Timer para o cooldown de reenvio de código
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [resendCooldown])

  const handleDigitChange = (index: number, value: string) => {
    if (lockoutSeconds > 0) return
    if (value.length > 1) value = value[value.length - 1]
    const updated = [...code]
    updated[index] = value
    setCode(updated)
    setErrorMessage('') // Limpa erro ao digitar

    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (lockoutSeconds > 0) return
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (lockoutSeconds > 0) {
      toast.error(`Aguarde ${formatSeconds(lockoutSeconds)} para tentar novamente.`)
      return
    }
    
    const codeString = code.join('')
    if (codeString.length !== 6) {
      toast.error('Digite todos os 6 dígitos')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: codeString }),
      })

      const data = await response.json()

      if (!response.ok) {
        const nextAttempts = failedAttempts + 1
        setFailedAttempts(nextAttempts)
        setLoading(false)

        if (nextAttempts >= 3) {
          setLockoutSeconds(300) // 5 minutos
          setErrorMessage('Você inseriu um código inválido 3 vezes. Por favor, aguarde 5 minutos para tentar novamente.')
          toast.error('Limite de 3 tentativas atingido. Aguarde 5 minutos.')
        } else {
          setErrorMessage('O código que você inseriu é inválido. Tente novamente.')
          toast.error(data.error || 'Código inválido. Tente novamente.')
        }
        return
      }

      setFailedAttempts(0)
      setErrorMessage('')
      sessionStorage.setItem('resetToken', data.token || codeString)
      toast.success('Código validado! Defina sua nova senha.')
      router.push('/esqueceu-senha/new-password')
    } catch (error) {
      console.error('Verify error:', error)
      const nextAttempts = failedAttempts + 1
      setFailedAttempts(nextAttempts)
      setLoading(false)

      if (nextAttempts >= 3) {
        setLockoutSeconds(300)
        setErrorMessage('Você inseriu um código inválido 3 vezes. Por favor, aguarde 5 minutos para tentar novamente.')
      } else {
        setErrorMessage('O código que você inseriu é inválido. Tente novamente.')
      }
      toast.error('Código inválido. Tente novamente.')
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return

    try {
      const nextResendCount = resendCount + 1
      setResendCount(nextResendCount)

      // Regra de Cooldown:
      // 1ª vez: 30 segundos
      // 2ª vez: 60 segundos (1 minuto)
      // 3ª vez em diante: 300 segundos (5 minutos)
      let cooldownTime = 30
      if (nextResendCount === 2) {
        cooldownTime = 60
      } else if (nextResendCount >= 3) {
        cooldownTime = 300
      }
      setResendCooldown(cooldownTime)

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success('Novo código enviado para seu e-mail!')
        setCode(['', '', '', '', '', ''])
        setErrorMessage('')
      } else {
        toast.error('Erro ao reenviar código')
      }
    } catch (error) {
      console.error('Resend error:', error)
      toast.error('Erro ao reenviar código')
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
            <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Verificar Código</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Enviamos um código de 6 dígitos para:
            </p>
            <p className="text-xs font-bold text-brand mt-0.5">{maskEmail(email)}</p>
          </div>
        </div>

        {/* Banner de Bloqueio por Limite de Tentativas */}
        {lockoutSeconds > 0 && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300 animate-fade-in">
            <Clock className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
            <div className="space-y-0.5">
              <p className="font-bold">Limite de tentativas atingido</p>
              <p>
                Por favor, aguarde <span className="font-mono font-bold underline">{formatSeconds(lockoutSeconds)}</span> para tentar novamente.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-center gap-2 sm:gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`digit-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  disabled={lockoutSeconds > 0}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-2xl border transition-all outline-none ${
                    lockoutSeconds > 0
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                      : errorMessage
                      ? 'border-red-400 dark:border-red-600 bg-red-50/30 dark:bg-red-950/20 text-[#111827] dark:text-white focus:ring-2 focus:ring-red-500'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white focus:ring-2 focus:ring-brand'
                  }`}
                  required
                />
              ))}
            </div>

            {/* Mensagem de Erro Inline abaixo dos inputs */}
            {errorMessage && lockoutSeconds === 0 && (
              <div className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-red-600 dark:text-red-400 pt-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || lockoutSeconds > 0}
            className={`w-full py-3.5 text-white rounded-2xl font-bold text-sm transition-all shadow-sm ${
              lockoutSeconds > 0
                ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed opacity-60'
                : 'bg-[#111827] dark:bg-brand hover:bg-black dark:hover:bg-rose-700 disabled:opacity-50'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2" />
                Validando...
              </>
            ) : lockoutSeconds > 0 ? (
              `Aguarde ${formatSeconds(lockoutSeconds)}`
            ) : (
              'Confirmar Código'
            )}
          </button>
        </form>

        <div className="flex items-center justify-between text-xs pt-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className={`font-semibold transition-colors ${
              resendCooldown > 0
                ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'text-brand hover:underline cursor-pointer'
            }`}
          >
            {resendCooldown > 0 ? (
              <span>Reenviar em {formatSeconds(resendCooldown)}</span>
            ) : (
              'Reenviar código'
            )}
          </button>
          <Link
            href="/esqueceu-senha/request"
            className="text-gray-500 dark:text-gray-400 hover:text-[#111827] dark:hover:text-white flex items-center gap-1 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Alterar e-mail
          </Link>
        </div>
      </div>
    </div>
  )
}
