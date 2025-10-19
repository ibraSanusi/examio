import { PaymentElement } from "@stripe/react-stripe-js"
import Button from "@/components/ui/button"
import { usePaymentForm } from "../hooks/usePaymentForm"

export function PaymentForm({ clientSecret }: { clientSecret: string }) {
  const { handleConfirmSubmit, loading, stripe } = usePaymentForm(clientSecret)
  return (
    <form className="space-y-2" onSubmit={handleConfirmSubmit}>
      <PaymentElement options={{ layout: "tabs" }} />
      <Button className="w-full" type="submit" disabled={!stripe || loading}>
        Pay
      </Button>
    </form>
  )
}
