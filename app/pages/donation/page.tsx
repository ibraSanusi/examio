"use client"

import { Appearance, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Button from "@/components/ui/button"
import { PaymentForm } from "./components/PaymentForm"
import { useDonation } from "./hooks/useDonation"
import { Input } from "@/components/ui/input"
import { EditIcon, Euro } from "lucide-react"
import { formatNumberEU } from "@/lib/helpers"

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

  const formattedNumber = formatNumberEU(Number(quantityInputText))

  const baseElements: Appearance = {
    theme: "flat",
  }

  return (
    <section className="m-auto flex h-[462px] w-full max-w-xl flex-col gap-4 rounded-md px-5 py-4 shadow-md">
      <form onSubmit={handleIntentSubmit} className="space-y-2">
        <span>Escribe cuanto quieres donar</span>
        <div className="relative">
          <Input
            className={`number-input h-12.5 transition-colors duration-500 ${canConfirmPayment && "border-purple border"}`}
            name="quantity"
            type="text"
            inputMode="numeric"
            placeholder="Escribe la cantidad"
            disabled={canConfirmPayment}
            onChange={handleInputChange}
            value={formattedNumber.toString()}
          />
          {!canConfirmPayment && (
            <Euro className="absolute top-1/2 left-[calc(100%-30px)] -translate-y-1/2 scale-85 transform" />
          )}

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
          <Button
            className={`visible w-full transition-colors duration-700 ${quantityInputText ? "opacity-100" : "hover:bg-purple opacity-60"}`}
            disabled={loading || !quantityInputText}
          >
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
