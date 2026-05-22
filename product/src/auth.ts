import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { authDb } from '@/lib/auth-db';
import bcrypt from 'bcryptjs';

// Extend the session and JWT types to include our custom fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      targetLevel: number;
      subscriptionTier: string;
    } & {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    targetLevel?: number;
    subscriptionTier?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    targetLevel: number;
    subscriptionTier: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        const user = await authDb.getUserByEmail(credentials.email as string);
        if (!user || !(await bcrypt.compare(credentials.password as string, user.password || ''))) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-id',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.name = user.name;
        token.email = user.email;
        
        const dbUser = await authDb.getUserById(user.id as string);
        if (dbUser) {
          token.targetLevel = dbUser.targetLevel;
          token.subscriptionTier = dbUser.subscriptionTier;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.targetLevel = token.targetLevel;
        session.user.subscriptionTier = token.subscriptionTier;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  session: {
    strategy: 'jwt',
  },
});
