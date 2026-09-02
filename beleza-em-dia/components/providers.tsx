'use client'

import { MockStoreProvider } from '@/context/mock-store'
import { ThemeProvider } from '@/components/theme-provider'
import { ModalManagerProvider } from '@/context/modal-manager'
import { Toaster } from 'sonner'
import { FormValidationFocus } from '@/components/form-validation-focus'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ModalManagerProvider>
        <MockStoreProvider>
          {children}
          <FormValidationFocus />
          <Toaster position="top-right" richColors closeButton />
        </MockStoreProvider>
      </ModalManagerProvider>
    </ThemeProvider>
  )
}
