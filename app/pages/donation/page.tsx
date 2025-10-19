"use client"

import { Appearance, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Button from "@/components/ui/button"
import { PaymentForm } from "./components/PaymentForm"
import { useDonation } from "./hooks/useDonation"
import { Input } from "@/components/ui/input"
import { EditIcon } from "lucide-react"

const stripePromise = loadStripe(
  "pk_test_51SIprWAklJwfvqUF0M1hVv77JdadBRaWkMEwdzRz4ISwDNppzslLy1ATTUwynSMHn7Nz0VC4x2aPedF6MPvmznaC00dkhhLGvI",
)

export default function DonationPage() {
  const {
    handleEditQuantity,
    handleIntentSubmit,
    handleInputChange,
    canConfirmPayment,
    clientSecret,
    loading,
    quantityInputText,
  } = useDonation()

  const baseElements: Appearance = {
    theme: "flat",
  }

  return (
    <section className="m-auto flex w-1/3 flex-col gap-4 rounded-md px-5 py-4 shadow-md">
      <form onSubmit={handleIntentSubmit} className="space-y-2">
        <span>Escribe cuanto quieres donar</span>
        <div className="relative">
          <Input
            className={`number-input transition-colors duration-500 ${canConfirmPayment && "border-purple border"}`}
            name="quantity"
            type="number"
            placeholder="Escribe la cantidad"
            disabled={canConfirmPayment}
            onChange={handleInputChange}
          />
          {quantityInputText && canConfirmPayment && (
            <button
              type="button"
              onClick={handleEditQuantity}
              className="absolute top-1/2 left-[calc(100%-30px)] -translate-y-1/2 transform"
            >
              <EditIcon className="text-purple" />
            </button>
          )}
        </div>

        {!canConfirmPayment && (
          <Button className={`visible w-full`} disabled={loading}>
            Siguiente
          </Button>
        )}
      </form>
      {clientSecret && canConfirmPayment && (
        <Elements
          options={{ appearance: baseElements, loader: "auto", clientSecret }}
          stripe={stripePromise}
        >
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      )}
    </section>
  )
}
