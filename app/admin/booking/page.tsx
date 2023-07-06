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

const TABLE_HEAD = [
  "Customer Name",
  "Airline Name",
  "Flight Number",
  "Departure Airport Name",
  "Departure Date",
  "Departure Time",
  "Arrival Airport Name",
  "Arrival Date",
  "Arrival Time",
]

const AdminBooking = async () => {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  if (user.email != process.env.NEXT_PUBLIC_ADMIN_MAIL) {
    return (
      <div className="flex text-3xl text-foreground mt-10">
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <div className="px-2">
          You don't have the permission to access this page
        </div>
      </div>
    )
  }

  const signOut = async () => {
    "use server"
    const supabase = createServerActionClient({ cookies })
    await supabase.auth.signOut()
    redirect("/admin/login")
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      status: 1,
    },
  })

  return (
    <div className="w-full flex flex-col items-center bg-background">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <span className="flex gap-4">
            <span className="py-2">Welcome {user.user_metadata.name}!</span>{" "}
            <span className="border-r"></span>{" "}
            <form action={signOut}>
              <button className="text-neutral-100 py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                Logout
              </button>
            </form>
          </span>
        </div>
      </nav>
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
              {reservations?.map(
                ({
                  customer_name,
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
                              {customer_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
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

export default AdminBooking
