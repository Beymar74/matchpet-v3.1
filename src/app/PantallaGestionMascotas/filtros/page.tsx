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
    <div className="pt-[80px] min-h-screen bg-white text-gray-900 transition-colors duration-500">
      <Header />

      <main className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">🔍 Filtros Avanzados</h1>
        <p className="mb-6 text-sm text-gray-700">
          Usa los siguientes filtros para buscar mascotas según tus preferencias:
        </p>

        <form
          className="bg-white text-gray-900 rounded-xl shadow-lg p-6 space-y-5"
          onSubmit={e => e.preventDefault()}
        >
          <div>
            <label className="block font-semibold text-[#30588C] mb-1">Edad</label>
            <select
              name="edad"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              value={filtros.edad}
              onChange={handleChange}
            >
              <option value="">-- Seleccionar --</option>
              <option value="cachorro">Cachorro</option>
