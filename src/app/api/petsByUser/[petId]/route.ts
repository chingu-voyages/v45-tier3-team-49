import { NextResponse } from "next/server";
import prismaInstance from '../../../libs/prisma'
import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession()
  const petId  = req.url?.slice(req.url.lastIndexOf('/') + 1)

  if (!session) return NextResponse.error()

  const petIdString = Array.isArray(petId) ? petId[0] : petId

  const petInfo = await prismaInstance.pets.findUnique({
    where: { id: petIdString },
    include: {
      physicalChar: true,
      healthInfo: true,
      diet: true,
      grooming: true,
      note: true,
      PetInsuranceVet: {
        include: {
          vet: true,
          insurance: true
        }
      }
    }
  })

  if(!petInfo) {
    return NextResponse.error()
  }

  return NextResponse.json(petInfo)
}