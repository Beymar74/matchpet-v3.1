'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import EditarFichaMedicaModal from '@/components/GestionMascotas/modales/EditarFichaMedica'
import { obtenerFichaMedicaPorId, fichasMedicasSimuladas } from '@/data/fichasMedicasSimuladas'
import { useRouter } from 'next/navigation'

interface FichaMedica {
  idMascota: string
  nombre: string
  especie: string
  edad: string
  vacunas: string
  esterilizado: string
  enfermedades: string
  alergias?: string
  notas?: string
}

function FichaMedicaPage() {
  const [fichas, setFichas] = useState<FichaMedica[]>([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [fichaSeleccionadaId, setFichaSeleccionadaId] = useState<number | null>(null)
  const filasPorPagina = 5

  useEffect(() => {
    const mascotasLocal: any[] = JSON.parse(localStorage.getItem('mascotas') || '[]')

    // Obtener todas las fichas únicas (IDs de mascotas)
    const idsFichas = new Set<string>()

    const fichasLocales = JSON.parse(localStorage.getItem('fichasMedicas') || '[]') as FichaMedica[]
    fichasLocales.forEach((f: any) => idsFichas.add(f.idMascota))
    fichasMedicasSimuladas.forEach((f: any) => idsFichas.add(f.idMascota))

    const fichasCompletadas: FichaMedica[] = Array.from(idsFichas).map((id) => {
      const fichaBase = obtenerFichaMedicaPorId(id)

      const mascota = mascotasLocal.find((m) => String(m.id) === id)
      const router = useRouter()
      return {
        idMascota: id,
        vacunas: fichaBase?.vacunas || '',
        enfermedades: fichaBase?.enfermedades || '',
        esterilizado: fichaBase?.esterilizado || 'No',
        alergias: fichaBase?.alergias || '',
        notas: fichaBase?.notas || '',
        nombre: mascota?.nombre || 'Desconocido',
        especie: mascota?.especie || 'Desconocida',
        edad: typeof mascota?.edad === 'number' ? mascota.edad + ' años' : mascota?.edad || 'No definida'
      }
    })

    setFichas(fichasCompletadas)
  }, [])

  const totalPaginas = Math.ceil(fichas.length / filasPorPagina)
  const fichasPaginadas = fichas.slice(
    (paginaActual - 1) * filasPorPagina,
    paginaActual * filasPorPagina
  )

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(fichas)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fichas Médicas')
    XLSX.writeFile(workbook, 'fichas_medicas.xlsx')
  }

  const exportarPDF = () => {
    const doc = new jsPDF()
    doc.text('Historial Médico de Mascotas', 14, 16)
    const columnas = ['Nombre', 'Especie', 'Edad', 'Vacunas', 'Esterilizado', 'Enfermedades']
    const filas = fichas.map(f => [
      f.nombre, f.especie, f.edad, f.vacunas, f.esterilizado, f.enfermedades
    ])
    ;(doc as any).autoTable({ head: [columnas], body: filas, startY: 20 })
    doc.save('fichas_medicas.pdf')
  }

  return (
    <div className="pt-[80px] min-h-screen bg-[#f9fafb] text-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto py-10 px-6 space-y-6">
        <h1 className="text-4xl font-bold text-[#BF3952]">🩺 Historial Médico de Mascotas</h1>
        <p className="text-gray-700 text-sm">
          Visualiza, edita o exporta las fichas médicas registradas en el sistema.
        </p>

        {/* Botones */}
        <div className="flex space-x-4">
          <button
            onClick={exportarExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            📥 Exportar a Excel
          </button>
          <button
            onClick={exportarPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            📄 Exportar a PDF
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow bg-white">
          <table className="min-w-full">
            <thead className="bg-[#30588C] text-white text-left text-sm">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Especie</th>
                <th className="px-4 py-3">Edad</th>
                <th className="px-4 py-3">Vacunas</th>
                <th className="px-4 py-3">Esterilizado</th>
                <th className="px-4 py-3">Enfermedades</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {fichasPaginadas.map((ficha) => (
                <tr key={ficha.idMascota} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                  <td className="px-4 py-3">{ficha.nombre}</td>
                  <td className="px-4 py-3">{ficha.especie}</td>
                  <td className="px-4 py-3">{ficha.edad}</td>
                  <td className="px-4 py-3">{ficha.vacunas}</td>
                  <td className="px-4 py-3">{ficha.esterilizado}</td>
                  <td className="px-4 py-3">{ficha.enfermedades}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setFichaSeleccionadaId(parseInt(ficha.idMascota))}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <span>Página {paginaActual} de {totalPaginas}</span>
          <div className="space-x-2">
            <button
              onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Anterior
            </button>
            <button
              onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Modal de edición */}
        {fichaSeleccionadaId !== null && (
          <EditarFichaMedicaModal
            mascotaId={fichaSeleccionadaId}
            onClose={() => setFichaSeleccionadaId(null)}
          />
        )}

        <div className="mt-6 text-sm">
          <button onClick={() => router.back()} className="text-[#6093BF] hover:underline">
            ← Volver a la página anterior
          </button>
        </div>
      </main>
    </div>
  )
}


export default FichaMedicaPage
