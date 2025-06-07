// src/pages/GestionNotificaciones/Campanas.tsx
'use client';
import React, { useState } from 'react';
import { Plus, Trash2, Pencil, BarChart2, CheckCircle, Clock, Edit2 } from 'lucide-react';

interface Campana {
  id: number;
  nombre: string;
  tipo: 'Email' | 'SMS' | 'Push';
  audiencia: string;
  fecha: string;
  estado: 'Programada' | 'Enviada' | 'Borrador';
  aperturas?: number;
  clics?: number;
  rebotes?: number;
}

const campanasIniciales: Campana[] = [
  {
    id: 1,
    nombre: 'Campaña Bienvenida',
    tipo: 'Email',
    audiencia: 'Adoptantes recientes',
    fecha: '2025-06-05',
    estado: 'Enviada',
    aperturas: 120,
    clics: 35,
    rebotes: 5,
  },
  {
    id: 2,
    nombre: 'Recordatorio Visita',
    tipo: 'SMS',
    audiencia: 'Adoptantes con citas pendientes',
    fecha: '2025-06-10',
    estado: 'Programada',
    aperturas: 0,
    clics: 0,
    rebotes: 0,
  },
];

export default function CampanasNotificaciones() {
  const [campanas, setCampanas] = useState<Campana[]>(campanasIniciales);
  const [formulario, setFormulario] = useState<Campana | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');

  const handleGuardar = () => {
    if (!formulario) return;

    if (formulario.id && campanas.some(c => c.id === formulario.id)) {
      setCampanas(prev => prev.map(c => (c.id === formulario.id ? formulario : c)));
    } else {
      const nuevaCampana: Campana = {
        ...formulario,
        id: campanas.length > 0 ? Math.max(...campanas.map(c => c.id)) + 1 : 1,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Borrador',
        aperturas: 0,
        clics: 0,
        rebotes: 0,
      };
      setCampanas(prev => [...prev, nuevaCampana]);
    }

    setMostrarModal(false);
    setFormulario(null);
  };

  const campanasFiltradas = campanas.filter(c =>
    (!filtroEstado || c.estado === filtroEstado) &&
    (!filtroTipo || c.tipo === filtroTipo)
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-[#30588C] dark:text-[#7FB9C2] mb-6">
        Campañas de Notificaciones
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Total</h4>
          <p className="text-xl font-bold text-[#30588C] dark:text-[#7FB9C2]">{campanas.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Enviadas</h4>
          <p className="text-xl font-bold text-green-600">{campanas.filter(c => c.estado === 'Enviada').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Programadas</h4>
          <p className="text-xl font-bold text-blue-600">{campanas.filter(c => c.estado === 'Programada').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Borradores</h4>
          <p className="text-xl font-bold text-yellow-600">{campanas.filter(c => c.estado === 'Borrador').length}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <div className="flex gap-3">
          <select
            className="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
          >
            <option value="">Estado: Todos</option>
            <option value="Enviada">Enviada</option>
            <option value="Programada">Programada</option>
            <option value="Borrador">Borrador</option>
          </select>
          <select
            className="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
          >
            <option value="">Tipo: Todos</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Push">Push</option>
          </select>
        </div>
        <button
          onClick={() => {
            setFormulario({
              id: 0,
              nombre: '',
              tipo: 'Email',
              audiencia: '',
              fecha: '',
              estado: 'Borrador',
              aperturas: 0,
              clics: 0,
              rebotes: 0,
            });
            setMostrarModal(true);
          }}
          className="flex items-center gap-2 bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#27446d]"
        >
          <Plus size={16} /> Nueva Campaña
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {campanasFiltradas.map(campana => (
          <div key={campana.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-[#30588C] dark:text-[#7FB9C2]">{campana.nombre}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{campana.tipo} - {campana.audiencia}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fecha: {campana.fecha}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Estado: <span className="font-medium">{campana.estado}</span></p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setFormulario(campana); setMostrarModal(true); }} className="text-blue-500 hover:text-blue-700">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => setCampanas(prev => prev.filter(c => c.id !== campana.id))} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span>Aperturas: {campana.aperturas}</span>
              <span>Clics: {campana.clics}</span>
              <span>Rebotes: {campana.rebotes}</span>
            </div>
          </div>
        ))}
      </div>

      {mostrarModal && formulario && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => setMostrarModal(false)}>
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#30588C] dark:text-[#7FB9C2]">
              {formulario.id ? 'Editar Campaña' : 'Nueva Campaña'}
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); handleGuardar(); }} className="space-y-4">
              <input name="nombre" value={formulario.nombre} onChange={e => setFormulario({ ...formulario, nombre: e.target.value })} placeholder="Nombre" required className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white" />
              <select name="tipo" value={formulario.tipo} onChange={e => setFormulario({ ...formulario, tipo: e.target.value as Campana['tipo'] })} className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white">
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Push">Push</option>
              </select>
              <input name="audiencia" value={formulario.audiencia} onChange={e => setFormulario({ ...formulario, audiencia: e.target.value })} placeholder="Audiencia" className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white" />
              <button type="submit" className="bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#27446d] w-full">
                Guardar Campaña
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
