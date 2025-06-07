"use client";

import React, { useState } from "react";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { especies, razasPorEspecie } from "@/data/especiesRazas";
import { agregarMascota } from "@/data/mascotasSimuladas";
import CrearFichaMedica from "@/app/refugio/componentes/mascotas/CreaarFichamedica";

interface RegistrarMascotaProps {
  onClose: () => void;
}

const RegistrarMascota: React.FC<RegistrarMascotaProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    estado: "",
    descripcion: "",
    foto: "",
    fichaMedica: ""
  });

  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mostrarFichaMedica, setMostrarFichaMedica] = useState(false);

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
      fichaMedica: formData.fichaMedica
    });

    alert("✅ Mascota registrada correctamente (simulado)");

    if (formData.fichaMedica === "Ahora") {
      setMostrarFichaMedica(true);
    } else {
      onClose();
    }
  };

  if (mostrarFichaMedica) {
    return <CrearFichaMedica onClose={onClose} />;
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white text-gray-900 rounded-xl p-6 w-[95%] max-w-2xl shadow-xl relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-6 text-[#BF3952]">
          🐾 Registrar Nueva Mascota
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-[#30588C] text-sm">🐾 Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">🐾 Especie *</label>
            <select
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white"
            >
              <option value="">Selecciona una especie</option>
              {especies.map((esp) => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>

          {formData.especie && (
            <div>
              <label className="block font-semibold text-[#30588C] text-sm">🐾 Raza *</label>
              <select
                name="raza"
                value={formData.raza}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white"
              >
                <option value="">Selecciona una raza</option>
                {razasPorEspecie[formData.especie]?.map((raza) => (
                  <option key={raza} value={raza}>{raza}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">🐾 Edad (años) *</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              min={0}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">🐾 Estado *</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white"
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
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">¿Deseas llenar la ficha médica ahora?</label>
            <select
              name="fichaMedica"
              value={formData.fichaMedica}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mt-1 bg-white"
            >
              <option value="">Seleccionar una opción</option>
              <option value="Ahora">Sí, ahora</option>
              <option value="Mas adelante">Más adelante</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#30588C] text-sm">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full mt-1 text-sm text-gray-500"
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
              className="bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:opacity-90 text-white px-6 py-2 rounded"
            >
              {formData.fichaMedica === "Ahora" ? "Siguiente" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarMascota;
