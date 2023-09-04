import { NextResponse } from "next/server";
import prismaInstance from "utils/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session) return NextResponse.error()


  const petsByUser = await prismaInstance.users.findMany({
    where: { email: session?.user?.email || "" },
    select: { pet: true }
  })

  console.log(petsByUser)
  return NextResponse.json(petsByUser)
}