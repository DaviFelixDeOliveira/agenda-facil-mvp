import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

const hasDatabase = Boolean(process.env.DATABASE_URL && prisma)
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

const providers = [
  ...(googleClientId && googleClientSecret
    ? [
        GoogleProvider({
          clientId: googleClientId,
          clientSecret: googleClientSecret,
          allowDangerousEmailAccountLinking: true,
        }),
      ]
    : []),
  ...(prisma
    ? [
        CredentialsProvider({
          name: 'credentials',
          credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Senha', type: 'password' },
          },
          async authorize(credentials: any) {
            if (!credentials?.email || !credentials?.password || !prisma) return null

            const user = await prisma.user.findUnique({
              where: { email: credentials.email as string },
            })

            if (!user?.password) return null

            const isValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            )

            if (!isValid) return null

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              role: user.role,
            }
          },
        }),
      ]
    : []),
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: hasDatabase ? PrismaAdapter(prisma) : undefined,
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers,
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
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role ?? 'professional'
      }

      if (account?.provider) {
        token.provider = account.provider
      }

      return token
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.provider = token.provider as string
      }
      return session
    },
  },
})
