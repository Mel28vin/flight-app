import { prisma } from "@/server/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const users = await prisma.flightLeg.findMany({
    where: {
      status: 1,
    },
  })
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const json = await request.json()

  const users = await prisma.flightLeg.findMany({
    where: json,
  })
  return NextResponse.json(users)
}

export async function DELETE(request: Request) {
  try {
    const json = await request.json()
    await prisma.flightLeg.update({
      where: {
        flight_number_scheduled_departure_date: json,
      },
      data: { status: 0 },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No flight with the details found", {
        status: 404,
      })
    }

    return new NextResponse(error.message, { status: 500 })
  }
}
