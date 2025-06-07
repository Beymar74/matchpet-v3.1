'use client'

import React, { useEffect, useState } from 'react'
import HeaderRefugio from '@/components/layout/HeaderRefugio'
import { mascotasSimuladas, Mascota } from '@/data/mascotasSimuladas'
import CardOpcion from '@/app/PantallaGestionMascotas/componentes/CardOpcion'
import CardMascota from '@/app/PantallaGestionMascotas/componentes/CardMascota'
import MascotaModal from '@/app/PantallaGestionMascotas/componentes/MascotaModal'

export default function GestionMascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([])
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<Mascota | null>(null)

  useEffect(() => {
    setMascotas(mascotasSimuladas)
  }, [])

  const opciones = [
    { href: '/Registrar', icon: '➕', label: 'Registrar Nueva Mascota' },
    { href: '/ficha-medica', icon: '🩺', label: 'Ficha Médica' },
    { href: '/historial', icon: '🕘', label: 'Historial de Cambios' },
    { href: '/filtros', icon: '🔍', label: 'Filtros Avanzados' },
    { href: '/multimedia', icon: '📸', label: 'Gestión de Multimedia' },
    { href: '/borrador', icon: '📝', label: 'Marcar como Borrador' }
  ]

  return (
    <>
      <HeaderRefugio />
      <div className="min-h-screen bg-white text-gray-900 pt-[80px]">
        <main className="max-w-6xl mx-auto py-10 px-6">
          <h1 className="text-4xl font-bold mb-6 text-[#BF3952]">🐾 Gestión de Mascotas</h1>
          <p className="mb-6 text-lg text-gray-700">Selecciona una funcionalidad:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {opciones.map((op) => (
              <CardOpcion key={op.href} {...op} />
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-6">Mascotas Registradas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mascotas.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No hay mascotas registradas.</p>
            ) : (
              mascotas.map((mascota) => (
                <CardMascota key={mascota.id} mascota={mascota} onClick={() => setMascotaSeleccionada(mascota)} />
              ))
            )}
          </div>
        </main>

        {mascotaSeleccionada && (
          <MascotaModal mascota={mascotaSeleccionada} onClose={() => setMascotaSeleccionada(null)} />
        )}
      </div>
    </>
  )
}
