"use client"
import {
  Card,
  Typography,
  Alert,
  Select,
  Option,
  Input,
} from "@/components/MaterialComponents"
import { FlightLeg } from "@prisma/client"
import { useState, useEffect } from "react"

export default function FlightDelete() {
  const [resCode, setResCode] = useState<string | null>(null)
  const [flightNum, setFlightNum] = useState<string | null | undefined>(null)
  const [inputDate, setInputDate] = useState<string>("")
  const [flights, setFlights] = useState<FlightLeg[] | null>(null)

  useEffect(() => {
    async function loadFlights() {
      if (!flights) {
        const res = await fetch("/api/flights")
        const data = res.json()
        const _flights = (await data) as FlightLeg[]
        setFlights(_flights)
        setFlightNum(_flights.at(0)?.flight_number)
      }
    }
    void loadFlights()
  })

  const handleFlightRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/api/flights", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flight_number: flightNum,
        scheduled_departure_date: inputDate,
      }),
    })
    setResCode(res.status.toString())
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Card color="transparent" shadow={false} className="text-foreground">
        <Typography variant="h4">Delete Flight</Typography>
        <Typography color="white" className="mt-1 font-normal">
          Select the required details
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleFlightRemove}
        >
          {flights ? (
            <>
              <div className="mb-4 flex flex-col gap-6">
                <Select
                  label="Flight Number"
                  value={flights.at(0)?.flight_number}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  onChange={(e) => setFlightNum(e)}
                >
                  {flights.map(({ flight_number }) => (
                    <Option value={flight_number}> {flight_number} </Option>
                  ))}
                </Select>
                <Input
                  type="date"
                  size="lg"
                  label="Departure Date"
                  required
                  onChange={(e) => setInputDate(e.target.value)}
                />
              </div>
              <button className="mt-6 middle none center w-full rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Delete
              </button>
            </>
          ) : (
            <div> Loading...</div>
          )}
        </form>
        {resCode ? (
          resCode == "204" ? (
            <Alert color="green">Deleted Sucessfully</Alert>
          ) : resCode == "P2025" ? (
            <Alert color="red">No Such Flight Found</Alert>
          ) : (
            <Alert color="red">Internal Server Error</Alert>
          )
        ) : null}
      </Card>
    </div>
  )
}
