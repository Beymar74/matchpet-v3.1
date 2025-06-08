'use client';

import React, { useState } from 'react';
import { mascotasSimuladas } from '@/data/mascotasSimuladas';
import { Mascota } from '../../app/refugio/tipos';
import ModalMascota from '@/components/GestionMascotas/modales/ModalMascota';

interface TarjetaMascotaProps {
  id: number;
}

const TarjetaMascota: React.FC<TarjetaMascotaProps> = ({ id }) => {
  const mascota = mascotasSimuladas.find((m) => m.id === id);
  const [mostrarModal, setMostrarModal] = useState(false);

  if (!mascota) return null;

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible':
        return 'bg-green-100 text-green-800';
      case 'En proceso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Adoptado':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div
        onClick={() => setMostrarModal(true)}
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer text-gray-700"
      >
        {/* Imagen con estado encima */}
        <div className="relative mb-4 h-40  bg-gray-100 flex items-center justify-center rounded-md">
          {mascota.foto.startsWith('http') ? (
            <img
              src={mascota.foto}
              alt={mascota.nombre}
              className="w-full h-40 object-cover rounded-md"
            />
          ) : (
            <div className="text-5xl text-center">{mascota.foto}</div>
          )}

          <span className={`absolute top-2 left-2 text-xs px-3 py-1 rounded-full font-semibold shadow ${getEstadoColor(mascota.estado)}`}>
            {mascota.estado}
          </span>
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-lg text-[#011526] mb-2">{mascota.nombre}</h3>

        {/* Detalles */}
        <div className="text-sm space-y-1 mb-3">
          <p><span className="font-medium">Especie:</span> {mascota.especie}</p>
          <p><span className="font-medium">Raza:</span> {mascota.raza}</p>
          <p><span className="font-medium">Edad:</span> {mascota.edad}</p>
          <p><span className="font-medium">Ingreso:</span> {mascota.fechaIngreso ?? 'No registrado'}</p>
        </div>

        {/* Compatibilidad y solicitudes */}
        <div className="flex justify-between text-sm font-medium">
          <p>
            <span className="text-gray-500">Compatibilidad:</span>{' '}
            <span className="text-[#30588C] font-bold">{mascota.compatibilidad ?? 0}%</span>
          </p>
          <p>
            <span className="text-gray-500">Solicitudes:</span>{' '}
            <span className="text-[#BF3952] font-bold">{mascota.solicitudes ?? 0}</span>
          </p>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <ModalMascota
          mascota={mascota}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </>
  );
};

export default TarjetaMascota;

