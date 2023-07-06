import { prisma } from "@/server/db"
import { NextResponse } from "next/server"

export async function GET(_request: Request) {
  const users = await prisma.legInstance.findMany({
    where: {
      status: 1,
    },
  })
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const inputDate = new Date(json.leg_date)
    const currDate = new Date()
    if (inputDate < currDate) {
      return new NextResponse("Date cannot be in the past", {
        status: 400,
      })
    }

    const user = await prisma.legInstance.create({
      data: json,
    })

    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("Schedule with same credentials exist", {
        status: 409,
      })
    }
    return new NextResponse(error.message, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const json = await request.json()
    await prisma.legInstance.update({
      where: json,
      data: { status: 0 },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No schedule with name found", { status: 404 })
    }

    return new NextResponse(error.message, { status: 500 })
  }
}
