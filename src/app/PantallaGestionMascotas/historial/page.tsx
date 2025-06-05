'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/layout/HeaderRefugio'
import Link from 'next/link'

interface RegistroHistorial {
  fecha: string
  cambio: string
  responsable: string
}

export default function HistorialCambiosPage() {
  const [historial, setHistorial] = useState<RegistroHistorial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const res = await fetch('/api/historial')
        const data = await res.json()
        setHistorial(data)
      } catch (error) {
        console.error('Error al cargar historial:', error)
      } finally {
        setLoading(false)
      }
    }

    obtenerHistorial()
  }, [])

  return (
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">🕘 Historial de Cambios</h1>
        <p className="mb-6 text-sm text-gray-700 dark:text-white/80">
          A continuación se detallan los cambios realizados sobre las fichas de mascotas:
        </p>

        {loading ? (
          <p className="text-sm text-gray-600 dark:text-white/60">Cargando historial...</p>
        ) : historial.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-white/60">No se encontraron registros.</p>
        ) : (
          <div className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#6093BF] text-white">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Cambio</th>
                  <th className="px-4 py-3">Responsable</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((registro, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0
                      ? 'bg-gray-100 dark:bg-[#2a2a2a]'
                      : 'bg-white dark:bg-[#1a1a1a]'
                      } border-t border-gray-200 dark:border-gray-700`}
                  >
                    <td className="px-4 py-2">{registro.fecha}</td>
                    <td className="px-4 py-2">{registro.cambio}</td>
                    <td className="px-4 py-2">{registro.responsable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-sm">
          <Link href="/PantallaGestionMascotas" className="text-[#6093BF] hover:underline">
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}
