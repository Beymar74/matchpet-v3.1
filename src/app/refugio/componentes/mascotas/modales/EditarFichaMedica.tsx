"use client"

import React, { useState, useEffect } from "react"

interface FichaMedica {
  idMascota: string
  vacunas: string
  alergias: string
  enfermedades: string
  esterilizado: string
  notas: string
}

interface EditarFichaMedicaProps {
  isOpen: boolean
  onClose: () => void
  mascotaId: string
}

const mockFichas: FichaMedica[] = [
  {
    idMascota: "1",
    vacunas: "Rabia, Moquillo",
    alergias: "Polen",
    enfermedades: "Ninguna",
    esterilizado: "Sí",
    notas: "Revisión mensual",
  },
  {
    idMascota: "2",
    vacunas: "Triple felina",
    alergias: "Pollo",
    enfermedades: "Dermatitis",
    esterilizado: "No",
    notas: "Usar shampoo especial",
  },
]

export default function EditarFichaMedicaModal({ isOpen, onClose, mascotaId }: EditarFichaMedicaProps) {
  const [ficha, setFicha] = useState<FichaMedica | null>(null)

  useEffect(() => {
    if (isOpen) {
      const encontrada = mockFichas.find((f) => f.idMascota === mascotaId)
      if (encontrada) setFicha({ ...encontrada })
    }
  }, [isOpen, mascotaId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!ficha) return
    const { name, value } = e.target
    setFicha((prev) => prev ? { ...prev, [name]: value } : null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ficha) return

    console.log("✅ Ficha médica actualizada:", ficha)
    alert("Ficha médica actualizada correctamente (simulado)")
    onClose()
  }

  if (!isOpen || !ficha) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-6 rounded-xl shadow-xl w-full max-w-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-6 text-[#BF3952] text-center">
          ✏️ Editar Ficha Médica
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
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
