'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  mockProfessional,
  mockServices,
  mockClients,
  generateMockAppointments,
  mockTransactions,
  mockFinancial,
  mockSchedule,
  mockPortfolio,
  type MockAppointment,
  type MockClient,
  type MockService,
  type MockTransaction,
  type AppointmentStatus,
  type WeekdaySchedule,
} from '@/lib/mock-data'

// ---------- Tipos do Store ----------
interface MockStoreState {
  // Sessão simulada
  isLoggedIn: boolean
  professional: typeof mockProfessional
  // Dados
  appointments: MockAppointment[]
  clients: MockClient[]
  services: MockService[]
  transactions: MockTransaction[]
  financial: typeof mockFinancial
  schedule: WeekdaySchedule[]
  portfolio: Array<{ id: string; src: string; alt: string }>
  // Ações
  login: () => void
  logout: () => void
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void
  updateClientNotes: (id: string, notes: string) => void
  updateProfessional: (data: Partial<typeof mockProfessional>) => void
  addPortfolioItems: (items: Array<{ id: string; src: string; alt: string }>) => void
}

const MockStoreContext = createContext<MockStoreState | null>(null)

// ---------- Provider ----------
export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Começa logada para protótipo
  const [professional, setProfessional] = useState(mockProfessional)
  const [appointments, setAppointments] = useState<MockAppointment[]>([])
  const [clients] = useState<MockClient[]>(mockClients)
  const [services] = useState<MockService[]>(mockServices)
  const [portfolio, setPortfolio] = useState<Array<{ id: string; src: string; alt: string }>>(mockPortfolio)

  // Inicializar agendamentos com datas dinâmicas
  useEffect(() => {
    const saved = localStorage.getItem('beleza-em-dia-appointments')
    if (saved) {
      try {
        setAppointments(JSON.parse(saved))
      } catch {
        setAppointments(generateMockAppointments())
      }
    } else {
      setAppointments(generateMockAppointments())
    }

    const savedPortfolio = localStorage.getItem('beleza-em-dia-portfolio')
    if (savedPortfolio) {
      try {
        setPortfolio(JSON.parse(savedPortfolio))
      } catch {
        setPortfolio(mockPortfolio)
      }
    }
  }, [])

  // Persistir alterações de agendamentos no localStorage
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('beleza-em-dia-appointments', JSON.stringify(appointments))
    }
  }, [appointments])

  // Persistir portfolio no localStorage
  useEffect(() => {
    if (portfolio.length > 0) {
      localStorage.setItem('beleza-em-dia-portfolio', JSON.stringify(portfolio))
    }
  }, [portfolio])

  const login = useCallback(() => setIsLoggedIn(true), [])
  const logout = useCallback(() => setIsLoggedIn(false), [])

  const updateAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    )
  }, [])

  const updateClientNotes = useCallback((_id: string, _notes: string) => {
    // Em um protótipo, podemos simular sem persistir clientes
  }, [])

  const updateProfessional = useCallback((data: Partial<typeof mockProfessional>) => {
    setProfessional(prev => ({ ...prev, ...data }))
  }, [])

  const addPortfolioItems = useCallback((items: Array<{ id: string; src: string; alt: string }>) => {
    setPortfolio(prev => [...items, ...prev])
  }, [])

  const value: MockStoreState = {
    isLoggedIn,
    professional,
    appointments,
    clients,
    services,
    transactions: mockTransactions,
    financial: mockFinancial,
    schedule: mockSchedule,
    portfolio,
    login,
    logout,
    updateAppointmentStatus,
    updateClientNotes,
    updateProfessional,
    addPortfolioItems,
  }

  return (
    <MockStoreContext.Provider value={value}>
      {children}
    </MockStoreContext.Provider>
  )
}

// ---------- Hook ----------
export function useMockStore() {
  const ctx = useContext(MockStoreContext)
  if (!ctx) throw new Error('useMockStore deve estar dentro de <MockStoreProvider>')
  return ctx
}
