"use client"
import {
  Card,
  Input,
  Typography,
  Alert,
  Select,
  Option,
} from "@/components/MaterialComponents"
import { FlightLeg } from "@prisma/client"
import { useState, useEffect } from "react"

export default function Example() {
  const [date, setDate] = useState<string>("")
  const [num, setNum] = useState<string | undefined>("")
  const [amount, setAmount] = useState<string>("")
  const [resCode, setResCode] = useState<string | null>(null)
  const [flights, setFlights] = useState<FlightLeg[] | null>(null)

  useEffect(() => {
    async function loadFlights() {
      if (!flights) {
        const res = await fetch("/api/flights")
        const data = res.json()
        const _flights = (await data) as FlightLeg[]
        setFlights(_flights)
      }
    }
    void loadFlights()
  })

  const handleFlightAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResCode(null)
    const res = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leg_date: date,
        flight_num: num,
        leg_amount: +amount,
      }),
    })
    setResCode(res.status.toString())
    console.log(res.status)
  }

  return (
    <Card color="transparent" shadow={false} className="text-foreground">
      <Typography variant="h4">Add Flight</Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleFlightAdd}
      >
        {flights ? (
          <>
            <div className="mb-4 flex flex-col gap-6">
              <Select
                label="Flight Number"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(e) => setNum(e)}
              >
                {flights.map(({ flight_number }) => (
                  <Option value={flight_number}> {flight_number} </Option>
                ))}
              </Select>
              <Input
                type="date"
                size="lg"
                label="Leg Date"
                onChange={(e) => setDate(e.target.value)}
              />
              <Input
                size="lg"
                label="Amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button className="mt-6 middle none center w-full rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              {" "}
              Submit
            </button>
          </>
        ) : (
          <div> Loading... </div>
        )}
      </form>
      {resCode ? (
        resCode == "201" ? (
          <Alert color="green">Added Sucessfully</Alert>
        ) : resCode == "409" ? (
          <Alert color="red">Cannot add duplicates!</Alert>
        ) : resCode == "400" ? (
          <Alert color="red"> Date should be in the future</Alert>
        ) : (
          <Alert color="red">Internal Server Error</Alert>
        )
      ) : null}
    </Card>
  )
}
