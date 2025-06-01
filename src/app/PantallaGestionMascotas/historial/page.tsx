'use client'

import React from 'react'
import Header from '@/components/layout/Header'
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
    <div className="min-h-screen bg-gradient-to-br from-[#011526] via-[#254559] to-[#30588C] text-white">
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">🕘 Historial de Cambios</h1>
        <p className="mb-6 text-sm text-white/80">
          A continuación se detallan los cambios realizados sobre las fichas de mascotas:
        </p>

        <div className="bg-white text-gray-900 rounded-xl shadow-lg overflow-x-auto">
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
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-t`}
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
            href="/Modulo_6-Gestion_de_Mascotas"
            className="text-[#6093BF] hover:underline"
          >
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}
