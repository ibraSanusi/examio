import type { Metadata } from "next"
import "./globals.css"
import { ReactNode } from "react"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "Mi App Next.js",
  description: "Template básico con App Router",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <header>
          <nav>
            <h1>Mi App</h1>
          </nav>
        </header>
        <main>
          <Providers>{children}</Providers>
        </main>
        <footer>
          <p>© {new Date().getFullYear()} Mi App</p>
        </footer>
      </body>
    </html>
  )
}
