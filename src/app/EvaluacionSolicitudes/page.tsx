'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import {
  Plus, Edit2, X, ExternalLink, User, PawPrint, CheckCircle, XCircle
} from 'lucide-react';

export default function EvaluacionSolicitudes() {
  const router = useRouter();
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [perfilVisible, setPerfilVisible] = useState<number | null>(null);
  const [fichaVisible, setFichaVisible] = useState<number | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [filtroFecha, setFiltroFecha] = useState<string>('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState<number | null>(null);
  const [solicitudEditando, setSolicitudEditando] = useState<any | null>(null);
  const [mensaje, setMensaje] = useState<string>('');

  useEffect(() => {
    const data = [
      { id: 1, usuario: 'Carlos R.', mascota: 'Luna', tipo: 'Gato', estado: 'Pendiente', fecha: '2025-05-25' },
      { id: 2, usuario: 'María F.', mascota: 'Max', tipo: 'Gato', estado: 'Aceptada', fecha: '2025-05-26' },
      { id: 3, usuario: 'Luis M.', mascota: 'Bella', tipo: 'Gato', estado: 'Rechazada', fecha: '2025-05-24' }
    ];
    setSolicitudes(data);
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

  const eliminarSolicitud = (id: number) => {
    setSolicitudes(prev => prev.filter(s => s.id !== id));
    setMostrarConfirmacion(null);
  };

  const abrirEdicion = (solicitud: any) => {
    setSolicitudEditando({ ...solicitud });
  };

  const guardarCambios = () => {
    if (!solicitudEditando.usuario || !solicitudEditando.mascota || !solicitudEditando.tipo || !solicitudEditando.fecha) {
      setMensaje("Todos los campos deben estar completos.");
      setTimeout(() => setMensaje(''), 3000);
      return;
    }
    setSolicitudes(prev =>
      prev.map(s => s.id === solicitudEditando.id ? solicitudEditando : s)
    );
    setSolicitudEditando(null);
    setMensaje("Solicitud actualizada correctamente.");
    setTimeout(() => setMensaje(''), 3000);
  };

  const solicitudesFiltradas = solicitudes.filter(s =>
    (filtroEstado === 'Todos' || s.estado === filtroEstado) &&
    (!filtroFecha || s.fecha === filtroFecha)
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border relative">
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

      {mensaje && (
        <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-700 font-medium shadow">{mensaje}</div>
      )}

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
              <td className="py-2">{s.estado}</td>
              <td className="py-2">{s.fecha}</td>
              <td className="py-2 flex flex-wrap gap-2">
                <button onClick={() => aceptarSolicitud(s.id)} className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                  <CheckCircle size={14} /> Aceptar
                </button>
                <button onClick={() => rechazarSolicitud(s.id)} className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">
                  <XCircle size={14} /> Rechazar
                </button>
                <button onClick={() => abrirEdicion(s)} className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
                  <Edit2 size={14} /> Editar
                </button>
                <button onClick={() => setMostrarConfirmacion(s.id)} className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                  <X size={14} /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {solicitudEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 animate-fadeIn">
            <h3 className="text-lg font-bold mb-4">Editar Solicitud</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input type="text" value={solicitudEditando.usuario} onChange={(e) => setSolicitudEditando({ ...solicitudEditando, usuario: e.target.value })} className="border p-2 rounded w-full" placeholder="Usuario" />
              <input type="text" value={solicitudEditando.mascota} onChange={(e) => setSolicitudEditando({ ...solicitudEditando, mascota: e.target.value })} className="border p-2 rounded w-full" placeholder="Mascota" />
              <input type="text" value={solicitudEditando.tipo} onChange={(e) => setSolicitudEditando({ ...solicitudEditando, tipo: e.target.value })} className="border p-2 rounded w-full" placeholder="Tipo" />
              <input type="date" value={solicitudEditando.fecha} onChange={(e) => setSolicitudEditando({ ...solicitudEditando, fecha: e.target.value })} className="border p-2 rounded w-full" />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSolicitudEditando(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button onClick={guardarCambios} className="px-4 py-2 bg-[#30588C] text-white rounded hover:bg-[#254266]">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {mostrarConfirmacion !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              ¿Estás seguro de eliminar esta solicitud?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarConfirmacion(null)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => eliminarSolicitud(mostrarConfirmacion)}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
