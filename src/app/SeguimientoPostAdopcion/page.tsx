'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import * as XLSX from 'xlsx';
import { CheckCircle, Edit, Trash2, PlusCircle } from 'lucide-react';

const seguimientosIniciales = [
  {
    mascota: 'Luna',
    estado: 'Bueno',
    comentario: 'Mascota en buen estado.',
    imagen: '/Gatos/gatito_PA_14.png',
    fecha: '2025-05-15',
  },
  {
    mascota: 'Max',
    estado: 'Control',
    comentario: 'Necesita refuerzo de vacuna.',
    imagen: '/Gatos/gatito_PA_12.png',
    fecha: '2025-05-22',
  },
];

export default function SeguimientoPostAdopcion() {
  const [seguimientos, setSeguimientos] = useState(seguimientosIniciales);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [nuevoSeguimiento, setNuevoSeguimiento] = useState({
    fecha: '',
    mascota: '',
    comentario: '',
    estado: 'Bueno',
    imagen: '',
  });
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [mensaje, setMensaje] = useState<string>('');

  const seguimientosFiltrados = seguimientos.filter((s) =>
    s.mascota.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    (filtroFecha === '' || s.fecha === filtroFecha) &&
    (filtroEstado === '' || s.estado === filtroEstado)
  );

  const estadisticas = {
    total: seguimientosFiltrados.length,
    bueno: seguimientosFiltrados.filter((s) => s.estado === 'Bueno').length,
    control: seguimientosFiltrados.filter((s) => s.estado === 'Control').length,
    urgente: seguimientosFiltrados.filter((s) => s.estado === 'Urgente').length,
  };

  const validar = () => {
    const nuevosErrores: { [key: string]: string } = {};
    if (!nuevoSeguimiento.fecha) nuevosErrores.fecha = 'La fecha es obligatoria.';
    if (!nuevoSeguimiento.mascota.trim()) nuevosErrores.mascota = 'El nombre de la mascota es obligatorio.';
    if (!nuevoSeguimiento.comentario.trim()) nuevosErrores.comentario = 'El comentario es obligatorio.';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const mostrarMensaje = (texto: string) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleGuardarSeguimiento = () => {
    if (!validar()) return;
    const nuevos = [...seguimientos];
    if (editIndex !== null) {
      nuevos[editIndex] = { ...nuevoSeguimiento };
      mostrarMensaje('Seguimiento editado correctamente');
    } else {
      nuevos.push({ ...nuevoSeguimiento });
      mostrarMensaje('Seguimiento añadido correctamente');
    }
    setSeguimientos(nuevos);
    setNuevoSeguimiento({ fecha: '', mascota: '', comentario: '', estado: 'Bueno', imagen: '' });
    setErrores({});
    setShowModal(false);
    setEditIndex(null);
  };

  const handleEliminar = (index: number) => {
    const nuevos = [...seguimientos];
    nuevos.splice(index, 1);
    setSeguimientos(nuevos);
    mostrarMensaje('Seguimiento eliminado correctamente');
  };

  const exportToExcel = () => {
    const data = seguimientosFiltrados.map((s) => ({
      Fecha: s.fecha,
      Mascota: s.mascota,
      Estado: s.estado,
      Comentario: s.comentario,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Seguimientos');
    XLSX.writeFile(workbook, 'seguimiento_post_adopcion.xlsx');
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setEditIndex(null);
    setErrores({});
    setNuevoSeguimiento({ fecha: '', mascota: '', comentario: '', estado: 'Bueno', imagen: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="relative w-full h-72 mb-8 shadow-lg rounded-lg overflow-hidden">
        <img src="/Perros y Gatos/bannerprincipaladopciones.jpg" alt="Banner" className="object-cover w-full h-full brightness-75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-extrabold drop-shadow">Seguimiento Post-Adopción</h1>
          <p className="text-lg drop-shadow-sm">Consulta el estado y comentarios del bienestar de mascotas adoptadas.</p>
        </div>
      </div>

      {mensaje && (
        <div className="mb-4 text-center bg-green-200 text-green-800 px-4 py-2 rounded shadow-md flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" /> <span>{mensaje}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto mb-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-3">
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow">
            <PlusCircle className="w-5 h-5" /> Añadir
          </button>
          <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow">Exportar Excel</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <input type="text" placeholder="Buscar por nombre" value={filtroNombre} onChange={(e) => setFiltroNombre(e.target.value)} className="px-4 py-2 rounded border shadow-sm" />
          <input type="date" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} className="px-4 py-2 rounded border shadow-sm" />
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="px-4 py-2 rounded border shadow-sm">
            <option value="">Todos los estados</option>
            <option value="Bueno">Bueno</option>
            <option value="Control">Control</option>
            <option value="Urgente">Urgente</option>
          </select>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-6xl mx-auto mb-4 flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-200">
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow flex-1 text-center">Total: <strong>{estadisticas.total}</strong></div>
        <div className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 p-3 rounded shadow flex-1 text-center">Bueno: <strong>{estadisticas.bueno}</strong></div>
        <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 p-3 rounded shadow flex-1 text-center">Control: <strong>{estadisticas.control}</strong></div>
        <div className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 p-3 rounded shadow flex-1 text-center">Urgente: <strong>{estadisticas.urgente}</strong></div>
      </div>

      <div className="overflow-x-auto max-w-6xl mx-auto rounded shadow-md">
        <table className="w-full table-auto bg-white dark:bg-gray-800 border-collapse text-left">
          <thead className="bg-blue-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="p-3">Mascota</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Comentario</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {seguimientosFiltrados.map((s, index) => (
              <tr key={index} className="border-b dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700">
                <td className="p-3 flex items-center gap-3">
                  <Image src={s.imagen || '/placeholder.jpg'} alt="Mascota" width={40} height={40} className="rounded-full border shadow-sm" />
                  {s.mascota}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${s.estado === 'Bueno' ? 'bg-green-100 text-green-800' : s.estado === 'Control' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{s.estado}</span>
                </td>
                <td className="p-3 text-sm text-gray-700 dark:text-gray-200">{s.comentario}</td>
                <td className="p-3 text-sm text-gray-500 dark:text-gray-400">{s.fecha}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => { setNuevoSeguimiento(s); setEditIndex(index); setShowModal(true); }} className="text-blue-600 hover:text-blue-800 flex items-center gap-1"><Edit className="w-4 h-4" /> Editar</button>
                  <button onClick={() => handleEliminar(index)} className="text-red-600 hover:text-red-800 flex items-center gap-1"><Trash2 className="w-4 h-4" /> Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{editIndex !== null ? 'Editar Seguimiento' : 'Nuevo Seguimiento'}</h2>
            <input type="date" value={nuevoSeguimiento.fecha} onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, fecha: e.target.value })} className={`w-full mb-2 px-4 py-2 border rounded ${errores.fecha ? 'border-red-500' : ''}`} />
            <input type="text" placeholder="Nombre de mascota" value={nuevoSeguimiento.mascota} onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, mascota: e.target.value })} className={`w-full mb-2 px-4 py-2 border rounded ${errores.mascota ? 'border-red-500' : ''}`} />
            <textarea placeholder="Comentario" value={nuevoSeguimiento.comentario} onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, comentario: e.target.value })} className={`w-full mb-2 px-4 py-2 border rounded ${errores.comentario ? 'border-red-500' : ''}`} />
            <select value={nuevoSeguimiento.estado} onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, estado: e.target.value })} className="w-full mb-2 px-4 py-2 border rounded">
              <option value="Bueno">Bueno</option>
              <option value="Control">Control</option>
              <option value="Urgente">Urgente</option>
            </select>

            {/* URL con estilo y vista previa */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL de imagen <span className="text-gray-400">(opcional)</span>
              </label>
              <div className="relative">
                <input type="text" placeholder="https://..." value={nuevoSeguimiento.imagen} onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, imagen: e.target.value })} className="w-full px-4 py-2 border rounded pr-10 shadow-sm dark:bg-gray-700 dark:text-white" />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🖼️</span>
              </div>
              {nuevoSeguimiento.imagen && (
                <div className="mt-2 border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                  <img src={nuevoSeguimiento.imagen} alt="Vista previa" className="w-full max-h-40 object-contain bg-gray-50 dark:bg-gray-700 p-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={handleCerrarModal} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
              <button onClick={handleGuardarSeguimiento} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
