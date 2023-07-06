"use client"
import {
  Card,
  Input,
  Typography,
  Alert,
  Select,
  Option,
} from "@/components/MaterialComponents"
import { Airline, Airport } from "@prisma/client"
import { useState, useEffect } from "react"

export default function Example() {
  const [name, setName] = useState<string | undefined>("")
  const [num, setNum] = useState("")
  const [seats, setSeats] = useState("")
  const [dAirport, setDAirport] = useState<string | undefined>("")
  const [aAirport, setAAirport] = useState<string | undefined>("")
  const [aAirportDate, setAAirportDate] = useState("")
  const [dAirportDate, setDAirportDate] = useState("")
  const [aAirportTime, setAAirportTime] = useState("")
  const [dAirportTime, setDAirportTime] = useState("")
  const [resCode, setResCode] = useState<string | null>(null)
  const [airlines, setAirlines] = useState<Airline[] | null>(null)
  const [airports, setAirports] = useState<Airport[] | null>(null)

  useEffect(() => {
    async function loadAirlines() {
      if (!airlines) {
        const res = await fetch("/api/airlines")
        const data = res.json()
        const _airlines = (await data) as Airline[]
        setAirlines(_airlines)
      }
      // console.log(airlines)
    }
    async function loadAirports() {
      if (!airports) {
        const res = await fetch("/api/airports")
        const data = res.json()
        const _airports = (await data) as Airport[]
        setAirports(_airports)
      }
      // console.log(airports)
    }
    void loadAirlines()
    void loadAirports()
  })

  const handleFlightAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResCode(null)
    // console.log(dAirportTime)
    const res = await fetch("/api/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        airline_name: name,
        flight_number: num,
        max_seats: +seats,
        departure_airport_name: dAirport,
        scheduled_departure_time: dAirportTime,
        scheduled_departure_date: dAirportDate,
        arrival_airport_name: aAirport,
        scheduled_arrival_time: aAirportTime,
        scheduled_arrival_date: aAirportDate,
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
        {airlines && airports ? (
          <>
            <div className="mb-4 flex flex-col gap-6">
              <Select
                label="Airline Name"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(e) => setName(e)}
              >
                {airlines.map(({ airline_name }) => (
                  <Option value={airline_name}> {airline_name} </Option>
                ))}
              </Select>
              <Input
                size="lg"
                label="Flight Number"
                onChange={(e) => setNum(e.target.value)}
              />
              <Input
                size="lg"
                label="Max Seats"
                onChange={(e) => setSeats(e.target.value)}
              />
              <Select
                label="Departure Airport Name"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(e) => setDAirport(e)}
              >
                {airports.map(({ name }) => (
                  <Option value={name}> {name} </Option>
                ))}
              </Select>
              <Input
                type="date"
                size="lg"
                label="Departure Date"
                onChange={(e) => setDAirportDate(e.target.value)}
              />
              <Input
                type="time"
                size="lg"
                label="Departure Time"
                onChange={(e) => setDAirportTime(e.target.value)}
              />
              <Select
                label="Arrival Airport Name"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(e) => setAAirport(e)}
              >
                {airports.map(({ name }) => (
                  <Option value={name}> {name} </Option>
                ))}
              </Select>
              <Input
                type="date"
                size="lg"
                label="Arrival Date"
                onChange={(e) => setAAirportDate(e.target.value)}
              />
              <Input
                type="time"
                size="lg"
                label="Arrival Time"
                onChange={(e) => setAAirportTime(e.target.value)}
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
          <Alert color="red">
            {" "}
            Cannot have the same Arrival and Departure Time
          </Alert>
        ) : (
          <Alert color="red">Internal Server Error</Alert>
        )
      ) : null}
    </Card>
  )
}
