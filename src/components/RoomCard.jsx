import Image from 'next/image'
import { ReserveButton } from '@/components/ReserveButton'

export function RoomCard({ room }) {
  return (
    <article className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      <div className="aspect-[4/3] bg-zinc-800">
        <Image
          src={room.image}
          alt={`Imagen de ${room.name}`}
          width={1200}
          height={900}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex min-h-64 flex-col gap-4 p-5">
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-xl font-bold">{room.name}</h2>
          <p className="text-sm leading-6 text-zinc-400">{room.description}</p>
        </div>
        <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
          <span className="text-sm text-zinc-400">Precio por hora</span>
          <strong className="text-lg text-amber-300">{room.pricePerHour} EUR</strong>
        </div>
        <ReserveButton roomId={room.id} />
      </div>
    </article>
  )
}
