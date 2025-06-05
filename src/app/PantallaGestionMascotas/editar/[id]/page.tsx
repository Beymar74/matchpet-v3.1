'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/HeaderRefugio';

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

export default function EditarMascotaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Mascota | null>(null);
  const [errores, setErrores] = useState<{ [key: string]: boolean }>({});
  const [imagenArchivo, setImagenArchivo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  // Cargar datos reales desde la base
  useEffect(() => {
    const fetchMascota = async () => {
      const res = await fetch(`/api/mascotas/${id}`);
      const data = await res.json();
      if (res.ok) setFormData(data);
      else alert('Error al obtener datos de la mascota.');
    };
    if (id) fetchMascota();
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
    if (!file) return;
    setImagenArchivo(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const subirImagenACloudinary = async (): Promise<string> => {
    if (!imagenArchivo) return formData?.foto || '';
    const form = new FormData();
    form.append('file', imagenArchivo);
    form.append('upload_preset', 'matchpet_mascotas');
    form.append('folder', 'matchpet_mascotas');

    const res = await fetch('https://api.cloudinary.com/v1_1/dsblosz1l/image/upload', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    return data.secure_url;
  };

  const validarFormulario = () => {
    if (!formData) return false;
    const campos = ['nombre', 'especie', 'edad', 'estado'];
    const nuevosErrores: any = {};
    campos.forEach((campo) => {
      if (!formData[campo as keyof Mascota]) nuevosErrores[campo] = true;
    });
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario() || !formData) return;
    setSubiendo(true);

    try {
      const urlImagen = await subirImagenACloudinary();

      const res = await fetch(`/api/mascotas/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, foto: urlImagen }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Mascota actualizada correctamente');
        router.push('/PantallaGestionMascotas');
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al actualizar mascota:', error);
      alert('❌ Error inesperado');
    } finally {
      setSubiendo(false);
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
    <div className="min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white">
      <Header />
      <main className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-8 text-[#BF3952]">✏️ Editar Mascota</h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              {['nombre', 'especie', 'raza', 'edad', 'estado', 'descripcion'].map((campo) => (
                <div key={campo}>
                  <label className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF]">
                    {campo.charAt(0).toUpperCase() + campo.slice(1)} {['nombre', 'especie', 'edad', 'estado'].includes(campo) && '*'}
                  </label>
                  {campo === 'descripcion' ? (
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a]"
                      rows={3}
                    />
                  ) : campo === 'estado' ? (
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
                  ) : (
                    <input
                      type={campo === 'edad' ? 'number' : 'text'}
                      name={campo}
                      value={formData[campo as keyof Mascota] as string}
                      onChange={handleChange}
                      className={`w-full border px-3 py-2 rounded mt-1 bg-white dark:bg-[#2a2a2a] ${errores[campo] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                    />
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="fileInput" className="block text-sm font-semibold text-[#30588C] dark:text-[#6093BF] mb-1">
                  Subir nueva imagen
                </label>
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

            <div className="flex-1">
              <img
                src={previewUrl || formData.foto}
                alt="Vista previa"
                className="w-full h-full max-h-[400px] object-cover rounded-lg shadow"
              />
            </div>
          </div>

          {subiendo && <p className="text-yellow-400 text-sm">Subiendo imagen a Cloudinary...</p>}

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={subiendo} className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded transition">
              💾 Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
