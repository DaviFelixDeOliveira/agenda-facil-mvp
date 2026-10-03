import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string;
      provider?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role?: string;
    googleImage?: string | null;
    termsAcceptedAt?: Date | null;
    privacyAcceptedAt?: Date | null;
    onboardingCompletedAt?: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    provider?: string;
  }
}
