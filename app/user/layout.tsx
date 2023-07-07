import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import NoPermissions from "@/components/NoPermissions"
import UserNavBar from "@/components/UserNavBar"

export default async function UserDashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
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

  const name = user.user_metadata.name as string

  return (
    <div className="w-full flex flex-col">
      {/* Include shared UI here e.g. a header or sidebar */}
      <UserNavBar name={name} />
      {children}
    </div>
  )
}
