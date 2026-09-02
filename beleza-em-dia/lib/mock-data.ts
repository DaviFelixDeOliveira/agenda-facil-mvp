// =============================================
// Estruturas de dados mock do app "Beleza em Dia"
// Povoamento completo para testes e homologação
// =============================================

// ---------- Profissional ----------
export const mockProfessional = {
  id: 'prof_1',
  name: 'Beatriz Oliveira',
  studioName: 'Studio Bia Nails',
  email: 'beatriz.oliveira@belezaemdia.com.br',
  phone: '11987654321',
  phoneFormatted: '(11) 98765-4321',
  bio: 'Especialista em Nail Art e alongamentos em fibra com mais de 6 anos de experiência. Transformando unhas com elegância, cuidado e técnicas inovadoras.',
  avatar: '/Logo Sem fundo texto preto.png',
  address: 'Rua Oscar Freire, 123 - Jardins, São Paulo - SP',
  cnpj: '12.345.678/0001-90',
  slug: 'studio-bia-nails',
  publicUrl: 'https://belezaemdia.com.br/studio-bia-nails',
  domicilio: false,
  pixSinal: true,
  pixSinalTipo: 'fixo' as 'fixo' | 'porcentagem',
  pixSinalValor: 15,
  pixSinalPorcentagem: 30,
  toleranciaAtraso: 15,
  cancelamentoSemPerda: 24,
}

// ---------- Serviços ----------
export interface MockService {
  id: string
  name: string
  price: number
  duration: number // minutos (int)
  icon: string
  category: string
  description?: string
  active: boolean
}

export const mockServices: MockService[] = [
  {
    id: 'svc_1',
    name: 'Alongamento em Gel Moldado',
    price: 130.0,
    duration: 120,
    icon: 'Sparkles',
    category: 'Manicure',
    active: true,
  },
  {
    id: 'svc_2',
    name: 'Esmaltação em Gel',
    price: 65.0,
    duration: 45,
    icon: 'Heart',
    category: 'Manicure',
    active: true,
  },
  {
    id: 'svc_3',
    name: 'Manicure e Pedicure Tradicional',
    price: 55.0,
    duration: 60,
    icon: 'Star',
    category: 'Manicure',
    active: true,
  },
  {
    id: 'svc_4',
    name: 'Manutenção de Alongamento',
    price: 90.0,
    duration: 90,
    icon: 'RotateCcw',
    category: 'Manicure',
    active: true,
  },
  {
    id: 'svc_5',
    name: 'Spa dos Pés com Hidratação Profunda',
    price: 70.0,
    duration: 50,
    icon: 'Flame',
    category: 'Pedicure',
    active: true,
  },
  {
    id: 'svc_6',
    name: 'Blindagem de Diamante',
    price: 80.0,
    duration: 60,
    icon: 'Shield',
    category: 'Manicure',
    active: true,
  },
]

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

export const mockClients: MockClient[] = [
  {
    id: 'cli_1',
    name: 'Camila Rodrigues',
    email: 'camila.rodrigues@gmail.com',
    phone: '11988887777',
    phoneFormatted: '(11) 98888-7777',
    notes: 'Prefere esmaltes em tons nudes e formato amendoado. Cutículas sensíveis.',
    totalVisits: 8,
    averageTicket: 110.0,
    lastVisit: '2026-08-28',
    createdAt: '2026-03-15',
  },
  {
    id: 'cli_2',
    name: 'Juliana Mendes',
    email: 'ju.mendes@outlook.com',
    phone: '11977776666',
    phoneFormatted: '(11) 97777-6666',
    notes: 'Adora Nail Art com francesinha invertida e glitter.',
    totalVisits: 5,
    averageTicket: 95.0,
    lastVisit: '2026-08-22',
    createdAt: '2026-04-10',
  },
  {
    id: 'cli_3',
    name: 'Fernanda Lima',
    email: 'fer.lima88@gmail.com',
    phone: '11966665555',
    phoneFormatted: '(11) 96666-5555',
    notes: 'Faz apenas manutenção de fibra e spa dos pés.',
    totalVisits: 12,
    averageTicket: 140.0,
    lastVisit: '2026-08-30',
    createdAt: '2026-01-20',
  },
  {
    id: 'cli_4',
    name: 'Larissa Souza',
    email: 'larissa.souza@yahoo.com.br',
    phone: '11955554444',
    phoneFormatted: '(11) 95555-4444',
    notes: 'Cliente pontual, gosta de café sem açúcar durante o atendimento.',
    totalVisits: 3,
    averageTicket: 65.0,
    lastVisit: '2026-08-15',
    createdAt: '2026-06-05',
  },
  {
    id: 'cli_5',
    name: 'Mariana Costa',
    email: 'mari.costa@gmail.com',
    phone: '11944443333',
    phoneFormatted: '(11) 94444-3333',
    notes: 'Primeira aplicação de gel recente. Acompanhar crescimento.',
    totalVisits: 2,
    averageTicket: 130.0,
    lastVisit: '2026-08-19',
    createdAt: '2026-07-12',
  },
]

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
  motivoCancelamento?: string
  paymentMethod?: string
}

