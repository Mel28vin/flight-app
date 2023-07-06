"use client"
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Alert,
  Select,
  Option,
  Input,
  Button,
} from "@/components/MaterialComponents"
import { Airport, FlightLeg } from "@prisma/client"
import { useState, useEffect } from "react"

const TABLE_HEAD = [
  "Airline Name",
  "Flight Number",
  "Max Seats",
  "Departure Airport Name",
  "Departure Date",
  "Departure Time",
  "Arrival Airport Name",
  "Arrival Date",
  "Arrival Time",
  "",
]

export default function Search() {
  const [resCode, setResCode] = useState<string | null>(null)
  const [dAirport, setDAirport] = useState<string | null | undefined>(null)
  const [aAirport, setAAirport] = useState<string | null | undefined>(null)
  const [inputDate, setInputDate] = useState<string>("")
  const [flights, setFlights] = useState<FlightLeg[] | null>(null)
  const [airports, setAirports] = useState<Airport[] | null>(null)

  useEffect(() => {
    async function loadAirports() {
      if (!airports) {
        const res = await fetch("/api/airports")
        const data = res.json()
        const _airports = (await data) as Airport[]
        setAirports(_airports)
      }
    }
    void loadAirports()
  })

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/api/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scheduled_departure_date: inputDate,
        departure_airport_name: dAirport,
        arrival_airport_name: aAirport,
        status: 1,
      }),
    })
    const data = await res.json()
    const _flights = (await data) as FlightLeg[]
    setFlights(_flights)
    setResCode(res.status.toString())
  }

  const handleBooking = async (
    flight_number: string,
    airline_name: string,
    max_seats: number,
    departure_airport_name: string,
    arrival_airport_name: string,
    scheduled_departure_time: string,
    scheduled_arrival_time: string,
    scheduled_departure_date: string,
    scheduled_arrival_date: string
  ) => {
    console.log(flight_number)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card
        color="transparent"
        shadow={false}
        className="text-foreground my-10"
      >
        <Typography variant="h4">Search Flights</Typography>
        <Typography color="white" className="mt-1 font-normal">
          Select the required details
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSearch}
        >
          {airports ? (
            <>
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  type="date"
                  size="lg"
                  label="Departure Date"
                  onChange={(e) => setInputDate(e.target.value)}
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
              </div>
              <button className="mt-6 middle none center w-full rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Search
              </button>
            </>
          ) : (
            <div> Loading...</div>
          )}
        </form>
        {resCode ? (
          resCode == "200" ? (
            <Alert color="green">Searched Sucessfully</Alert>
          ) : resCode == "P2025" ? (
            <Alert color="red">No Such Schedule Found</Alert>
          ) : (
            <Alert color="red">Internal Server Error</Alert>
          )
        ) : null}
      </Card>
      <Card color="transparent" className="h-full w-full">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="rounded-none"
        >
          <div className="mb-4 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" className="text-foreground">
                Available Flights
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody color="transparent" className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y border-blue-gray-200 p-4">
                    <Typography
                      variant="small"
                      className="font-normal text-foreground leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flights?.map(
                ({
                  flight_number,
                  airline_name,
                  max_seats,
                  departure_airport_name,
                  arrival_airport_name,
                  scheduled_departure_time,
                  scheduled_arrival_time,
                  scheduled_departure_date,
                  scheduled_arrival_date,
                }) => {
                  const classes = "p-4 border-b border-gray-600"

                  return (
                    <tr key={flight_number}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal"
                            >
                              {airline_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {flight_number}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="white"
                            className="font-normal"
                          >
                            {max_seats}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {departure_airport_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {scheduled_departure_date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {scheduled_departure_time}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {arrival_airport_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {scheduled_arrival_date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {scheduled_arrival_time}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button
                          className="flex items-center gap-3"
                          onClick={(_e) =>
                            handleBooking(
                              flight_number,
                              airline_name,
                              max_seats,
                              departure_airport_name,
                              arrival_airport_name,
                              scheduled_departure_time,
                              scheduled_arrival_time,
                              scheduled_departure_date,
                              scheduled_arrival_date
                            )
                          }
                        >
                          Book
                        </Button>
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}
