'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderRefugio from '@/components/layout/HeaderRefugio';

export default function RegistrarMascotaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    estado: '',
    descripcion: '',
  });

  const [imagenArchivo, setImagenArchivo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenArchivo(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const subirImagenACloudinary = async () => {
    if (!imagenArchivo) return '';

    const form = new FormData();
    form.append('file', imagenArchivo);
    form.append('upload_preset', 'matchpet_mascotas'); // tu upload preset
    form.append('folder', 'matchpet_mascotas');

    const res = await fetch('https://api.cloudinary.com/v1_1/dsblosz1l/image/upload', {
      method: 'POST',
      body: form,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.especie || !formData.edad || !formData.estado) {
      alert('⚠️ Por favor, completa los campos obligatorios.');
      return;
    }

    try {
      setSubiendo(true);
      const urlImagen = await subirImagenACloudinary();

      const res = await fetch('/api/mascotas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          foto: urlImagen,
          id_user: 3, // 🔁 Reemplaza esto con el ID real del refugio logueado
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Mascota registrada correctamente');
        setFormData({
          nombre: '',
          especie: '',
          raza: '',
          edad: '',
          estado: '',
          descripcion: '',
        });
        setImagenArchivo(null);
        setPreviewUrl(null);
        router.push('/PantallaGestionMascotas');
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('❌ Ocurrió un error al registrar la mascota');
    } finally {
      setSubiendo(false);
    }
  };

  return (
     <>
        <HeaderRefugio />
        <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
          
          <main className="max-w-3xl mx-auto py-12 px-6">
            <h1 className="text-4xl font-bold mb-6 text-[#BF3952]">➕ Registrar Nueva Mascota</h1>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-6 rounded-xl shadow-xl space-y-5">
              <div>
                <label className="block font-semibold text-[#30588C] text-sm">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
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
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
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
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
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
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#30588C] text-sm">Estado *</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
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
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#30588C] text-sm">Foto (imagen)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagenChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
                />
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-300">Vista previa:</p>
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="max-w-xs h-auto rounded shadow-md border border-gray-300 dark:border-gray-600 mt-2"
                  />
                </div>
              )}

              {subiendo && <p className="text-yellow-400 text-sm">Subiendo imagen a Cloudinary...</p>}

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={subiendo}
                  className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded transition"
                >
                  Registrar
                </button>
              </div>
            </form>
          </main>
        </div>
    </>
  );
}
