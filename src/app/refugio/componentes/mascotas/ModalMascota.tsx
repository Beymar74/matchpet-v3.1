'use client'

import Link from 'next/link'
import { Mascota } from '../../tipos'

interface ModalMascotaProps {
  mascota: Mascota
  onClose: () => void
}

export default function ModalMascota({ mascota, onClose }: ModalMascotaProps) {
  const handleBackdropClick = () => onClose()
  const stopClickPropagation = (e: React.MouseEvent) => e.stopPropagation()

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
      className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white text-gray-900 rounded-xl p-6 w-[90%] max-w-lg shadow-xl relative"
        onClick={stopClickPropagation}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="flex justify-between items-start mb-2">
          <div className="text-6xl">{mascota.foto}</div>
          <span
            className={`text-sm px-3 py-1 rounded-full font-semibold ${getEstadoColor(
              mascota.estado
            )}`}
          >
            {mascota.estado}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2">{mascota.nombre}</h2>

        <div className="text-sm text-gray-700 space-y-1 mb-3">
          <p><span className="font-medium">Especie:</span> {mascota.especie}</p>
          <p><span className="font-medium">Raza:</span> {mascota.raza}</p>
          <p><span className="font-medium">Edad:</span> {mascota.edad}</p>
          <p><span className="font-medium">Ingreso:</span> {mascota.fechaIngreso}</p>
        </div>

        <div className="flex justify-between text-sm font-medium mb-4">
          <p>
            Compatibilidad promedio:{' '}
            <span className="text-[#30588C] font-bold">{mascota.compatibilidad ?? 0}%</span>
          </p>
          <p>
            Solicitudes:{' '}
            <span className="text-[#BF3952] font-bold">{mascota.solicitudes ?? 0}</span>
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap justify-between gap-2">
          <Link href={`@/app/refugio/componentes/mascotas/EditarMascota`}>
            <button className="bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#254559] w-full sm:w-auto">
              Editar
            </button>
          </Link>
          <Link href={`/PantallaGestionMascotas/ficha-medica/${mascota.id}`}>
            <button className="bg-[#6093BF] text-white px-4 py-2 rounded hover:bg-[#30588C] w-full sm:w-auto">
              Ficha Médica
            </button>
          </Link>
          <Link href={`/PantallaGestionMascotas/eliminar/${mascota.id}`}>
            <button className="bg-[#BF3952] text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto">
              Eliminar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}


