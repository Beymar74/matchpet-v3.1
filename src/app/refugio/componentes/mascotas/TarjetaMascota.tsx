'use client'

import React from 'react'
import { Mascota } from '../../tipos'

interface TarjetaMascotaProps {
  mascota: Mascota
  onClick: () => void
}

const TarjetaMascota: React.FC<TarjetaMascotaProps> = ({ mascota, onClick }) => {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible':
        return 'bg-green-100 text-green-800'
      case 'En proceso':
        return 'bg-yellow-100 text-yellow-800'
      case 'Adoptado':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-4xl">{mascota.foto}</div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(mascota.estado)}`}>
            {mascota.estado}
          </span>
        </div>

        <h3 className="font-bold text-lg text-[#011526] mb-2">{mascota.nombre}</h3>

        <div className="space-y-1 text-sm text-gray-600">
          <p><span className="font-medium">Especie:</span> {mascota.especie}</p>
          <p><span className="font-medium">Raza:</span> {mascota.raza}</p>
          <p><span className="font-medium">Edad:</span> {mascota.edad}</p>
          <p><span className="font-medium">Ingreso:</span> {mascota.fechaIngreso ?? 'No registrado'}</p>
        </div>
      </div>
    </div>
  )
}

export default TarjetaMascota

