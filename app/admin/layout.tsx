import AdminNavBar from "@/components/AdminNavBar"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full flex flex-col min-w-max">
      {/* Include shared UI here e.g. a header or sidebar */}
      <AdminNavBar />
      {children}
    </div>
  )
}
