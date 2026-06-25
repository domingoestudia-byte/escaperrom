import Link from 'next/link'

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101014] px-5 text-zinc-100">
      <section className="w-full max-w-xl rounded-lg border border-zinc-800 bg-zinc-950 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Pago simulado completado
        </p>
        <h1 className="mt-3 text-3xl font-bold">Reserva confirmada</h1>
        <p className="mt-4 text-zinc-400">
          Stripe ha redirigido correctamente a la pagina de exito. El webhook
          recibira el evento de confirmacion si esta configurado en Stripe CLI o en Vercel.
        </p>
        {params.session_id ? (
          <p className="mt-4 rounded-md bg-zinc-900 p-3 font-mono text-xs text-zinc-300">
            Session ID: {params.session_id}
          </p>
        ) : null}
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
