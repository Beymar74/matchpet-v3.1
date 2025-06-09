// src/components/usuario/CardMascotaUsuario.tsx
'use client'

import React from 'react'
import { Mascota } from '@/app/refugio/tipos'

interface Props {
  mascota: Mascota
}

export default function CardMascotaUsuario({ mascota }: Props) {
  return (
    <div className="border rounded-xl shadow hover:shadow-lg transition p-4 bg-white">
      <img
        src={mascota.foto || '/sin-foto.jpg'}
        alt={mascota.nombre}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-900">{mascota.nombre}</h3>
      <p className="text-sm text-gray-600">{mascota.raza} • {mascota.especie}</p>
      <p className="text-sm text-gray-500">Edad: {mascota.edad} años</p>
      <p className="text-xs text-gray-400 mt-1">Refugio: {mascota.refugio}</p>
    </div>
  )
}
