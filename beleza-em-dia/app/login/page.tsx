'use client'

import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

function LoginContent() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await signIn('google', { redirectTo: '/auth/callback' })
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#090D16] p-4 sm:p-8 transition-colors">
      <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800 space-y-6 transition-colors">
        {/* Logo Grande Centralizada */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <Image
              src="/Logo Sem fundo texto preto.png"
              alt="Beleza em Dia"
              width={192}
              height={192}
              className="w-full h-full object-contain dark:hidden"
              priority
            />
            <Image
              src="/Logo Sem fundo texto branco.png"
              alt="Beleza em Dia"
              width={192}
              height={192}
              className="w-full h-full object-contain hidden dark:block"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] dark:text-white">Beleza em Dia</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Acesse sua conta profissional</p>
          </div>
        </div>

        {/* Alerta de erro amigável se o login falhar ou for cancelado */}
        {errorParam && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>
              Não foi possível concluir a autenticação com o Google. Por favor, tente novamente.
            </p>
          </div>
        )}

        {/* Botão Oficial Google OAuth */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl font-semibold text-sm text-[#111827] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-all flex items-center justify-center gap-3 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{loading ? 'Conectando...' : 'Entrar com Google'}</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Ainda não tem conta?{' '}
          <Link href="/signup" className="text-[#111827] dark:text-white font-bold hover:text-brand transition-colors">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#090D16]">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
