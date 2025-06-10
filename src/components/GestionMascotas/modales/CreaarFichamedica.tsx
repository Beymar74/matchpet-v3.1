'use client'

import React, { useState } from 'react'

interface CrearFichaMedicaProps {
  mascotaId: number
  onClose: () => void
  onFichaGuardada: () => void
}

const vacunasOpciones = ['Rabia', 'Moquillo', 'Parvovirus', 'Triple felina']
const tiposCirugia = ['Esterilización', 'Fractura', 'Tumor', 'Otro']

export default function CrearFichaMedicaModal({ mascotaId, onClose, onFichaGuardada }: CrearFichaMedicaProps) {
  const [vacunasSeleccionadas, setVacunasSeleccionadas] = useState<string[]>([])
  const [tipoCirugia, setTipoCirugia] = useState('')
  const [fechaCirugia, setFechaCirugia] = useState('')
  const [fechaDesparasitacion, setFechaDesparasitacion] = useState('')

  const toggleSeleccion = (valor: string) => {
    setVacunasSeleccionadas((prev) =>
      prev.includes(valor) ? prev.filter(v => v !== valor) : [...prev, valor]
    )
  }

  const handleGuardar = async () => {
    try {
      const res = await fetch('/api/fichamedica/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idMascota: mascotaId,
          vacunas: vacunasSeleccionadas,
          tipoCirugia,
          fechaCirugia,
          fechaDesparasitacion
        })
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al registrar')

      alert('✅ Ficha médica registrada correctamente.')
      onFichaGuardada()
      onClose()
    } catch (error) {
      console.error('❌ Error al guardar ficha médica:', error)
      alert('❌ No se pudo registrar la ficha médica.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-xl w-full text-gray-900 shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500">✕</button>

        <h2 className="text-2xl font-bold mb-4 text-[#BF3952] text-center">
          ➕ Registro médico para mascota #{mascotaId}
        </h2>

        <div className="space-y-5">
          {/* Vacunas */}
          <div>
            <label className="font-semibold text-[#30588C]">Vacunas:</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {vacunasOpciones.map(v => (
                <label key={v} className="flex items-center gap-2">
                  <input type="checkbox" checked={vacunasSeleccionadas.includes(v)} onChange={() => toggleSeleccion(v)} />
                  {v}
                </label>
              ))}
            </div>
          </div>

          {/* Cirugía */}
          <div>
            <label className="font-semibold text-[#30588C]">Cirugía realizada:</label>
            <select value={tipoCirugia} onChange={e => setTipoCirugia(e.target.value)} className="w-full p-2 mt-2 border rounded">
              <option value="">Selecciona tipo</option>
              {tiposCirugia.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="date" className="w-full mt-2 border rounded p-2" value={fechaCirugia} onChange={e => setFechaCirugia(e.target.value)} />
          </div>

          {/* Desparasitación */}
          <div>
            <label className="font-semibold text-[#30588C]">Fecha de última desparasitación:</label>
            <input type="date" className="w-full mt-2 border rounded p-2" value={fechaDesparasitacion} onChange={e => setFechaDesparasitacion(e.target.value)} />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button onClick={onClose} className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">Cancelar</button>
            <button onClick={handleGuardar} className="px-6 py-2 bg-[#30588C] text-white rounded hover:opacity-90">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
