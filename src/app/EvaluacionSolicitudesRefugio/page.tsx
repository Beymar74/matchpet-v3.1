
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import {
  Plus, ExternalLink, CheckCircle, XCircle
} from 'lucide-react';

export default function EvaluacionSolicitudesRefugio() {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [filtroFecha, setFiltroFecha] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, usuario: 'Carlos R.', mascota: 'Luna', tipo: 'Gato', estado: 'Pendiente', fecha: '2025-05-25' },
            { id: 2, usuario: 'María F.', mascota: 'Max', tipo: 'Gato', estado: 'Aceptada', fecha: '2025-05-26' },
            { id: 3, usuario: 'Luis M.', mascota: 'Bella', tipo: 'Gato', estado: 'Rechazada', fecha: '2025-05-24' },
            { id: 4, usuario: 'Cristian R.', mascota: 'Pimpi', tipo: 'Gato', estado: 'Pendiente', fecha: '2025-05-24' },
            { id: 5, usuario: 'Ivan C.', mascota: 'Silpi', tipo: 'Perro', estado: 'Aceptada', fecha: '2025-05-24' },
            { id: 6, usuario: 'Beymar M.', mascota: 'Gael', tipo: 'Perro', estado: 'Rechazada', fecha: '2025-05-24' },
            { id: 7, usuario: 'Reyshel O.', mascota: 'Hassan', tipo: 'Perro', estado: 'Pendiente', fecha: '2025-05-24' },
            { id: 8, usuario: 'Kiara P.', mascota: 'Blanquito', tipo: 'Perro', estado: 'Aceptada', fecha: '2025-05-24' },
            { id: 9, usuario: 'Geraldine L.', mascota: 'Bella', tipo: 'Perro', estado: 'Pendiente', fecha: '2025-05-24' },
            { id: 10, usuario: 'Wendy I.', mascota: 'Pepa', tipo: 'Perro', estado: 'Aceptada', fecha: '2025-05-24' }
          ]);
        }, 500);
      });

      setSolicitudes(data as any[]);
    };

    obtenerSolicitudes();
  }, []);

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(solicitudes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Solicitudes');
    XLSX.writeFile(wb, 'solicitudes_adopcion.xlsx');
  };

  const aceptarSolicitud = (id: number) => {
    setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado: 'Aceptada' } : s));
  };

  const rechazarSolicitud = (id: number) => {
    setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado: 'Rechazada' } : s));
  };

  const solicitudesFiltradas = solicitudes.filter(s =>
    (filtroEstado === 'Todos' || s.estado === filtroEstado) &&
    (!filtroFecha || s.fecha === filtroFecha)
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Solicitudes de Adopción</h2>
        <div className="flex gap-3">
          <Link href="/nueva-solicitud" className="flex items-center gap-2 px-4 py-2 text-sm bg-[#30588C] text-white rounded-full shadow hover:bg-[#254266]">
            <Plus size={16} /> Nueva Solicitud
          </Link>
          <button onClick={exportarExcel} className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100">
            <ExternalLink size={16} /> Exportar Excel
          </button>
        </div>
      </div>

      <button
        onClick={() => router.push('/admin')}
        className="mb-4 inline-flex items-center gap-2 text-sm text-blue-700 hover:underline"
      >
        ← Volver al Panel de Administración
      </button>

      <div className="flex gap-4 mb-4">
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="border px-3 py-2 rounded text-sm">
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Aceptada">Aceptada</option>
          <option value="Rechazada">Rechazada</option>
        </select>
        <input type="date" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} className="border px-3 py-2 rounded text-sm" />
      </div>

      <table className="w-full text-sm text-gray-800">
        <thead>
          <tr className="text-left border-b border-gray-300">
            <th className="py-2">Usuario</th>
            <th className="py-2">Mascota</th>
            <th className="py-2">Tipo</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Fecha</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudesFiltradas.map((s) => (
            <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-2">{s.usuario}</td>
              <td className="py-2">{s.mascota}</td>
              <td className="py-2">{s.tipo}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${s.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    s.estado === 'Aceptada' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'}`}>{s.estado}</span>
              </td>
              <td className="py-2">{s.fecha}</td>
              <td className="py-2 flex gap-2">
                {s.estado === 'Pendiente' && (
                  <>
                    <button onClick={() => aceptarSolicitud(s.id)} className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                      <CheckCircle size={14} /> Aceptar
                    </button>
                    <button onClick={() => rechazarSolicitud(s.id)} className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                      <XCircle size={14} /> Rechazar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
