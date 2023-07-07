import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const signOut = async () => {
  "use server"
  const supabase = createServerActionClient({ cookies })
  await supabase.auth.signOut()
  redirect("/login")
}

interface UserProps {
  name: string
}

const UserNavBar: React.FC<UserProps> = ({ name }) => {
  return (
    <nav className="flex items-center justify-between gap-3 text-foreground border-b border-b-foreground/10 h-16">
      <Link href="/" className="group ml-2">
        <h2 className="p-2 text-lg font-semibold tracking-tighter">
          Hello {name}
        </h2>
      </Link>
      <div className="items-center gap-6 flex">
        <Link href="/user/search" className="inline-flex items-center gap-1">
          Search Flights
        </Link>
        <Link href="/user/booking" className="inline-flex items-center gap-1">
          My Bookings
        </Link>
        <form action={signOut}>
          <button className="text-neutral-100 mr-4 py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
      </div>
    </nav>
  )
}

export default UserNavBar
