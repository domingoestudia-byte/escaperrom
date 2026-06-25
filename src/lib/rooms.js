export const rooms = [
  {
    id: 'cripta',
    name: 'La Cripta del Relojero',
    pricePerHour: 30,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    description: 'Una sala de enigmas mecanicos, candados antiguos y pistas a contrarreloj.',
  },
  {
    id: 'laboratorio',
    name: 'Laboratorio Omega',
    pricePerHour: 45,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop',
    description: 'Investigacion, codigos quimicos y una alarma que no deja de sonar.',
  },
  {
    id: 'hotel',
    name: 'Hotel Medianoche',
    pricePerHour: 38,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    description: 'Habitaciones cerradas, llaves perdidas y una recepcion con demasiados secretos.',
  },
]

export function getRoomById(roomId) {
  return rooms.find((room) => room.id === roomId)
}
