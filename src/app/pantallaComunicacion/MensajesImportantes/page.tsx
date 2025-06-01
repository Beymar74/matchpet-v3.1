'use client';

import React from 'react';
import Header from '@/components/Header'; // Usa la versión general que ya usas

const mensajesImportantes = [
  {
    id: 1,
    titulo: '✅ Adopción aprobada',
    contenido: '¡Felicidades! Tu adopción de "Milo" ha sido aprobada. Te contactaremos para el siguiente paso.',
    fecha: '2025-05-29',
  },
  {
    id: 2,
    titulo: '📅 Recordatorio de visita',
    contenido: 'Recuerda tu cita en el refugio Huellitas el 31 de mayo a las 15:00.',
    fecha: '2025-05-28',
  },
];

export default function MensajesImportantesPage() {
  return (
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#0F172A] text-[#011526] dark:text-white">
      <Header />
      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-10 text-[#30588C] dark:text-[#4EDCD8]">
          📨 Comunicaciones Importantes
        </h1>

        {mensajesImportantes.map((msg) => (
          <div
            key={msg.id}
            className="mb-6 border-l-4 border-[#BF3952] dark:border-[#BF3952] bg-[#FDF3F4] dark:bg-[#1E293B] p-5 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="font-semibold text-lg text-[#BF3952] dark:text-[#FF8099]">{msg.titulo}</h2>
            <p className="text-sm text-[#254559] dark:text-gray-300 mt-1">{msg.contenido}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">📅 {msg.fecha}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
