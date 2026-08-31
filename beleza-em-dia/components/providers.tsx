'use client'

import { MockStoreProvider } from '@/context/mock-store'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MockStoreProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </MockStoreProvider>
    </ThemeProvider>
  )
}
