'use client'

import React from 'react'
import Header from '@/components/Header'
import Link from 'next/link'

export default function HistorialCambiosPage() {
  const historialMock = [
    {
      fecha: '2025-05-28',
      cambio: 'Actualización de ficha médica',
      responsable: 'admin_refugio01',
    },
    {
      fecha: '2025-05-25',
      cambio: 'Mascota marcada como adoptada',
      responsable: 'coordinador_adopciones',
    },
    {
      fecha: '2025-05-22',
      cambio: 'Nueva mascota registrada',
      responsable: 'voluntario_ingreso',
    },
  ]

  return (
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">🕘 Historial de Cambios</h1>
        <p className="mb-6 text-sm text-gray-700 dark:text-white/80">
          A continuación se detallan los cambios realizados sobre las fichas de mascotas:
        </p>

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
              {historialMock.map((registro, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-100 dark:bg-[#2a2a2a]' : 'bg-white dark:bg-[#1a1a1a]'} border-t border-gray-200 dark:border-gray-700`}
                >
                  <td className="px-4 py-2">{registro.fecha}</td>
                  <td className="px-4 py-2">{registro.cambio}</td>
                  <td className="px-4 py-2">{registro.responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm">
          <Link
            href="/PantallaGestionMascotas"
            className="text-[#6093BF] hover:underline"
          >
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}