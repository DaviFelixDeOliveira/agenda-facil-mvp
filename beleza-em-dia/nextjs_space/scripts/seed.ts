import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hidden test account
  const testPassword = await bcrypt.hash('SBc@2oGv5a', 10)
  const testUser = await prisma.user.upsert({
    where: { email: 'abacus-b5b87ba2@example.com' },
    update: {},
    create: {
      email: 'abacus-b5b87ba2@example.com',
      password: testPassword,
      name: 'Admin Teste',
      role: 'admin',
      businessName: 'Estúdio Beleza em Dia',
    },
  })

  // Demo professional account
  const demoPassword = await bcrypt.hash('beleza123', 10)
  const demoUser = await prisma.user.upsert({
    where: { email: 'profissional@belezaemdia.com' },
    update: {},
    create: {
      email: 'profissional@belezaemdia.com',
      password: demoPassword,
      name: 'Marina Silva',
      role: 'professional',
      businessName: 'Estúdio Marina',
      businessPhone: '(11) 98765-4321',
      businessAddress: 'Rua das Flores, 123 - São Paulo',
    },
  })

  // Seed clients for demo user
  const clientsData = [
    { name: 'Ana Beatriz Souza', phone: '(11) 98877-1234', visits: 12, avgTicket: 88, notes: 'Alergia a acetona. Prefere tons nude.' },
    { name: 'Carla Mendes', phone: '(11) 99432-8890', visits: 4, avgTicket: 210, notes: 'Cliente de progressiva mensal.' },
    { name: 'Juliana Prado', phone: '(11) 97654-3321', visits: 8, avgTicket: 72, notes: 'Sempre atrasa ~10min.' },
    { name: 'Renata Lima', phone: '(11) 96543-1100', visits: 2, avgTicket: 45, notes: '' },
    { name: 'Fernanda Dias', phone: '(11) 98123-4567', visits: 6, avgTicket: 145, notes: 'Gosta de nail art detalhada.' },
  ]

  const clients: any[] = []
  for (const c of clientsData) {
    const client = await prisma.client.upsert({
      where: { id: `seed-client-${c.name.replace(/\s/g, '-').toLowerCase()}` },
      update: { visits: c.visits, avgTicket: c.avgTicket, notes: c.notes },
      create: {
        id: `seed-client-${c.name.replace(/\s/g, '-').toLowerCase()}`,
        name: c.name,
        phone: c.phone,
        visits: c.visits,
        avgTicket: c.avgTicket,
        notes: c.notes,
        lastVisit: new Date(),
        userId: demoUser.id,
      },
    })
    clients.push(client)
  }

  // Seed services
  const servicesData = [
    { name: 'Manicure em Gel', price: 90, duration: 60, active: true },
    { name: 'Pé + Mão', price: 70, duration: 90, active: true },
    { name: 'Alongamento de Unhas', price: 150, duration: 120, active: true },
    { name: 'Design de Sobrancelha', price: 45, duration: 30, active: true },
    { name: 'Esmaltação Simples', price: 40, duration: 40, active: false },
    { name: 'Escova Progressiva', price: 220, duration: 120, active: true },
    { name: 'Corte + Hidratação', price: 130, duration: 75, active: true },
  ]

  const services: any[] = []
  for (const s of servicesData) {
    const service = await prisma.service.upsert({
      where: { id: `seed-service-${s.name.replace(/\s/g, '-').toLowerCase()}` },
      update: { price: s.price, duration: s.duration, active: s.active },
      create: {
        id: `seed-service-${s.name.replace(/\s/g, '-').toLowerCase()}`,
        name: s.name,
        price: s.price,
        duration: s.duration,
        active: s.active,
        userId: demoUser.id,
      },
    })
    services.push(service)
  }

  // Seed appointments
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const appointmentsData = [
    { date: today, time: '09:00', clientIdx: 0, serviceIdx: 0, status: 'confirmado', paymentMode: 'Sinal Pix' },
    { date: today, time: '10:30', clientIdx: 1, serviceIdx: 5, status: 'pendente', paymentMode: 'Sem sinal' },
    { date: today, time: '13:00', clientIdx: 2, serviceIdx: 1, status: 'confirmado', paymentMode: 'Sinal Pix' },
    { date: today, time: '15:00', clientIdx: 3, serviceIdx: 3, status: 'finalizado', paymentMode: 'Integral' },
    { date: today, time: '16:30', clientIdx: 4, serviceIdx: 6, status: 'cancelado', paymentMode: 'Sem sinal' },
    { date: tomorrow, time: '09:30', clientIdx: 4, serviceIdx: 2, status: 'confirmado', paymentMode: 'Sinal Pix' },
    { date: tomorrow, time: '14:00', clientIdx: 0, serviceIdx: 4, status: 'pendente', paymentMode: 'Sem sinal' },
  ]

  for (let i = 0; i < appointmentsData.length; i++) {
    const a = appointmentsData[i]
    const client = clients[a.clientIdx]
    const service = services[a.serviceIdx]
    if (!client || !service) continue
    await prisma.appointment.upsert({
      where: { id: `seed-appt-${i}` },
      update: { status: a.status, date: a.date },
      create: {
        id: `seed-appt-${i}`,
        date: a.date,
        time: a.time,
        status: a.status,
        paymentMode: a.paymentMode,
        price: service.price,
        duration: service.duration,
        clientId: client.id,
        serviceId: service.id,
        userId: demoUser.id,
      },
    })
  }

  // Seed transactions
  const txData = [
    { date: '30/08', description: 'Manicure em Gel — Ana B.', value: 90, type: 'servico' },
    { date: '30/08', description: 'Sinal Pix — Juliana P.', value: 30, type: 'sinal' },
    { date: '29/08', description: 'Escova — Carla M.', value: 220, type: 'servico' },
    { date: '29/08', description: 'Venda esmalte (produto)', value: 28, type: 'produto' },
    { date: '28/08', description: 'Sinal retido (no-show)', value: 30, type: 'sinal' },
  ]

  for (let i = 0; i < txData.length; i++) {
    const t = txData[i]
    await prisma.transaction.upsert({
      where: { id: `seed-tx-${i}` },
      update: {},
      create: {
        id: `seed-tx-${i}`,
        date: t.date,
        description: t.description,
        value: t.value,
        type: t.type,
        userId: demoUser.id,
      },
    })
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
