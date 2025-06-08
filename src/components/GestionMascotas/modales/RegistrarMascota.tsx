'use client'

import React, { useState, useRef, useEffect } from 'react'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'
import { agregarMascota } from '@/data/mascotasSimuladas'
import { especies, razasPorEspecie } from '@/data/especiesRazas'
import CrearFichaMedica from '@/components/GestionMascotas/modales/CreaarFichamedica'

interface Props {
  onClose: () => void
}

export default function ModalRegistrarMascota({ onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    estado: '',
    descripcion: '',
    foto: '',
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [agregarFicha, setAgregarFicha] = useState<'si' | 'no' | ''>('')
  const [mostrarCrearFicha, setMostrarCrearFicha] = useState(false)
  const [idNuevaMascota, setIdNuevaMascota] = useState<number | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const url = await uploadToCloudinary(file)
    if (url) {
      setFormData((prev) => ({ ...prev, foto: url }))
      setPreviewImage(url)
    }
    setUploading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nombre || !formData.especie || !formData.edad || !formData.estado) {
      alert('🐾 Por favor, completa los campos obligatorios.')
      return
    }

    const nueva = agregarMascota({
      nombre: formData.nombre,
      especie: formData.especie,
      raza: formData.raza,
      edad: Number(formData.edad),
      estado: formData.estado,
      descripcion: formData.descripcion,
      foto: formData.foto,
    })

    if (agregarFicha === 'si') {
      setIdNuevaMascota(nueva.id)
      setMostrarCrearFicha(true)
    } else {
      alert('✅ Mascota registrada correctamente.')
      onClose()
    }
  }

  if (mostrarCrearFicha && idNuevaMascota !== null) {
    return (
      <CrearFichaMedica mascotaId={idNuevaMascota} onClose={onClose} />
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-lg font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#BF3952] text-center">
          ➕ Registrar Mascota
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block font-semibold text-[#30588C] text-sm">
              Nombre 🐾
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          {/* Especie y Raza */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-semibold text-[#30588C] text-sm">
                Especie 🐾
              </label>
              <select
                name="especie"
                value={formData.especie}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              >
                <option value="">Selecciona especie</option>
                {especies.map((esp) => (
                  <option key={esp}>{esp}</option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label className="block font-semibold text-[#30588C] text-sm">Raza</label>
              <select
                name="raza"
                value={formData.raza}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              >
                <option value="">Selecciona raza</option>
                {razasPorEspecie[formData.especie]?.map((raza) => (
                  <option key={raza}>{raza}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Edad y Estado */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-semibold text-[#30588C] text-sm">
                Edad 🐾
              </label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block font-semibold text-[#30588C] text-sm">
                Estado 🐾
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              >
                <option value="">Selecciona estado</option>
                <option value="Disponible">Disponible</option>
                <option value="Adoptado">Adoptado</option>
                <option value="En tratamiento">En tratamiento</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              rows={3}
            />
          </div>

          {/* Foto */}
          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block text-sm"
            />
            {uploading && <p className="text-yellow-600 text-sm">Subiendo imagen...</p>}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded border"
              />
            )}
          </div>

          {/* Historial médico */}
          <div>
            <label className="block font-semibold text-[#30588C] text-sm">
              ¿Deseas agregar historial médico ahora?
            </label>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                className={`px-4 py-2 rounded border ${
                  agregarFicha === 'si' ? 'bg-[#BF3952] text-white' : ''
                }`}
                onClick={() => setAgregarFicha('si')}
              >
                Sí
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded border ${
                  agregarFicha === 'no' ? 'bg-[#30588C] text-white' : ''
                }`}
                onClick={() => setAgregarFicha('no')}
              >
                No
              </button>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#BF3952] to-[#30588C] text-white rounded hover:opacity-90"
            >
              {agregarFicha === 'si' ? 'Siguiente' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
