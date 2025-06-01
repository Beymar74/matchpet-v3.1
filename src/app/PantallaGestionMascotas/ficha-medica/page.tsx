'use client'

import React from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function FichaMedicaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011526] via-[#254559] to-[#30588C] text-white">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">🩺 Ficha Médica de la Mascota</h1>
        <p className="mb-6 text-white/80 text-sm">
          Aquí se muestra la información médica básica registrada para cada mascota.
        </p>

        {/* Ficha médica simulada */}
        <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 space-y-4">
          <div>
            <strong className="text-[#30588C]">Nombre:</strong> Max
          </div>
          <div>
            <strong className="text-[#30588C]">Especie:</strong> Perro
          </div>
          <div>
            <strong className="text-[#30588C]">Edad:</strong> 3 años
          </div>
          <div>
            <strong className="text-[#30588C]">Estado de salud:</strong> Vacunado, sin enfermedades actuales
          </div>
          <div>
            <strong className="text-[#30588C]">Vacunas:</strong> Rabia, Moquillo, Parvovirus
          </div>
          <div>
            <strong className="text-[#30588C]">Esterilizado:</strong> Sí
          </div>
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
