import { ChangeEventHandler, FormEventHandler, useState } from "react"

export function useDonation() {
  const [canConfirmPayment, setCanConfirmPayment] = useState(false)
  const [clientSecret, setClientSecret] = useState("")
  const [paymentIntentId, setPaymentIntentId] = useState("")
  const [quantityInputText, setQuantityInputText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleIntentSubmit: FormEventHandler<HTMLFormElement> | undefined = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const quantity = e.currentTarget.quantity.value

      console.log({ quantity })

      const response = await fetch("/api/payment-intent", {
        method: "POST",
        body: quantity,
      })
      if (!response) return

      const {
        clientSecret,
        paymentIntentId,
      }: { clientSecret: string | null; paymentIntentId: string | null } = await response.json()

      if (!clientSecret || !paymentIntentId) return

      setPaymentIntentId(paymentIntentId)
      setClientSecret(clientSecret)
      setCanConfirmPayment(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditQuantity = async () => {
    try {
      const response = await fetch("/api/payment-intent", {
        method: "DELETE",
        body: paymentIntentId,
      })

      if (!response.ok) return

      setCanConfirmPayment(false)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    const { value } = e.currentTarget

    setQuantityInputText(value)
  }

  console.log({ quantityInputText })

  return {
    handleIntentSubmit,
    handleEditQuantity,
    handleInputChange,
    canConfirmPayment,
    clientSecret,
    loading,
    quantityInputText,
  }
}
