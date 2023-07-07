import AdminNavBar from "@/components/AdminNavBar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import NoPermissions from "@/components/NoPermissions"

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin-login")
  }
  if (user.email != process.env.NEXT_PUBLIC_ADMIN_MAIL) {
    return <NoPermissions />
  }

  return (
    <div className="w-full flex flex-col">
      {/* Include shared UI here e.g. a header or sidebar */}
      <AdminNavBar />
      {children}
    </div>
  )
}
