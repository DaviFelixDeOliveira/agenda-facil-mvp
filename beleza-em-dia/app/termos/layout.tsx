import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

export default async function TermosLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/login')
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            termsAcceptedAt: true,
            privacyAcceptedAt: true,
            onboardingCompletedAt: true,
        },
    })

    if (!user) {
        redirect('/login')
    }

    const termsCompleted =
        Boolean(user.termsAcceptedAt) &&
        Boolean(user.privacyAcceptedAt)

    if (termsCompleted) {
        if (!user.onboardingCompletedAt) {
            redirect('/onboarding')
        }

        redirect('/dashboard')
    }

    return children
}
