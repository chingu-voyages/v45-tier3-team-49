import { NextResponse } from 'next/server'
import prismaInstance from '../../../libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const petId = req.url?.slice(req.url.lastIndexOf('/') + 1)
  const petIdString = Array.isArray(petId) ? petId[0] : petId

  const healthInfo = await prismaInstance.pets.findUnique({
    where: { id: petIdString },
    include: {
      healthInfo: true
    }
  })

  if (!healthInfo?.healthInfo) {
    return NextResponse.json('No records for this pet yet!')
  } else {
    return NextResponse.json(healthInfo!.healthInfo)
  }
}
