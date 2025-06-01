"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

const EntornoHogar: React.FC = () => {
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
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h1 className="text-2xl font-bold text-[#30588C] mb-6">Registro de Entorno del Hogar</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Tipo de vivienda */}
        <div>
          <label htmlFor="dwellingType" className="block text-sm font-medium text-gray-700">Tipo de Vivienda</label>
          <select
            id="dwellingType"
            name="dwellingType"
            value={environmentDetails.dwellingType}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-[#BF3952] focus:border-[#BF3952]"
          >
            <option value="">Seleccione</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* Tamaño hogar */}
        <div>
          <label htmlFor="homeSize" className="block text-sm font-medium text-gray-700">Tamaño del Hogar</label>
          <input
            type="text"
            id="homeSize"
            name="homeSize"
            value={environmentDetails.homeSize}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
            placeholder="Ej. 90 m²"
          />
        </div>

        {/* Tamaño patio */}
        <div>
          <label htmlFor="yardSize" className="block text-sm font-medium text-gray-700">Tamaño del Patio (si aplica)</label>
          <input
            type="text"
            id="yardSize"
            name="yardSize"
            value={environmentDetails.yardSize}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
            placeholder="Ej. 50 m²"
          />
        </div>

        {/* Otros animales */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="hasOtherPets"
            checked={environmentDetails.hasOtherPets}
            onChange={handleChange}
            className="text-[#BF3952] h-4 w-4"
          />
          <label className="ml-2 text-sm text-gray-800">¿Tiene otros animales en casa?</label>
        </div>

        {environmentDetails.hasOtherPets && (
          <div>
            <label htmlFor="petTypes" className="block text-sm font-medium text-gray-700">Tipo(s) y cantidad:</label>
            <input
              type="text"
              id="petTypes"
              name="petTypes"
              value={environmentDetails.petTypes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
              placeholder="Ej. 2 perros y 1 gato"
            />
          </div>
        )}

        {/* ¿Tiene niños? */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="hasChildren"
            checked={environmentDetails.hasChildren}
            onChange={handleChange}
            className="text-[#BF3952] h-4 w-4"
          />
          <label className="ml-2 text-sm text-gray-800">¿Tiene niños en casa?</label>
        </div>

        {environmentDetails.hasChildren && (
          <div>
            <label htmlFor="childrenAges" className="block text-sm font-medium text-gray-700">Edades de los niños</label>
            <input
              type="text"
              id="childrenAges"
              name="childrenAges"
              value={environmentDetails.childrenAges}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
              placeholder="Ej. 4 y 7 años"
            />
          </div>
        )}

        {/* Tiempo solo */}
        <div>
          <label htmlFor="timeAlone" className="block text-sm font-medium text-gray-700">¿Cuántas horas estará solo el animal al día?</label>
          <input
            type="text"
            id="timeAlone"
            name="timeAlone"
            value={environmentDetails.timeAlone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
            placeholder="Ej. 4 horas"
          />
        </div>

        {/* Nivel de actividad */}
        <div>
          <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">Nivel de Actividad del Hogar</label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={environmentDetails.activityLevel}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-[#BF3952] focus:border-[#BF3952]"
          >
            <option value="">Seleccione</option>
            <option value="bajo">Bajo</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
        </div>

        {/* Experiencia previa */}
        <div>
          <label htmlFor="previousExperience" className="block text-sm font-medium text-gray-700">Experiencia previa con mascotas</label>
          <textarea
            id="previousExperience"
            name="previousExperience"
            value={environmentDetails.previousExperience}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm"
            placeholder="Describe tu experiencia previa con animales"
          ></textarea>
        </div>

        {/* Botón guardar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#BF3952] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#a32e45] transition"
          >
            Guardar Detalles del Entorno
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntornoHogar;
