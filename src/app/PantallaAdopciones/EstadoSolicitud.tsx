'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const estadosIniciales = [
  {
    mascota: 'Luna',
    estado: 'Aceptada',
    imagen: '/img/luna.jpg',
    fecha: '2025-05-25 10:45',
    actualizacion: '2025-05-27 14:32',
  },
  {
    mascota: 'Max',
    estado: 'En revisión',
    imagen: '/img/max.jpg',
    fecha: '2025-05-26 09:20',
    actualizacion: '2025-05-27 12:10',
  },
];

const estadoColor = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'aceptada':
      return 'text-green-600';
    case 'en revisión':
      return 'text-yellow-600';
    case 'rechazada':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const estadoIcono = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'aceptada':
      return '✔️';
    case 'en revisión':
      return '🕒';
    case 'rechazada':
      return '❌';
    default:
      return 'ℹ️';
  }
};

export default function EstadoSolicitud() {
  const [filtro, setFiltro] = useState('todos');

  const estadosFiltrados =
    filtro === 'todos'
      ? estadosIniciales
      : estadosIniciales.filter((e) => e.estado.toLowerCase() === filtro);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Banner */}
      <div className="relative w-full h-72 md:h-80">
        <Image
          src="/img/banner-solicitud.jpg"
          alt="Banner Estado Solicitud"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
            Estado de Solicitudes
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl drop-shadow">
            Consulta el estado actualizado de tus solicitudes de adopción y conoce el avance del proceso.
          </p>
        </div>
      </div>

      {/* Panel de estadísticas */}
      <div className="max-w-4xl mx-auto px-6 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">1</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Aceptadas</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">En Revisión</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">0</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Rechazadas</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
        </div>
      </div>

      {/* Filtro */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        <label htmlFor="filtro" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          Filtrar por estado:
        </label>
        <select
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full p-2 mb-8 border border-gray-300 rounded shadow-sm dark:bg-gray-800 dark:text-white"
        >
          <option value="todos">Todos</option>
          <option value="aceptada">Aceptadas</option>
          <option value="en revisión">En Revisión</option>
          <option value="rechazada">Rechazadas</option>
        </select>
      </div>

      {/* Lista de estados */}
      <div className="max-w-4xl mx-auto p-6">
        <ul className="space-y-6">
          {estadosFiltrados.map((e, index) => (
            <li
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col sm:flex-row items-center gap-4"
            >
              <Image
                src={e.imagen}
                alt={`Foto de ${e.mascota}`}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
              <div className="text-center sm:text-left">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  <strong>Mascota:</strong> {e.mascota}
                </p>
                <p className={`text-lg font-semibold mt-1 ${estadoColor(e.estado)}`}>
                  <strong>Estado:</strong> {estadoIcono(e.estado)} {e.estado}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Fecha de solicitud: {e.fecha}<br />
                  Última actualización: {e.actualizacion}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}