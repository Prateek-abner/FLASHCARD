// app/api/checkout_sessions/route.js

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with the secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

// Utility function to format the amount for Stripe
const formatAmountForStripe = (amount, currency) => {
  return Math.round(amount * 100)
}

// POST: Create a Stripe checkout session
export async function POST(req) {
  try {
    // Define parameters for the checkout session
    const params = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Pro subscription',
            },
            unit_amount: formatAmountForStripe(10, 'usd'), // $10.00
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('Referer')}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('Referer')}result?session_id={CHECKOUT_SESSION_ID}`,
    }

    // Create the checkout session
    const checkoutSession = await stripe.checkout.sessions.create(params)

    // Return the created session as a JSON response
    return NextResponse.json(checkoutSession, {
      status: 200,
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}

// GET: Retrieve Stripe checkout session details
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const session_id = searchParams.get('session_id')

  try {
    if (!session_id) {
      throw new Error('Session ID is required')
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

    // Return the session details as a JSON response
    return NextResponse.json(checkoutSession)
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    return NextResponse.json({ error: { message: error.message } }, { status: 500 })
  }
}
