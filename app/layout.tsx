import { ThemeProvider } from "@/components/MaterialComponents"
import "./globals.css"
export const metadata = {
  title: "Flight Booking App",
  description: "Flight Booking App developed by Melvin",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          <ThemeProvider>{children}</ThemeProvider>
        </main>
      </body>
    </html>
  )
}
