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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react"

const TABLE_HEAD = [
  "Airline Name",
  "Flight Number",
  "Available Seats",
  "Departure Airport Name",
  "Departure Date",
  "Departure Time",
  "Arrival Airport Name",
  "Arrival Date",
  "Arrival Time",
  "",
]

export default function Search() {
  const supabase = createClientComponentClient()
  const [resCode, setResCode] = useState<string | null>(null)
  const [bookResCode, setBookResCode] = useState<string | null>(null)
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
        setDAirport(_airports.at(0)?.name)
        setAAirport(_airports.at(1)?.name)
      }
    }
    void loadAirports()
  })

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResCode(null)
    setBookResCode(null)
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
    console.log(data)
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
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error("Log in")
    setBookResCode(null)
    console.log(flight_number)
    if (max_seats < 1) {
      setBookResCode("400")
      return
    }
    setFlights(null)
    const res = await fetch("/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flight_number: flight_number,
        airline_name: airline_name,
        departure_airport_name: departure_airport_name,
        arrival_airport_name: arrival_airport_name,
        scheduled_departure_time: scheduled_departure_time,
        scheduled_arrival_time: scheduled_arrival_time,
        scheduled_departure_date: scheduled_departure_date,
        scheduled_arrival_date: scheduled_arrival_date,
        customer_name: user.user_metadata.name,
        customer_email: user.email,
        status: 1,
      }),
    })
    setBookResCode(null)
    const patchRes = await fetch("/api/book", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flight_number: flight_number,
        scheduled_departure_date: scheduled_departure_date,
        max_seats: max_seats,
      }),
    })
    console.log(patchRes.status)
    setBookResCode(res.status.toString())
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
                  required
                  onChange={(e) => setInputDate(e.target.value)}
                />
                <Select
                  label="Departure Airport Name"
                  defaultValue={airports.at(0)?.name}
                  value={airports.at(0)?.name}
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
                  defaultValue={airports.at(1)?.name}
                  value={airports.at(1)?.name}
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
        {/* {resCode ? ( */}
        {/*   resCode == "200" ? ( */}
        {/*     <Alert color="green">Searched Sucessfully</Alert> */}
        {/*   ) : resCode == "P2025" ? ( */}
        {/*     <Alert color="red">No Such Schedule Found</Alert> */}
        {/*   ) : ( */}
        {/*     <Alert color="red">Internal Server Error</Alert> */}
        {/*   ) */}
        {/* ) : null} */}
      </Card>
      {flights ? (
        flights.length == 0 ? (
          <div className="text-foreground text-3xl flex justify-self-center items-center">
            {" "}
            No Available Flights!
          </div>
        ) : (
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
            <CardBody color="transparent" className="overflow-auto px-0">
              <table className="mt-4 w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-200 p-4"
                      >
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
                  {flights.map(
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
        )
      ) : null}
      {bookResCode ? (
        bookResCode == "201" ? (
          <Alert color="green" className="w-28 pl-4 mx-0 text-center">
            Booked Sucessfully
          </Alert>
        ) : bookResCode == "P2002" ? (
          <Alert color="red" className="w-28 pl-4 mx-0 text-center">
            No Duplicates are Allowed!
          </Alert>
        ) : bookResCode == "400" ? (
          <Alert color="red" className="w-28 pl-4 mx-0 text-center">
            {" "}
            No seats available{" "}
          </Alert>
        ) : (
          <Alert color="red" className="w-28 pl-4 mx-0 text-center">
            Internal Server Error
          </Alert>
        )
      ) : null}
    </div>
  )
}
