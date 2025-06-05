'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/HeaderRefugio';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface FichaMedica {
  nombre: string;
  especie: string;
  edad: number;
  estado_salud: string;
  vacunas: string;
  esterilizado: boolean;
}

export default function FichaMedicaPage() {
  const params = useParams();
  const mascotaId = params?.id?.toString() || '';
  const [ficha, setFicha] = useState<FichaMedica | null>(null);
  const [error, setError] = useState(false);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState<Partial<FichaMedica>>({});

  useEffect(() => {
    const fetchFicha = async () => {
      try {
        const res = await fetch(`/api/fichamedica/${mascotaId}`);
        const data = await res.json();
        if (res.ok) {
          setFicha(data);
          setFormData({
            estado_salud: data.estado_salud,
            vacunas: data.vacunas,
            esterilizado: data.esterilizado,
          });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error al cargar ficha médica:', err);
        setError(true);
      }
    };

    if (mascotaId) fetchFicha();
  }, [mascotaId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGuardar = async () => {
    try {
      const res = await fetch(`/api/fichamedica/${mascotaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Ficha actualizada correctamente');
        setFicha((prev) =>
          prev ? { ...prev, ...formData } as FichaMedica : prev
        );
        setEditando(false);
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert('❌ Error al guardar cambios');
      console.error(error);
    }
  };

  return (
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-6 text-[#BF3952]">🩺 Ficha Médica de la Mascota</h1>

        {!ficha && !error && <p>Cargando ficha médica...</p>}

        {ficha ? (
          <div className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-xl shadow-lg p-6 space-y-4">
            <div><strong className="text-[#30588C]">Nombre:</strong> {ficha.nombre}</div>
            <div><strong className="text-[#30588C]">Especie:</strong> {ficha.especie}</div>
            <div><strong className="text-[#30588C]">Edad:</strong> {ficha.edad} años</div>

            {editando ? (
              <>
                <div>
                  <label className="block text-sm text-[#30588C] font-semibold mb-1">Estado de salud:</label>
                  <textarea
                    name="estado_salud"
                    value={formData.estado_salud || ''}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded bg-white dark:bg-[#2a2a2a]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#30588C] font-semibold mb-1">Vacunas (separadas por coma):</label>
                  <input
                    name="vacunas"
                    value={formData.vacunas || ''}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded bg-white dark:bg-[#2a2a2a]"
                  />
                </div>
                <div>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="esterilizado"
                      checked={formData.esterilizado || false}
                      onChange={handleChange}
                    />
                    <span>Esterilizado</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button onClick={handleGuardar} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
                    💾 Guardar
                  </button>
                  <button onClick={() => setEditando(false)} className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white">
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div><strong className="text-[#30588C]">Estado de salud:</strong> {ficha.estado_salud}</div>
                <div><strong className="text-[#30588C]">Vacunas:</strong> {ficha.vacunas}</div>
                <div><strong className="text-[#30588C]">Esterilizado:</strong> {ficha.esterilizado ? 'Sí' : 'No'}</div>
                <div className="flex justify-end mt-4">
                  <button onClick={() => setEditando(true)} className="bg-[#30588C] hover:bg-[#254559] px-4 py-2 rounded text-white">
                    ✏️ Editar ficha médica
                  </button>
                </div>
              </>
            )}
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-6 rounded-xl shadow-md">
            Mascota no encontrada o sin ficha médica registrada.
          </div>
        ) : null}

        <div className="mt-6 text-sm">
          <Link href="/PantallaGestionMascotas" className="text-[#6093BF] hover:underline">
            ← Volver a Gestión de Mascotas
          </Link>
        </div>
      </main>
    </div>
  );
}
