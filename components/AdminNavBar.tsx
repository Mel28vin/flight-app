import Link from "next/link"

export default function AdminNavBar() {
  return (
    <nav className="flex items-center justify-between gap-3 text-foreground mx-3">
      <Link href="/" className="group">
        <h2 className="p-2 text-lg font-semibold tracking-tighter">
          Flight Booking
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
      </div>
    </nav>
  )
}
