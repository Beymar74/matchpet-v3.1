'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useRouter } from 'next/navigation'
import EditarFichaMedicaModal from '@/components/GestionMascotas/modales/EditarFichaMedica'

interface FichaMedica {
  idMascota: number
  nombre: string
  especie: string
  edad: number
  vacunas: string
  tipoCirugia?: string
  fechaCirugia?: string
  fechaDesparasitacion?: string
}

export default function FichaMedicaPage() {
  const [fichas, setFichas] = useState<FichaMedica[]>([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [fichaSeleccionadaId, setFichaSeleccionadaId] = useState<number | null>(null)
  const filasPorPagina = 5
  const router = useRouter()

  useEffect(() => {
    const obtenerFichas = async () => {
      try {
        const res = await fetch('/api/ficha-medica/ver')
        const data = await res.json()
        setFichas(data)
      } catch (error) {
        console.error('❌ Error al obtener fichas médicas:', error)
      }
    }

    obtenerFichas()
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
    const columnas = ['Nombre', 'Especie', 'Edad', 'Vacunas', 'Cirugía', 'Desparasitación']
    const filas = fichas.map(f => [
      f.nombre, f.especie, f.edad + ' años', f.vacunas, f.tipoCirugia || '-', f.fechaDesparasitacion || '-'
    ])
    ;(doc as any).autoTable({ head: [columnas], body: filas, startY: 20 })
    doc.save('fichas_medicas.pdf')
  }

  return (
    <div className="pt-[80px] min-h-screen bg-[#f9fafb] text-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto py-10 px-6 space-y-6">
        <h1 className="text-4xl font-bold text-[#BF3952]">🩺 Historial Médico de Mascotas</h1>

        <div className="flex space-x-4">
          <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded text-sm">
            📥 Exportar a Excel
          </button>
          <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            📄 Exportar a PDF
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-[#30588C] text-white">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Especie</th>
                <th className="px-4 py-3">Edad</th>
                <th className="px-4 py-3">Vacunas</th>
                <th className="px-4 py-3">Cirugía</th>
                <th className="px-4 py-3">Desparasitación</th>
                <th className="px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {fichasPaginadas.map(f => (
                <tr key={f.idMascota} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">{f.nombre}</td>
                  <td className="px-4 py-3">{f.especie}</td>
                  <td className="px-4 py-3">{f.edad} años</td>
                  <td className="px-4 py-3">{f.vacunas}</td>
                  <td className="px-4 py-3">{f.tipoCirugia || '-'}</td>
                  <td className="px-4 py-3">{f.fechaDesparasitacion || '-'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setFichaSeleccionadaId(f.idMascota)}
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

        <div className="flex justify-between items-center mt-4 text-sm">
          <span>Página {paginaActual} de {totalPaginas}</span>
          <div className="space-x-2">
            <button
              onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Anterior
            </button>
            <button
              onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Siguiente
            </button>
          </div>
        </div>

        {fichaSeleccionadaId && (
          <EditarFichaMedicaModal
            mascotaId={fichaSeleccionadaId}
            onClose={() => setFichaSeleccionadaId(null)}
          />
        )}

        <div className="mt-6 text-sm">
          <button onClick={() => router.back()} className="text-[#6093BF] hover:underline">
            ← Volver
          </button>
        </div>
      </main>
    </div>
  )
}
