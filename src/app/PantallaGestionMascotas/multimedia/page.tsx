'use client'

import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function GestionMultimediaPage() {
  const [archivos, setArchivos] = useState<File[]>([])
  const [vistaPrevia, setVistaPrevia] = useState<string[]>([])

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileList = Array.from(files)
      setArchivos(fileList)

      const previews = fileList.map((file) => URL.createObjectURL(file))
      setVistaPrevia(previews)
    }
  }

  const subirArchivos = () => {
    console.log('Archivos a subir:', archivos)
    alert('✅ Archivos simulados como subidos')
    // Aquí iría la lógica para subir a Firebase o Cloudinary
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011526] via-[#254559] to-[#30588C] text-white">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">📸 Gestión de Multimedia</h1>
        <p className="mb-6 text-sm text-white/80">
          Aquí puedes cargar fotos o documentos relevantes sobre la mascota.
        </p>

        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-lg space-y-4">
          <input
            type="file"
            accept="image/*,.pdf"
            multiple
            onChange={handleArchivo}
            className="w-full border border-gray-300 p-2 rounded"
          />

          <button
            onClick={subirArchivos}
            className="bg-[#2e7d5f] hover:bg-[#256f52] text-white px-5 py-2 rounded transition"
          >
            🚀 Subir archivos
          </button>

          {vistaPrevia.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {vistaPrevia.map((src, i) => (
                <div key={i} className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-center">
                  {src.endsWith('.pdf') ? (
                    <p className="text-sm text-gray-700">📄 Documento PDF</p>
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
          <Link
            href="/Modulo_6-Gestion_de_Mascotas"
            className="text-[#6093BF] hover:underline"
          >
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}