export function generateMockAppointments(): MockAppointment[] {
  const today = new Date()
  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  const d0 = formatDate(today)
  const d1 = formatDate(new Date(today.getTime() + 86400000))
  const d2 = formatDate(new Date(today.getTime() + 172800000))
  const dPast = formatDate(new Date(today.getTime() - 86400000))

  return [
    {
      id: 'apt_1',
      clientId: 'cli_1',
      clientName: 'Camila Rodrigues',
      clientPhone: '(11) 98888-7777',
      serviceId: 'svc_1',
      serviceName: 'Alongamento em Gel Moldado',
      price: 130.0,
      duration: 120,
      date: d0,
      time: '09:00',
      status: 'confirmado',
      notes: 'Manutenção e aplicação de francesinha',
      signalPaid: true,
      signalAmount: 15.0,
      paymentMethod: 'PIX',
    },
    {
      id: 'apt_2',
      clientId: 'cli_2',
      clientName: 'Juliana Mendes',
      clientPhone: '(11) 97777-6666',
      serviceId: 'svc_2',
      serviceName: 'Esmaltação em Gel',
      price: 65.0,
      duration: 45,
      date: d0,
      time: '11:30',
      status: 'pendente',
      notes: 'Aguardando confirmação de comprovante Pix',
      signalPaid: false,
      signalAmount: 15.0,
      paymentMethod: 'PIX',
    },
    {
      id: 'apt_3',
      clientId: 'cli_3',
      clientName: 'Fernanda Lima',
      clientPhone: '(11) 96666-5555',
      serviceId: 'svc_4',
      serviceName: 'Manutenção de Alongamento',
      price: 90.0,
      duration: 90,
      date: d0,
      time: '14:00',
      status: 'confirmado',
      notes: 'Repor 2 unhas quebradas',
      signalPaid: true,
      signalAmount: 15.0,
      paymentMethod: 'PIX',
    },
    {
      id: 'apt_4',
      clientId: 'cli_4',
      clientName: 'Larissa Souza',
      clientPhone: '(11) 95555-4444',
      serviceId: 'svc_3',
      serviceName: 'Manicure e Pedicure Tradicional',
      price: 55.0,
      duration: 60,
      date: d0,
      time: '16:00',
      status: 'pendente',
      notes: 'Solicitou atendimento pontual',
      signalPaid: false,
      signalAmount: 15.0,
    },
    {
      id: 'apt_9',
      clientId: 'cli_5',
      clientName: 'Mariana Costa',
      clientPhone: '(11) 94444-3333',
      serviceId: 'svc_2',
      serviceName: 'Esmaltação em Gel',
      price: 65.0,
      duration: 45,
      date: d0,
      time: '18:00',
      status: 'finalizado',
      notes: 'Atendimento concluído hoje',
      signalPaid: true,
      signalAmount: 15.0,
      paymentMethod: 'PIX',
    },
    {
      id: 'apt_5',
      clientId: 'cli_5',
      clientName: 'Mariana Costa',
      clientPhone: '(11) 94444-3333',
      serviceId: 'svc_5',
      serviceName: 'Spa dos Pés com Hidratação Profunda',
      price: 70.0,
      duration: 50,
      date: d1,
      time: '10:00',
      status: 'confirmado',
      notes: 'Cliente nova recomendada por Camila',
      signalPaid: true,
      signalAmount: 15.0,
      paymentMethod: 'PIX',
    },
    {
      id: 'apt_6',
      clientId: 'cli_1',
      clientName: 'Camila Rodrigues',
      clientPhone: '(11) 98888-7777',
      serviceId: 'svc_6',
      serviceName: 'Blindagem de Diamante',
      price: 80.0,
      duration: 60,
      date: d2,
      time: '15:30',
      status: 'confirmado',
      notes: '',
      signalPaid: true,
      signalAmount: 15.0,
      paymentMethod: 'PIX',
    },
    {
      id: 'apt_7',
      clientId: 'cli_2',
      clientName: 'Juliana Mendes',
      clientPhone: '(11) 97777-6666',
      serviceId: 'svc_3',
      serviceName: 'Manicure e Pedicure Tradicional',
      price: 55.0,
      duration: 60,
      date: dPast,
      time: '10:00',
      status: 'finalizado',
      notes: 'Atendimento concluído com sucesso',
      signalPaid: true,
      signalAmount: 15.0,
      paymentMethod: 'PIX',
    },
    {
      id: 'apt_8',
      clientId: 'cli_4',
      clientName: 'Larissa Souza',
      clientPhone: '(11) 95555-4444',
      serviceId: 'svc_2',
      serviceName: 'Esmaltação em Gel',
      price: 65.0,
      duration: 45,
      date: dPast,
      time: '16:00',
      status: 'cancelado',
      notes: 'Cancelado pelo cliente com antecedência',
      signalPaid: false,
      signalAmount: 0,
    },
  ]
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

export const mockTransactions: MockTransaction[] = [
  {
    id: 'tx_1',
    date: 'Hoje, 09:45',
    clientName: 'Camila Rodrigues',
    serviceName: 'Sinal Pix - Alongamento em Gel',
    amount: 15.0,
    method: 'PIX',
    type: 'sinal',
  },
  {
    id: 'tx_2',
    date: 'Hoje, 10:15',
    clientName: 'Fernanda Lima',
    serviceName: 'Manutenção de Alongamento',
    amount: 90.0,
    method: 'PIX',
    type: 'servico',
  },
  {
    id: 'tx_3',
    date: 'Ontem, 16:30',
    clientName: 'Juliana Mendes',
    serviceName: 'Manicure e Pedicure Tradicional',
    amount: 55.0,
    method: 'CRÉDITO',
    type: 'servico',
  },
  {
    id: 'tx_4',
    date: 'Ontem, 14:10',
    clientName: 'Larissa Souza',
    serviceName: 'Óleo de Cutícula Fortalecedor',
    amount: 35.0,
    method: 'PIX',
    type: 'produto',
  },
  {
    id: 'tx_5',
    date: '28 Ago, 17:00',
    clientName: 'Mariana Costa',
    serviceName: 'Sinal Pix - Spa dos Pés',
    amount: 15.0,
    method: 'PIX',
    type: 'sinal',
  },
  {
    id: 'tx_6',
    date: '27 Ago, 11:20',
    clientName: 'Camila Rodrigues',
    serviceName: 'Blindagem de Diamante',
    amount: 80.0,
    method: 'DÉBITO',
    type: 'servico',
  },
]

// ---------- Financeiro Consolidado ----------
export const mockFinancial = {
  today: 285.0,
  week: 1420.0,
  month: 5680.0,
  growth: 18.5,
  averageTicket: 85.0,
  weeklyChart: [
    { day: 'Seg', value: 180 },
    { day: 'Ter', value: 240 },
    { day: 'Qua', value: 210 },
    { day: 'Qui', value: 310 },
    { day: 'Sex', value: 450 },
    { day: 'Sáb', value: 520 },
    { day: 'Dom', value: 0 },
  ],
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

export const mockSchedule: WeekdaySchedule[] = [
  { day: 'Segunda-feira', short: 'Seg', active: true, start: '09:00', end: '19:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Terça-feira', short: 'Ter', active: true, start: '09:00', end: '19:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Quarta-feira', short: 'Qua', active: true, start: '09:00', end: '19:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Quinta-feira', short: 'Qui', active: true, start: '09:00', end: '20:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Sexta-feira', short: 'Sex', active: true, start: '08:30', end: '20:30', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Sábado', short: 'Sáb', active: true, start: '08:00', end: '18:00', breakStart: '12:30', breakEnd: '13:30' },
  { day: 'Domingo', short: 'Dom', active: false, start: '09:00', end: '13:00', breakStart: '', breakEnd: '' },
]

// ---------- Portfólio Inicial ----------
export const mockPortfolio: { id: string; src: string; alt: string }[] = [
  {
    id: 'port_1',
    src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop&q=80',
    alt: 'Alongamento em Gel com Francesinha Fina',
  },
  {
    id: 'port_2',
    src: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=80',
    alt: 'Esmaltação Nude com Encapsulado',
  },
  {
    id: 'port_3',
    src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&auto=format&fit=crop&q=80',
    alt: 'Nail Art Floral Minimalista',
  },
  {
    id: 'port_4',
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    alt: 'Blindagem e Brilho Espelhado',
  },
]
