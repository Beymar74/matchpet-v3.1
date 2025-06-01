'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'

export default function FiltrosAvanzadosPage() {
  const [filtros, setFiltros] = useState({
    edad: '',
    especie: '',
    tamaño: '',
    estado: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value })
  }

  const aplicarFiltros = () => {
    console.log('Filtros aplicados:', filtros)
    // Aquí iría la lógica para consultar en Firebase o filtrar una lista
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <Header />

      <main className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">🔍 Filtros Avanzados</h1>
        <p className="mb-6 text-sm text-gray-700 dark:text-white/80">
          Usa los siguientes filtros para buscar mascotas según tus preferencias:
        </p>

        <form
          className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-xl shadow-lg p-6 space-y-5"
          onSubmit={e => e.preventDefault()}
        >
          <div>
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] mb-1">Edad</label>
            <select
              name="edad"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2a2a2a]"
              value={filtros.edad}
              onChange={handleChange}
            >
              <option value="">-- Seleccionar --</option>
              <option value="cachorro">Cachorro</option>
              <option value="adulto">Adulto</option>
              <option value="anciano">Anciano</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] mb-1">Especie</label>
            <select
              name="especie"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2a2a2a]"
              value={filtros.especie}
              onChange={handleChange}
            >
              <option value="">-- Seleccionar --</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] mb-1">Tamaño</label>
            <select
              name="tamaño"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2a2a2a]"
              value={filtros.tamaño}
              onChange={handleChange}
            >
              <option value="">-- Seleccionar --</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] mb-1">Estado</label>
            <select
              name="estado"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-[#2a2a2a]"
              value={filtros.estado}
              onChange={handleChange}
            >
              <option value="">-- Seleccionar --</option>
              <option value="Disponible">Disponible</option>
              <option value="Adoptado">Adoptado</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Necesidades Especiales">Necesidades Especiales</option>
            </select>
          </div>

          <button
            type="button"
            onClick={aplicarFiltros}
            className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-5 py-2 rounded transition"
          >
            Aplicar Filtros
          </button>
        </form>

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
