// src/pages/GestionNotificaciones/Templates.tsx
'use client';
import React, { useState } from 'react';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { Template } from '@/components/admin-dashboard/types/Template';


const templatesIniciales: Template[] = [
  {
    id: 1,
    nombre: 'Bienvenida Adoptante',
    tipo: 'Email',
    contenido: '¡Hola {nombre}! Gracias por adoptar...',
    fecha: '2025-05-01',
    estado: 'Publicado',
  },
  {
    id: 2,
    nombre: 'Recordatorio Visita',
    tipo: 'SMS',
    contenido: 'Te recordamos tu cita para visita el {fecha}',
    fecha: '2025-05-03',
    estado: 'Borrador',
  },
  {
    id: 3,
    nombre: 'Notificación de Aprobación',
    tipo: 'Push',
    contenido: 'Tu solicitud fue aprobada. ¡Felicidades!',
    fecha: '2025-05-04',
    estado: 'Publicado',
  },
];

export default function TemplatesNotificaciones() {
  const [templates, setTemplates] = useState<Template[]>(templatesIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState<'Todos' | 'Email' | 'SMS' | 'Push'>('Todos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [templateEditando, setTemplateEditando] = useState<Template | null>(null);

  const templatesFiltrados = templates.filter(t =>
    (tipoFiltro === 'Todos' || t.tipo === tipoFiltro) &&
    (t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
     t.contenido.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const handleGuardar = (nuevo: Template) => {
    if (nuevo.id) {
      setTemplates(prev => prev.map(t => (t.id === nuevo.id ? nuevo : t)));
    } else {
      const nuevoTemplate = { ...nuevo, id: templates.length + 1, fecha: new Date().toISOString().split('T')[0] };
      setTemplates(prev => [...prev, nuevoTemplate]);
    }
    setModalAbierto(false);
    setTemplateEditando(null);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-[#30588C] dark:text-[#7FB9C2] mb-6 text-center">
        Plantillas de Notificaciones
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar plantilla..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/3 dark:bg-gray-800 dark:text-white"
        />
        <select
          value={tipoFiltro}
          onChange={e => setTipoFiltro(e.target.value as any)}
          className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="Todos">Todos</option>
          <option value="Email">Email</option>
          <option value="SMS">SMS</option>
          <option value="Push">Push</option>
        </select>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#27446d] transition flex items-center gap-2"
        >
          <Plus size={16} /> Nueva Plantilla
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesFiltrados.map(t => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border dark:border-gray-700 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-[#30588C] dark:text-[#7FB9C2]">{t.nombre}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tipo: {t.tipo}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{t.contenido}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                t.estado === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {t.estado}
              </span>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:scale-110"><Eye size={18} /></button>
                <button
                  className="text-green-600 hover:scale-110"
                  onClick={() => {
                    setTemplateEditando(t);
                    setModalAbierto(true);
                  }}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-500 hover:scale-110"
                  onClick={() => setTemplates(prev => prev.filter(tp => tp.id !== t.id))}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalAbierto && (
        <Modal
          template={templateEditando}
          onClose={() => {
            setModalAbierto(false);
            setTemplateEditando(null);
          }}
          onSave={handleGuardar}
        />
      )}
    </div>
  );
}
