"use client"

import React, { useState } from "react"

interface FichaMedica {
  vacunas: string
  alergias: string
  enfermedades: string
  esterilizado: string
  notas: string
}

interface CrearFichaMedicaProps {
  isOpen: boolean
  onClose: () => void
  mascotaId?: number // opcional si luego quieres usarlo
}

export default function CrearFichaMedicaModal({ isOpen, onClose, mascotaId }: CrearFichaMedicaProps) {
  const [ficha, setFicha] = useState<FichaMedica>({
    vacunas: "",
    alergias: "",
    enfermedades: "",
    esterilizado: "",
    notas: "",
  })

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFicha(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("✅ Ficha médica registrada para mascota:", mascotaId, ficha)
    alert("Ficha médica registrada correctamente (simulado)")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white text-gray-900 p-6 rounded-xl shadow-xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-6 text-[#BF3952] text-center">
          🩺 Crear Ficha Médica
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Vacunas aplicadas</label>
            <textarea
              name="vacunas"
              value={ficha.vacunas}
              onChange={handleChange}
              rows={2}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Ej. Antirrábica, Parvovirus"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Alergias conocidas</label>
            <input
              type="text"
              name="alergias"
              value={ficha.alergias}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Ej. Polen, Pollo"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Enfermedades previas</label>
            <input
              type="text"
              name="enfermedades"
              value={ficha.enfermedades}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Ej. Moquillo, Dermatitis"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">¿Está esterilizado?</label>
            <select
              name="esterilizado"
              value={ficha.esterilizado}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option value="">Seleccionar una opción</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Notas adicionales</label>
            <textarea
              name="notas"
              value={ficha.notas}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="Ej. Tiene miedo a ruidos fuertes, necesita revisión mensual."
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded"
            >
              Guardar Ficha Médica
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
