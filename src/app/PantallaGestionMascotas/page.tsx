'use client'

import React, { useState } from 'react'
import HeaderRefugio from '@/components/layout/HeaderRefugio'
import { mascotasSimuladas } from '@/data/mascotasSimuladas'
import CardOpcion from '@/app/PantallaGestionMascotas/componentes/CardOpcion'
import TarjetaMascota from '@/components/GestionMascotas/TarjetaMascota'
import ModalMascota from '@/components/GestionMascotas/modales/ModalMascota'
import RegistrarMascota from '@/components/GestionMascotas/modales/RegistrarMascota'

const GestionMascotas: React.FC = () => {
  const [mascotaSeleccionadaId, setMascotaSeleccionadaId] = useState<number | null>(null)
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false)

  const mascotaSeleccionada = mascotasSimuladas.find(m => m.id === mascotaSeleccionadaId)

  const opciones = [
    { href: '#', icon: '➕', label: 'Registrar Nueva Mascota', action: () => setModalRegistroAbierto(true) },
    { href: '/ficha-medica', icon: '🩺', label: 'Ficha Médica' },
    { href: '/historial', icon: '🕘', label: 'Historial de Cambios' },
    { href: '/filtros', icon: '🔍', label: 'Filtros Avanzados' },
    { href: '/multimedia', icon: '📸', label: 'Gestión de Multimedia' },
    { href: '/borrador', icon: '📝', label: 'Marcar como Borrador' }
  ]

  const handleOpcionClick = (op: typeof opciones[0]) => {
    if (op.action) {
      op.action()
    } else {
      window.location.href = op.href
    }
  }

  return (
    <>
      <HeaderRefugio />
      <div className="min-h-screen bg-white text-gray-900 pt-[80px]">
        <main className="max-w-6xl mx-auto py-10 px-6 space-y-8">

          {/* Título sin botón */}
          <h1 className="text-4xl font-bold text-[#BF3952]">🐾 Gestión de Mascotas</h1>

          {/* Opciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {opciones.map((op) => (
              <div key={op.label} onClick={() => handleOpcionClick(op)}>
                <CardOpcion href={op.href} icon={op.icon} label={op.label} />
              </div>
            ))}
          </div>

          {/* Lista de tarjetas */}
          <h2 className="text-2xl font-semibold mt-10">Mascotas Registradas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mascotasSimuladas.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No hay mascotas registradas.</p>
            ) : (
              mascotasSimuladas.map((mascota) => (
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
