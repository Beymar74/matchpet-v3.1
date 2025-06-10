// src/pages/GestionAdopciones/SeguimientoSolicitudes.tsx
'use client';
import React, { useState } from 'react';
import {
  CalendarCheck2,
  StickyNote,
  Pencil,
  Trash2,
  Save,
  Plus,
  BarChartBig
} from 'lucide-react';

interface Solicitud {
  nombre: string;
  estado: string;
  fecha: string;
  notas: string;
}

const solicitudesIniciales: Solicitud[] = [
  {
    nombre: 'Luna',
    estado: 'Visita Programada',
    fecha: '2025-06-01',
    notas: 'Tiene jardín grande para jugar.',
  },
  {
    nombre: 'Max',
    estado: 'Evaluación Inicial',
    fecha: '2025-05-29',
    notas: 'Vive solo, busca compañía.',
  },
  {
    nombre: 'Simba',
    estado: 'Aprobación/Rechazo',
    fecha: '2025-06-03',
    notas: 'Faltan documentos de adopción.',
  },
  {
    nombre: 'Kira',
    estado: 'Finalizado',
    fecha: '2025-06-05',
    notas: 'Adopción exitosa, excelente familia.',
  },
];

const estados = [
  'Todos',
  'Evaluación Inicial',
  'Visita Programada',
  'Aprobación/Rechazo',
  'Finalizado'
];

export default function SeguimientoSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(solicitudesIniciales);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Solicitud>({ nombre: '', estado: '', fecha: '', notas: '' });
  const [showConfirmIndex, setShowConfirmIndex] = useState<number | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(solicitudes[index]);
  };

  const handleDelete = (index: number) => {
    setShowConfirmIndex(index);
  };

  const confirmDelete = () => {
    if (showConfirmIndex !== null) {
      setSolicitudes(solicitudes.filter((_, i) => i !== showConfirmIndex));
      setShowConfirmIndex(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmIndex(null);
  };

  const handleSave = () => {
    if (formData.nombre && formData.estado && formData.fecha) {
      if (editIndex !== null) {
        const updated = [...solicitudes];
        updated[editIndex] = formData;
        setSolicitudes(updated);
      } else {
        setSolicitudes([...solicitudes, formData]);
      }
      setEditIndex(null);
      setFormData({ nombre: '', estado: '', fecha: '', notas: '' });
    }
  };

  const solicitudesFiltradas = filtroEstado === 'Todos'
    ? solicitudes
    : solicitudes.filter(s => s.estado === filtroEstado);

  const resumen = estados.slice(1).map(e => ({ estado: e, cantidad: solicitudes.filter(s => s.estado === e).length }));

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#F7C59F] to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-[#30588C] dark:text-[#7FB9C2] mb-6">
        Seguimiento de Solicitudes de Adopción
      </h2>

      {/* Formulario arriba */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow mb-12">
        <h3 className="text-xl font-bold mb-4 text-[#30588C] dark:text-[#7FB9C2] flex items-center gap-2">
          <Plus size={20} /> {editIndex !== null ? 'Editar Solicitud' : 'Agregar Nueva Solicitud'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" className="p-2 rounded border w-full" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Nombre de la mascota" />
          <select className="p-2 rounded border w-full" value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })}>
            <option value="">Seleccionar estado</option>
            {estados.slice(1).map((estado, index) => (
              <option key={index} value={estado}>{estado}</option>
            ))}
          </select>
          <input type="date" className="p-2 rounded border w-full" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} />
          <input type="text" className="p-2 rounded border w-full" value={formData.notas} onChange={(e) => setFormData({ ...formData, notas: e.target.value })} placeholder="Notas de seguimiento" />
        </div>
        <div className="text-right mt-4">
          <button onClick={handleSave} className="bg-[#BF3952] hover:bg-[#a83245] text-white px-4 py-2 rounded inline-flex items-center">
            <Save size={18} className="mr-2" /> {editIndex !== null ? 'Guardar Cambios' : 'Agregar Solicitud'}
          </button>
        </div>
      </div>

      {/* Filtros y resumen */}
      <div className="flex justify-between flex-wrap gap-4 items-center mb-6 max-w-7xl mx-auto">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Filtrar por estado:</label>
          <select
            className="p-2 rounded border text-sm"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            {estados.map((estado, i) => (
              <option key={i} value={estado}>{estado}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 flex-wrap text-sm">
          {resumen.map((r, i) => (
            <div key={i} className="flex items-center gap-1 px-3 py-1 bg-[#F7C59F] rounded-full text-[#BF3952]">
              <BarChartBig size={16} /> {r.estado}: {r.cantidad}
            </div>
          ))}
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {solicitudesFiltradas.map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 border border-gray-200 dark:border-gray-700 relative">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{s.nombre}</h3>
            <span className="inline-block bg-[#F7C59F] text-[#BF3952] text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {s.estado}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-1">
              <CalendarCheck2 size={16} /> {s.fecha}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
              <StickyNote size={16} className="mt-0.5" /> {s.notas}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => handleEdit(i)} className="text-[#30588C] hover:text-[#203a5e] dark:text-[#7FB9C2] dark:hover:text-[#b3dfe6]" title="Editar">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(i)} className="text-[#BF3952] hover:text-red-800 dark:text-red-400 dark:hover:text-red-200" title="Eliminar">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación */}
      {showConfirmIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm text-center">
            <p className="mb-4 text-lg text-gray-800 dark:text-gray-100">
              ¿Estás seguro de eliminar esta solicitud?
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Eliminar
              </button>
              <button onClick={cancelDelete} className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
