'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import HeaderUsuario from '@/components/layout/HeaderUsuario';

const EntornoHogar: React.FC = () => {
  const router = useRouter();

  const [environmentDetails, setEnvironmentDetails] = useState({
    dwellingType: '',
    homeSize: '',
    yardSize: '',
    hasOtherPets: false,
    petTypes: '',
    petCount: '',
    hasChildren: false,
    childrenAges: '',
    timeAlone: '',
    activityLevel: '',
    previousExperience: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setEnvironmentDetails({ ...environmentDetails, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setEnvironmentDetails({ ...environmentDetails, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Saving environment details:', environmentDetails);
    // Aquí guardarías en backend o localStorage
    // Luego rediriges, por ejemplo:
    router.push('/verperfil');
  };

  const handleCancel = () => {
    router.push('/verperfil');
  };

  return (
    <>
      <HeaderUsuario />
      <div className="min-h-screen bg-white py-12 px-6 pt-24 text-black">
        <div className="max-w-7xl mx-auto rounded-xl shadow-lg bg-white p-10">
          <h1 className="text-3xl font-bold text-[#30588C] mb-10 text-center">Registro de Entorno del Hogar</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Tipo de vivienda */}
            <div>
              <label htmlFor="dwellingType" className="block text-sm font-medium mb-2">
                Tipo de Vivienda
              </label>
              <select
                id="dwellingType"
                name="dwellingType"
                value={environmentDetails.dwellingType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF3952] focus:border-[#BF3952]"
              >
                <option value="">Seleccione</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Tamaño hogar */}
            <div>
              <label htmlFor="homeSize" className="block text-sm font-medium mb-2">
                Tamaño del Hogar
              </label>
              <input
                type="text"
                id="homeSize"
                name="homeSize"
                value={environmentDetails.homeSize}
                onChange={handleChange}
                placeholder="Ej. 90 m²"
                className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
              />
            </div>

            {/* Tamaño patio */}
            <div>
              <label htmlFor="yardSize" className="block text-sm font-medium mb-2">
                Tamaño del Patio (si aplica)
              </label>
              <input
                type="text"
                id="yardSize"
                name="yardSize"
                value={environmentDetails.yardSize}
                onChange={handleChange}
                placeholder="Ej. 50 m²"
                className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
              />
            </div>

            {/* Tiene otros animales */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasOtherPets"
                checked={environmentDetails.hasOtherPets}
                onChange={handleChange}
                className="text-[#BF3952] h-4 w-4"
              />
              <label className="text-sm">¿Tiene otros animales en casa?</label>
            </div>

            {/* Tipos y cantidad de mascotas (si aplica) */}
            {environmentDetails.hasOtherPets && (
              <div className="md:col-span-2">
                <label htmlFor="petTypes" className="block text-sm font-medium mb-2">
                  Tipo(s) y cantidad:
                </label>
                <input
                  type="text"
                  id="petTypes"
                  name="petTypes"
                  value={environmentDetails.petTypes}
                  onChange={handleChange}
                  placeholder="Ej. 2 perros y 1 gato"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
                />
              </div>
            )}

            {/* Tiene niños */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasChildren"
                checked={environmentDetails.hasChildren}
                onChange={handleChange}
                className="text-[#BF3952] h-4 w-4"
              />
              <label className="text-sm">¿Tiene niños en casa?</label>
            </div>

            {/* Edades de los niños (si aplica) */}
            {environmentDetails.hasChildren && (
              <div className="md:col-span-2">
                <label htmlFor="childrenAges" className="block text-sm font-medium mb-2">
                  Edades de los niños
                </label>
                <input
                  type="text"
                  id="childrenAges"
                  name="childrenAges"
                  value={environmentDetails.childrenAges}
                  onChange={handleChange}
                  placeholder="Ej. 4 y 7 años"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
                />
              </div>
            )}

            {/* Tiempo solo */}
            <div>
              <label htmlFor="timeAlone" className="block text-sm font-medium mb-2">
                ¿Cuántas horas estará solo el animal al día?
              </label>
              <input
                type="text"
                id="timeAlone"
                name="timeAlone"
                value={environmentDetails.timeAlone}
                onChange={handleChange}
                placeholder="Ej. 4 horas"
                className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
              />
            </div>

            {/* Nivel de actividad */}
            <div>
              <label htmlFor="activityLevel" className="block text-sm font-medium mb-2">
                Nivel de Actividad del Hogar
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={environmentDetails.activityLevel}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF3952] focus:border-[#BF3952]"
              >
                <option value="">Seleccione</option>
                <option value="bajo">Bajo</option>
                <option value="medio">Medio</option>
                <option value="alto">Alto</option>
              </select>
            </div>

            {/* Experiencia previa */}
            <div className="md:col-span-2">
              <label htmlFor="previousExperience" className="block text-sm font-medium mb-2">
                Experiencia previa con mascotas
              </label>
              <textarea
                id="previousExperience"
                name="previousExperience"
                value={environmentDetails.previousExperience}
                onChange={handleChange}
                rows={4}
                placeholder="Describe tu experiencia previa con animales"
                className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
              ></textarea>
            </div>

            {/* Botones */}
            <div className="md:col-span-2 flex justify-end gap-4">
              <button
                type="submit"
                className="bg-[#BF3952] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#a32e45] transition"
              >
                Guardar Detalles del Entorno
              </button>
              <button
                type="button"
                onClick={() => router.push('/verperfil')}
                className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EntornoHogar;
