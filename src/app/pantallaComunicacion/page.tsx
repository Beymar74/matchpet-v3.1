'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';

const ComunicacionPrincipal = () => {
  const router = useRouter();

  const opciones = [
    {
      titulo: 'Chat',
      descripcion: 'Comunícate directamente con los refugios.',
      imagen: '/img/chat.png',
      ruta: '/pantallaComunicacion/Chat', // asegúrate que sea correcto
    },
    {
      titulo: 'Mensajes Importantes',
      descripcion: 'Lee recordatorios, confirmaciones y más.',
      imagen: '/img/mensajes.png',
      ruta: '/pantallaComunicacion/MensajesImportantes',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-[#011526]">
      <Header />
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#30588C]">
          Centro de Comunicación
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opciones.map((op, i) => (
            <div
              key={i}
              onClick={() => router.push(op.ruta)}
              className="cursor-pointer bg-[#F3F4F6] hover:bg-[#E4E8F0] p-6 rounded-lg shadow-md flex items-center gap-4 transition-all duration-300"
            >
              <Image src={op.imagen} alt={op.titulo} width={64} height={64} />
              <div>
                <h2 className="text-xl font-semibold text-[#BF3952]">{op.titulo}</h2>
                <p className="text-sm text-[#254559]">{op.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComunicacionPrincipal;

