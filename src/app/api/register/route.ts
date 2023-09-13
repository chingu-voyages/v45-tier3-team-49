import bcrypt from 'bcrypt'
import prismaInstance from '../../libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { username, email, password } = request.body || {}

    if (!email || !password) {
      return response.status(400).json('Missing fields!')
    }

    const userExists = await prismaInstance.users.findUnique({
      where: {
        email
      }
    })

    if (userExists) {
      throw new Error('A user already exists with this email')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prismaInstance.users.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    return response.status(200).json(user)
  } catch (error) {
    console.error('Error in POST request:', error)
    return response.status(500).json('Internal Server Error')
  }
}
