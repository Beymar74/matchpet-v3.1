'use client'

import React, { useEffect, useState } from 'react'
//import { obtenerMascotasFavoritas } from '@/data/mascotasSimuladas'
import CardMascota from './CardMascotaUsuario'
import { Mascota } from '@/app/refugio/tipos'

export default function MascotasFavoritas() {
  const [favoritas, setFavoritas] = useState<Mascota[]>([])

  useEffect(() => {
    const userId = localStorage.getItem('usuarioId') || 'default_user'
    const favoritasUsuario = obtenerMascotasFavoritas(userId)
    setFavoritas(favoritasUsuario)
  }, [])

  return (
    <div className="pt-[80px] min-h-screen bg-white text-gray-900 px-6">
      <h1 className="text-2xl font-semibold mb-6">🐾 Mascotas que te Gustan</h1>
      {favoritas.length === 0 ? (
        <p className="text-gray-600">Aún no has marcado ninguna mascota como favorita.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritas.map((mascota) => (
            <CardMascota key={mascota.id} mascota={mascota} />
          ))}
        </div>
      )}
    </div>
  )
}
