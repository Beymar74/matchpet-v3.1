
'use client';
import React from 'react';

const etapas = [
  'Solicitud Recibida',
  'Evaluación Inicial',
  'Visita Programada',
  'Aprobación/Rechazo',
  'Finalizado',
];

const mascotas = [
  { id: '1', nombre: 'Luna', etapa: 0 },
  { id: '2', nombre: 'Max', etapa: 1 },
  { id: '3', nombre: 'Bella', etapa: 2 },
  { id: '4', nombre: 'Toby', etapa: 3 },
  { id: '5', nombre: 'Rocky', etapa: 0 },
  { id: '6', nombre: 'Nina', etapa: 1 },
  { id: '7', nombre: 'Simba', etapa: 2 },
  { id: '8', nombre: 'Kira', etapa: 4 },
  { id: '9', nombre: 'Zeus', etapa: 3 },
  { id: '10', nombre: 'Daisy', etapa: 4 },
];

export default function AdopcionesPipeline() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Estado de Solicitudes de Adopción</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {etapas.map((etapa, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-md p-3 shadow border"
          >
            <h3 className="text-center font-semibold mb-2 text-indigo-600 dark:text-indigo-300">{etapa}</h3>
            {mascotas.filter(m => m.etapa === index).map(mascota => (
              <div
                key={mascota.id}
                className="bg-gray-100 dark:bg-gray-700 rounded p-2 mb-2 text-center"
              >
                {mascota.nombre}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

