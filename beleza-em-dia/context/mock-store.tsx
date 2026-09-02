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
  setAppointments: React.Dispatch<React.SetStateAction<MockAppointment[]>>
  updateAppointment: (id: string, data: Partial<MockAppointment>) => void
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void
  updateClientNotes: (id: string, notes: string) => void
  updateProfessional: (data: Partial<typeof mockProfessional>) => void
  updateService: (id: string, data: Partial<MockService>) => void
  addService: (service: MockService) => void
  upsertService: (service: MockService) => void
  removeService: (id: string) => void
  addPortfolioItems: (items: Array<{ id: string; src: string; alt: string }>) => void
  removePortfolioItems: (ids: string[]) => void
  addTransaction: (tx: MockTransaction) => void
}

const MockStoreContext = createContext<MockStoreState | null>(null)

// ---------- Provider ----------
export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Começa logada para protótipo
  const [professional, setProfessional] = useState(mockProfessional)
  const [appointments, setAppointments] = useState<MockAppointment[]>([])
  const [clients, setClients] = useState<MockClient[]>(mockClients)
  const [services, setServices] = useState<MockService[]>(mockServices)
  const [transactions, setTransactions] = useState<MockTransaction[]>(mockTransactions)
  const [portfolio, setPortfolio] = useState<Array<{ id: string; src: string; alt: string }>>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Inicializar agendamentos e portfólio com segurança a partir do localStorage
  useEffect(() => {
    const savedProfessional = localStorage.getItem('beleza-em-dia-professional')
    if (savedProfessional) {
      try {
        setProfessional({ ...mockProfessional, ...JSON.parse(savedProfessional) })
      } catch {
        setProfessional(mockProfessional)
      }
    }

    const savedClients = localStorage.getItem('beleza-em-dia-clients')
    if (savedClients) {
      try {
        const parsedClients = JSON.parse(savedClients)
        setClients(Array.isArray(parsedClients) ? parsedClients : mockClients)
      } catch {
        setClients(mockClients)
      }
    }

    const savedTransactions = localStorage.getItem('beleza-em-dia-transactions')
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions)
        setTransactions(Array.isArray(parsedTransactions) ? parsedTransactions : mockTransactions)
      } catch {
        setTransactions(mockTransactions)
      }
    }

    const saved = localStorage.getItem('beleza-em-dia-appointments')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const generated = generateMockAppointments()
        const today = new Date().toISOString().split('T')[0]
        const parsedToday = Array.isArray(parsed) ? parsed.filter((appointment: MockAppointment) => appointment.date === today) : []
        const todayStatuses = new Set(parsedToday.map((appointment: MockAppointment) => appointment.status))
        const missingTodayStatuses = generated.filter((appointment) => appointment.date === today && !todayStatuses.has(appointment.status))
        setAppointments(Array.isArray(parsed) && parsed.length > 0
          ? [...parsed, ...missingTodayStatuses]
          : generated)
      } catch {
        setAppointments(generateMockAppointments())
      }
    } else {
      setAppointments(generateMockAppointments())
    }

    const savedPortfolio = localStorage.getItem('beleza-em-dia-portfolio')
    if (savedPortfolio) {
      try {
        const parsedPort = JSON.parse(savedPortfolio)
        setPortfolio(prev => prev.length > 0 ? prev : (parsedPort.length > 0 ? parsedPort : mockPortfolio))
      } catch {
        setPortfolio(prev => prev.length > 0 ? prev : mockPortfolio)
      }
    } else {
      setPortfolio(prev => prev.length > 0 ? prev : mockPortfolio)
    }

    const savedServices = localStorage.getItem('beleza-em-dia-services')
    if (savedServices) {
      try {
        const parsedSvc = JSON.parse(savedServices)
        setServices(parsedSvc.length > 0 ? parsedSvc : mockServices)
      } catch {
        setServices(mockServices)
      }
    } else {
      setServices(mockServices)
    }

    setIsInitialized(true)
  }, [])

  // Persistir alterações de agendamentos no localStorage APENAS após inicializar
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('beleza-em-dia-appointments', JSON.stringify(appointments))
    }
  }, [appointments, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('beleza-em-dia-professional', JSON.stringify(professional))
    }
  }, [professional, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('beleza-em-dia-clients', JSON.stringify(clients))
    }
  }, [clients, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('beleza-em-dia-transactions', JSON.stringify(transactions))
    }
  }, [transactions, isInitialized])

  // Persistir portfolio no localStorage APENAS após inicializar
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('beleza-em-dia-portfolio', JSON.stringify(portfolio))
    }
  }, [portfolio, isInitialized])

  // Persistir serviços no localStorage APENAS após inicializar
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('beleza-em-dia-services', JSON.stringify(services))
    }
  }, [services, isInitialized])

  const login = useCallback(() => setIsLoggedIn(true), [])
  const logout = useCallback(() => setIsLoggedIn(false), [])

  const updateAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    )
  }, [])

  const updateAppointment = useCallback((id: string, data: Partial<MockAppointment>) => {
    setAppointments(prev => prev.map(appointment => appointment.id === id ? { ...appointment, ...data } : appointment))
  }, [])

  const rescheduleAppointment = useCallback((id: string, newDate: string, newTime: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, date: newDate, time: newTime, status: 'confirmado' } : a))
    )
  }, [])

  const updateClientNotes = useCallback((id: string, notes: string) => {
    setClients(prev => prev.map(client => client.id === id ? { ...client, notes } : client))
  }, [])

  const updateProfessional = useCallback((data: Partial<typeof mockProfessional>) => {
    setProfessional(prev => ({ ...prev, ...data }))
  }, [])

  const updateService = useCallback((id: string, data: Partial<MockService>) => {
    setServices(prev => prev.map(service => service.id === id ? { ...service, ...data } : service))
  }, [])

  const addService = useCallback((service: MockService) => {
    setServices(prev => [service, ...prev])
  }, [])

  const upsertService = useCallback((service: MockService) => {
    setServices(prev => prev.some(item => item.id === service.id)
      ? prev.map(item => item.id === service.id ? service : item)
      : [service, ...prev])
  }, [])

  const removeService = useCallback((id: string) => {
    setServices(prev => prev.filter(service => service.id !== id))
  }, [])

  const addPortfolioItems = useCallback((items: Array<{ id: string; src: string; alt: string }>) => {
    setPortfolio(prev => [...items, ...prev])
  }, [])

  const removePortfolioItems = useCallback((ids: string[]) => {
    setPortfolio(prev => prev.filter(item => !ids.includes(item.id)))
  }, [])

  const addTransaction = useCallback((tx: MockTransaction) => {
    setTransactions(prev => [tx, ...prev])
  }, [])

  const value: MockStoreState = {
    isLoggedIn,
    professional,
    appointments,
    clients,
    services,
    transactions,
    financial: mockFinancial,
    schedule: mockSchedule,
    portfolio,
    login,
    logout,
    updateAppointmentStatus,
    setAppointments,
    updateAppointment,
    rescheduleAppointment,
    updateClientNotes,
    updateProfessional,
    updateService,
    addService,
    upsertService,
    removeService,
    addPortfolioItems,
    removePortfolioItems,
    addTransaction,
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
