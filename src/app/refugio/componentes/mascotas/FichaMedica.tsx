"use client"

import React from "react"

interface Mascota {
  id: string
  nombre: string
  especie: string
  edad: number
  estadoSalud: string
  vacunas: string[]
  esterilizado: boolean
}

interface FichaMedicaModalProps {
  isOpen: boolean
  onClose: () => void
  mascotaId: string
}

const mockMascotas: Mascota[] = [
  {
    id: "1",
    nombre: "Luna",
    especie: "Perro",
    edad: 3,
    estadoSalud: "Vacunado, sin enfermedades actuales",
    vacunas: ["Rabia", "Moquillo", "Parvovirus"],
    esterilizado: true,
  },
  {
    id: "2",
    nombre: "Milo",
    especie: "Gato",
    edad: 2,
    estadoSalud: "Alergias leves, controladas",
    vacunas: ["Triple felina"],
    esterilizado: false,
  },
  {
    id: "3",
    nombre: "Toby",
    especie: "Perro",
    edad: 4,
    estadoSalud: "En tratamiento por lesión en la pata",
    vacunas: ["Rabia"],
    esterilizado: true,
  },
]

export default function FichaMedicaModal({ isOpen, onClose, mascotaId }: FichaMedicaModalProps) {
  if (!isOpen) return null

  const mascota = mockMascotas.find((m) => m.id === mascotaId)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-6 rounded-xl shadow-xl w-full max-w-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-6 text-[#BF3952] text-center">
          🩺 Ficha Médica de la Mascota
        </h1>

        {mascota ? (
          <div className="space-y-4">
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Nombre:</strong> {mascota.nombre}
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Especie:</strong> {mascota.especie}
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Edad:</strong> {mascota.edad} años
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Estado de salud:</strong> {mascota.estadoSalud}
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Vacunas:</strong> {mascota.vacunas.join(", ")}
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Esterilizado:</strong>{" "}
              {mascota.esterilizado ? "Sí" : "No"}
            </div>
          </div>
        ) : (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-xl text-center">
            Mascota no encontrada.
          </div>
        )}
      </div>
    </div>
  )
}
