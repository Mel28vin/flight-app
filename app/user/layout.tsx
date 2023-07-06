export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
    </html>
  )
}

