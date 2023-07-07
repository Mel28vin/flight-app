import {
  Card,
  CardFooter,
  CardBody,
  Typography,
} from "@/components/MaterialComponents"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && user.email == process.env.NEXT_PUBLIC_ADMIN_MAIL) {
    redirect("/admin")
  }

  if (user) {
    redirect("/user")
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-foreground">
        <h1 className="text-5xl mt-24 mb-5 max-w-xl">
          Welcome to the Flight Booking Application!
        </h1>
        <h3 className="text-lg text-gray-500 mb-16">
          Please login to continue
        </h3>
        <div className="flex items-center justify-between">
          <Card color="transparent">
            <CardBody className="flex flex-col">
              <Typography variant="h5" color="white" className="mb-2">
                Admin Login
              </Typography>
              <div>Email: jebasamuel@gmail.com</div>
              <div>Password: Mel__28__vin</div>
            </CardBody>
            <CardFooter>
              <Link
                href="/admin-login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-gray-400"
              >
                Login as Admin
              </Link>
            </CardFooter>
          </Card>
          <Card color="transparent">
            <CardBody className="flex flex-col">
              <Typography variant="h5" color="white" className="mb-2">
                User Login
              </Typography>
              <div>Email: mel28na.vi@gmail.com</div>
              <div>Password: Mel#2840#vin</div>
            </CardBody>
            <CardFooter>
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-gray-400"
              >
                Login as User
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
