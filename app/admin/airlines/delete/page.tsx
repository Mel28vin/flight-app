"use client"
import {
  Card,
  Typography,
  Alert,
  Select,
  Option,
} from "@/components/MaterialComponents"
import { Airline } from "@prisma/client"
import { useState, useEffect } from "react"

export default function Example() {
  const [resCode, setResCode] = useState<string | null>(null)
  const [airlineName, setAirlineName] = useState<string | null | undefined>(
    null
  )
  const [airlines, setAirlines] = useState<Airline[] | null>(null)

  useEffect(() => {
    async function loadAirlines() {
      if (!airlines) {
        const res = await fetch("/api/airlines")
        const data = res.json()
        const _airlines = (await data) as Airline[]
        setAirlines(_airlines)
        setAirlineName(_airlines.at(0)?.airline_name)
      }
    }
    void loadAirlines()
  })

  const handleAirlineAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/api/airlines", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ airline_name: airlineName }),
    })
    setResCode(res.status.toString())
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Card color="transparent" shadow={false} className="text-foreground">
        <Typography variant="h4">Delete Airline</Typography>
        <Typography color="white" className="mt-1 font-normal">
          Select the required details
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleAirlineAdd}
        >
          {airlines ? (
            <>
              <div className="mb-4 flex flex-col gap-6">
                <Select
                  label="Airline Name"
                  value={airlines.at(0)?.airline_name}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  onChange={(e) => setAirlineName(e)}
                >
                  {airlines.map(({ airline_name }) => (
                    <Option value={airline_name}> {airline_name} </Option>
                  ))}
                </Select>
              </div>
              <button className="mt-6 middle none center w-full rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Delete
              </button>
            </>
          ) : null}
        </form>
        {resCode ? (
          resCode == "204" ? (
            <Alert color="green">Deleted Sucessfully</Alert>
          ) : resCode == "P2025" ? (
            <Alert color="red">No Such Airline Found</Alert>
          ) : (
            <Alert color="red">Internal Server Error</Alert>
          )
        ) : null}
      </Card>
    </div>
  )
}
