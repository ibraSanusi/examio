import { useRouter } from "next/navigation"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { FormEventHandler, useState } from "react"

export function usePaymentForm(clientSecret: string) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  console.log({ stripe })

  const [loading, setLoading] = useState(false)

  const handleConfirmSubmit: FormEventHandler<HTMLFormElement> | undefined = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!stripe || !elements || !clientSecret) return

      await elements.submit()

      const { error } = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: window.origin + "/donation/success",
          payment_method_data: {
            billing_details: {
              email: "isanu227@gmail.com",
            },
          },
        },
      })

      if (error) {
        console.error("Error al confirmar el pago en el lado de stripe")
      }
    } catch (err) {
      console.error(err)
      router.push("/donation/error")
    } finally {
      setLoading(false)
    }
  }
  return {
    handleConfirmSubmit,
    loading,
    stripe,
  }
}
