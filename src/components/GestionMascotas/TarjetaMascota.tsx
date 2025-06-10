'use client';

import React, { useEffect, useState } from 'react';
import ModalMascota from '@/components/GestionMascotas/modales/ModalMascota';

interface Mascota {
  ID_Mascota: number;
  Nombre: string;
  Edad: number;
  Raza: string;
  ID_Refugio: number;
  ID_Estado: number;
  NombreRefugio?: string;
  Nombre_Estado?: string;
}

interface Props {
  id: number;
}

const TarjetaMascota: React.FC<Props> = ({ id }) => {
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const res = await fetch('/api/mascotas/ver');
        const data = await res.json();

        if (Array.isArray(data)) {
          const encontrada = data.find((m: Mascota) => m.ID_Mascota === id);
          setMascota(encontrada ?? null);
        } else {
          console.error('La respuesta de /api/mascotas/ver no es un arreglo:', data);
        }
      } catch (error) {
        console.error('Error al obtener la mascota:', error);
      }
    };

    fetchMascota();
  }, [id]);

  if (!mascota) return null;

  const getEstadoColor = (estado: string | undefined) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En Proceso': return 'bg-yellow-100 text-yellow-800';
      case 'Adoptado': return 'bg-blue-100 text-blue-800';
      case 'Pendiente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div
        onClick={() => setMostrarModal(true)}
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer text-gray-700"
      >
        <div className="relative mb-4 h-40 bg-gray-100 flex items-center justify-center rounded-md">
          <div className="text-5xl font-bold">{mascota.Nombre[0]}</div>
          <span className={`absolute top-2 left-2 text-xs px-3 py-1 rounded-full font-semibold shadow ${getEstadoColor(mascota.Nombre_Estado)}`}>
            {mascota.Nombre_Estado ?? 'Sin estado'}
          </span>
        </div>

        <h3 className="font-bold text-lg text-[#011526] mb-2">{mascota.Nombre}</h3>
        <div className="text-sm space-y-1 mb-3">
          <p><span className="font-medium">Edad:</span> {mascota.Edad} años</p>
          <p><span className="font-medium">Raza:</span> {mascota.Raza}</p>
          <p><span className="font-medium">Refugio:</span> {mascota.NombreRefugio ?? 'Desconocido'}</p>
        </div>
      </div>

      {mostrarModal && mascota && (
        <ModalMascota mascota={mascota} onClose={() => setMostrarModal(false)} />
      )}
    </>
  );
};

export default TarjetaMascota;
