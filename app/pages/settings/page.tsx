"use client"

import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { Save, TriangleAlert } from "lucide-react"
import { useSettings } from "./hooks/useSettings"

export default function SettingsPage() {
  const { userData, loading, deleting, updating, handleUpdateUser, handleDeleteUser } =
    useSettings()

  if (loading) return <p>Cargando tus datos...</p>

  return (
    userData && (
      <section className="space-y-4">
        <form
          className="border-purple/50 flex flex-col gap-2 rounded-md border-[1px] p-4"
          onSubmit={handleUpdateUser}
        >
          <h2 className="text-2xl">General</h2>
          <div className="gag-2 flex flex-col">
            <label htmlFor="name">Nombre completo:</label>
            <Input
              placeholder="Escribe tu nombre..."
              className="focus-visible:ring-purple/50"
              type="text"
              name="name"
              id="name"
              defaultValue={userData.name ?? ""}
            />
          </div>
          <div className="gag-2 flex flex-col">
            <label htmlFor="username">Nombre de usuario:</label>
            <Input
              placeholder="Escribe tu nombre de usaurio..."
              className="focus-visible:ring-purple/50"
              type="text"
              name="username"
              id="username"
              defaultValue={userData.username ?? ""}
            />
          </div>
          <div className="gag-2 flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <Input
              disabled
              className="focus-visible:ring-purple/50 ring-0"
              type="text"
              name="email"
              id="email"
              defaultValue={userData.email}
            />
            <p className="ml-2 flex flex-row items-center gap-2 text-black/50">
              <TriangleAlert className="size-4" />
              <span className="text-sm">
                La dirección de correo electrónico es gestionada por su proveedor de OAuth.
              </span>
            </p>
          </div>
          <div className="gag-2 flex flex-col">
            <label htmlFor="age">Edad:</label>
            <Input
              placeholder="Escribe tu edad..."
              className="focus-visible:ring-purple/50"
              type="text"
              name="age"
              id="age"
              defaultValue={userData.age ?? ""}
            />
          </div>
          <div className="gag-2 flex flex-col">
            <label htmlFor="grade">Curso:</label>
            <Input
              placeholder="¿En qué curso estas?"
              className="focus-visible:ring-purple/50"
              type="text"
              name="grade"
              id="grade"
              defaultValue={userData.grade ?? ""}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className={cn(
                "hover:bg-yellow flex w-fit flex-row items-center gap-2",
                updating ? "bg-red" : "bg-purple",
              )}
            >
              {updating ? <Spinner className="size-4" /> : <Save className="size-4" />}
              <span className="text-sm"> {updating ? "Borrando..." : "Actualizar"}</span>
            </Button>
          </div>
        </form>

        <form
          className="border-purple/50 flex flex-col gap-2 rounded-md border-[1px] p-4"
          onSubmit={handleDeleteUser}
        >
          <div className="gag-2 flex flex-col">
            <h2 className="text-2xl">Cuenta</h2>
            <span className="text-sm">Actualiza tu cuenta</span>
          </div>
          <div className="gag-2 flex flex-col">
            <h3>Borra tu cuenta</h3>
            <Button
              type="submit"
              className={cn(
                "hover:bg-red flex w-fit flex-row items-center gap-2",
                deleting ? "bg-red" : "bg-purple",
              )}
            >
              {deleting && <Spinner />}
              {deleting ? "Borrando..." : "Borrar cuenta"}
            </Button>
          </div>
        </form>
      </section>
    )
  )
}
