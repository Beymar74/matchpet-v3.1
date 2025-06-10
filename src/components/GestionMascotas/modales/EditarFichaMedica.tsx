'use client'

import React, { useEffect, useState } from 'react'


interface EditarFichaMedicaProps {
  mascotaId: number
  onClose: () => void
}

export default function EditarFichaMedicaModal({ mascotaId, onClose }: EditarFichaMedicaProps) {
  const [ficha, setFicha] = useState<FichaMedica | null>(null)

  useEffect(() => {
    const encontrada = obtenerFichaMedicaPorId(mascotaId.toString())
    if (encontrada) setFicha({ ...encontrada })
  }, [mascotaId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!ficha) return
    const { name, value } = e.target
    setFicha({ ...ficha, [name]: value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!ficha) return
    const { checked } = e.target
    setFicha({ ...ficha, esterilizado: checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ficha) return

    const index = fichasMedicasSimuladas.findIndex(f => f.idMascota === mascotaId.toString())
    if (index !== -1) {
      fichasMedicasSimuladas[index] = ficha
      alert('✅ Ficha médica actualizada correctamente.')
      onClose()
    } else {
      alert('⚠️ No se encontró ficha para editar.')
    }
  }

  if (!ficha) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
      <div className="bg-white text-gray-900 p-6 rounded-xl shadow-xl w-full max-w-2xl relative">
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
            <label className="block font-semibold text-[#30588C] text-sm mb-1">¿Está esterilizado?</label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={ficha.esterilizado}
                onChange={handleCheckboxChange}
                className="accent-[#BF3952] w-5 h-5"
              />
              <span className="text-sm text-gray-700">Sí</span>
            </label>
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
