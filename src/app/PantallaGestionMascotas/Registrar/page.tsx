"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { especies, razasPorEspecie } from "@/data/especiesRazas";
import { agregarMascota } from "@/data/mascotasSimuladas";

export default function RegistrarMascotaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    estado: "",
    descripcion: "",
    foto: "",
  });

  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadToCloudinary(file);
    if (url) {
      setFormData((prev) => ({ ...prev, foto: url }));
      setPreviewImage(url);
    }
    setUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.especie || !formData.edad || !formData.estado) {
      alert("⚠️ Por favor, completa los campos obligatorios.");
      return;
    }

    agregarMascota({
      nombre: formData.nombre,
      especie: formData.especie,
      raza: formData.raza,
      edad: Number(formData.edad),
      estado: formData.estado,
      descripcion: formData.descripcion,
      foto: formData.foto,
    });

    alert("✅ Mascota registrada correctamente (simulado)");
    router.push("/PantallaGestionMascotas");
  };

  return (
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#011526] text-gray-900 dark:text-white transition-colors duration-500">
      <Header />

      <main className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-6 text-[#BF3952]">
          ➕ Registrar Nueva Mascota
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-6 rounded-xl shadow-xl space-y-5"
        >
          <div>
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] text-sm">Nombre *</label>
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
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] text-sm">Especie *</label>
            <select
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
              required
            >
              <option value="">Selecciona una especie</option>
              {especies.map((esp) => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>

          {formData.especie && (
            <div>
              <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] text-sm">Raza</label>
              <select
                name="raza"
                value={formData.raza}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
              >
                <option value="">Selecciona una raza</option>
                {razasPorEspecie[formData.especie]?.map((raza) => (
                  <option key={raza} value={raza}>{raza}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] text-sm">Edad (años) *</label>
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
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] text-sm">Estado *</label>
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
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] text-sm">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white dark:bg-[#2a2a2a]"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] dark:text-[#6093BF] text-sm">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 file:text-sm file:font-semibold
                file:bg-[#30588C] file:text-white hover:file:opacity-80"
            />
            {uploading && <p className="text-xs mt-2 text-yellow-500">Subiendo imagen...</p>}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-40 h-40 object-cover rounded-xl border"
              />
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded transition"
            >
              Registrar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
