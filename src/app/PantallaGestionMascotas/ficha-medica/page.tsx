'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/HeaderRefugio';
import Link from 'next/link';

interface FichaMedica {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  estado_salud: string;
  vacunas: string;
  esterilizado: boolean;
}

export default function TodasLasFichasPage() {
  const [fichas, setFichas] = useState<FichaMedica[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFichas = async () => {
      const res = await fetch('/api/fichamedica');
      const data = await res.json();
      if (res.ok) setFichas(data);
      else setError(true);
    };
    fetchFichas();
  }, []);

  return (
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white">
      <Header />
      <main className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-6 text-[#BF3952]">📋 Fichas Médicas Registradas</h1>

        {error && <p className="text-red-500">Error al cargar las fichas médicas.</p>}
        {fichas.length === 0 && !error && <p>No hay fichas médicas registradas.</p>}

        <div className="grid md:grid-cols-2 gap-6">
          {fichas.map((ficha) => (
            <div key={ficha.id} className="bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-white rounded-xl shadow-lg p-6 space-y-2">
              <h2 className="text-xl font-bold text-[#30588C]">{ficha.nombre} ({ficha.especie})</h2>
              <p><strong>Edad:</strong> {ficha.edad} años</p>
              <p><strong>Estado de salud:</strong> {ficha.estado_salud}</p>
              <p><strong>Vacunas:</strong> {ficha.vacunas}</p>
              <p><strong>Esterilizado:</strong> {ficha.esterilizado ? 'Sí' : 'No'}</p>
              <Link href={`/fichamedica/${ficha.id}`} className="text-sm text-[#6093BF] hover:underline">
                Ver ficha completa →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm">
          <Link href="/PantallaGestionMascotas" className="text-[#6093BF] hover:underline">
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  );
}
