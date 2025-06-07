'use client'

import Link from 'next/link'
import { Mascota } from '@/data/mascotasSimuladas'

interface MascotaModalProps {
  mascota: Mascota
  onClose: () => void
}

export default function MascotaModal({ mascota, onClose }: MascotaModalProps) {
  const handleBackdropClick = () => {
    onClose()
  }

  const stopClickPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white text-gray-900 rounded-xl p-6 w-[90%] max-w-lg shadow-xl relative"
        onClick={stopClickPropagation}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600"
        >
          ✕
        </button>
        <img
          src={mascota.foto || '/img/no-image.jpg'}
          alt={mascota.nombre}
          className="w-full h-60 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{mascota.nombre}</h2>
        <p className="text-sm text-gray-700 mb-2">{mascota.descripcion}</p>
        <p><strong>Especie:</strong> {mascota.especie}</p>
        <p><strong>Raza:</strong> {mascota.raza}</p>
        <p><strong>Edad:</strong> {mascota.edad} años</p>
        <p><strong>Estado:</strong> {mascota.estado}</p>

        <div className="mt-4 flex flex-wrap justify-between gap-2">
          <Link href={`/PantallaGestionMascotas/editar/${mascota.id}`}>
            <button className="bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#254559] w-full sm:w-auto">Editar</button>
          </Link>
          <Link href={`/PantallaGestionMascotas/ficha-medica/${mascota.id}`}>
            <button className="bg-[#6093BF] text-white px-4 py-2 rounded hover:bg-[#30588C] w-full sm:w-auto">Ficha Médica</button>
          </Link>
          <Link href={`/PantallaGestionMascotas/eliminar/${mascota.id}`}>
            <button className="bg-[#BF3952] text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto">Eliminar</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

