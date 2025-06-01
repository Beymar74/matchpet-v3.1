'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';

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
    foto: 'https://place-puppy.com/300x300',
  },
  {
    id: '2',
    nombre: 'Milo',
    especie: 'Gato',
    raza: 'Persa',
    edad: 2,
    estado: 'Adoptado',
    descripcion: 'Milo es tranquilo y cariñoso.',
    foto: 'https://placekitten.com/300/300',
  },
  {
    id: '3',
    nombre: 'Toby',
    especie: 'Perro',
    raza: 'Beagle',
    edad: 4,
    estado: 'En tratamiento',
    descripcion: 'Toby se está recuperando de una lesión.',
    foto: 'https://place-puppy.com/301x301',
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
    router.push('/Modulo_6-Gestion_de_Mascotas');
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#011526] via-[#254559] to-[#30588C] text-white">
        <Header />
        <main className="max-w-3xl mx-auto py-10 px-6">
          <h1 className="text-3xl font-bold mb-6">Editar Mascota</h1>
          <p className="text-red-300">Mascota no encontrada.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011526] via-[#254559] to-[#30588C] text-white">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-8 text-[#BF3952]">✏️ Editar Mascota</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-800 p-6 rounded-xl shadow-xl space-y-5"
        >
          {/* Vista previa de la imagen */}
          {formData.foto && (
            <img
              src={formData.foto}
              alt="Vista previa"
              className="w-full max-h-64 object-cover rounded-lg shadow mb-4"
            />
          )}

          <div>
            <label className="block text-sm font-semibold text-[#30588C]">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded mt-1 ${errores.nombre ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#30588C]">Especie *</label>
            <input
              type="text"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded mt-1 ${errores.especie ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#30588C]">Raza</label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#30588C]">Edad *</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded mt-1 ${errores.edad ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#30588C]">Estado *</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded mt-1 ${errores.estado ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="Disponible">Disponible</option>
              <option value="Adoptado">Adoptado</option>
              <option value="En tratamiento">En tratamiento</option>
              <option value="Necesidades Especiales">Necesidades Especiales</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#30588C]">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#30588C]">Subir nueva imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-600 mt-1"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#BF3952] text-white px-6 py-2 rounded hover:bg-[#a72d45] transition"
            >
              💾 Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

