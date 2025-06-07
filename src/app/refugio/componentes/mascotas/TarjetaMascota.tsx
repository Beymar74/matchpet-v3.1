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
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer text-gray-700"
    >
      {/* Encabezado con icono y estado */}
      <div className="flex justify-between items-start mb-2">
        <div className="text-4xl">{mascota.foto}</div>
        <span className={`text-sm px-3 py-1 rounded-full font-semibold ${getEstadoColor(mascota.estado)}`}>
          {mascota.estado}
        </span>
      </div>

      {/* Nombre */}
      <h3 className="font-bold text-lg text-[#011526] mb-2">{mascota.nombre}</h3>

      {/* Detalles */}
      <div className="text-sm space-y-1 mb-3">
        <p><span className="font-medium">Especie:</span> {mascota.especie}</p>
        <p><span className="font-medium">Raza:</span> {mascota.raza}</p>
        <p><span className="font-medium">Edad:</span> {mascota.edad}</p>
        <p><span className="font-medium">Ingreso:</span> {mascota.fechaIngreso ?? 'No registrado'}</p>
      </div>

      {/* Compatibilidad y Solicitudes */}
      <div className="flex justify-between text-sm font-medium">
        <p>
          <span className="text-gray-500">Compatibilidad promedio:</span>{' '}
          <span className="text-[#30588C] font-bold">{mascota.compatibilidad ?? 0}%</span>
        </p>
        <p>
          <span className="text-gray-500">Solicitudes:</span>{' '}
          <span className="text-[#BF3952] font-bold">{mascota.solicitudes ?? 0}</span>
        </p>
      </div>
    </div>
  )
}

export default TarjetaMascota
