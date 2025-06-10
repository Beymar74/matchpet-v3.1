'use client';

import React, { useEffect, useState } from 'react';
import ModalMascota from '@/components/GestionMascotas/modales/ModalMascota';

interface Mascota {
  ID_Mascota: number;
  Nombre: string;
  Edad: number;
  Raza: string;
  Foto?: string;
  NombreRefugio?: string;
  Nombre_Estado?: string;
  Nombre_Especie?: string;
  Nombre_Tamanio?: string;
  Nombre_Color?: string;
  Compatibilidad?: number;
  Solicitudes?: number;
  FechaIngreso?: string; // opcional, por si decides agregarla
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
        const res = await fetch('/api/mascotasRefg/ver');
        const data = await res.json();

        if (Array.isArray(data)) {
          const encontrada = data.find((m: Mascota) => m.ID_Mascota === id);
          if (encontrada) {
            // Simular compatibilidad y solicitudes si no vienen de la API
            encontrada.Compatibilidad ??= Math.floor(75 + Math.random() * 25); // 75%-100%
            encontrada.Solicitudes ??= Math.floor(Math.random() * 5); // 0-4
          }
          setMascota(encontrada ?? null);
        } else {
          console.error('Respuesta inesperada de la API:', data);
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
        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer text-gray-700 w-full max-w-xs"
      >
        {/* Imagen */}
        <div className="relative mb-4 h-40 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
          {mascota.Foto ? (
            <img src={mascota.Foto} alt={mascota.Nombre} className="h-full object-cover" />
          ) : (
            <div className="text-5xl">🐶</div>
          )}
          <span className={`absolute top-2 left-2 text-xs px-3 py-1 rounded-full font-semibold shadow ${getEstadoColor(mascota.Nombre_Estado)}`}>
            {mascota.Nombre_Estado ?? 'Sin estado'}
          </span>
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-lg text-[#011526] mb-2">{mascota.Nombre}</h3>

        {/* Detalles */}
        <div className="text-sm space-y-1 mb-3">
          <p><span className="font-medium">Especie:</span> {mascota.Nombre_Especie ?? 'Desconocida'}</p>
          <p><span className="font-medium">Raza:</span> {mascota.Raza}</p>
          <p><span className="font-medium">Edad:</span> {mascota.Edad}</p>
          {mascota.FechaIngreso && (
            <p><span className="font-medium">Ingreso:</span> {new Date(mascota.FechaIngreso).toLocaleDateString()}</p>
          )}
        </div>

        {/* Compatibilidad y Solicitudes */}
        <div className="flex justify-between text-sm font-medium">
          <p className="text-[#30588C]">Compatibilidad: <span className="font-bold">{mascota.Compatibilidad}%</span></p>
          <p className="text-red-500">Solicitudes: <span className="font-bold">{mascota.Solicitudes}</span></p>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && mascota && (
        <ModalMascota mascota={mascota} onClose={() => setMostrarModal(false)} />
      )}
    </>
  );
};

export default TarjetaMascota;
