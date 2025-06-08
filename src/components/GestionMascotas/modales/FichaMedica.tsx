'use client'

import React from "react"
import { obtenerFichaMedicaPorId } from "@/data/fichasMedicasSimuladas"

interface Mascota {
  id: number
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
  mascotaId: number
}

export default function FichaMedicaModal({ isOpen, onClose, mascotaId }: FichaMedicaModalProps) {
  if (!isOpen) return null

  const ficha = obtenerFichaMedicaPorId(mascotaId)

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

        {ficha ? (
          <div className="space-y-4">
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Vacunas:</strong> {ficha.vacunas}
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Alergias:</strong> {ficha.alergias}
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Enfermedades:</strong> {ficha.enfermedades}
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Esterilizado:</strong> {ficha.esterilizado}
            </div>
            <div>
              <strong className="text-[#30588C] dark:text-[#6093BF]">Notas:</strong> {ficha.notas}
            </div>
          </div>
        ) : (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-xl text-center">
            Ficha médica no registrada.
          </div>
        )}
      </div>
    </div>
  )
}
