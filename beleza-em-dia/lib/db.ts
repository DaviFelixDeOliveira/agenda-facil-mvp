import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

export const prisma: PrismaClient | null =
  globalForPrisma.prisma ??
  (() => {
    try {
      const client = new PrismaClient()
      if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = client
      }
      return client
    } catch {
      return null
    }
  })()

export function isDatabaseReady() {
  return Boolean(prisma && process.env.DATABASE_URL)
}
