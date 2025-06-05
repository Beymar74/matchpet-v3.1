'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/layout/HeaderRefugio'
import Link from 'next/link'

export default function GestionMultimediaPage() {
  const [archivos, setArchivos] = useState<File[]>([])
  const [vistaPrevia, setVistaPrevia] = useState<string[]>([])
  const [mascotas, setMascotas] = useState<any[]>([])
  const [idMascota, setIdMascota] = useState('')

  // Cargar mascotas disponibles
  useEffect(() => {
    fetch('/api/mascotas')
      .then(res => res.json())
      .then(data => setMascotas(data))
      .catch(err => console.error('Error al cargar mascotas:', err))
  }, [])

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileList = Array.from(files)
      setArchivos(fileList)
      setVistaPrevia(fileList.map(file => URL.createObjectURL(file)))
    }
  }

  const subirArchivos = async () => {
    if (!idMascota) {
      alert('⚠️ Por favor selecciona una mascota')
      return
    }

    const uploadPromises = archivos.map(async (file) => {
      const form = new FormData()
      form.append('file', file)
      form.append('upload_preset', 'matchpet_mascotas')  // Preset sin autenticación
      form.append('folder', 'matchpet_mascotas')         // Carpeta en Cloudinary

      const res = await fetch('https://api.cloudinary.com/v1_1/tu_cloud_name/upload', {
        method: 'POST',
        body: form,
      })

      const data = await res.json()
      const tipo = file.type.includes('pdf') ? 'documento' : 'imagen'

      // Guardar en tu base de datos
      await fetch('/api/multimedia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_mascota: idMascota,
          tipo,
          url: data.secure_url,
        }),
      })

      return data.secure_url
    })

    await Promise.all(uploadPromises)
    alert('✅ Archivos subidos correctamente')
    setArchivos([])
    setVistaPrevia([])
  }

  return (
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">📸 Gestión de Multimedia</h1>
        <p className="mb-6 text-sm text-gray-700 dark:text-white/80">
          Carga fotos o documentos relevantes para una mascota registrada.
        </p>

        <div className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-6 rounded-xl shadow-lg space-y-4">
          <label className="block font-semibold mb-2 text-[#30588C]">Selecciona una mascota</label>
          <select
            value={idMascota}
            onChange={(e) => setIdMascota(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-[#2a2a2a]"
          >
            <option value="">-- Selecciona --</option>
            {mascotas.map((m) => (
              <option key={m.id_mascota} value={m.id_mascota}>
                {m.nombre} ({m.especie})
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*,.pdf"
            multiple
            onChange={handleArchivo}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-[#2a2a2a]"
          />

          <button
            onClick={subirArchivos}
            className="bg-gradient-to-r from-[#2e7d5f] to-[#30588C] hover:opacity-90 text-white px-5 py-2 rounded transition"
          >
            🚀 Subir archivos
          </button>

          {vistaPrevia.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {vistaPrevia.map((src, i) => (
                <div key={i} className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-[#2a2a2a] text-center">
                  {src.endsWith('.pdf') ? (
                    <p className="text-sm text-gray-700 dark:text-white/80">📄 Documento PDF</p>
                  ) : (
                    <img
                      src={src}
                      alt={`Preview ${i}`}
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-sm">
          <Link href="/PantallaGestionMascotas" className="text-[#6093BF] hover:underline">
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}

