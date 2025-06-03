'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import HeaderRefugio from '@/components/layout/HeaderRefugio';

interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
  descripcion: string;
  foto: string;
}

const mockMascotas: Mascota[] = [
  {
    id: '1',
    nombre: 'Luna',
    especie: 'Perro',
    raza: 'Labrador',
    edad: 3,
    estado: 'Disponible',
    descripcion: 'Luna es amigable y le encanta jugar.',
    foto: 'Perros/labrador.jpg',
  },
  {
    id: '2',
    nombre: 'Milo',
    especie: 'Gato',
    raza: 'Persa',
    edad: 2,
    estado: 'Adoptado',
    descripcion: 'Milo es tranquilo y cariñoso.',
    foto: 'Gatos/persa.jpg',
  },
  {
    id: '3',
    nombre: 'Toby',
    especie: 'Perro',
    raza: 'Beagle',
    edad: 4,
    estado: 'En tratamiento',
    descripcion: 'Toby se está recuperando de una lesión.',
    foto: 'Perros/beagle.jpg',
  },
];

export default function EditarMascotaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Mascota | null>(null);
  const [errores, setErrores] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const mascota = mockMascotas.find((m) => m.id === id);
    if (mascota) setFormData({ ...mascota });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: false });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, foto: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const validarFormulario = () => {
    if (!formData) return false;
    const camposRequeridos = ['nombre', 'especie', 'edad', 'estado'];
    const nuevosErrores: any = {};
    camposRequeridos.forEach((campo) => {
      if (!formData[campo as keyof Mascota]) nuevosErrores[campo] = true;
    });
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    console.log('Mascota actualizada (simulado):', formData);
    alert('✅ Mascota actualizada correctamente (simulado)');
    router.push('/PantallaGestionMascotas');
  };

  if (!formData) {
    return (
      <div className=" pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
        <HeaderRefugio />
        <main className="max-w-3xl mx-auto py-10 px-6">
          <h1 className="text-3xl font-bold mb-6">Editar Mascota</h1>
          <p className="text-red-500">Mascota no encontrada.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <HeaderRefugio />

      <main className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-8 text-[#BF3952]">✏️ Editar Mascota</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-6 rounded-xl shadow-xl space-y-5"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a] ${errores.nombre ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">Especie *</label>
                <input
                  type="text"
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a] ${errores.especie ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">Raza</label>
                <input
                  type="text"
                  name="raza"
                  value={formData.raza}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">Edad *</label>
                <input
                  type="number"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a] ${errores.edad ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">Estado *</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a] ${errores.estado ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                  required
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Adoptado">Adoptado</option>
                  <option value="En tratamiento">En tratamiento</option>
                  <option value="Necesidades Especiales">Necesidades Especiales</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a]"
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="fileInput" className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF] mb-1">Subir nueva imagen</label>
                <label htmlFor="fileInput" className="inline-block cursor-pointer px-4 py-2 bg-[#30588C] dark:bg-[#6093BF] text-white rounded shadow hover:opacity-90">
                  Seleccionar archivo
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {formData.foto && (
              <div className="flex-1">
                <img
                  src={formData.foto}
                  alt="Vista previa"
                  className="w-full h-full max-h-[400px] object-cover rounded-lg shadow"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded transition"
            >
              💾 Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
