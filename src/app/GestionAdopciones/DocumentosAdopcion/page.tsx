// src/pages/GestionAdopciones/DocumentosAdopcion.tsx
'use client';
import React, { useState, ChangeEvent } from 'react';
import { FileText, CheckCircle, Clock, Plus, Trash2, Pencil, Save, Eye } from 'lucide-react';

interface Documento {
  mascota: string;
  tipo: string;
  estado: string;
  fecha: string;
  archivoUrl?: string;
}

const documentosIniciales: Documento[] = [
  { mascota: 'Luna', tipo: 'Contrato de Adopción', estado: 'Pendiente', fecha: '2025-05-28', archivoUrl: 'https://example.com/luna-contrato.pdf' },
  { mascota: 'Max', tipo: 'Comprobante de Domicilio', estado: 'Aprobado', fecha: '2025-05-29', archivoUrl: 'https://example.com/max-domicilio.pdf' },
];

const tiposDocumento = ['Contrato de Adopción', 'Comprobante de Domicilio', 'Formulario de Solicitud', 'Ficha Médica'];
const estados = ['Pendiente', 'Aprobado', 'Rechazado'];

export default function DocumentosAdopcion() {
  const [documentos, setDocumentos] = useState<Documento[]>(documentosIniciales);
  const [form, setForm] = useState<Documento>({ mascota: '', tipo: '', estado: '', fecha: '', archivoUrl: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSave = () => {
    if (form.mascota && form.tipo && form.estado && form.fecha) {
      if (editIndex !== null) {
        const actualizados = [...documentos];
        actualizados[editIndex] = form;
        setDocumentos(actualizados);
      } else {
        setDocumentos([...documentos, form]);
      }
      setForm({ mascota: '', tipo: '', estado: '', fecha: '', archivoUrl: '' });
      setEditIndex(null);
    }
  };

  const handleEdit = (i: number) => {
    setForm(documentos[i]);
    setEditIndex(i);
  };

  const handleDelete = (i: number) => {
    setDocumentos(documentos.filter((_, idx) => idx !== i));
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#F7C59F] to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-[#30588C] dark:text-[#7FB9C2] mb-6">Gestión de Documentos</h2>

      {/* Formulario */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow mb-12">
        <h3 className="text-xl font-bold mb-4 text-[#30588C] dark:text-[#7FB9C2] flex items-center gap-2">
          <Plus size={20} /> {editIndex !== null ? 'Editar Documento' : 'Nuevo Documento'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" className="p-2 rounded border w-full" value={form.mascota} onChange={(e) => setForm({ ...form, mascota: e.target.value })} placeholder="Nombre de la mascota" />
          <select className="p-2 rounded border w-full" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
            <option value="">Seleccionar tipo de documento</option>
            {tiposDocumento.map((tipo, i) => <option key={i} value={tipo}>{tipo}</option>)}
          </select>
          <select className="p-2 rounded border w-full" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
            <option value="">Seleccionar estado</option>
            {estados.map((e, i) => <option key={i} value={e}>{e}</option>)}
          </select>
          <input type="date" className="p-2 rounded border w-full" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
          <input type="url" className="p-2 rounded border w-full" placeholder="URL del archivo (PDF, imagen, etc.)" value={form.archivoUrl} onChange={(e) => setForm({ ...form, archivoUrl: e.target.value })} />
        </div>
        <div className="text-right mt-4">
          <button onClick={handleSave} className="bg-[#BF3952] hover:bg-[#a83245] text-white px-4 py-2 rounded inline-flex items-center">
            <Save size={18} className="mr-2" /> {editIndex !== null ? 'Guardar Cambios' : 'Agregar Documento'}
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto max-w-7xl mx-auto">
        <table className="w-full border-collapse rounded shadow-md overflow-hidden">
          <thead>
            <tr className="bg-[#30588C] text-white">
              <th className="p-3 text-left">Mascota</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Archivo</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((d, i) => (
              <tr key={i} className="border-b hover:bg-[#fdf4f5] dark:hover:bg-gray-700">
                <td className="p-3">{d.mascota}</td>
                <td className="p-3">{d.tipo}</td>
                <td className="p-3">
                  {d.estado === 'Pendiente' && <span className="text-yellow-600 flex items-center gap-1"><Clock size={14} /> {d.estado}</span>}
                  {d.estado === 'Aprobado' && <span className="text-green-600 flex items-center gap-1"><CheckCircle size={14} /> {d.estado}</span>}
                  {d.estado === 'Rechazado' && <span className="text-red-600 flex items-center gap-1"><Trash2 size={14} /> {d.estado}</span>}
                </td>
                <td className="p-3">{d.fecha}</td>
                <td className="p-3">
                  {d.archivoUrl ? (
                    <a href={d.archivoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                      <Eye size={16} /> Ver
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No disponible</span>
                  )}
                </td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <button onClick={() => handleEdit(i)} className="text-[#30588C] hover:text-[#203a5e] dark:text-[#7FB9C2] dark:hover:text-[#b3dfe6]">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(i)} className="text-[#BF3952] hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
