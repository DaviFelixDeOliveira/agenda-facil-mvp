'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

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

  const open = useCallback((key: ModalKey, data?: any) => {
    // Close any existing modal before opening a new one
    setOpenModal(key)
    if (data !== undefined) {
      setModalData(prev => ({ ...prev, [key]: data }))
    }
  }, [])

  const close = useCallback((key: ModalKey) => {
    setOpenModal(current => (current === key ? null : current))
  }, [])

  const closeAll = useCallback(() => {
    setOpenModal(null)
  }, [])

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