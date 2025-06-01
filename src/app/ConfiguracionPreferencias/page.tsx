"use client";

import React, { useState, FormEvent } from 'react';

const ConfiguracionPreferencias: React.FC = () => {
  const [preferences, setPreferences] = useState({
    species: '',
    ageRange: '',
    size: '',
    energyLevel: '',
    notes: '',
    compatibility: {
      withChildren: false,
      withOtherDogs: false,
      withCats: false,
      withElderly: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setPreferences(prev => ({
        ...prev,
        compatibility: {
          ...prev.compatibility,
          [name]: target.checked,
        },
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCompatibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      compatibility: {
        ...prev.compatibility,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Saving preferences:', preferences);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Configuración de Preferencias de Adopción</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Especie */}
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700">Preferencia de Especie</label>
          <select
            id="species"
            name="species"
            value={preferences.species}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#BF3952] focus:border-[#BF3952]"
          >
            <option value="">Cualquiera</option>
            <option value="dog">Solo Perros</option>
            <option value="cat">Solo Gatos</option>
            <option value="both">Ambos</option>
          </select>
        </div>

        {/* Edad */}
        <div>
          <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">Rango de Edad</label>
          <select
            id="ageRange"
            name="ageRange"
            value={preferences.ageRange}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#BF3952] focus:border-[#BF3952]"
          >
            <option value="">Cualquiera</option>
            <option value="young">Cachorro</option>
            <option value="adult">Adulto</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        {/* Tamaño */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
          <div className="flex gap-4 flex-wrap">
            {['', 'small', 'medium', 'large'].map(size => (
              <label key={size} className="inline-flex items-center">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={preferences.size === size}
                  onChange={handleInputChange}
                  className="form-radio text-[#BF3952]"
                />
                <span className="ml-2 text-sm">
                  {size === '' ? 'Cualquiera' : size === 'small' ? 'Pequeño' : size === 'medium' ? 'Mediano' : 'Grande'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Nivel de Energía */}
        <div>
          <label htmlFor="energyLevel" className="block text-sm font-medium text-gray-700">Nivel de Energía Preferido</label>
          <select
            id="energyLevel"
            name="energyLevel"
            value={preferences.energyLevel}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#BF3952] focus:border-[#BF3952]"
          >
            <option value="">Cualquiera</option>
            <option value="low">Bajo</option>
            <option value="medium">Medio</option>
            <option value="high">Alto</option>
          </select>
        </div>

        {/* Compatibilidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Compatibilidad</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'withChildren', label: 'Con niños' },
              { key: 'withOtherDogs', label: 'Con otros perros' },
              { key: 'withCats', label: 'Con gatos' },
              { key: 'withElderly', label: 'Con personas mayores' },
            ].map(option => (
              <label
                key={option.key}
                className="flex items-center p-3 border border-gray-300 rounded-md hover:shadow-sm transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={option.key}
                  checked={preferences.compatibility[option.key as keyof typeof preferences.compatibility]}
                  onChange={handleCompatibilityChange}
                  className="form-checkbox text-[#BF3952] h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-800">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notas adicionales */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notas Adicionales</label>
          <textarea
            id="notes"
            name="notes"
            value={preferences.notes}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#BF3952] focus:border-[#BF3952]"
            placeholder="Escriba cualquier preferencia adicional o nota"
          ></textarea>
        </div>

        {/* Botón */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#BF3952] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#a32e45] transition"
          >
            Guardar Preferencias
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfiguracionPreferencias;
