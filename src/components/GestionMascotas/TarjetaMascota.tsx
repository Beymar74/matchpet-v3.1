'use client';

import React, { useState, useEffect } from 'react';
import { mascotasSimuladas } from '@/data/mascotasSimuladas';
import { Mascota } from '../../app/refugio/tipos';
import ModalMascota from '@/components/GestionMascotas/modales/ModalMascota';

interface TarjetaMascotaProps {
  id: number;
}

const TarjetaMascota: React.FC<TarjetaMascotaProps> = ({ id }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mascota, setMascota] = useState<Mascota | null>(() =>
    mascotasSimuladas.find((m) => m.id === id) ?? null
  );

  useEffect(() => {
    // Solo recargar datos cuando se cierra el modal
    if (!mostrarModal) {
      const actualizadas = JSON.parse(localStorage.getItem('mascotas') || '[]');
      const encontrada = actualizadas.find((m: any) => m.id === id);
      if (encontrada) setMascota(encontrada);
    }
  }, [mostrarModal]);

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
        <div className="relative mb-4 h-40 bg-gray-100 flex items-center justify-center rounded-md">
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

        {/* Compatibilidad, Solicitudes y Adoptabilidad */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 text-sm font-medium mt-2">
          <div>
            <p className="text-gray-500">Compatibilidad</p>
            <p className="text-[#30588C] font-bold">{mascota.compatibilidad ?? 0}%</p>
          </div>

          <div>
            <p className="text-gray-500">Solicitudes</p>
            <p className="text-[#BF3952] font-bold">{mascota.solicitudes ?? 0}</p>
          </div>

          <div>
            <p className="text-gray-500">Adoptabilidad</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full text-[10px] text-white text-center"
                style={{
                  width: `${mascota.adoptabilidad ?? 0}%`,
                  backgroundColor:
                    (mascota.adoptabilidad ?? 0) > 70
                      ? '#4CAF50'
                      : (mascota.adoptabilidad ?? 0) > 40
                      ? '#FFB800'
                      : '#F44336'
                }}
              >
                {mascota.adoptabilidad ?? 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <ModalMascota
          mascota={mascota}
          onClose={() => setMostrarModal(false)}
          onGuardar={(actualizada) => setMascota(actualizada)}
        />
      )}
    </>
  );
};

export default TarjetaMascota;
