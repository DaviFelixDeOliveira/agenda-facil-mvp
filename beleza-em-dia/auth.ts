import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db'
import { authConfig } from './auth.config'

const hasDatabase = Boolean(process.env.DATABASE_URL && prisma)

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: hasDatabase ? PrismaAdapter(prisma) : undefined,
  events: {
    async signIn({ user, account, profile }: any) {
      if (!prisma || account?.provider !== 'google' || !profile?.picture || !user?.id) {
        return
      }

      await prisma.user
        .update({
          where: { id: user.id },
          data: { googleImage: profile.picture as string },
        })
        .catch(() => {})
    },
  },
})
