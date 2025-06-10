'use client'

import { useEffect, useState } from 'react'
import { Mascota } from '../../../app/refugio/tipos'
import EditarMascota from './EditarMascota'
import CrearFichamedica from './CreaarFichamedica'
import FichaMedica from './FichaMedica'

interface ModalMascotaProps {
  mascota: Mascota
  onClose: () => void
}

export default function ModalMascota({ mascota, onClose }: ModalMascotaProps) {
  const [pantalla, setPantalla] = useState<'modal' | 'editar' | 'ficha' | 'crearFicha'>('modal')
  const [mascotaActualizada, setMascotaActualizada] = useState<Mascota>(mascota)
  const [fichaExiste, setFichaExiste] = useState(false)

  useEffect(() => {
    const fichas = JSON.parse(localStorage.getItem('fichasMedicas') || '[]')
    const encontrada = fichas.find((f: any) => f.idMascota === mascotaActualizada.id.toString())
    setFichaExiste(!!encontrada)
  }, [mascotaActualizada.id])

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

  // ⚠️ MOVER estas pantallas antes del return principal
  if (pantalla === 'editar') {
    return (
      <EditarMascota
        id={mascotaActualizada.id}
        modoModal
        onClose={() => setPantalla('modal')}
        onGuardar={(mascotaEditada) => {
          setMascotaActualizada(mascotaEditada)
          setPantalla('modal')
        }}
      />
    )
  }

  if (pantalla === 'ficha') {
    return (
      <FichaMedica
        mascotaId={mascotaActualizada.id}
        onClose={() => setPantalla('modal')}
      />
    )
  }

  if (pantalla === 'crearFicha') {
    return (
      <CrearFichamedica
        mascotaId={mascotaActualizada.id}
        onClose={() => setPantalla('modal')}
        onFichaGuardada={() => {
          setFichaExiste(true)
          setPantalla('ficha')
        }}
      />
    )
  }

  // Pantalla modal por defecto
  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white text-gray-900 rounded-xl p-6 w-[90%] max-w-lg shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ✕
        </button>

        {/* Imagen */}
        <div className="relative mb-4 w-full h-70 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
          {mascotaActualizada.foto.startsWith('http') ? (
            <img
              src={mascotaActualizada.foto}
              alt={mascotaActualizada.nombre}
              className="object-contain max-h-full max-w-full"
            />
          ) : (
            <div className="text-6xl">{mascotaActualizada.foto}</div>
          )}
          <span
            className={`absolute top-2 left-2 text-sm px-3 py-1 rounded-full font-semibold shadow ${getEstadoColor(mascotaActualizada.estado)}`}
          >
            {mascotaActualizada.estado}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2">{mascotaActualizada.nombre}</h2>

        <div className="text-lg text-gray-700 space-y-1 mb-3">
          <p><strong>Especie:</strong> {mascotaActualizada.especie}</p>
          <p><strong>Raza:</strong> {mascotaActualizada.raza}</p>
          <p><strong>Edad:</strong> {mascotaActualizada.edad}</p>
          <p><strong>Ingreso:</strong> {mascotaActualizada.fechaIngreso ?? 'No registrado'}</p>
        </div>

        {/* Datos extra */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-medium mb-4">
          <div className="bg-gray-100 rounded p-2">
            <p className="text-gray-600">Compatibilidad</p>
            <p className="text-[#30588C] font-bold text-lg">{mascotaActualizada.compatibilidad ?? 0}%</p>
          </div>

          <div className="bg-gray-100 rounded p-2">
            <p className="text-gray-600">Solicitudes</p>
            <p className="text-[#BF3952] font-bold text-lg">{mascotaActualizada.solicitudes ?? 0}</p>
          </div>

          <div className="bg-gray-100 rounded p-2">
            <p className="text-gray-600">Adoptabilidad</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
              <div
                className={`h-4 rounded-full text-white text-xs text-center`}
                style={{
                  width: `${mascotaActualizada.adoptabilidad ?? 0}%`,
                  backgroundColor:
                    (mascotaActualizada.adoptabilidad ?? 0) > 70
                      ? '#4CAF50'
                      : (mascotaActualizada.adoptabilidad ?? 0) > 40
                      ? '#FFB800'
                      : '#F44336'
                }}
              >
                {mascotaActualizada.adoptabilidad ?? 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-between">
          <button
            onClick={() => setPantalla('editar')}
            className="flex items-center justify-center gap-2 bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#254559] w-full sm:w-1/3"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => setPantalla(fichaExiste ? 'ficha' : 'crearFicha')}
            className="flex items-center justify-center gap-2 bg-[#6093BF] text-white px-4 py-2 rounded hover:bg-[#30588C] w-full sm:w-1/3"
          >
            🩺 Ficha Médica
          </button>
          <button
            onClick={() => alert('🗑️ Esta funcionalidad se implementará más adelante')}
            className="flex items-center justify-center gap-2 bg-[#BF3952] text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-1/3"
          >
            🗑️ Borrar
          </button>
        </div>
      </div>
    </div>
  )
}
