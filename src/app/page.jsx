import { RoomCard } from '@/components/RoomCard'
import { rooms } from '@/lib/rooms'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#101014] text-zinc-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:py-12">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Escape Room Booking
          </p>
          <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">
            Reserva una sala y simula el pago con Stripe Checkout
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-400">
            Elige una sala, pulsa Reservar y la aplicacion creara una Checkout Session
            en una Edge Function de Next.js.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </main>
  )
}
