import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prismaInstance from '../../../libs/prisma'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaInstance),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    //Google Provider is not currently working. Will revisit - current error below
    // [next-auth][error][OAUTH_CALLBACK_HANDLER_ERROR]
    // https://next-auth.js.org/errors#oauth_callback_handler_error
    // Cannot read properties of undefined (reading 'findUnique')
    // TypeError: Cannot read properties of undefined (reading 'findUnique')
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        const user = await prismaInstance.users.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.password) {
          throw new Error('No user found')
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          throw new Error('incorrect password')
        }

        return user
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV === 'development'
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
