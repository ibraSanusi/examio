import { generateErrorResponse } from "@/lib/api"
import { ApiResponseError } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SK ?? "")

export async function POST(req: NextRequest) {
  const quantity = Number(await req.text())

  if (!quantity) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "NO_PRICE_INDICATED",
      "No se ha añadido una cantidad de donación.",
    )

    return NextResponse.json(errorResponse, { status: 204 })
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(quantity),
    currency: "eur",
    // automatic_payment_methods: { enabled: false },
    payment_method_types: ["card"],
  })

  console.log({ paymentIntent })

  return NextResponse.json(
    { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id },
    { status: 201 },
  )
}

export async function DELETE(req: NextRequest) {
  const paymentIntentId = await req.text()

  if (!paymentIntentId) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "NO_PAYMENT_ID",
      "No se ha añadido la id del intento.",
    )

    return NextResponse.json(errorResponse, { status: 204 })
  }

  const response = await stripe.paymentIntents.cancel(paymentIntentId)

  console.log({ response })

  return NextResponse.json({ response }, { status: 201 })
}
