import { getRoomById } from '@/lib/rooms'

export const runtime = 'edge'

export async function POST(request) {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    return Response.json(
      { error: 'Falta STRIPE_SECRET_KEY en las variables de entorno' },
      { status: 500 }
    )
  }

  const { roomId, durationHours = 1 } = await request.json()
  const room = getRoomById(roomId)
  const hours = Number(durationHours)

  if (!room || !Number.isInteger(hours) || hours < 1) {
    return Response.json({ error: 'Reserva no valida' }, { status: 400 })
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin
  const amount = room.pricePerHour * hours * 100
  const params = new URLSearchParams({
    mode: 'payment',
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][unit_amount]': String(amount),
    'line_items[0][price_data][product_data][name]': `${room.name} - ${hours} hora`,
    'metadata[room_id]': room.id,
    'metadata[room_name]': room.name,
    'metadata[duration_hours]': String(hours),
  })

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })
  const session = await stripeResponse.json()

  if (!stripeResponse.ok) {
    return Response.json(
      { error: session.error?.message ?? 'Stripe no pudo crear la sesion' },
      { status: stripeResponse.status }
    )
  }

  return Response.json({ id: session.id, url: session.url })
}
