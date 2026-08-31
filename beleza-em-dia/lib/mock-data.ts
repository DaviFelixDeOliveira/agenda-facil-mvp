// =============================================
// Estruturas de dados do app "Beleza em Dia"
// -------------------------------------------
// Todos os dados fictícios/de demonstração foram removidos.
// Este arquivo mantém APENAS os tipos e estados iniciais VAZIOS.
// Os dados reais devem vir do banco (Prisma) via API.
// =============================================

// ---------- Profissional ----------
export const mockProfessional = {
  id: '',
  name: '',
  studioName: '',
  specialty: '',
  email: '',
  phone: '',
  phoneFormatted: '',
  bio: '',
  avatar: '',
  address: '',
  cnpj: '',
  slug: '',
  publicUrl: '',
  domicilio: false,
  pixSinal: false,
  pixSinalTipo: 'fixo' as 'fixo' | 'porcentagem',
  pixSinalValor: 0,
  pixSinalPorcentagem: 0,
  toleranciaAtraso: 15,
  cancelamentoSemPerda: 24,
}

// ---------- Serviços ----------
export interface MockService {
  id: string
  name: string
  price: number
  duration: number // minutos
  icon: string // nome do ícone Lucide
  category: string
  active: boolean
}

export const mockServices: MockService[] = []

// ---------- Clientes ----------
export interface MockClient {
  id: string
  name: string
  email: string
  phone: string
  phoneFormatted: string
  notes: string
  totalVisits: number
  averageTicket: number
  lastVisit: string
  createdAt: string
}

export const mockClients: MockClient[] = []

// ---------- Agendamentos ----------
export type AppointmentStatus = 'confirmado' | 'pendente' | 'finalizado' | 'cancelado'

export interface MockAppointment {
  id: string
  clientId: string
  clientName: string
  clientPhone: string
  serviceId: string
  serviceName: string
  price: number
  duration: number
  date: string // YYYY-MM-DD
  time: string // HH:MM
  status: AppointmentStatus
  notes: string
  signalPaid: boolean
  signalAmount: number
  paymentMethod?: string
}

export function generateMockAppointments(): MockAppointment[] {
  return []
}

// ---------- Transações Financeiras ----------
export interface MockTransaction {
  id: string
  date: string
  clientName: string
  serviceName: string
  amount: number
  method: 'PIX' | 'CRÉDITO' | 'DÉBITO' | 'DINHEIRO'
  type: 'servico' | 'sinal' | 'produto'
}

export const mockTransactions: MockTransaction[] = []

// ---------- Financeiro Consolidado ----------
export const mockFinancial = {
  today: 0,
  week: 0,
  month: 0,
  growth: 0,
  averageTicket: 0,
  weeklyChart: [] as { day: string; value: number }[],
}

// ---------- Expediente Semanal ----------
export interface WeekdaySchedule {
  day: string
  short: string
  active: boolean
  start: string
  end: string
  breakStart: string
  breakEnd: string
}

export const mockSchedule: WeekdaySchedule[] = []

// ---------- Portfólio ----------
export const mockPortfolio: { id: string; src: string; alt: string }[] = []
