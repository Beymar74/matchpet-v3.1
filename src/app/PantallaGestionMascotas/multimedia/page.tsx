'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'
import {
  MultimediaMascota,
  multimediaMascotaBase,
  cargarMultimedia,
  guardarMultimedia
} from '@/data/multimediaPorMascota'
import { mascotasSimuladas } from '@/data/mascotasSimuladas'

export default function GestionMultimediaPage() {
  const [galeria, setGaleria] = useState<MultimediaMascota[]>([])
  const [mascotaIdSeleccionada, setMascotaIdSeleccionada] = useState<number>(0)
  const [archivos, setArchivos] = useState<File[]>([])
  const [vistaPrevia, setVistaPrevia] = useState<string[]>([])
  const router = useRouter()

  // Cargar multimedia desde localStorage
  useEffect(() => {
    const almacenada = cargarMultimedia()
    setGaleria(almacenada.length > 0 ? almacenada : multimediaMascotaBase)
    if (almacenada.length === 0) {
      guardarMultimedia(multimediaMascotaBase)
    }

  }, [])

  // Guardar en localStorage cada vez que se actualiza la galería
  useEffect(() => {
    guardarMultimedia(galeria)
  }, [galeria])

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileList = Array.from(files)
      setArchivos(fileList)
      const previews = fileList.map(file => URL.createObjectURL(file))
      setVistaPrevia(previews)
    }
  }

  const subirArchivos = async () => {
    if (!mascotaIdSeleccionada) {
      alert('⚠️ Selecciona una mascota primero')
      return
    }

    if (archivos.length === 0) {
      alert('⚠️ No seleccionaste archivos para subir')
      return
    }

    const nuevos: MultimediaMascota[] = []

    for (const archivo of archivos) {
      const url = await uploadToCloudinary(archivo)
      if (!url) continue

      nuevos.push({
        idMascota: mascotaIdSeleccionada,
        url,
        tipo: archivo.type.startsWith('video') ? 'video' : 'imagen',
        descripcion: archivo.name
      })
    }

    setGaleria(prev => [...prev, ...nuevos])
    setArchivos([])
    setVistaPrevia([])
    alert('✅ Archivos subidos y guardados')
  }

  return (
    <div className="pt-[80px] min-h-screen bg-white text-gray-900 transition-colors duration-500">
      <Header />
      <main className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#BF3952]">📸 Gestión de Multimedia</h1>
        <p className="mb-6 text-sm text-gray-700">
          Puedes cargar fotos o videos para cada mascota y visualizarlas como una galería.
        </p>

        {/* Selector de mascota */}
        <select
          value={mascotaIdSeleccionada}
          onChange={e => setMascotaIdSeleccionada(parseInt(e.target.value))}
          className="w-full border p-2 rounded mb-4"
        >
          <option value={0}>Selecciona una mascota</option>
          {mascotasSimuladas.map(m => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </select>

        {/* Carga de archivos */}
        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-lg space-y-4 border border-gray-200">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleArchivo}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={subirArchivos}
            className="bg-gradient-to-r from-[#2e7d5f] to-[#30588C] hover:opacity-90 text-white px-5 py-2 rounded transition"
          >
            🚀 Subir archivos a Cloudinary
          </button>

          {vistaPrevia.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {vistaPrevia.map((src, i) => (
                <div key={i} className="border border-gray-300 rounded-lg p-2 bg-gray-50 text-center">
                  <img src={src} alt={`Preview ${i}`} className="w-full h-40 object-cover rounded" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Galería por mascota */}
        <div className="mt-10 space-y-8">
          {mascotasSimuladas.map(m => {
            const archivos = galeria.filter(g => g.idMascota === m.id)
            return (
              <div key={m.id}>
                <h2 className="text-2xl font-semibold text-[#30588C] mb-2">{m.nombre}</h2>
                {archivos.length ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {archivos.map((item, i) =>
                      item.tipo === 'video' ? (
                        <video key={i} controls className="w-full h-40 object-cover rounded shadow">
                          <source src={item.url} />
                        </video>
                      ) : (
                        <img key={i} src={item.url} className="w-full h-40 object-cover rounded shadow" />
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No hay archivos cargados.</p>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-sm">
          <button onClick={() => router.back()} className="text-[#6093BF] hover:underline">
            ← Volver a la página anterior
          </button>
        </div>
      </main>
    </div>
  )
}
