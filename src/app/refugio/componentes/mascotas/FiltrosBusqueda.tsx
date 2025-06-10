// src/app/refugio/componentes/mascotas/FiltrosBusqueda.tsx
'use client'

import React from 'react'
import { Search } from 'lucide-react'

interface FiltrosBusquedaProps {
  filtroTexto: string
  filtroEspecie: string
  filtroEstado: string
  onFiltroTextoChange: (texto: string) => void
  onFiltroEspecieChange: (especie: string) => void
  onFiltroEstadoChange: (estado: string) => void
}

const FiltrosBusqueda: React.FC<FiltrosBusquedaProps> = ({
  filtroTexto,
  filtroEspecie,
  filtroEstado,
  onFiltroTextoChange,
  onFiltroEspecieChange,
  onFiltroEstadoChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={filtroTexto}
            onChange={(e) => onFiltroTextoChange(e.target.value)}
            placeholder="Buscar mascota por nombre, raza..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C] focus:border-transparent"
          />
        </div>
        <div className="flex space-x-2">
          <select
            value={filtroEspecie}
            onChange={(e) => onFiltroEspecieChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C]"
          >
            <option value="">Todas las especies</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Otros">Otros</option>
          </select>
          <select
            value={filtroEstado}
            onChange={(e) => onFiltroEstadoChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C]"
          >
            <option value="">Todos los estados</option>
            <option value="Disponible">Disponible</option>
            <option value="En proceso">En proceso</option>
            <option value="Adoptado">Adoptado</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FiltrosBusqueda
