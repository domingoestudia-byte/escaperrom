import Link from 'next/link'

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101014] px-5 text-zinc-100">
      <section className="w-full max-w-xl rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
          Pago cancelado
        </p>
        <h1 className="mt-3 text-3xl font-bold">La reserva no se ha cobrado</h1>
        <p className="mt-4 text-zinc-400">
          Puedes volver al listado y crear una nueva sesion de pago cuando quieras.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-amber-400 px-5 text-sm font-bold text-zinc-950 hover:bg-amber-300"
        >
          Volver a salas
        </Link>
      </section>
    </main>
  )
}
