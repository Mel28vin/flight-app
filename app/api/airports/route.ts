import { prisma } from "@/server/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const user = await prisma.airport.create({
      data: json,
    })

    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("Airport with same credentials exist", {
        status: 409,
      })
    }
    return new NextResponse(error.message, { status: 500 })
  }
}
