'use client'

import { useState } from 'react'
import { Mascota } from '../../../app/refugio/tipos'
import EditarMascota from './EditarMascota'
import CrearFichamedica from './CreaarFichamedica'
import FichaMedica from './FichaMedica'

interface ModalMascotaProps {
  mascota: Mascota
  onClose: () => void
}

const fichasRegistradas = ['1', '2']

export default function ModalMascota({ mascota, onClose }: ModalMascotaProps) {
  const [mostrarEditar, setMostrarEditar] = useState(false)
  const [mostrarFicha, setMostrarFicha] = useState(false)
  const [mostrarCrearFicha, setMostrarCrearFicha] = useState(false)

  const handleFichaClick = () => {
    if (fichasRegistradas.includes(mascota.id.toString())) {
      setMostrarFicha(true)
    } else {
      setMostrarCrearFicha(true)
    }
  }

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

  if (mostrarEditar) return <EditarMascota mascota={mascota} onClose={() => setMostrarEditar(false)} />
  if (mostrarFicha) return <FichaMedica mascotaId={mascota.id} onClose={() => setMostrarFicha(false)} />
  if (mostrarCrearFicha) return <CrearFichamedica mascota={mascota} onClose={() => setMostrarCrearFicha(false)} />

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

        <div className="relative mb-4 w-full h-70 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
          {mascota.foto.startsWith('http') ? (
            <img
              src={mascota.foto}
              alt={mascota.nombre}
              className="object-contain max-h-full max-w-full"
            />
          ) : (
            <div className="text-6xl">{mascota.foto}</div>
          )}
          <span
            className={`absolute top-2 left-2 text-sm px-3 py-1 rounded-full font-semibold shadow ${getEstadoColor(mascota.estado)}`}
          >
            {mascota.estado}
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2">{mascota.nombre}</h2>

        <div className="text-lg text-gray-700 space-y-1 mb-3">
          <p><span className="text-lg">Especie:</span> {mascota.especie}</p>
          <p><span className="text-lg">Raza:</span> {mascota.raza}</p>
          <p><span className="text-lg">Edad:</span> {mascota.edad}</p>
          <p><span className="text-lg">Ingreso:</span> {mascota.fechaIngreso ?? 'No registrado'}</p>
        </div>

        <div className="flex justify-between text-lg font-medium mb-4">
          <p>
            Compatibilidad promedio:{' '}
            <span className="text-[#30588C] font-bold">{mascota.compatibilidad ?? 0}%</span>
          </p>
          <p>
            Solicitudes:{' '}
            <span className="text-[#BF3952] font-bold">{mascota.solicitudes ?? 0}</span>
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-between">
          <button
            onClick={() => setMostrarEditar(true)}
            className="flex items-center justify-center gap-2 bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#254559] w-full sm:w-1/3"
          >
            <span>✏️</span>
            <span>Editar</span>
          </button>
          <button
            onClick={handleFichaClick}
            className="flex items-center justify-center gap-2 bg-[#6093BF] text-white px-4 py-2 rounded hover:bg-[#30588C] w-full sm:w-1/3"
          >
            <span>🩺</span>
            <span>Ficha Médica</span>
          </button>
          <button
            onClick={() => alert('Funcionalidad de borrado pendiente')}
            className="flex items-center justify-center gap-2 bg-[#BF3952] text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-1/3"
          >
            <span>🗑️</span>
            <span>Poner como Borrado</span>
          </button>
        </div>
      </div>
    </div>
  )
}
