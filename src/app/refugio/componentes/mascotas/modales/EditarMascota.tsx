'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mascotasSimuladas, Mascota } from '@/data/mascotasSimuladas';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import Header from '@/components/Header';

interface EditarMascotaProps {
  id: string | number;
}

export default function EditarMascota({ id }: EditarMascotaProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Mascota | null>(null);
  const [errores, setErrores] = useState<{ [key: string]: boolean }>({});
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    const mascota = mascotasSimuladas.find((m) => m.id === Number(id));
    if (mascota) setFormData({ ...mascota });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: false });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;

    setSubiendo(true);
    const url = await uploadToCloudinary(file);
    if (url) {
      setFormData({ ...formData, foto: url });
    }
    setSubiendo(false);
  };

  const validarFormulario = () => {
    if (!formData) return false;
    const campos = ['nombre', 'especie', 'edad', 'estado'];
    const errores: any = {};
    campos.forEach((campo) => {
      if (!formData[campo as keyof Mascota]) errores[campo] = true;
    });
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario() || !formData) return;

    const index = mascotasSimuladas.findIndex((m) => m.id === Number(id));
    if (index !== -1) {
      mascotasSimuladas[index] = { ...formData };
      alert("✅ Mascota actualizada correctamente (simulado)");
      router.push('/PantallaGestionMascotas');
    }
  };

  if (!formData) {
    return (
      <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white">
        <Header />
        <main className="max-w-3xl mx-auto py-10 px-6">
          <h1 className="text-3xl font-bold mb-6">Editar Mascota</h1>
          <p className="text-red-500">Mascota no encontrada.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <Header />
      <main className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-8 text-[#BF3952]">✏️ Editar Mascota</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-6 rounded-xl shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <InputField label="Nombre *" name="nombre" value={formData.nombre} error={errores.nombre} onChange={handleChange} />
              <InputField label="Especie *" name="especie" value={formData.especie} error={errores.especie} onChange={handleChange} />
              <InputField label="Raza" name="raza" value={formData.raza} onChange={handleChange} />
              <InputField type="number" label="Edad *" name="edad" value={formData.edad} error={errores.edad} onChange={handleChange} />

              <div>
                <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">Estado *</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a] ${errores.estado ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
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
                <label htmlFor="fileInput" className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF] mb-1">Actualizar imagen</label>
                <label htmlFor="fileInput" className="inline-block cursor-pointer px-4 py-2 bg-[#30588C] dark:bg-[#6093BF] text-white rounded shadow hover:opacity-90">
                  Seleccionar archivo
                </label>
                <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {subiendo && <p className="text-xs mt-2 text-yellow-400">Subiendo imagen...</p>}
              </div>
            </div>

            {formData.foto && (
              <div className="flex-1">
                <img src={formData.foto} alt="Vista previa" className="w-full h-full max-h-[400px] object-cover rounded-lg shadow" />
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

// Input reutilizable
function InputField({ label, name, value, onChange, error = false, type = 'text' }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a] ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
        required={label.includes('*')}
      />
    </div>
  );
}
