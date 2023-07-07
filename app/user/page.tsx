import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function UserPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  if (user.email == process.env.NEXT_PUBLIC_ADMIN_MAIL) {
    redirect("/admin")
  }

  return (
    <div className="w-full flex flex-col items-center text-foreground">
      <h1 className="text-5xl mt-32"> Welcome to the User Dashboard</h1>
    </div>
  )
}
