'use client'

import React, { useState, useEffect } from 'react'

interface Filtros {
  edad: string
  especie: string
  tamaño: string
  estado: string
}

interface Props {
  onAplicar: (filtros: Filtros) => void
}

export default function FiltrosAvanzadosCompact({ onAplicar }: Props) {
  const [filtros, setFiltros] = useState<Filtros>({
    edad: '',
    especie: '',
    tamaño: '',
    estado: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevosFiltros = { ...filtros, [e.target.name]: e.target.value }
    setFiltros(nuevosFiltros)
    onAplicar(nuevosFiltros)
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div>
        <label className="block text-gray-700 mb-1 font-medium">Edad</label>
        <select
          name="edad"
          value={filtros.edad}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Todas</option>
          <option value="cachorro">Cachorro</option>
          <option value="adulto">Adulto</option>
          <option value="anciano">Anciano</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1 font-medium">Especie</label>
        <select
          name="especie"
          value={filtros.especie}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Todas</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1 font-medium">Tamaño</label>
        <select
          name="tamaño"
          value={filtros.tamaño}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Todos</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1 font-medium">Estado</label>
        <select
          name="estado"
          value={filtros.estado}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Todos</option>
          <option value="Disponible">Disponible</option>
          <option value="Adoptado">Adoptado</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Necesidades Especiales">Necesidades Especiales</option>
        </select>
      </div>
    </div>
  )
}

