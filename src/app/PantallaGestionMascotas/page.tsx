'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import HeaderRefugio from '@/components/layout/HeaderRefugio'
import { mascotasSimuladas } from '@/data/mascotasSimuladas'
import TarjetaMascota from '@/components/GestionMascotas/TarjetaMascota'
import ModalMascota from '@/components/GestionMascotas/modales/ModalMascota'
import RegistrarMascota from '@/components/GestionMascotas/modales/RegistrarMascota'
import FiltrosAvanzados from '@/components/GestionMascotas/FiltrosAvanzados' // ✅ IMPORTACIÓN

const GestionMascotas: React.FC = () => {
  const [mascotaSeleccionadaId, setMascotaSeleccionadaId] = useState<number | null>(null)
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false)
  const [filtros, setFiltros] = useState({
    edad: '',
    especie: '',
    tamaño: '',
    estado: '',
  })

  const router = useRouter()

  const aplicarFiltros = (f: typeof filtros) => {
    setFiltros(f)
  }

  const mascotasFiltradas = mascotasSimuladas.filter((m) => {
    return (
      (!filtros.edad || m.edad?.toLowerCase().includes(filtros.edad)) &&
      (!filtros.especie || m.especie?.toLowerCase() === filtros.especie) &&
      (!filtros.tamaño || m.tamaño?.toLowerCase() === filtros.tamaño) &&
      (!filtros.estado || m.estado?.toLowerCase() === filtros.estado.toLowerCase())
    )
  })

  const mascotaSeleccionada = mascotasSimuladas.find(m => m.id === mascotaSeleccionadaId)

  return (
    <>
      <HeaderRefugio />
      <div className="min-h-screen bg-white text-gray-900 pt-[80px]">
        <main className="max-w-6xl mx-auto py-10 px-6 space-y-8">

          {/* Título */}
          <h1 className="text-4xl font-bold text-[#BF3952]">🐾 Gestión de Mascotas</h1>

          {/* Botones principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setModalRegistroAbierto(true)}
              className="bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] hover:from-[#BF3952] hover:to-[#30588C] text-white p-4 rounded-lg shadow-lg text-center font-medium transition-all duration-300"
            >
              ➕ Registrar Nueva Mascota
            </button>

            <Link
              href="/PantallaGestionMascotas/ficha-medica"
              className="bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] hover:from-[#BF3952] hover:to-[#30588C] text-white p-4 rounded-lg shadow-lg text-center font-medium transition-all duration-300"
            >
              🩺 Ficha Médica
            </Link>

            <Link
              href="/PantallaGestionMascotas/historial"
              className="bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] hover:from-[#BF3952] hover:to-[#30588C] text-white p-4 rounded-lg shadow-lg text-center font-medium transition-all duration-300"
            >
              🕘 Historial de Cambios
            </Link>

            <Link
              href="/PantallaGestionMascotas/multimedia"
              className="bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] hover:from-[#BF3952] hover:to-[#30588C] text-white p-4 rounded-lg shadow-lg text-center font-medium transition-all duration-300"
            >
              📸 Gestión de Multimedia
            </Link>

            <Link
              href="/PantallaGestionMascotas/borrador"
              className="bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] hover:from-[#BF3952] hover:to-[#30588C] text-white p-4 rounded-lg shadow-lg text-center font-medium transition-all duration-300"
            >
              📝 Marcar como Borrador
            </Link>
          </div>

          {/* Filtros Avanzados */}
          <div className="mt-6">
            <FiltrosAvanzados onAplicar={aplicarFiltros} />
          </div>

          {/* Mascotas registradas */}
          <h2 className="text-2xl font-semibold mt-10">Mascotas Registradas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mascotasFiltradas.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No se encontraron mascotas con los filtros aplicados.</p>
            ) : (
              mascotasFiltradas.map((mascota) => (
                <TarjetaMascota
                  key={mascota.id}
                  id={mascota.id}
                  onClick={() => setMascotaSeleccionadaId(mascota.id)}
                />
              ))
            )}
          </div>
        </main>

        {/* Modales */}
        {mascotaSeleccionada && (
          <ModalMascota
            mascota={mascotaSeleccionada}
            onClose={() => setMascotaSeleccionadaId(null)}
          />
        )}

        {modalRegistroAbierto && (
          <RegistrarMascota onClose={() => setModalRegistroAbierto(false)} />
        )}
      </div>
    </>
  )
}

export default GestionMascotas
