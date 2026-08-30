import { NavItem } from '@/lib/types'

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'agenda', label: 'Agenda', href: '/agenda', icon: 'CalendarDays' },
  { id: 'clientes', label: 'Clientes', href: '/clientes', icon: 'Users' },
  { id: 'financeiro', label: 'Financeiro', href: '/financeiro', icon: 'Wallet' },
  { id: 'perfil', label: 'Perfil', href: '/perfil', icon: 'Store' },
  { id: 'config', label: 'Config.', href: '/configuracoes', icon: 'Settings' },
]
