'use client'; // Asegúrate de colocar esto al principio del archivo

import React, { useState } from 'react';
import { CheckCircle, MessageSquare, Phone, XCircle, Search } from 'lucide-react';

// Definir el tipo para el seguimiento
interface Seguimiento {
  id: number;
  adoptante: string;
  mascota: string;
  fechaUltimoSeguimiento: string;
  comentarios: string;
  telefono: string;
  estado: 'Pendiente' | 'Completado';
}

const SeguimientoAdopciones = () => {
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([
    {
      id: 1,
      adoptante: 'María García',
      mascota: 'Max',
      fechaUltimoSeguimiento: '2024-06-01',
      comentarios: 'Todo en orden, Max se adapta bien a su nuevo hogar.',
      telefono: '+591 7123-4567',
      estado: 'Pendiente',
    },
    {
      id: 2,
      adoptante: 'Carlos López',
      mascota: 'Luna',
      fechaUltimoSeguimiento: '2024-06-02',
      comentarios: 'Luna está tomando la medicación correctamente.',
      telefono: '+591 7234-5678',
      estado: 'Completado',
    },
    {
      id: 3,
      adoptante: 'Ana Pérez',
      mascota: 'Rex',
      fechaUltimoSeguimiento: '2024-06-03',
      comentarios: 'Rex necesita atención veterinaria para revisión.',
      telefono: '+591 7456-1234',
      estado: 'Pendiente',
    },
  ]);

  const [nuevoComentario, setNuevoComentario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [adoptante, setAdoptante] = useState('');
  const [mascota, setMascota] = useState('');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState<'Pendiente' | 'Completado'>('Pendiente');
  const [busqueda, setBusqueda] = useState('');

  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const handleNuevoSeguimiento = () => {
    if (!nuevoComentario || !telefono || !adoptante || !mascota || !fecha) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevoSeguimiento: Seguimiento = {
      id: seguimientos.length + 1,
      adoptante,
      mascota,
      fechaUltimoSeguimiento: fecha,
      comentarios: nuevoComentario,
      telefono,
      estado,
    };

    setSeguimientos([...seguimientos, nuevoSeguimiento]);
    setNuevoComentario('');
    setTelefono('');
    setAdoptante('');
    setMascota('');
    setFecha('');
  };

  // Filtrar los seguimientos según la búsqueda
  const seguimientosFiltrados = seguimientos.filter((seguimiento) => {
    const lowerBusqueda = busqueda.toLowerCase();
    return (
      seguimiento.adoptante.toLowerCase().includes(lowerBusqueda) ||
      seguimiento.mascota.toLowerCase().includes(lowerBusqueda)
    );
  });

  return (
    <div className="space-y-6">
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

      {/* Formulario para agregar nuevo seguimiento */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Agregar Seguimiento</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Nombre del Adoptante"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={adoptante}
            onChange={(e) => setAdoptante(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre de la Mascota"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={mascota}
            onChange={(e) => setMascota(e.target.value)}
          />
          <input
            type="date"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <input
            type="text"
            placeholder="Comentario"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
          />
          <input
            type="text"
            placeholder="Teléfono de contacto"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <div className="flex space-x-4">
            <button
              onClick={() => setEstado('Pendiente')}
              className={`px-4 py-2 rounded-lg ${
                estado === 'Pendiente' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
              }`}
            >
              Pendiente
            </button>
            <button
              onClick={() => setEstado('Completado')}
              className={`px-4 py-2 rounded-lg ${
                estado === 'Completado' ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              Completado
            </button>
          </div>
          <button
            onClick={handleNuevoSeguimiento}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Agregar Seguimiento
          </button>
        </div>
      </div>

      {/* Tabla de Seguimientos */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Adoptante</th>
              <th className="py-3 px-4 text-left">Mascota</th>
              <th className="py-3 px-4 text-left">Fecha Último Seguimiento</th>
              <th className="py-3 px-4 text-left">Comentarios</th>
              <th className="py-3 px-4 text-left">Teléfono</th>
              <th className="py-3 px-4 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {seguimientosFiltrados.map((seguimiento) => (
              <tr key={seguimiento.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{seguimiento.adoptante}</td>
                <td className="py-3 px-4">{seguimiento.mascota}</td>
                <td className="py-3 px-4">{new Date(seguimiento.fechaUltimoSeguimiento).toLocaleDateString()}</td>
                <td className="py-3 px-4">{seguimiento.comentarios}</td>
                <td className="py-3 px-4">{seguimiento.telefono}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded ${seguimiento.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                  >
                    {seguimiento.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeguimientoAdopciones;
