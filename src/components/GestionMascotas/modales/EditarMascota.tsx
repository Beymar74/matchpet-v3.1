'use client'

import React, { useState, useEffect } from 'react'

interface FichaMedica {
  idMascota: string
  vacunas: string
  alergias: string
  enfermedades: string
  esterilizado: string
  notas: string
}

interface Props {
  mascotaId: number
  onClose: () => void
}

export default function EditarFichaMedicaModal({ mascotaId, onClose }: Props) {
  const [formData, setFormData] = useState<FichaMedica | null>(null)

  useEffect(() => {
    const fichas: FichaMedica[] = JSON.parse(localStorage.getItem('fichasMedicas') || '[]')

    const encontrada = fichas.find((ficha) =>
      ficha?.idMascota !== undefined && Number(ficha.idMascota) === mascotaId
    )

    if (encontrada) {
      setFormData({ ...encontrada })
    }
  }, [mascotaId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formData) return
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    const fichas: FichaMedica[] = JSON.parse(localStorage.getItem('fichasMedicas') || '[]')
    const index = fichas.findIndex((ficha) =>
      ficha?.idMascota !== undefined && Number(ficha.idMascota) === mascotaId
    )

    if (index !== -1) {
      fichas[index] = formData
      localStorage.setItem('fichasMedicas', JSON.stringify(fichas))
      alert('✅ Ficha médica actualizada correctamente.')
      onClose()
    }
  }

  if (!formData) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div
        className="relative w-full max-w-3xl bg-white text-gray-900 rounded-xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#30588C] text-center">✏️ Editar Ficha Médica</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField label="Vacunas" name="vacunas" value={formData.vacunas} onChange={handleChange} />
          <TextField label="Alergias" name="alergias" value={formData.alergias} onChange={handleChange} />
          <TextField label="Enfermedades" name="enfermedades" value={formData.enfermedades} onChange={handleChange} />

          <div>
            <label className="block text-sm font-semibold text-[#30588C] mb-1">Esterilizado</label>
            <select
              name="esterilizado"
              value={formData.esterilizado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
            >
              <option value="">Seleccionar...</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>

          <TextField
            label="Notas"
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            isTextArea
          />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded transition"
            >
              💾 Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TextField({
  label,
  name,
  value,
  onChange,
  isTextArea = false
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isTextArea?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#30588C] mb-1">{label}</label>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
        />
      )}
    </div>
  )
}
