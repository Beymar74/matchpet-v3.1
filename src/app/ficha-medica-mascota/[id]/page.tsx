'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  edad: number;
  estadoSalud: string;
  vacunas: string[];
  esterilizado: boolean;
}

// Datos simulados
const mockMascotas: Mascota[] = [
  {
    id: '1',
    nombre: 'Luna',
    especie: 'Perro',
    edad: 3,
    estadoSalud: 'Vacunado, sin enfermedades actuales',
    vacunas: ['Rabia', 'Moquillo', 'Parvovirus'],
    esterilizado: true,
  },
  {
    id: '2',
    nombre: 'Milo',
    especie: 'Gato',
    edad: 2,
    estadoSalud: 'Alergias leves, controladas',
    vacunas: ['Triple felina'],
    esterilizado: false,
  },
  {
    id: '3',
    nombre: 'Toby',
    especie: 'Perro',
    edad: 4,
    estadoSalud: 'En tratamiento por lesión en la pata',
    vacunas: ['Rabia'],
    esterilizado: true,
  },
];

export default function FichaMedicaPage() {
  const params = useParams();
  const mascotaId = params?.id?.toString() || '';
  const mascota = mockMascotas.find((m) => m.id === mascotaId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011526] via-[#254559] to-[#30588C] text-white">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-6 text-[#BF3952]">🩺 Ficha Médica de la Mascota</h1>

        {mascota ? (
          <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6 space-y-4">
            <div>
              <strong className="text-[#30588C]">Nombre:</strong> {mascota.nombre}
            </div>
            <div>
              <strong className="text-[#30588C]">Especie:</strong> {mascota.especie}
            </div>
            <div>
              <strong className="text-[#30588C]">Edad:</strong> {mascota.edad} años
            </div>
            <div>
              <strong className="text-[#30588C]">Estado de salud:</strong> {mascota.estadoSalud}
            </div>
            <div>
              <strong className="text-[#30588C]">Vacunas:</strong> {mascota.vacunas.join(', ')}
            </div>
            <div>
              <strong className="text-[#30588C]">Esterilizado:</strong>{' '}
              {mascota.esterilizado ? 'Sí' : 'No'}
            </div>
          </div>
        ) : (
          <div className="bg-red-100 text-red-800 p-6 rounded-xl shadow-md">
            Mascota no encontrada.
          </div>
        )}

        <div className="mt-6 text-sm">
          <Link
            href="/Modulo_6-Gestion_de_Mascotas"
            className="text-[#6093BF] hover:underline"
          >
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  );
}

