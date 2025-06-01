'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function MarcarBorradorPage() {
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState('')
  const [mensaje, setMensaje] = useState('')

  const mascotasMock = [
    { id: '1', nombre: 'Max' },
    { id: '2', nombre: 'Luna' },
    { id: '3', nombre: 'Rocky' },
  ]

  const marcarComoBorrador = () => {
    if (mascotaSeleccionada) {
      setMensaje(`✅ Mascota "${mascotaSeleccionada}" marcada como borrador.`)
    } else {
      setMensaje('⚠️ Selecciona una mascota antes de continuar.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011526] via-[#254559] to-[#30588C] text-white">
      <Header />

      <main className="max-w-xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-4 text-[#BF3952]">
          📝 Marcar Publicación como Borrador
        </h1>
        <p className="text-white/80 text-sm mb-6">
          Usa esta opción para ocultar temporalmente una mascota que aún no deseas mostrar al público.
        </p>

        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg space-y-5">
          <div>
            <label className="block font-semibold text-[#30588C] mb-1">
              Selecciona una mascota
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              value={mascotaSeleccionada}
              onChange={(e) => setMascotaSeleccionada(e.target.value)}
            >
              <option value="">-- Elegir --</option>
              {mascotasMock.map((m) => (
                <option key={m.id} value={m.nombre}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={marcarComoBorrador}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded transition"
          >
            🕳️ Marcar como Borrador
          </button>

          {mensaje && (
            <div
              className={`mt-4 text-sm font-medium rounded p-3 ${
                mensaje.startsWith('✅')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {mensaje}
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-white/90">
          <Link href="/Modulo_6-Gestion_de_Mascotas" className="hover:underline text-[#6093BF]">
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}
