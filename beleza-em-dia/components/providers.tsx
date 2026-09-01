'use client'

import { MockStoreProvider } from '@/context/mock-store'
import { ThemeProvider } from '@/components/theme-provider'
import { ModalManagerProvider } from '@/context/modal-manager'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ModalManagerProvider>
        <MockStoreProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </MockStoreProvider>
      </ModalManagerProvider>
    </ThemeProvider>
  )
}
