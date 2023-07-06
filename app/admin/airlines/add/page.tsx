"use client"
import { Card, Input, Typography, Alert } from "@/components/MaterialComponents"
import { useState } from "react"

export default function Example() {
  const [name, setName] = useState("")
  const [resCode, setResCode] = useState<string | null>(null)

  const handleAirlineAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResCode(null)
    const res = await fetch("/api/airlines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        airline_name: name,
      }),
    })
    setResCode(res.status.toString())
    console.log(res.status)
  }

  return (
    <Card color="transparent" shadow={false} className="text-foreground">
      <Typography variant="h4">Add Airline</Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleAirlineAdd}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Airline Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="mt-6 middle none center w-full rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          {" "}
          Submit
        </button>
      </form>
      {resCode ? (
        resCode == "201" ? (
          <Alert color="green">Added Sucessfully</Alert>
        ) : resCode == "409" ? (
          <Alert color="red">Cannot add duplicates!</Alert>
        ) : (
          <Alert color="red">Internal Server Error</Alert>
        )
      ) : null}
    </Card>
  )
}
