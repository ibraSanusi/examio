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
    <section>
      <h1>Login con Discord</h1>
      <p>¡Aprender es divertido con Examio!</p>
      {session && <p>Ya estás logueado como {session.user?.name}</p>}
      <div className="flex flex-row items-center gap-4">
        <Button
          className="hover:bg-yellow bg-light-brown flex flex-row items-center gap-3"
          onClick={handleSessionButtonAction}
        >
          {buttonText}
          <Discord className="size-5" />
        </Button>
      </div>
    </section>
  )
}
