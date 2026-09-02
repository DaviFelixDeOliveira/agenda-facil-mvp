'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'

type ModalKey = string

interface ModalData {
  [key: string]: any
}

interface ModalManagerState {
  openModal: ModalKey | null
  modalData: ModalData
  open: (key: ModalKey, data?: any) => void
  close: (key: ModalKey) => void
  closeAll: () => void
  isOpen: (key: ModalKey) => boolean
  getData: <T>(key: ModalKey) => T | undefined
}

const ModalManagerContext = createContext<ModalManagerState | null>(null)

export function ModalManagerProvider({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null)
  const [modalData, setModalData] = useState<ModalData>({})
  const isClosingViaPopstate = useRef(false)

  const open = useCallback((key: ModalKey, data?: any) => {
    setOpenModal(key)
    if (data !== undefined) {
      setModalData(prev => ({ ...prev, [key]: data }))
    }
    if (typeof window !== 'undefined') {
      window.history.pushState({ modalKey: key }, '')
    }
  }, [])

  const close = useCallback((key: ModalKey) => {
    setOpenModal(current => (current === key ? null : current))
    setModalData(prev => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const closeAll = useCallback(() => {
    setOpenModal(null)
    setModalData({})
  }, [])

  // Listener para tecla ESC no desktop e botão voltar no mobile
  useEffect(() => {
    if (!openModal) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close(openModal)
      }
    }

    const handlePopState = (e: PopStateEvent) => {
      isClosingViaPopstate.current = true
      closeAll()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [openModal, close, closeAll])

  const isOpen = useCallback((key: ModalKey) => {
    return openModal === key
  }, [openModal])

  const getData = useCallback((key: ModalKey) => {
    return modalData[key]
  }, [modalData])

  return (
    <ModalManagerContext.Provider value={{ openModal, open, close, closeAll, isOpen, getData, modalData }}>
      {children}
    </ModalManagerContext.Provider>
  )
}

export function useModalManager() {
  const ctx = useContext(ModalManagerContext)
  if (!ctx) throw new Error('useModalManager deve estar dentro de <ModalManagerProvider>')
  return ctx
}