import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismaInstance from '../../../utils/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaInstance),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        //hard coded for testing
        const user = { id: 1, name: "Harr", email: "harr@gmail.com"}
        return user;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  debug: process.env.NODE_ENV === 'development',
  
};

export default NextAuth(authOptions);
