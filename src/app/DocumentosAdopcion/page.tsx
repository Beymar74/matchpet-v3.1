'use client';
import React, { useState } from 'react';
import {
  FileText, CheckCircle, Clock, Plus, Trash2, Pencil, Save, Eye
} from 'lucide-react';

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
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const handleSave = () => {
    if (form.mascota && form.tipo && form.estado && form.fecha) {
      const nuevos = [...documentos];
      if (editIndex !== null) {
        nuevos[editIndex] = form;
      } else {
        nuevos.push(form);
      }
      setDocumentos(nuevos);
      setForm({ mascota: '', tipo: '', estado: '', fecha: '', archivoUrl: '' });
      setEditIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setForm(documentos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    setDocumentos(documentos.filter((_, i) => i !== index));
  };

  const documentosFiltrados = documentos.filter(d =>
    (filtroTipo === '' || d.tipo === filtroTipo) &&
    (filtroEstado === '' || d.estado === filtroEstado)
  );

  return (
    <div className="p-8 min-h-screen bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-center text-[#30588C] dark:text-[#7FB9C2] mb-10">
        <FileText className="inline-block mr-2 mb-1" /> Gestión de Documentos
      </h1>
      

      {/* Formulario */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-12 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-[#30588C] dark:text-[#7FB9C2]">
          <Plus size={20} /> {editIndex !== null ? 'Editar Documento' : 'Nuevo Documento'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Nombre de la mascota" value={form.mascota} onChange={(e) => setForm({ ...form, mascota: e.target.value })} className="p-3 rounded-md border w-full bg-white dark:bg-gray-700 dark:text-white" />
          <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="p-3 rounded-md border w-full bg-white dark:bg-gray-700 dark:text-white">
            <option value="">Seleccionar tipo de documento</option>
            {tiposDocumento.map((tipo, i) => <option key={i} value={tipo}>{tipo}</option>)}
          </select>
          <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })} className="p-3 rounded-md border w-full bg-white dark:bg-gray-700 dark:text-white">
            <option value="">Seleccionar estado</option>
            {estados.map((estado, i) => <option key={i} value={estado}>{estado}</option>)}
          </select>
          <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} className="p-3 rounded-md border w-full bg-white dark:bg-gray-700 dark:text-white" />
          <input type="url" placeholder="URL del archivo (PDF, imagen, etc.)" value={form.archivoUrl} onChange={(e) => setForm({ ...form, archivoUrl: e.target.value })} className="p-3 rounded-md border w-full col-span-full bg-white dark:bg-gray-700 dark:text-white" />
        </div>

        <div className="mt-6 text-right">
          <button onClick={handleSave} className="bg-[#30588C] hover:bg-[#25436b] text-white px-5 py-2.5 rounded-md inline-flex items-center transition">
            <Save size={18} className="mr-2" /> {editIndex !== null ? 'Guardar Cambios' : 'Agregar Documento'}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center mb-6">
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="px-4 py-2 rounded border bg-white dark:bg-gray-700 dark:text-white">
          <option value="">Todos los tipos</option>
          {tiposDocumento.map((tipo, i) => <option key={i} value={tipo}>{tipo}</option>)}
        </select>
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="px-4 py-2 rounded border bg-white dark:bg-gray-700 dark:text-white">
          <option value="">Todos los estados</option>
          {estados.map((estado, i) => <option key={i} value={estado}>{estado}</option>)}
        </select>
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-auto">
          Mostrando: {documentosFiltrados.length} documento(s)
        </span>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="w-full table-auto border-collapse rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-[#30588C] text-white text-left">
              <th className="p-4">Mascota</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Archivo</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentosFiltrados.map((doc, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-4">{doc.mascota}</td>
                <td className="p-4">{doc.tipo}</td>
                <td className="p-4">
                  {doc.estado === 'Pendiente' && (
                    <span className="inline-flex items-center gap-1 text-yellow-700 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full text-sm font-medium">
                      <Clock size={14} /> Pendiente
                    </span>
                  )}
                  {doc.estado === 'Aprobado' && (
                    <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-sm font-medium">
                      <CheckCircle size={14} /> Aprobado
                    </span>
                  )}
                  {doc.estado === 'Rechazado' && (
                    <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 dark:bg-red-900 px-2 py-1 rounded-full text-sm font-medium">
                      <Trash2 size={14} /> Rechazado
                    </span>
                  )}
                </td>
                <td className="p-4">{doc.fecha}</td>
                <td className="p-4">
                  {doc.archivoUrl ? (
                    <a href={doc.archivoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                      <Eye size={16} /> Ver
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No disponible</span>
                  )}
                </td>
                <td className="p-4 text-center flex justify-center gap-4">
                  <button onClick={() => handleEdit(i)} className="text-[#30588C] hover:text-[#203a5e] dark:text-[#7FB9C2] dark:hover:text-[#b3dfe6]">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(i)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {documentosFiltrados.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500 dark:text-gray-400 italic">No se encontraron documentos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
