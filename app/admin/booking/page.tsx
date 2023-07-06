import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/components/MaterialComponents"

const Admin = async () => {
  const supabase = createServerComponentClient({ cookies })
  const prisma = new PrismaClient()
  const ppl = await prisma.users.findMany()

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

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <span className="flex gap-4">
            <span className="py-2">
              Welcome Admin, {user.user_metadata.name}!
            </span>{" "}
            <span className="border-r"></span>{" "}
            <form action={signOut}>
              <button className="text-neutral-100 py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                Logout
              </button>
            </form>
          </span>
        </div>
      </nav>
      <div className="text-white">The users are</div>{" "}
      <ul className="text-foreground">
        {ppl.map((peep) => (
          <li key={peep.id}>{peep?.raw_user_meta_data?.name}</li>
        ))}
      </ul>
      <Booking />
    </div>
  )
}

function Booking() {
  return (
    <div className="text-foreground">
      <h1 className="text-3xl my-10"> All Bookings </h1>
      <table className="table-auto border-collapse border border-slate-500 text-foreground  ...">
        <thead>
          <tr>
            <th className="border p-2 border-slate-600 ...">State</th>
            <th className="border p-2  border-slate-600 ...">City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 border-slate-700 ...">Indiana</td>
            <td className="border p-2 border-slate-700 ...">Indianapolis</td>
          </tr>
          <tr>
            <td className="border border-slate-700 ...">Ohio</td>
            <td className="border border-slate-700 ...">Columbus</td>
          </tr>
          <tr>
            <td className="border border-slate-700 ...">Michigan</td>
            <td className="border border-slate-700 ...">Detroit</td>
          </tr>
        </tbody>
      </table>
      <Example />
    </div>
  )
}

function Example() {
  return <Button>Button</Button>
}
export default Admin
