'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';

export default function RegistrarMascotaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    estado: '',
    descripcion: '',
    foto: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.especie || !formData.edad || !formData.estado) {
      alert('⚠️ Por favor, completa los campos obligatorios.');
      return;
    }

    console.log('Mascota registrada (simulada):', formData);
    alert('✅ Mascota registrada correctamente (simulado)');
    router.push('/Modulo_6-Gestion_de_Mascotas');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011526] via-[#254559] to-[#30588C] text-white">
      <Header />

      <main className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-6 text-[#BF3952]">➕ Registrar Nueva Mascota</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-900 p-6 rounded-xl shadow-xl space-y-5"
        >
          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Especie *</label>
            <input
              type="text"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              placeholder="Perro, Gato, etc."
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Raza</label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Edad (años) *</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              min={0}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Estado *</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            >
              <option value="">Selecciona un estado</option>
              <option value="Disponible">Disponible</option>
              <option value="Adoptado">Adoptado</option>
              <option value="En tratamiento">En tratamiento</option>
              <option value="Necesidades Especiales">Necesidades Especiales</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Foto (URL)</label>
            <input
              type="text"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#BF3952] hover:bg-[#a73745] text-white px-6 py-2 rounded transition"
            >
              Registrar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
