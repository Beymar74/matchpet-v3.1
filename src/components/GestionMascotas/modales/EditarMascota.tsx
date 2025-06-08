'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mascotasSimuladas, Mascota } from '@/data/mascotasSimuladas'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'
import Header from '@/components/Header'

interface EditarMascotaProps {
  id: string | number
  modoModal?: boolean
  onClose?: () => void
}

export default function EditarMascota({ id, modoModal = false, onClose }: EditarMascotaProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Mascota | null>(null)
  const [errores, setErrores] = useState<{ [key: string]: boolean }>({})
  const [subiendo, setSubiendo] = useState(false)

  useEffect(() => {
    const mascota = mascotasSimuladas.find((m) => m.id === Number(id))
    if (mascota) setFormData({ ...mascota })
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      setFormData({ ...formData, foto: url })
    }
    setSubiendo(false)
  }

  const validarFormulario = () => {
    if (!formData) return false
    const campos = ['nombre', 'especie', 'edad', 'estado']
    const errores: any = {}
    campos.forEach((campo) => {
      if (!formData[campo as keyof Mascota]) errores[campo] = true
    })
    setErrores(errores)
    return Object.keys(errores).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validarFormulario() || !formData) return

    const index = mascotasSimuladas.findIndex((m) => m.id === Number(id))
    if (index !== -1) {
      mascotasSimuladas[index] = { ...formData }
      if (modoModal) {
        alert('✅ Mascota actualizada correctamente (simulado)')
        onClose?.()
      } else {
        alert('✅ Mascota actualizada correctamente (simulado)')
        router.push('/PantallaGestionMascotas')
      }
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
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white text-gray-900 rounded-xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ✕
        </button>
        <ContenidoFormulario formData={formData} errores={errores} handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} subiendo={subiendo} />
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-500">
      <Header />
      <main className="max-w-4xl mx-auto py-10 px-6">
        <ContenidoFormulario formData={formData} errores={errores} handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} subiendo={subiendo} />
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
            <InputField label="Nombre *" name="nombre" value={formData.nombre} error={errores.nombre} onChange={handleChange} />
            <InputField label="Especie *" name="especie" value={formData.especie} error={errores.especie} onChange={handleChange} />
            <InputField label="Raza" name="raza" value={formData.raza} onChange={handleChange} />
            <InputField type="number" label="Edad *" name="edad" value={formData.edad} error={errores.edad} onChange={handleChange} />

            <div>
              <label className="block text-sm font-semibold text-[#30588C]">Estado *</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded mt-1 bg-white ${errores.estado ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="Disponible">Disponible</option>
                <option value="Adoptado">Adoptado</option>
                <option value="En tratamiento">En tratamiento</option>
                <option value="Necesidades Especiales">Necesidades Especiales</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#30588C]">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
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

          {formData.foto && (
            <div className="flex-1 flex justify-center items-center">
              <img
                src={formData.foto}
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
