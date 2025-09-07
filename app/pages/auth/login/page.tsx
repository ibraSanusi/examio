"use client"

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

  const buttonText = session ? "Sign out" : "Sing in"

  return (
    <div>
      <h1>Login con Discord</h1>
      {session && <p>Ya estás logueado como {session.user?.name}</p>}
      <button onClick={handleSessionButtonAction}>{buttonText}</button>
    </div>
  )
}
