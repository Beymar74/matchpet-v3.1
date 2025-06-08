'use client'

import React, { useState } from 'react'

interface CrearFichaMedicaProps {
  mascotaId: number
  onClose: () => void
  onFichaGuardada: (ficha: any) => void
}

const vacunasOpciones = ['Rabia', 'Moquillo', 'Parvovirus', 'Triple felina']
const alergiasOpciones = ['Polen', 'Pollo', 'Pescado', 'Lácteos']
const enfermedadesOpciones = ['Ninguna', 'Dermatitis', 'Asma', 'Otitis']

export default function CrearFichaMedicaModal({ mascotaId, onClose, onFichaGuardada }: CrearFichaMedicaProps) {
  const [vacunasSeleccionadas, setVacunasSeleccionadas] = useState<string[]>([])
  const [alergiasSeleccionadas, setAlergiasSeleccionadas] = useState<string[]>([])
  const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>('Ninguna')
  const [esterilizado, setEsterilizado] = useState<string>('No')
  const [notas, setNotas] = useState<string>('')

  const toggleSeleccion = (valor: string, lista: string[], setLista: (val: string[]) => void) => {
    if (lista.includes(valor)) {
      setLista(lista.filter(v => v !== valor))
    } else {
      setLista([...lista, valor])
    }
  }

  const handleGuardar = () => {
    console.log('💾 Guardando ficha médica...')

    const nuevaFicha = {
      idMascota: mascotaId.toString(),
      vacunas: vacunasSeleccionadas.join(', '),
      alergias: alergiasSeleccionadas.join(', '),
      enfermedades: enfermedadSeleccionada,
      esterilizado,
      notas,
    }

    try {
      const fichasExistentes = JSON.parse(localStorage.getItem('fichasMedicas') || '[]')
      const nuevasFichas = fichasExistentes.filter((f: any) => f.idMascota !== nuevaFicha.idMascota)
      nuevasFichas.push(nuevaFicha)
      localStorage.setItem('fichasMedicas', JSON.stringify(nuevasFichas))

      alert('Ficha médica registrada correctamente.')
      onFichaGuardada(nuevaFicha) // Notifica al componente padre
      onClose()
    } catch (error) {
      console.error('❌ Error guardando en localStorage:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-xl w-full text-gray-900 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#BF3952] text-center">
          ➕ Nueva ficha médica para mascota #{mascotaId}
        </h2>

        <div className="space-y-4">
          {/* Vacunas */}
          <div>
            <label className="font-semibold text-[#30588C]">Vacunas:</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {vacunasOpciones.map(v => (
                <label key={v} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={vacunasSeleccionadas.includes(v)}
                    onChange={() => toggleSeleccion(v, vacunasSeleccionadas, setVacunasSeleccionadas)}
                  />
                  {v}
                </label>
              ))}
            </div>
          </div>

          {/* Alergias */}
          <div>
            <label className="font-semibold text-[#30588C]">Alergias:</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {alergiasOpciones.map(a => (
                <label key={a} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={alergiasSeleccionadas.includes(a)}
                    onChange={() => toggleSeleccion(a, alergiasSeleccionadas, setAlergiasSeleccionadas)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* Enfermedades */}
          <div>
            <label className="font-semibold text-[#30588C]">Enfermedades:</label>
            <select
              value={enfermedadSeleccionada}
              onChange={(e) => setEnfermedadSeleccionada(e.target.value)}
              className="w-full mt-2 p-2 border rounded"
            >
              {enfermedadesOpciones.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>

          {/* Esterilizado */}
          <div>
            <label className="font-semibold text-[#30588C]">¿Esterilizado?</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="esterilizado"
                  value="Sí"
                  checked={esterilizado === 'Sí'}
                  onChange={(e) => setEsterilizado(e.target.value)}
                />
                Sí
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="esterilizado"
                  value="No"
                  checked={esterilizado === 'No'}
                  onChange={(e) => setEsterilizado(e.target.value)}
                />
                No
              </label>
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="font-semibold text-[#30588C]">Notas adicionales:</label>
            <textarea
              className="w-full mt-2 p-2 border rounded resize-none"
              rows={3}
              placeholder="Escribe aquí las observaciones..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="px-4 py-2 rounded bg-[#30588C] text-white hover:bg-[#254559]"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
