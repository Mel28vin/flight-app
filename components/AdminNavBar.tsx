import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const signOut = async () => {
  "use server"
  const supabase = createServerActionClient({ cookies })
  await supabase.auth.signOut()
  redirect("/admin-login")
}

export default function AdminNavBar() {
  return (
    <nav className="flex items-center justify-between gap-3 text-foreground border-b border-b-foreground/10 h-16">
      <Link href="/admin" className="group ml-2">
        <h2 className="p-2 text-lg font-semibold tracking-tighter">
          Hello Admin
        </h2>
      </Link>
      <div className="items-center gap-6 flex">
        <Link href="/admin/airlines" className="inline-flex items-center gap-1">
          Airlines
        </Link>
        <Link href="/admin/airports" className="inline-flex items-center gap-1">
          Airports
        </Link>
        <Link href="/admin/flights">Flights</Link>
        <Link href="/admin/booking">Bookings</Link>
        <form action={signOut}>
          <button className="text-neutral-100 mr-4 py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
      </div>
    </nav>
  )
}
