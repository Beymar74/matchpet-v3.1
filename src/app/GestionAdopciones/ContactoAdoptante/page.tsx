// src/pages/GestionAdopciones/ContactoAdoptante.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Briefcase, Clock3, User, Pencil, Plus, Trash2, Save, XCircle } from 'lucide-react';

interface Contacto {
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  ocupacion: string;
  tiempoDisponible: string;
  fecha: string;
}

const contactosIniciales: Contacto[] = [
  {
    nombre: 'Juan Pérez',
    correo: 'juanperez@gmail.com',
    telefono: '777-12345',
    direccion: 'Calle 21, La Paz',
    ocupacion: 'Ingeniero de Sistemas',
    tiempoDisponible: 'Medio tiempo',
    fecha: '2025-06-01',
  },
  {
    nombre: 'Ana López',
    correo: 'ana.lopez@gmail.com',
    telefono: '765-43210',
    direccion: 'Av. América, Cochabamba',
    ocupacion: 'Veterinaria',
    tiempoDisponible: 'Tiempo completo',
    fecha: '2025-06-03',
  },
  {
    nombre: 'Carlos Ríos',
    correo: 'carlosr@gmail.com',
    telefono: '712-00000',
    direccion: 'Zona Sur, La Paz',
    ocupacion: 'Profesor',
    tiempoDisponible: 'Medio tiempo',
    fecha: '2025-06-04',
  },
  {
    nombre: 'Beatriz Salas',
    correo: 'bea.salas@hotmail.com',
    telefono: '799-56789',
    direccion: 'Calle 10, El Alto',
    ocupacion: 'Contadora',
    tiempoDisponible: 'Pocas horas al día',
    fecha: '2025-06-02',
  },
  {
    nombre: 'Diego Gutiérrez',
    correo: 'diegogutierrez@yahoo.com',
    telefono: '700-12345',
    direccion: 'Centro, Santa Cruz',
    ocupacion: 'Administrador',
    tiempoDisponible: 'Tiempo completo',
    fecha: '2025-06-01',
  },
];

export default function ContactoAdoptante() {
  const [contactos, setContactos] = useState<Contacto[]>(contactosIniciales);
  const [form, setForm] = useState<Contacto>({ nombre: '', correo: '', telefono: '', direccion: '', ocupacion: '', tiempoDisponible: '', fecha: '' });
  const [filtroFecha, setFiltroFecha] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalEliminar, setModalEliminar] = useState<{ show: boolean; index: number | null }>({ show: false, index: null });

  useEffect(() => {
    if (editIndex !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editIndex]);

  const handleGuardar = () => {
    if (form.nombre && form.correo) {
      if (editIndex !== null) {
        const updated = [...contactos];
        updated[editIndex] = form;
        setContactos(updated);
        setEditIndex(null);
      } else {
        setContactos([...contactos, form]);
      }
      setForm({ nombre: '', correo: '', telefono: '', direccion: '', ocupacion: '', tiempoDisponible: '', fecha: '' });
    }
  };

  const handleEditar = (index: number) => {
    setForm(contactos[index]);
    setEditIndex(index);
  };

  const confirmarEliminar = () => {
    if (modalEliminar.index !== null) {
      const updated = contactos.filter((_, i) => i !== modalEliminar.index);
      setContactos(updated);
    }
    setModalEliminar({ show: false, index: null });
  };

  const contactosFiltrados = filtroFecha ? contactos.filter(c => c.fecha === filtroFecha) : contactos;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#F7C59F] to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-[#30588C] dark:text-[#7FB9C2] mb-8">
        Información de Contacto del Adoptante
      </h2>

      {/* Formulario de nuevo contacto */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow mb-12">
        <h3 className="text-xl font-bold mb-4 text-[#30588C] dark:text-[#7FB9C2] flex items-center gap-2">
          <Plus size={20} /> {editIndex !== null ? 'Editar Adoptante' : 'Nuevo Adoptante'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" className="p-2 rounded border w-full" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <input type="email" className="p-2 rounded border w-full" placeholder="Correo" value={form.correo} onChange={(e) => setForm({ ...form, correo: e.target.value })} />
          <input type="text" className="p-2 rounded border w-full" placeholder="Teléfono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
          <input type="text" className="p-2 rounded border w-full" placeholder="Dirección" value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
          <input type="text" className="p-2 rounded border w-full" placeholder="Ocupación" value={form.ocupacion} onChange={(e) => setForm({ ...form, ocupacion: e.target.value })} />
          <input type="text" className="p-2 rounded border w-full" placeholder="Tiempo disponible" value={form.tiempoDisponible} onChange={(e) => setForm({ ...form, tiempoDisponible: e.target.value })} />
          <input type="date" className="p-2 rounded border w-full" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
        </div>
        <div className="text-right mt-4">
          <button onClick={handleGuardar} className="bg-[#BF3952] hover:bg-[#a83245] text-white px-4 py-2 rounded inline-flex items-center">
            <Save size={18} className="mr-1" /> {editIndex !== null ? 'Actualizar' : 'Guardar'} Adoptante
          </button>
        </div>
      </div>

      {/* Filtro por fecha */}
      <div className="max-w-md mx-auto mb-6">
        <label className="block text-[#30588C] font-semibold mb-1">Filtrar por fecha:</label>
        <input type="date" className="p-2 rounded border w-full" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} />
      </div>

      {/* Lista de contactos */}
      {contactosFiltrados.map((contacto, i) => (
        <div key={i} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            <div className="flex items-center gap-2"><User className="text-[#30588C]" /><strong>Nombre:</strong> {contacto.nombre}</div>
            <div className="flex items-center gap-2"><Mail className="text-[#30588C]" /><strong>Correo:</strong> {contacto.correo}</div>
            <div className="flex items-center gap-2"><Phone className="text-[#30588C]" /><strong>Teléfono:</strong> {contacto.telefono}</div>
            <div className="flex items-center gap-2"><MapPin className="text-[#30588C]" /><strong>Dirección:</strong> {contacto.direccion}</div>
            <div className="flex items-center gap-2"><Briefcase className="text-[#30588C]" /><strong>Ocupación:</strong> {contacto.ocupacion}</div>
            <div className="flex items-center gap-2"><Clock3 className="text-[#30588C]" /><strong>Tiempo disponible:</strong> {contacto.tiempoDisponible}</div>
          </div>
          <div className="text-sm text-right text-gray-500 italic dark:text-gray-300 mt-2">Fecha: {contacto.fecha}</div>
          <div className="text-right space-x-2">
            <button onClick={() => handleEditar(i)} className="text-blue-600 hover:text-blue-800 inline-flex items-center"><Pencil size={18} /> Editar</button>
            <button onClick={() => setModalEliminar({ show: true, index: i })} className="text-red-600 hover:text-red-800 inline-flex items-center"><Trash2 size={18} /> Eliminar</button>
          </div>
        </div>
      ))}

      {/* Modal de confirmación */}
      {modalEliminar.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
            <h4 className="text-lg font-semibold mb-4">¿Confirmar eliminación?</h4>
            <div className="flex justify-end gap-3">
              <button onClick={() => setModalEliminar({ show: false, index: null })} className="px-4 py-2 text-sm rounded bg-gray-300 dark:bg-gray-700"><XCircle className="inline mr-1" size={16} /> Cancelar</button>
              <button onClick={confirmarEliminar} className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"><Trash2 className="inline mr-1" size={16} /> Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
