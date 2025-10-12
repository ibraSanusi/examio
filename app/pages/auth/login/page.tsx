"use client"

import Button from "@/components/ui/button"
import { Discord } from "@/components/ui/icons/Discord"
import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginPage() {
  const { data: session } = useSession()

  const handleSessionButtonAction = () => {
    if (!session)
      return signIn(
        "discord",
        {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
        { callbackUrl: "/" },
      )

    return signOut()
  }

  const buttonText = session ? "Sign out!" : "Empieza a jugar ahora!"

  return (
    <section className="mx-auto mt-26 flex w-full max-w-4xl flex-col gap-6 px-4 py-3">
      <div className="space-y-2">
        <h1 className="text-center text-5xl font-bold">EXAM.IO clase online</h1>
        <p className="text-center text-xl font-semibold italic">
          Plataforma desarrollada para que los más jóvenes pongan a prueba sus conocimientos.
        </p>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-4">
        <Button
          className="hover:bg-yellow flex flex-row items-center gap-3 bg-black duration-75 ease-in hover:scale-110 active:scale-90"
          onClick={handleSessionButtonAction}
        >
          {buttonText}
          <Discord className="size-5" />
        </Button>
      </div>
    </section>
  )
}
