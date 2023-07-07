"use client"
import { Card, Input, Typography, Alert } from "@/components/MaterialComponents"
import { useState } from "react"

export default function Example() {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [resCode, setResCode] = useState<string | null>(null)

  const handleAirportAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResCode(null)
    const res = await fetch("/api/airports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        airport_code: code,
        city: city,
        state: state,
      }),
    })
    setResCode(res.status.toString())
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Card color="transparent" shadow={false} className="text-foreground">
        <Typography variant="h4">Add Airport</Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleAirportAdd}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Airport Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="lg"
              label="Airport Code"
              required
              onChange={(e) => setCode(e.target.value)}
            />
            <Input
              size="lg"
              label="City"
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              size="lg"
              label="State"
              required
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <button className="mt-6 middle none center w-full rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
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
    </div>
  )
}
