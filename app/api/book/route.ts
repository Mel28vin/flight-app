import { prisma } from "@/server/db"
import { NextResponse } from "next/server"

export async function GET(_request: Request) {
  const users = await prisma.flightLeg.findMany({
    where: {
      status: 1,
    },
  })
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const user = await prisma.reservation.create({
      data: json,
    })

    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("Flight with same credentials exist", {
        status: 409,
      })
    }
    return new NextResponse(error.message, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const json = await request.json()
    await prisma.flightLeg.update({
      where: {
        flight_number_scheduled_departure_date: {
          flight_number: json.flight_number,
          scheduled_departure_date: json.scheduled_departure_date,
        },
      },
      data: { max_seats: json.max_seats - 1 },
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
