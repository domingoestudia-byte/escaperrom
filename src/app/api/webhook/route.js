export const runtime = 'edge'

export async function POST(request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return Response.json(
      { error: 'Falta STRIPE_WEBHOOK_SECRET en las variables de entorno' },
      { status: 500 }
    )
  }

  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return Response.json({ error: 'Falta la firma de Stripe' }, { status: 400 })
  }

  const verified = await verifyStripeSignature(payload, signature, webhookSecret)
  if (!verified) {
    return Response.json({ error: 'Firma invalida' }, { status: 400 })
  }

  const event = JSON.parse(payload)
  let message = `Evento recibido: ${event.type}`

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    message = `Reserva pagada para ${session.metadata?.room_name ?? 'sala desconocida'}`
  }

  console.log('[stripe-webhook]', message)
  return Response.json({ received: true, message })
}

async function verifyStripeSignature(payload, signatureHeader, secret) {
  const timestamp = getSignaturePart(signatureHeader, 't')
  const expectedSignature = getSignaturePart(signatureHeader, 'v1')

  if (!timestamp || !expectedSignature) return false

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signedPayload = `${timestamp}.${payload}`
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload))
  const actualSignature = bufferToHex(signature)

  return timingSafeEqual(actualSignature, expectedSignature)
}

function getSignaturePart(header, key) {
  return header
    .split(',')
    .map((part) => part.split('='))
    .find(([name]) => name === key)?.[1]
}

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false

  let mismatch = 0
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index)
  }
  return mismatch === 0
}
