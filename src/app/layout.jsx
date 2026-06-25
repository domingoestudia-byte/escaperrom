import './globals.css'

export const metadata = {
  title: 'Escape Room Reservas',
  description: 'Aplicacion de reservas con Next.js y Stripe Checkout',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
