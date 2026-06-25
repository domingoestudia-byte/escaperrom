'use client'

import { useState } from 'react'

export function ReserveButton({ roomId }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleReserve() {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, durationHours: 1 }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'No se pudo iniciar el pago')
      }

      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleReserve}
        disabled={isLoading}
        className="h-11 w-full rounded-md bg-amber-400 px-4 text-sm font-bold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Redirigiendo...' : 'Reservar'}
      </button>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  )
}
