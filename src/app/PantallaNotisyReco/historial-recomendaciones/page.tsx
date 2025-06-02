'use client';

import { useState } from 'react';

interface Recomendacion {
  id: number;
  mascota: string;
  fecha: string;
  descripcion: string;
  estado: 'Pendiente' | 'Aceptada' | 'Rechazada';
}

export default function HistorialRecomendaciones() {
  const [recomendaciones] = useState<Recomendacion[]>([
    {
      id: 1,
      mascota: 'Pelusa',
      fecha: '2025-05-28T09:00:00',
      descripcion:
        'Adaptar el espacio para que la mascota tenga áreas de juego seguras y estimulación constante debido a su energía alta.',
      estado: 'Aceptada',
    },
    {
      id: 2,
      mascota: 'Pelusa',
      fecha: '2025-06-02T11:30:00',
      descripcion:
        'Programar una visita veterinaria para control general y vacunación anual.',
      estado: 'Pendiente',
    },
    {
      id: 3,
      mascota: 'Rocky',
      fecha: '2025-05-25T14:20:00',
      descripcion:
        'Monitorear cambios en el comportamiento y reportar cualquier anomalía inmediatamente al refugio.',
      estado: 'Aceptada',
    },
    {
      id: 4,
      mascota: 'Luna',
      fecha: '2025-05-20T11:45:00',
      descripcion:
        'Mejorar la alimentación incorporando suplementos recomendados por el veterinario para fortalecer el sistema inmunológico.',
      estado: 'Rechazada',
    },
    {
      id: 5,
      mascota: 'Max',
      fecha: '2025-05-18T10:00:00',
      descripcion:
        'Realizar chequeo veterinario anual antes de la temporada de frío para prevenir enfermedades respiratorias.',
      estado: 'Aceptada',
    },
  ]);

  const estadoColor = {
    Pendiente: 'bg-yellow-200 text-yellow-800',
    Aceptada: 'bg-green-200 text-green-800',
    Rechazada: 'bg-red-200 text-red-800',
  };

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Historial de Recomendaciones
      </h1>

      <ul className="max-w-4xl mx-auto space-y-6">
        {recomendaciones.map(({ id, mascota, fecha, descripcion, estado }) => (
          <li
            key={id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {mascota}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${estadoColor[estado]}`}
              >
                {estado}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{descripcion}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fecha: {formatearFecha(fecha)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
