'use client';

import React from 'react';
import Header from '@/components/layout/Header';

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
    <div className="min-h-screen bg-white text-[#011526]">
      <Header />
      <main className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#30588C] text-center">📨 Comunicaciones Importantes</h1>
        {mensajesImportantes.map((msg) => (
          <div
            key={msg.id}
            className="mb-6 border-l-4 border-[#BF3952] bg-[#FDF3F4] p-5 rounded-lg shadow-sm"
          >
            <h2 className="font-semibold text-lg text-[#BF3952]">{msg.titulo}</h2>
            <p className="text-sm text-[#254559]">{msg.contenido}</p>
            <p className="text-xs text-gray-500 mt-2">📅 {msg.fecha}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
