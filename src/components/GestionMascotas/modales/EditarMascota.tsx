'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'

interface Mascota {
  ID_Mascota: number
  Nombre: string
  Edad: number
  Raza: string
  Descripcion?: string
  Nombre_Especie?: string
  Nombre_Tamanio?: string
  Nombre_Estado?: string
  Foto?: string
}

interface EditarMascotaProps {
  id: number | string
  modoModal?: boolean
  onClose?: () => void
  onGuardar?: (mascotaActualizada: Mascota) => void
}

export default function EditarMascota({ id, modoModal = false, onClose, onGuardar }: EditarMascotaProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Mascota> | null>(null)
  const [errores, setErrores] = useState<{ [key: string]: boolean }>({})
  const [subiendo, setSubiendo] = useState(false)

  useEffect(() => {
    const obtenerMascota = async () => {
      try {
        const res = await fetch(`/api/mascotasRefg/${id}`)
        const data = await res.json()
        setFormData(data)
      } catch (error) {
        console.error('Error al cargar mascota:', error)
      }
    }

    obtenerMascota()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!formData) return
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: false })
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !formData) return

    setSubiendo(true)
    const url = await uploadToCloudinary(file)
    if (url) {
      setFormData({ ...formData, Foto: url })
    }
    setSubiendo(false)
  }

  const validarFormulario = () => {
    if (!formData) return false
    const campos = ['Nombre', 'Nombre_Especie', 'Edad', 'Nombre_Estado']
    const nuevosErrores: any = {}
    campos.forEach((campo) => {
      if (!formData[campo as keyof Mascota]) nuevosErrores[campo] = true
    })
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validarFormulario() || !formData) return

    try {
      const res = await fetch(`/api/mascotasRefg/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert('✅ Mascota actualizada correctamente')
        onGuardar?.(formData as Mascota)
        if (modoModal) onClose?.()
        else router.push('/PantallaGestionMascotas')
      } else {
        throw new Error('Error al actualizar')
      }
    } catch (error) {
      console.error('Error al guardar mascota:', error)
    }
  }

  if (!formData) {
    return (
      <div className={`${modoModal ? '' : 'pt-[80px] min-h-screen'} bg-white text-gray-900`}>
        {!modoModal && <Header />}
        <main className="max-w-3xl mx-auto py-10 px-6">
          <h1 className="text-3xl font-bold mb-6">Editar Mascota</h1>
          <p className="text-red-500">Mascota no encontrada.</p>
        </main>
      </div>
    )
  }

  return modoModal ? (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl bg-white text-gray-900 rounded-xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold">✕</button>
        <ContenidoFormulario {...{ formData, errores, handleChange, handleImageChange, handleSubmit, subiendo }} />
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-500">
      <Header />
      <main className="max-w-4xl mx-auto py-10 px-6">
        <ContenidoFormulario {...{ formData, errores, handleChange, handleImageChange, handleSubmit, subiendo }} />
      </main>
    </div>
  )
}

function ContenidoFormulario({ formData, errores, handleChange, handleImageChange, handleSubmit, subiendo }: any) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-[#BF3952]">✏️ Editar Mascota</h1>
      <form onSubmit={handleSubmit} className="bg-white text-gray-900 p-6 rounded-xl shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <InputField label="Nombre *" name="Nombre" value={formData.Nombre} error={errores.Nombre} onChange={handleChange} />
            <InputField label="Especie *" name="Nombre_Especie" value={formData.Nombre_Especie} error={errores.Nombre_Especie} onChange={handleChange} />
            <InputField label="Raza" name="Raza" value={formData.Raza} onChange={handleChange} />
            <InputField type="number" label="Edad *" name="Edad" value={formData.Edad} error={errores.Edad} onChange={handleChange} />
            <InputField label="Estado *" name="Nombre_Estado" value={formData.Nombre_Estado} error={errores.Nombre_Estado} onChange={handleChange} />

            <div>
              <label className="block text-sm font-semibold text-[#30588C]">Descripción</label>
              <textarea
                name="Descripcion"
                value={formData.Descripcion || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded mt-1 bg-white"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="fileInput" className="block text-sm font-semibold text-[#30588C] mb-1">Actualizar imagen</label>
              <label htmlFor="fileInput" className="inline-block cursor-pointer px-4 py-2 bg-[#6093BF] text-white rounded shadow hover:opacity-90">
                Seleccionar archivo
              </label>
              <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {subiendo && <p className="text-xs mt-2 text-yellow-600">Subiendo imagen...</p>}
            </div>
          </div>

          {formData.Foto && (
            <div className="flex-1 flex justify-center items-center">
              <img
                src={formData.Foto}
                alt="Vista previa"
                className="max-w-full max-h-[300px] object-contain rounded-lg shadow"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded transition"
          >
            💾 Guardar Cambios
          </button>
        </div>
      </form>
    </>
  )
}

function InputField({ label, name, value, onChange, error = false, type = 'text' }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#30588C]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border px-3 py-2 rounded mt-1 bg-white ${error ? 'border-red-500' : 'border-gray-300'}`}
        required={label.includes('*')}
      />
    </div>
  )
}
