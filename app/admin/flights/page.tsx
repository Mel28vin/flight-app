import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { UserPlusIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid"
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
} from "@/components/MaterialComponents"
import { prisma } from "@/server/db"
import Link from "next/link"

const TABLE_HEAD = [
  "Airline Name",
  "Flight Number",
  "Max Seats",
  "Departure Airport Name",
  "Departure Time",
  "Arrival Airport Name",
  "Arrival Time",
]

export default async function Flights() {
  const flights = await prisma.flightLeg.findMany()

  return (
    <Card color="transparent" className="h-full w-full">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="rounded-none"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" className="text-foreground">
              Flights list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Flights
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link href="/admin/flights/add">
              <Button
                className="flex items-center gap-3"
                color="blue"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Flight
              </Button>
            </Link>
            <Link href="/admin/flights/delete">
              <Button className="flex items-center gap-3" color="red" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Delete
                Flight
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody color="transparent" className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
            {flights.map(
              ({
                flight_number,
                airline_name,
                max_seats,
                departure_airport_name,
                arrival_airport_name,
                scheduled_departure_time,
                scheduled_arrival_time,
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
                        {scheduled_arrival_time}
                      </Typography>
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
}
