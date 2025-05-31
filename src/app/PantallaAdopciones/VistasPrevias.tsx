'use client';
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const visitasIniciales = [
  { fecha: '2025-04-01', usuario: 'Carlos R.', mascota: 'Luna', comentario: 'Luna se mostró muy sociable.' },
  { fecha: '2025-04-10', usuario: 'Ana L.', mascota: 'Toby', comentario: 'Toby estaba un poco nervioso al principio.' },
];

export default function VisitasPrevias() {
  const [visitas, setVisitas] = useState(visitasIniciales);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroMascota, setFiltroMascota] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nuevaVisita, setNuevaVisita] = useState({ fecha: '', usuario: '', mascota: '', comentario: '' });

  const visitasFiltradas = visitas.filter(
    (v) =>
      v.usuario.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      v.mascota.toLowerCase().includes(filtroMascota.toLowerCase()) &&
      (filtroFecha === '' || v.fecha === filtroFecha)
  );

  const handleAddVisita = () => {
    if (nuevaVisita.fecha && nuevaVisita.usuario && nuevaVisita.mascota) {
      setVisitas([...visitas, nuevaVisita]);
      setNuevaVisita({ fecha: '', usuario: '', mascota: '', comentario: '' });
      setShowModal(false);
    }
  };

  const exportarPDF = async () => {
    const input = document.getElementById('reporte-visitas');
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('reporte_visitas.pdf');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-72 mb-8">
        <img
          src="/img/banner-visitas.jpg"
          alt="Banner Visitas"
          className="object-cover w-full h-full rounded-lg brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow mb-2">
            Visitas Previas
          </h1>
          <p className="text-sm md:text-lg max-w-2xl drop-shadow">
            Registro de visitas realizadas por los adoptantes a nuestras mascotas para conocerlas antes de adoptar.
          </p>
        </div>
      </div>

      {/* Panel de estadísticas */}
      <div className="max-w-4xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total de Visitas</p>
          <p className="text-2xl font-bold text-gray-700 dark:text-white">{visitas.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Mascotas distintas</p>
          <p className="text-2xl font-bold text-green-500">{
            new Set(visitas.map((v) => v.mascota)).size
          }</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500">Usuarios distintos</p>
          <p className="text-2xl font-bold text-blue-500">{
            new Set(visitas.map((v) => v.usuario)).size
          }</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-4xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Filtrar por nombre de usuario..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="text"
          placeholder="Filtrar por nombre de mascota..."
          value={filtroMascota}
          onChange={(e) => setFiltroMascota(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Botones de acción */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Registrar Visita
        </button>
        <button
          onClick={exportarPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          📄 Exportar PDF
        </button>
      </div>

      {/* Lista de visitas */}
      <div id="reporte-visitas" className="max-w-4xl mx-auto">
        {visitasFiltradas.map((v, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition mb-4"
          >
            <p className="text-gray-700 dark:text-gray-300"><strong>Fecha:</strong> {v.fecha}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Usuario:</strong> {v.usuario}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Mascota:</strong> {v.mascota}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Comentario:</strong> {v.comentario}</p>
          </div>
        ))}
      </div>

      {/* Modal para nueva visita */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Nueva Visita</h2>
            <input
              type="date"
              value={nuevaVisita.fecha}
              onChange={(e) => setNuevaVisita({ ...nuevaVisita, fecha: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Nombre del usuario"
              value={nuevaVisita.usuario}
              onChange={(e) => setNuevaVisita({ ...nuevaVisita, usuario: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Nombre de la mascota"
              value={nuevaVisita.mascota}
              onChange={(e) => setNuevaVisita({ ...nuevaVisita, mascota: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              placeholder="Comentario"
              value={nuevaVisita.comentario}
              onChange={(e) => setNuevaVisita({ ...nuevaVisita, comentario: e.target.value })}
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
                onClick={handleAddVisita}
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
