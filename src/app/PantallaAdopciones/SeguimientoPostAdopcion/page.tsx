'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const seguimientosIniciales = [
  { fecha: '2025-05-15', comentario: 'Mascota en buen estado.', mascota: 'Luna', estado: 'Bueno', foto: '/img/luna.jpg' },
  { fecha: '2025-05-22', comentario: 'Necesita refuerzo de vacuna.', mascota: 'Max', estado: 'Control', foto: '/img/max.jpg' },
  { fecha: '2025-05-28', comentario: 'Se detectó decaimiento, revisar.', mascota: 'Bella', estado: 'Urgente', foto: '/img/bella.jpg' },
];

export default function SeguimientoPostAdopcion() {
  const [seguimientos, setSeguimientos] = useState(seguimientosIniciales);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nuevoSeguimiento, setNuevoSeguimiento] = useState({ fecha: '', mascota: '', comentario: '', estado: 'Bueno', foto: '' });
  const printRef = useRef(null);

  const seguimientosFiltrados = seguimientos.filter((s) =>
    s.mascota.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    (filtroFecha === '' || s.fecha === filtroFecha)
  );

  const contarPorEstado = (estado: string) =>
    seguimientos.filter((s) => s.estado === estado).length;

  const handleAddSeguimiento = () => {
    if (nuevoSeguimiento.fecha && nuevoSeguimiento.mascota && nuevoSeguimiento.comentario) {
      setSeguimientos([...seguimientos, nuevoSeguimiento]);
      setNuevoSeguimiento({ fecha: '', mascota: '', comentario: '', estado: 'Bueno', foto: '' });
      setShowModal(false);
    }
  };

  const exportPDF = async () => {
    const input = printRef.current;
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('seguimiento_post_adopcion.pdf');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="relative w-full h-72 md:h-80 mb-8">
        <img
          src="/img/banner-seguimiento.jpg"
          alt="Banner Seguimiento"
          className="object-cover w-full h-full rounded-lg brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow mb-2">
            Seguimiento Post-Adopción
          </h1>
          <p className="text-sm md:text-lg max-w-2xl drop-shadow">
            Consulta las observaciones realizadas durante el seguimiento del bienestar de las mascotas adoptadas.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-700 dark:text-white">{seguimientos.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Bueno</p>
          <p className="text-2xl font-bold text-green-500">{contarPorEstado('Bueno')}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Control</p>
          <p className="text-2xl font-bold text-yellow-500">{contarPorEstado('Control')}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Urgente</p>
          <p className="text-2xl font-bold text-red-500">{contarPorEstado('Urgente')}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-4 text-right">
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          📄 Exportar PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre de mascota..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="max-w-4xl mx-auto mb-6 text-right">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Añadir Seguimiento
        </button>
      </div>

      <div className="max-w-4xl mx-auto" ref={printRef}>
        <ul className="space-y-6">
          {seguimientosFiltrados.map((s, index) => (
            <li
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex gap-4"
            >
              <Image
                src={s.foto || '/img/default.jpg'}
                alt={`Foto de ${s.mascota}`}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  <strong>Mascota:</strong> {s.mascota}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <strong>Fecha:</strong> {s.fecha}
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  <strong>Comentario:</strong> {s.comentario}
                </p>
                <p className="mt-1 text-sm">
                  <strong>Estado:</strong>{' '}
                  <span className={
                    s.estado === 'Bueno' ? 'text-green-500' :
                    s.estado === 'Control' ? 'text-yellow-500' :
                    'text-red-500'
                  }>
                    {s.estado}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Nuevo Seguimiento</h2>
            <input
              type="date"
              value={nuevoSeguimiento.fecha}
              onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, fecha: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Nombre de la mascota"
              value={nuevoSeguimiento.mascota}
              onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, mascota: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              placeholder="Comentario"
              value={nuevoSeguimiento.comentario}
              onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, comentario: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={nuevoSeguimiento.estado}
              onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, estado: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="Bueno">Bueno</option>
              <option value="Control">Control</option>
              <option value="Urgente">Urgente</option>
            </select>
            <input
              type="text"
              placeholder="URL de foto (opcional)"
              value={nuevoSeguimiento.foto}
              onChange={(e) => setNuevoSeguimiento({ ...nuevoSeguimiento, foto: e.target.value })}
              className="w-full mb-4 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <div className="text-right space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSeguimiento}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
