// =============================================
// MOCK DATA - Beleza em Dia (Protótipo Front-end)
// Dados fictícios brasileiros para simulação
// =============================================

// ---------- Profissional ----------
export const mockProfessional = {
  id: 'prof-001',
  name: 'Bia Silva',
  studioName: 'Studio Bia Nails',
  specialty: 'Nail Art & Estética',
  email: 'bia@studiobian.com.br',
  phone: '11999887766',
  phoneFormatted: '(11) 99988-7766',
  bio: 'Especialista em nail art, manicure e pedicure há 8 anos. Atendo com carinho e dedicação no meu studio em São Paulo. ✨💅',
  avatar: '/logo.png',
  address: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
  cnpj: '12.345.678/0001-90',
  slug: 'bia-silva',
  publicUrl: 'https://belezaemdia.com.br/bia-silva',
  domicilio: false,
  pixSinal: true,
  pixSinalValor: 30,
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

export const mockServices: MockService[] = [
  { id: 'srv-001', name: 'Manicure Tradicional', price: 35, duration: 45, icon: 'Sparkles', category: 'Mãos', active: true },
  { id: 'srv-002', name: 'Pedicure Completa', price: 45, duration: 50, icon: 'Footprints', category: 'Pés', active: true },
  { id: 'srv-003', name: 'Nail Art Premium', price: 80, duration: 60, icon: 'Palette', category: 'Mãos', active: true },
  { id: 'srv-004', name: 'Corte e Escova', price: 120, duration: 60, icon: 'Scissors', category: 'Cabelo', active: true },
  { id: 'srv-005', name: 'Coloração + Hidratação', price: 250, duration: 90, icon: 'Droplets', category: 'Cabelo', active: true },
  { id: 'srv-006', name: 'Design de Sobrancelhas', price: 45, duration: 30, icon: 'Eye', category: 'Rosto', active: true },
  { id: 'srv-007', name: 'Esmaltação em Gel', price: 65, duration: 50, icon: 'Gem', category: 'Mãos', active: true },
  { id: 'srv-008', name: 'Limpeza de Pele', price: 90, duration: 60, icon: 'Heart', category: 'Rosto', active: false },
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
  { id: 'cli-001', name: 'Maria Costa', email: 'maria.costa@email.com', phone: '11987654321', phoneFormatted: '(11) 98765-4321', notes: 'Prefere esmalte claro. Alérgica a acetona pura.', totalVisits: 12, averageTicket: 150, lastVisit: '2026-08-28', createdAt: '2025-03-15' },
  { id: 'cli-002', name: 'Ana Oliveira', email: 'ana.oliveira@email.com', phone: '11976543210', phoneFormatted: '(11) 97654-3210', notes: 'Cliente fiel. Gosta de nail art temática.', totalVisits: 24, averageTicket: 85, lastVisit: '2026-08-30', createdAt: '2024-11-20' },
  { id: 'cli-003', name: 'Camila Souza', email: 'camila.souza@email.com', phone: '11965432109', phoneFormatted: '(11) 96543-2109', notes: 'Atende apenas aos sábados. Prefere horários de manhã.', totalVisits: 6, averageTicket: 120, lastVisit: '2026-08-24', createdAt: '2026-04-10' },
  { id: 'cli-004', name: 'Juliana Pereira', email: 'juliana.p@email.com', phone: '11954321098', phoneFormatted: '(11) 95432-1098', notes: 'Gosta de cores vibrantes e pedrarias.', totalVisits: 18, averageTicket: 95, lastVisit: '2026-08-29', createdAt: '2025-06-01' },
  { id: 'cli-005', name: 'Fernanda Lima', email: 'fernanda.l@email.com', phone: '11943210987', phoneFormatted: '(11) 94321-0987', notes: 'Nova cliente. Indicação da Maria Costa.', totalVisits: 2, averageTicket: 65, lastVisit: '2026-08-27', createdAt: '2026-08-10' },
  { id: 'cli-006', name: 'Beatriz Santos', email: 'bia.santos@email.com', phone: '11932109876', phoneFormatted: '(11) 93210-9876', notes: 'Faz mani e pedi juntas. Sempre traz a filha.', totalVisits: 9, averageTicket: 130, lastVisit: '2026-08-25', createdAt: '2025-12-15' },
  { id: 'cli-007', name: 'Patrícia Almeida', email: 'patricia.a@email.com', phone: '11921098765', phoneFormatted: '(11) 92109-8765', notes: 'Cutícula sensível, usar creme extra.', totalVisits: 15, averageTicket: 75, lastVisit: '2026-08-26', createdAt: '2025-01-20' },
  { id: 'cli-008', name: 'Larissa Mendes', email: 'larissa.m@email.com', phone: '11910987654', phoneFormatted: '(11) 91098-7654', notes: '', totalVisits: 3, averageTicket: 200, lastVisit: '2026-08-20', createdAt: '2026-07-05' },
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
  paymentMethod?: string
}

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function getDateOffset(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export function generateMockAppointments(): MockAppointment[] {
  const today = getToday()
  return [
    // --- HOJE ---
    { id: 'apt-001', clientId: 'cli-001', clientName: 'Maria Costa', clientPhone: '11987654321', serviceId: 'srv-001', serviceName: 'Manicure Tradicional', price: 35, duration: 45, date: today, time: '09:00', status: 'finalizado', notes: 'Esmalte nude', signalPaid: true, signalAmount: 30, paymentMethod: 'PIX' },
    { id: 'apt-002', clientId: 'cli-002', clientName: 'Ana Oliveira', clientPhone: '11976543210', serviceId: 'srv-003', serviceName: 'Nail Art Premium', price: 80, duration: 60, date: today, time: '10:00', status: 'finalizado', notes: 'Tema floral', signalPaid: true, signalAmount: 30, paymentMethod: 'CRÉDITO' },
    { id: 'apt-003', clientId: 'cli-004', clientName: 'Juliana Pereira', clientPhone: '11954321098', serviceId: 'srv-004', serviceName: 'Corte e Escova', price: 120, duration: 60, date: today, time: '11:30', status: 'confirmado', notes: '', signalPaid: true, signalAmount: 30 },
    { id: 'apt-004', clientId: 'cli-003', clientName: 'Camila Souza', clientPhone: '11965432109', serviceId: 'srv-005', serviceName: 'Coloração + Hidratação', price: 250, duration: 90, date: today, time: '14:00', status: 'confirmado', notes: 'Luzes mel', signalPaid: true, signalAmount: 30 },
    { id: 'apt-005', clientId: 'cli-006', clientName: 'Beatriz Santos', clientPhone: '11932109876', serviceId: 'srv-002', serviceName: 'Pedicure Completa', price: 45, duration: 50, date: today, time: '16:00', status: 'pendente', notes: '', signalPaid: false, signalAmount: 0 },
    { id: 'apt-006', clientId: 'cli-005', clientName: 'Fernanda Lima', clientPhone: '11943210987', serviceId: 'srv-006', serviceName: 'Design de Sobrancelhas', price: 45, duration: 30, date: today, time: '17:00', status: 'pendente', notes: 'Primeira vez', signalPaid: false, signalAmount: 0 },
    { id: 'apt-007', clientId: 'cli-007', clientName: 'Patrícia Almeida', clientPhone: '11921098765', serviceId: 'srv-007', serviceName: 'Esmaltação em Gel', price: 65, duration: 50, date: today, time: '18:00', status: 'confirmado', notes: 'Cor: rosa clássico', signalPaid: true, signalAmount: 30 },
    { id: 'apt-008', clientId: 'cli-008', clientName: 'Larissa Mendes', clientPhone: '11910987654', serviceId: 'srv-001', serviceName: 'Manicure Tradicional', price: 35, duration: 45, date: today, time: '09:30', status: 'cancelado', notes: 'Cancelou por doença', signalPaid: true, signalAmount: 30 },
    // --- AMANHÃ ---
    { id: 'apt-009', clientId: 'cli-002', clientName: 'Ana Oliveira', clientPhone: '11976543210', serviceId: 'srv-001', serviceName: 'Manicure Tradicional', price: 35, duration: 45, date: getDateOffset(1), time: '09:00', status: 'confirmado', notes: '', signalPaid: true, signalAmount: 30 },
    { id: 'apt-010', clientId: 'cli-001', clientName: 'Maria Costa', clientPhone: '11987654321', serviceId: 'srv-005', serviceName: 'Coloração + Hidratação', price: 250, duration: 90, date: getDateOffset(1), time: '10:30', status: 'pendente', notes: 'Platinado', signalPaid: false, signalAmount: 0 },
    { id: 'apt-011', clientId: 'cli-004', clientName: 'Juliana Pereira', clientPhone: '11954321098', serviceId: 'srv-003', serviceName: 'Nail Art Premium', price: 80, duration: 60, date: getDateOffset(1), time: '14:00', status: 'confirmado', notes: 'Tema borboletas', signalPaid: true, signalAmount: 30 },
    // --- DEPOIS DE AMANHÃ ---
    { id: 'apt-012', clientId: 'cli-003', clientName: 'Camila Souza', clientPhone: '11965432109', serviceId: 'srv-002', serviceName: 'Pedicure Completa', price: 45, duration: 50, date: getDateOffset(2), time: '10:00', status: 'pendente', notes: '', signalPaid: false, signalAmount: 0 },
    { id: 'apt-013', clientId: 'cli-006', clientName: 'Beatriz Santos', clientPhone: '11932109876', serviceId: 'srv-001', serviceName: 'Manicure Tradicional', price: 35, duration: 45, date: getDateOffset(2), time: '15:00', status: 'confirmado', notes: '', signalPaid: true, signalAmount: 30 },
    // --- ONTEM (passado) ---
    { id: 'apt-014', clientId: 'cli-007', clientName: 'Patrícia Almeida', clientPhone: '11921098765', serviceId: 'srv-004', serviceName: 'Corte e Escova', price: 120, duration: 60, date: getDateOffset(-1), time: '09:00', status: 'finalizado', notes: '', signalPaid: true, signalAmount: 30, paymentMethod: 'DÉBITO' },
    { id: 'apt-015', clientId: 'cli-002', clientName: 'Ana Oliveira', clientPhone: '11976543210', serviceId: 'srv-006', serviceName: 'Design de Sobrancelhas', price: 45, duration: 30, date: getDateOffset(-1), time: '11:00', status: 'finalizado', notes: '', signalPaid: true, signalAmount: 30, paymentMethod: 'PIX' },
    { id: 'apt-016', clientId: 'cli-005', clientName: 'Fernanda Lima', clientPhone: '11943210987', serviceId: 'srv-001', serviceName: 'Manicure Tradicional', price: 35, duration: 45, date: getDateOffset(-1), time: '14:00', status: 'finalizado', notes: '', signalPaid: false, signalAmount: 0, paymentMethod: 'DINHEIRO' },
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
  { id: 'tx-001', date: getDateOffset(0), clientName: 'Maria Costa', serviceName: 'Manicure Tradicional', amount: 35, method: 'PIX', type: 'servico' },
  { id: 'tx-002', date: getDateOffset(0), clientName: 'Ana Oliveira', serviceName: 'Nail Art Premium', amount: 80, method: 'CRÉDITO', type: 'servico' },
  { id: 'tx-003', date: getDateOffset(-1), clientName: 'Patrícia Almeida', serviceName: 'Corte e Escova', amount: 120, method: 'DÉBITO', type: 'servico' },
  { id: 'tx-004', date: getDateOffset(-1), clientName: 'Ana Oliveira', serviceName: 'Design de Sobrancelhas', amount: 45, method: 'PIX', type: 'servico' },
  { id: 'tx-005', date: getDateOffset(-1), clientName: 'Fernanda Lima', serviceName: 'Manicure Tradicional', amount: 35, method: 'DINHEIRO', type: 'servico' },
  { id: 'tx-006', date: getDateOffset(-2), clientName: 'Camila Souza', serviceName: 'Coloração + Hidratação', amount: 250, method: 'PIX', type: 'servico' },
  { id: 'tx-007', date: getDateOffset(-2), clientName: 'Juliana Pereira', serviceName: 'Nail Art Premium', amount: 80, method: 'CRÉDITO', type: 'servico' },
  { id: 'tx-008', date: getDateOffset(-3), clientName: 'Maria Costa', serviceName: 'Pedicure Completa', amount: 45, method: 'PIX', type: 'servico' },
  { id: 'tx-009', date: getDateOffset(-3), clientName: 'Beatriz Santos', serviceName: 'Manicure Tradicional', amount: 35, method: 'DINHEIRO', type: 'servico' },
  { id: 'tx-010', date: getDateOffset(-4), clientName: 'Larissa Mendes', serviceName: 'Esmaltação em Gel', amount: 65, method: 'CRÉDITO', type: 'servico' },
]

// ---------- Financeiro Consolidado ----------
export const mockFinancial = {
  today: 840,
  week: 3250,
  month: 14580,
  growth: 12.5,
  averageTicket: 185,
  weeklyChart: [
    { day: 'Seg', value: 420 },
    { day: 'Ter', value: 350 },
    { day: 'Qua', value: 680 },
    { day: 'Qui', value: 520 },
    { day: 'Sex', value: 440 },
    { day: 'Sáb', value: 840 },
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
  { day: 'Segunda', short: 'SEG', active: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Terça', short: 'TER', active: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Quarta', short: 'QUA', active: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Quinta', short: 'QUI', active: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Sexta', short: 'SEX', active: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' },
  { day: 'Sábado', short: 'SÁB', active: true, start: '09:00', end: '14:00', breakStart: '', breakEnd: '' },
  { day: 'Domingo', short: 'DOM', active: false, start: '', end: '', breakStart: '', breakEnd: '' },
]

// ---------- Portfólio ----------
export const mockPortfolio = [
  { id: 'pf-001', src: '/carousel/carousel-close.png', alt: 'Nail art detalhada' },
  { id: 'pf-002', src: '/carousel/carousel-extre.png', alt: 'Manicure premium' },
  { id: 'pf-003', src: '/carousel/carousel-intim.png', alt: 'Design artístico' },
  { id: 'pf-004', src: '/carousel/carousel-over-.png', alt: 'Trabalho finalizado' },
]
