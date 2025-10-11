import type { Metadata } from "next"
import "./globals.css"
import { ReactNode } from "react"
import Providers from "./providers"
import Noise from "@/components/ui/noise"

import { baloo_2 } from "@/lib/fonts"
import NavBar from "@/components/ui/nav-bar"
import Header from "@/components/ui/header"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "examio",
  description: "App desarrollada para que los chavales practiquen antes del examen",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html className={`${baloo_2.className} h-full`} lang="es">
      <body className="relative min-h-screen w-full" suppressHydrationWarning>
        <Noise />
        <section className="m-auto w-full max-w-7xl space-y-8 p-8">
          <Providers>
            <Header />

            <main>{children}</main>

            <NavBar />
          </Providers>
        </section>
        <Toaster />
      </body>
    </html>
  )
}
