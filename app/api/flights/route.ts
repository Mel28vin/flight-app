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

    if (json.departure_airport_name == json.arrival_airport_name) {
      return new NextResponse(
        "Cannot have same places as departure and destination",
        {
          status: 400,
        }
      )
    }
    const user = await prisma.flightLeg.create({
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

export async function DELETE(request: Request) {
  try {
    const json = await request.json()
    await prisma.flightLeg.update({
      where: json,
      data: { status: 0 },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No airport with name found", { status: 404 })
    }

    return new NextResponse(error.message, { status: 500 })
  }
}
