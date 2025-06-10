// src/app/mis-favoritas/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import ModalMascotaUsuario from '@/components/misFavoritos/ModalMascotaUsuario'

export interface Mascota {
  id: number
  nombre: string
  especie: string
  raza: string
  edad: number
  estado: string
  descripcion: string
  refugio: string
  foto: string
}

export default function PaginaFavoritas() {
  const [favoritas, setFavoritas] = useState<Mascota[]>([])
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<Mascota | null>(null)

  useEffect(() => {
    const userId = localStorage.getItem('usuarioId') || 'default_user'

    const todasLasMascotas: Mascota[] = [
      {
        id: 1,
        nombre: 'Max',
        especie: 'Perro',
        raza: 'Labrador',
        edad: 2,
        estado: 'Disponible',
        descripcion: 'Amigable y activo',
        refugio: 'Refugio Esperanza',
        foto: '/Perros/beagle.jpg'
      },
      {
        id: 2,
        nombre: 'Luna',
        especie: 'Gato',
        raza: 'Siamés',
        edad: 1,
        estado: 'Adoptado',
        descripcion: 'Tranquila y cariñosa',
        refugio: 'Refugio Felino',
        foto: '/Gatos/persa.jpg'
      },
      {
        id: 3,
        nombre: 'Rocky',
        especie: 'Perro',
        raza: 'Pitbull',
        edad: 3,
        estado: 'En proceso',
        descripcion: 'Fuerte y protector',
        refugio: 'Refugio Patitas',
        foto: '/Perros/labrador.jpg'
      }
    ]

    const favoritosSimulados: Record<string, number[]> = {
      default_user: [1, 3]
    }

    const idsFavoritos = favoritosSimulados[userId] || []
    const mascotasFavoritas = todasLasMascotas.filter(m => idsFavoritos.includes(m.id))

    setFavoritas(mascotasFavoritas)
  }, [])

  return (
    <div className="pt-[80px] min-h-screen bg-white text-gray-900 px-6">
      <h1 className="text-2xl font-bold mb-6">🐾 Tus Mascotas Favoritas</h1>

      {favoritas.length === 0 ? (
        <p className="text-gray-600">Aún no has marcado ninguna mascota como favorita.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoritas.map((mascota) => (
            <div
              key={mascota.id}
              className="border rounded-xl shadow hover:shadow-lg transition p-4 bg-white cursor-pointer"
              onClick={() => setMascotaSeleccionada(mascota)}
            >
              <div className="p-4">
              <img
                src={mascota.foto || '/sin-foto.jpg'}
                alt={mascota.nombre}
                className="w-full h-48 object-cover rounded-md mb-3 "
              />
              <h3 className="text-lg font-semibold text-gray-900">{mascota.nombre}</h3>
              <p className="text-sm text-gray-600">{mascota.raza} • {mascota.especie}</p>
              <p className="text-sm text-gray-500">Edad: {mascota.edad} años</p>
              <p className="text-xs text-gray-400 mt-1">Refugio: {mascota.refugio}</p>
            </div>
            </div>
          ))}
        </div>
      )}

      {mascotaSeleccionada && (
        <ModalMascotaUsuario
          mascota={mascotaSeleccionada}
          onClose={() => setMascotaSeleccionada(null)}
        />
      )}
    </div>
  )
}

