"use client"
import {
  Card,
  Typography,
  Alert,
  Select,
  Option,
} from "@/components/MaterialComponents"
import { Airport } from "@prisma/client"
import { useState, useEffect } from "react"

export default function Example() {
  const [resCode, setResCode] = useState<string | null>(null)
  const [airportName, setAirportName] = useState<string | null | undefined>(
    null
  )
  const [airports, setAirports] = useState<Airport[] | null>(null)

  useEffect(() => {
    async function loadAirports() {
      if (!airports) {
        const res = await fetch("/api/airports")
        const data = res.json()
        const _airports = (await data) as Airport[]
        setAirports(_airports)
        setAirportName(_airports.at(0)?.name)
      }
      // console.log(airports)
    }
    void loadAirports()
  }, [resCode])

  const handleAirportAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(airportName)
    const res = await fetch("/api/airports", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: airportName }),
    })
    // console.log(res.status)
    setResCode(res.status.toString())
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Card color="transparent" shadow={false} className="text-foreground">
        <Typography variant="h4">Delete Airport</Typography>
        <Typography color="white" className="mt-1 font-normal">
          Select the required details
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleAirportAdd}
        >
          {airports ? (
            <>
              <div className="mb-4 flex flex-col gap-6">
                <Select
                  label="Airport Name"
                  value={airports.at(0)?.name}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  onChange={(e) => setAirportName(e)}
                >
                  {airports.map(({ name }) => (
                    <Option value={name}> {name} </Option>
                  ))}
                </Select>
              </div>
              <button className="mt-6 middle none center w-full rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Delete
              </button>
            </>
          ) : (
            <div className="block items-center text-foreground">Loading...</div>
          )}
        </form>
        {resCode ? (
          resCode == "204" ? (
            <Alert color="green">Deleted Sucessfully</Alert>
          ) : resCode == "P2025" ? (
            <Alert color="red">No Such Airport Found</Alert>
          ) : (
            <Alert color="red">Internal Server Error</Alert>
          )
        ) : null}
      </Card>
    </div>
  )
}
