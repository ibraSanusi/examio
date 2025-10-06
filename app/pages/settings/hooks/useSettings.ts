import { userService } from "@/services/front/userService"
import { ApiResponse } from "@/types/api"
import { User } from "@/types/models"
import { FormEventHandler, useEffect, useState } from "react"
import { toast } from "sonner"

export function useSettings() {
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [userData, setUserData] = useState<User | null>(null)

  // Cargando los datos del usuario en sesión
  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const response = await userService.getUserData()
      if (!response.ok) return

      const json: ApiResponse<User> = await response.json()

      if (!json.success) return

      setUserData(json.data)
    })()
      .finally(() => setLoading(false))
      .catch((err) => toast(err))
  }, [])

  const handleUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const currentTarget: HTMLFormElement = e.currentTarget
    const formData = new FormData(currentTarget)
    const obj = Object.fromEntries(formData.entries())

    const userId = userData?.id
    if (!userId) return toast("No se quien eres, no te puedo borrar la cuenta.")

    setUpdating(true)
    try {
      const response = await userService.updateUser(userId, obj)

      if (!response.ok) return toast("Algo ha ido mal en el servidor.")

      const updatedUser: User = await response.json()

      if (!updatedUser) return toast("No se ha actualizado tu cuenta.")

      setUserData(updatedUser)

      toast("Usuario actualizado correctamente.")
    } catch (err) {
      console.log(err)
      return toast("No se quien eres, no te puedo borrar la cuenta.")
    } finally {
      setUpdating(false)
    }
  }

  const handleDeleteUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const userId = userData?.id
    if (!userId) return toast("No se quien eres, no te puedo borrar la cuenta.")

    setDeleting(true)
    try {
      const response = await userService.deletUser(userId)
      if (!response.ok) return toast("Algo ha ido mal en el servidor.")

      const json: ApiResponse<User> = await response.json()
      if (!json.success) return toast("No se pudo eliminar correctamente tu cuenta.")

      toast("Usuario eliminado correctamente.", { description: `Usuario ${json.data.name}` })
    } catch (err) {
      console.error(err)
      toast("Error inesperado al eliminar el usuario.")
    } finally {
      setDeleting(false)
    }
  }
  return {
    loading,
    userData,
    deleting,
    updating,
    handleUpdate,
    handleDeleteUser,
  }
}
