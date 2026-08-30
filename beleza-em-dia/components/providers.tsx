'use client'

import { MockStoreProvider } from '@/context/mock-store'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MockStoreProvider>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </MockStoreProvider>
  )
}
