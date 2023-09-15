import { NextResponse } from 'next/server'
import prismaInstance from '../../../libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next';





export default async function getAll (req : NextApiRequest, res : NextApiResponse) {

    const userId = req.query;

    const allPets = await prismaInstance.pets.findMany({
        where: { userId },
        include: {
            healthInfo : true,
        },
    })

    const allHealthRecords = allPets.map((record : any) => {
        petId : record.id,
        healthInfo: record.healthInfo,
    })


    return NextResponse.json(allHealthRecords);

}