'use client'; // Asegúrate de colocar esto al principio del archivo

import React, { useState } from 'react';
import { Filter,Calendar, CheckCircle, XCircle, Phone } from 'lucide-react';

// Definir un tipo para la solicitud
interface Solicitud {
  id: number;
  adoptante: string;
  telefono: string;
  mascota: string;
  fecha: string;
  refugio: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
}

const ProgramarVisitas = () => {
  const [filtroActivo, setFiltroActivo] = useState<'todos' | 'pendientes' | 'aprobadas' | 'rechazadas'>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
    // Simulación de solicitudes
    {
      id: 1,
      adoptante: 'María García',
      telefono: '+591 7123-4567',
      mascota: 'Max',
      fecha: '2024-05-31',
      refugio: 'Hogar Peludo',
      estado: 'Pendiente',
    },
    {
      id: 2,
      adoptante: 'Carlos López',
      telefono: '+591 7234-5678',
      mascota: 'Luna',
      fecha: '2024-06-01',
      refugio: 'Patitas Felices',
      estado: 'Pendiente',
    },
    {
      id: 3,
      adoptante: 'Ana Pérez',
      telefono: '+591 7456-1234',
      mascota: 'Rex',
      fecha: '2024-06-03',
      refugio: 'Amigos Peludos',
      estado: 'Pendiente',
    },
  ]);

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const lowerBusqueda = busqueda.toLowerCase();
    const esBusquedaCoincidente = 
      solicitud.adoptante.toLowerCase().includes(lowerBusqueda) ||
      solicitud.mascota.toLowerCase().includes(lowerBusqueda);

    if (filtroActivo === 'todos') {
      return esBusquedaCoincidente;
    }

    return solicitud.estado.toLowerCase() === filtroActivo && esBusquedaCoincidente;
  });

  return (
    <div className="space-y-6">
      {/* Filtro de Solicitudes */}
      <div className="mb-4 flex space-x-4">
        <button onClick={() => setFiltroActivo('todos')} className="flex items-center px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
          <Filter className="mr-2" /> Todos
        </button>
        <button onClick={() => setFiltroActivo('pendientes')} className="px-4 py-2 border rounded-lg bg-yellow-100 hover:bg-yellow-200">Pendientes</button>
        <button onClick={() => setFiltroActivo('aprobadas')} className="px-4 py-2 border rounded-lg bg-green-100 hover:bg-green-200">Aprobadas</button>
        <button onClick={() => setFiltroActivo('rechazadas')} className="px-4 py-2 border rounded-lg bg-red-100 hover:bg-red-200">Rechazadas</button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          value={busqueda}
          onChange={handleBusquedaChange}
          className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          placeholder="Buscar por nombre de adoptante o mascota..."
        />
      </div>

      {/* Tabla de Solicitudes */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Adoptante</th>
              <th className="py-3 px-4 text-left">Mascota</th>
              <th className="py-3 px-4 text-left">Fecha</th>
              <th className="py-3 px-4 text-left">Refugio</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesFiltradas.map((solicitud) => (
              <tr key={solicitud.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{solicitud.adoptante}</td>
                <td className="py-3 px-4">{solicitud.mascota}</td>
                <td className="py-3 px-4">{new Date(solicitud.fecha).toLocaleDateString()}</td>
                <td className="py-3 px-4">{solicitud.refugio}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded ${solicitud.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : solicitud.estado === 'Aprobada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {solicitud.estado}
                  </span>
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  <button className="text-green-600 hover:text-green-800">
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <XCircle className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramarVisitas;
