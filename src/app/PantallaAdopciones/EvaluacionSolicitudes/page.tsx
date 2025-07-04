'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const solicitudesIniciales = [
  {
    id: 1,
    usuario: 'Carlos R.',
    mascota: 'Luna',
    estado: 'Pendiente',
    fotoMascota: '/Gatos/gatito_PA_14.png',
    fecha: '2025-05-25 10:45',
  },
  {
    id: 2,
    usuario: 'María F.',
    mascota: 'Max',
    estado: 'En revisión',
    fotoMascota: '/Gatos/gatito_PA_12.png',
    fecha: '2025-05-26 09:20',
  },
  {
    id: 3,
    usuario: 'Luis M.',
    mascota: 'Bella',
    estado: 'Rechazada',
    fotoMascota: '/Gatos/gatito_PA_15.png',
    fecha: '2025-05-24 16:30',
  },
  {
    id: 4,
    usuario: 'Cristian R.',
    mascota: 'Pimpi',
    estado: 'Pendiente',
    fotoMascota: '/Gatos/gatito_PA_16.png',
    fecha: '2025-05-24 16:30',
  },
  {
    id: 5,
    usuario: 'Ivan C.',
    mascota: 'Silpi',
    estado: 'En revisión',
    fotoMascota: '/Perros/perrito_PA_13.png',
    fecha: '2025-05-24 16:30',
  },
  {
    id: 6,
    usuario: 'Beymar M.',
    mascota: 'Gael',
    estado: 'Rechazada',
    fotoMascota: '/Perros/perrito_PA_15.png',
    fecha: '2025-05-24 16:30',
  },
  {
    id: 7,
    usuario: 'Reyshel O.',
    mascota: 'Hassan',
    estado: 'Pendiente',
    fotoMascota: '/Perros/perrito_PA_14.png',
    fecha: '2025-05-24 16:30',
  },
  {
    id: 8,
    usuario: 'Kiara P.',
    mascota: 'Blanquito',
    estado: 'En revisión',
    fotoMascota: '/Perros/perrito_PA_15.png',
    fecha: '2025-05-24 16:30',
  },
  {
    id: 9,
    usuario: 'Geraldine L.',
    mascota: 'Bella',
    estado: 'Pendiente',
    fotoMascota: '/Perros/perrito_PA_16.png',
    fecha: '2025-05-24 16:30',
  },
  {
    id: 10,
    usuario: 'Wendy I.',
    mascota: 'Pepa',
    estado: 'En revisión',
    fotoMascota: '/Perros/perrito_PA_13.png',
    fecha: '2025-05-24 16:30',
  }
];

export default function EvaluacionSolicitudes() {
  const [solicitudes, setSolicitudes] = useState(solicitudesIniciales);
  const [filtro, setFiltro] = useState('Todos');

  const actualizarEstado = (id: number, nuevoEstado: string) => {
    const confirmacion = confirm(`¿Seguro que deseas marcar como "${nuevoEstado}" esta solicitud?`);
    if (!confirmacion) return;

    const actualizadas = solicitudes.map((s) =>
      s.id === id ? { ...s, estado: nuevoEstado } : s
    );
    setSolicitudes(actualizadas);
  };

  const solicitudesFiltradas = filtro === 'Todos'
    ? solicitudes
    : solicitudes.filter((s) => s.estado === filtro);

  const contarPorEstado = (estado: string) =>
    solicitudes.filter((s) => s.estado === estado).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Banner */}
      <div className="relative w-full h-72 md:h-80">
        <Image
          src="/Perros y Gatos/bannerprincipaladopciones.jpg"
          alt="Banner Evaluación Solicitudes"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
            Evaluación de Solicitudes
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl drop-shadow">
            Revisa, acepta o rechaza las solicitudes de adopción que han sido enviadas por los usuarios.
          </p>
        </div>
      </div>

      {/* Panel de estadísticas */}
      <div className="max-w-4xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
            <p className="text-2xl font-bold text-blue-500">{contarPorEstado('Pendiente')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">En revisión</p>
            <p className="text-2xl font-bold text-yellow-500">{contarPorEstado('En revisión')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Rechazadas</p>
            <p className="text-2xl font-bold text-red-500">{contarPorEstado('Rechazada')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">{solicitudes.length}</p>
          </div>
        </div>

        {/* Filtro */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Filtrar por estado</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <option>Todos</option>
            <option>Pendiente</option>
            <option>En revisión</option>
            <option>Rechazada</option>
          </select>
        </div>
      </div>

      {/* Lista de solicitudes */}
      <div className="max-w-4xl mx-auto p-6">
        <ul className="space-y-6">
          {solicitudesFiltradas.map((s) => (
            <li
              key={s.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col sm:flex-row gap-6"
            >
              <div className="flex justify-center">
                <Image
                  src={s.fotoMascota}
                  alt={`Foto de ${s.mascota}`}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  <strong>Usuario:</strong> {s.usuario}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  <strong>Mascota:</strong> {s.mascota}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                  <strong>Fecha de solicitud:</strong> {s.fecha}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Estado:</strong>{' '}
                  <span
                    className={
                      s.estado === 'Pendiente'
                        ? 'text-blue-500'
                        : s.estado === 'En revisión'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }
                  >
                    {s.estado}
                  </span>
                </p>
                {s.estado === 'Pendiente' && (
                  <div className="mt-3 space-x-2">
                    <button
                      onClick={() => actualizarEstado(s.id, 'En revisión')}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => actualizarEstado(s.id, 'Rechazada')}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
