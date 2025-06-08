'use client'

import React from "react"
import { obtenerFichaMedicaPorId } from "@/data/fichasMedicasSimuladas"

interface FichaMedicaModalProps {
  isOpen: boolean
  onClose: () => void
  mascotaId: number
}

export default function FichaMedicaModal({ isOpen, onClose, mascotaId }: FichaMedicaModalProps) {
  if (!isOpen) return null

  const ficha = obtenerFichaMedicaPorId(mascotaId)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white text-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-600"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-6 text-[#BF3952] text-center">
          🩺 Ficha Médica de la Mascota
        </h1>

        {ficha ? (
          <div className="space-y-4 text-lg">
            <div>
              <strong className="text-[#30588C]">Vacunas:</strong> {ficha.vacunas}
            </div>
            <div>
              <strong className="text-[#30588C]">Alergias:</strong> {ficha.alergias}
            </div>
            <div>
              <strong className="text-[#30588C]">Enfermedades:</strong> {ficha.enfermedades}
            </div>
            <div>
              <strong className="text-[#30588C]">Esterilizado:</strong> {ficha.esterilizado ? "Sí" : "No"}
            </div>
            <div>
              <strong className="text-[#30588C]">Notas:</strong> {ficha.notas}
            </div>
          </div>
        ) : (
          <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center font-semibold">
            Ficha médica no registrada.
          </div>
        )}
      </div>
    </div>
  )
}
