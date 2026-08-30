export interface AppointmentType {
  id: string
  date: string
  time: string
  clientName: string
  clientId: string
  serviceName: string
  serviceId: string
  price: number
  duration: number
  status: 'confirmado' | 'pendente' | 'finalizado' | 'cancelado'
  paymentMode: string
}

export interface ClientType {
  id: string
  name: string
  phone: string | null
  visits: number
  avgTicket: number
  notes: string | null
  lastVisit: string | null
}

export interface ServiceType {
  id: string
  name: string
  price: number
  duration: number
  active: boolean
}

export interface TransactionType {
  id: string
  date: string
  description: string
  value: number
  type: string
}

export interface ChartDataType {
  d: string
  v: number
}

export interface NavItem {
  id: string
  label: string
  href: string
  icon: string
}
