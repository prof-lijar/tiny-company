import NextAuth from 'next-auth';
import { AuthConfig } from 'next-auth';
import { authDb } from '@/lib/auth-db';

export const authOptions: AuthConfig = {
  providers: [
    // We'll implement the logic in the authorize callback for credentials provider
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        // We'll add targetLevel and subscriptionTier to the token
        // In a real app, these would be come from the database
        const dbUser = await authDb.getUserById(user.id as string);
        if (dbUser) {
          token.targetLevel = dbUser.targetLevel;
          token.subscriptionTier = dbUser.subscriptionTier;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
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
};
