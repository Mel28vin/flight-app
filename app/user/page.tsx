import LogoutButton from "@/components/LogoutButton"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

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
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <div>
            <div className="flex items-center gap-4">
              Hey, {user.user_metadata.name}!
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
