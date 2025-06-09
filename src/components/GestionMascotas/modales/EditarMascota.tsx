'use client'

import React, { useState, useEffect } from 'react'

interface Mascota {
  id: number
  nombre: string
  especie: string
  raza: string
  edad: number
  sexo: string
  descripcion: string
  tamaño: string
  color: string
  fechaIngreso: string
  foto: string
  estado: string
  adoptabilidad: number  // en porcentaje

}

interface Props {
  id: number
  modoModal?: boolean
  onClose: () => void
  onGuardar?: (mascotaActualizada: Mascota) => void
}

export default function EditarMascotaModal({ id, onClose, onGuardar }: Props) {
  const [formData, setFormData] = useState<Mascota | null>(null)

  useEffect(() => {
    const mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]')
    const encontrada = mascotas.find((m: any) => m.id === id)
    if (encontrada) setFormData({ ...encontrada })
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return
    const value = e.target.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    const mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]')
    const index = mascotas.findIndex((m: any) => m.id === id)

    if (index !== -1) {
      mascotas[index] = formData
      localStorage.setItem('mascotas', JSON.stringify(mascotas))
      if (onGuardar) onGuardar(formData)
      alert('✅ Mascota actualizada correctamente.')
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

        <h2 className="text-2xl font-bold mb-4 text-[#30588C] text-center">✏️ Editar Mascota</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          <TextField label="Especie" name="especie" value={formData.especie} onChange={handleChange} />
          <TextField label="Raza" name="raza" value={formData.raza} onChange={handleChange} />
          <NumberField label="Edad (en años)" name="edad" value={formData.edad} onChange={handleChange} />

          <SelectField label="Sexo" name="sexo" value={formData.sexo} onChange={handleChange} options={['Macho', 'Hembra']} />
          <TextField label="Tamaño" name="tamaño" value={formData.tamaño} onChange={handleChange} />
          <TextField label="Color" name="color" value={formData.color} onChange={handleChange} />
          <TextField label="Fecha de ingreso" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} />
          <TextField label="Foto (URL o emoji)" name="foto" value={formData.foto} onChange={handleChange} />
          <SelectField label="Estado" name="estado" value={formData.estado} onChange={handleChange} options={['Disponible', 'En proceso', 'Adoptado']} />
          <TextField label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} isTextArea />
          <NumberField
  label="Adoptabilidad (%)"
  name="adoptabilidad"
  value={formData.adoptabilidad}
  onChange={handleChange}
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

// Reutilizables
function TextField({ label, name, value, onChange, isTextArea = false }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#30588C] mb-1">{label}</label>
      {isTextArea ? (
        <textarea name={name} value={value} onChange={onChange} rows={3} className="w-full border border-gray-300 px-3 py-2 rounded bg-white" />
      ) : (
        <input type="text" name={name} value={value} onChange={onChange} className="w-full border border-gray-300 px-3 py-2 rounded bg-white" />
      )}
    </div>
  )
}

function NumberField({ label, name, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#30588C] mb-1">{label}</label>
      <input type="number" name={name} value={value} min={0} onChange={onChange} className="w-full border border-gray-300 px-3 py-2 rounded bg-white" />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#30588C] mb-1">{label}</label>
      <select name={name} value={value} onChange={onChange} className="w-full border border-gray-300 px-3 py-2 rounded bg-white">
        <option value="">Seleccionar...</option>
        {options.map((opt: string, idx: number) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
