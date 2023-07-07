import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/server/db"
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@/components/MaterialComponents"
import NoPermissions from "@/components/NoPermissions"

const TABLE_HEAD = [
  "Airline Name",
  "Flight Number",
  "Departure Airport Name",
  "Departure Date",
  "Departure Time",
  "Arrival Airport Name",
  "Arrival Date",
  "Arrival Time",
]

const UserBooking = async () => {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  if (user.email == process.env.NEXT_PUBLIC_ADMIN_MAIL) {
    return <NoPermissions />
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      customer_name: user.user_metadata.name,
      status: 1,
    },
  })

  return (
    <div className="w-full flex flex-col items-center">
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
                My Bookings
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about your bookings
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody color="transparent" className="overflow-auto px-0">
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
              {reservations?.map(
                ({
                  flight_number,
                  airline_name,
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

export default UserBooking
