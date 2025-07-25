'use client'

import React, { useEffect, useState } from "react"
import CrearFichaMedicaModal from "./CreaarFichamedica"
import EditarFichaMedicaModal from "./EditarFichaMedica" // si lo tienes implementado

interface Props {
  mascotaId: number
  onClose: () => void
}

export default function FichaMedica({ mascotaId, onClose }: Props) {
  const [ficha, setFicha] = useState<any>(null)
  const [mostrarCrearFicha, setMostrarCrearFicha] = useState(false)
  const [mostrarEditarFicha, setMostrarEditarFicha] = useState(false)

  const cargarFicha = () => {
    const fichas = JSON.parse(localStorage.getItem('fichasMedicas') || '[]')
    const encontrada = fichas.find((f: any) => f.idMascota === mascotaId.toString())
    setFicha(encontrada || null)
  }

  useEffect(() => {
    cargarFicha()
  }, [mascotaId])

  return (
    <>
      {/* Modal principal: Ficha médica */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white text-gray-900 p-6 rounded-xl shadow-xl w-full max-w-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>

          <h1 className="text-3xl font-bold mb-6 text-[#BF3952] text-center">
            🩺 Ficha Médica
          </h1>

          {ficha ? (
            <>
              <div className="space-y-4">
                <p><strong className="text-[#30588C]">Vacunas:</strong> {ficha.vacunas}</p>
                <p><strong className="text-[#30588C]">Alergias:</strong> {ficha.alergias}</p>
                <p><strong className="text-[#30588C]">Enfermedades:</strong> {ficha.enfermedades}</p>
                <p><strong className="text-[#30588C]">Esterilizado:</strong> {ficha.esterilizado}</p>
                <p><strong className="text-[#30588C]">Notas:</strong> {ficha.notas}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setMostrarEditarFicha(true)}
                  className="bg-[#30588C] hover:bg-[#254559] text-white px-5 py-2 rounded shadow flex items-center gap-2"
                >
                  ✏️ Modificar
                </button>
              </div>
            </>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center font-semibold space-y-4">
              <p>No hay ficha médica registrada para esta mascota.</p>
              <button
                onClick={() => setMostrarCrearFicha(true)}
                className="mt-2 bg-gradient-to-r from-[#BF3952] to-[#30588C] text-white px-5 py-2 rounded hover:opacity-90"
              >
                ➕ ¿Desea añadir su historia médica?
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal para crear ficha médica */}
      {mostrarCrearFicha && (
        <CrearFichaMedicaModal
          mascotaId={mascotaId}
          onClose={() => setMostrarCrearFicha(false)}
          onFichaGuardada={() => {
            setMostrarCrearFicha(false)
            cargarFicha()
          }}
        />
      )}

      {/* Modal para editar ficha médica (opcional, si está implementado) */}
      {mostrarEditarFicha && (
        <EditarFichaMedicaModal
          mascotaId={mascotaId}
          onClose={() => {
            setMostrarEditarFicha(false)
            cargarFicha()
          }}
        />
      )}
    </>
  )
}
