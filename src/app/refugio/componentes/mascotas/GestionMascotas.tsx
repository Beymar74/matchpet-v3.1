// src/app/refugio/componentes/mascotas/GestionMascotas.tsx
'use client'

import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import FiltrosBusqueda from './FiltrosBusqueda'
import TarjetaMascota from './TarjetaMascota'
import ModalMascota from './ModalMascota'
import { Mascota } from '../../tipos'

interface GestionMascotasProps {
  mascotas: Mascota[]
}

const GestionMascotas: React.FC<GestionMascotasProps> = ({ mascotas }) => {
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<Mascota | null>(null)

  return (
    <div className="space-y-6">
      {/* Header con botón agregar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-[#011526]">Gestión de Mascotas</h2>
        <button className="bg-[#BF3952] text-white px-4 py-2 rounded-lg hover:bg-[#254559] flex items-center space-x-2">
          <PlusCircle className="h-5 w-5" />
          <span>Agregar Mascota</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <FiltrosBusqueda />

      {/* Lista de mascotas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas.map((mascota) => (
          <TarjetaMascota
            key={mascota.id}
            mascota={mascota}
            onClick={() => setMascotaSeleccionada(mascota)}
          />
        ))}
      </div>

      {/* Modal */}
      {mascotaSeleccionada && (
        <ModalMascota
          mascota={mascotaSeleccionada}
          onClose={() => setMascotaSeleccionada(null)}
        />
      )}
    </div>
  )
}

export default GestionMascotas
