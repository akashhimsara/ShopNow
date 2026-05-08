import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const providers: Provider[] = [];

// OAuth providers (GitHub, Google) - only add when env vars are present
if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  );
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// Credentials (email + password) provider
providers.push(
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      const user = await prisma.user.findUnique({ where: { email: credentials.email } });
      if (!user || !user.password) return null;

      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) return null;

      // Return a user object - NextAuth will store user.id in the session
      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
      };
    },
  })
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
  },
  providers,
  pages: {
    signIn: '/login',
  },
});
