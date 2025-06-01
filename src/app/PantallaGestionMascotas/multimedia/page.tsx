'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
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
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">📸 Gestión de Multimedia</h1>
        <p className="mb-6 text-sm text-gray-700 dark:text-white/80">
          Aquí puedes cargar fotos o documentos relevantes sobre la mascota.
        </p>

        <div className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-6 rounded-xl shadow-lg space-y-4">
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
          <Link
            href="/PantallaGestionMascotas"
            className="text-[#6093BF] hover:underline"
          >
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  )
}
