'use client'
import React from 'react'
import { Mascota } from '@/data/mascotasSimuladas'

interface CardMascotaProps {
  mascota: Mascota
  onClick: () => void
}

export default function CardMascota({ mascota, onClick }: CardMascotaProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white text-gray-900 rounded-lg shadow-md hover:shadow-lg transition p-4 border border-gray-200"
    >
      <img
        src={mascota.foto || "/img/no-image.jpg"}
        alt={mascota.nombre}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{mascota.nombre}</h2>
      <p className="text-sm text-gray-600">{mascota.especie} • {mascota.raza}</p>
      <p className="text-sm text-gray-600">Edad: {mascota.edad} años</p>
      <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full 
        ${mascota.estado === 'Disponible' ? 'bg-green-100 text-green-800' :
          mascota.estado === 'Adoptado' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'}`}>
        {mascota.estado}
      </span>
    </div>
  )
}

