'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const ConfiguracionPreferencias: React.FC = () => {
  const router = useRouter();

  const initialPreferences = {
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
  };

  const [preferences, setPreferences] = useState(initialPreferences);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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

    console.log('Guardando preferencias:', preferences);

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Nuevo handler para cancelar y redirigir
  const handleCancel = () => {
    router.push('/verperfil');
  };

  return (
    <>
      <div className="min-h-screen bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto rounded-xl shadow-lg bg-white p-10 text-black">
          <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">
            Configuración de Preferencias de Adopción
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
          >
            {/* ...inputs iguales que antes... */}

            {/* Especie */}
            <div>
              <label
                htmlFor="species"
                className="block text-base font-semibold mb-2 text-gray-800"
              >
                Preferencia de Especie
              </label>
              <select
                id="species"
                name="species"
                value={preferences.species}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-3 px-4
                           focus:outline-none focus:ring-2 focus:ring-[#BF3952] focus:border-[#BF3952]
                           text-gray-900 text-base transition"
              >
                <option value="">Cualquiera</option>
                <option value="dog">Solo Perros</option>
                <option value="cat">Solo Gatos</option>
                <option value="both">Ambos</option>
              </select>
            </div>

            {/* Edad */}
            <div>
              <label
                htmlFor="ageRange"
                className="block text-base font-semibold mb-2 text-gray-800"
              >
                Rango de Edad
              </label>
              <select
                id="ageRange"
                name="ageRange"
                value={preferences.ageRange}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-3 px-4
                           focus:outline-none focus:ring-2 focus:ring-[#BF3952] focus:border-[#BF3952]
                           text-gray-900 text-base transition"
              >
                <option value="">Cualquiera</option>
                <option value="young">Cachorro</option>
                <option value="adult">Adulto</option>
                <option value="senior">Senior</option>
              </select>
            </div>

            {/* Tamaño */}
            <div>
              <label className="block text-base font-semibold mb-3 text-gray-800">
                Tamaño
              </label>
              <div className="flex gap-6 flex-wrap">
                {['', 'small', 'medium', 'large'].map(size => (
                  <label
                    key={size}
                    className="inline-flex items-center cursor-pointer select-none text-gray-900 text-base"
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={preferences.size === size}
                      onChange={handleInputChange}
                      className="form-radio text-[#BF3952] h-5 w-5"
                    />
                    <span className="ml-3">
                      {size === ''
                        ? 'Cualquiera'
                        : size === 'small'
                        ? 'Pequeño'
                        : size === 'medium'
                        ? 'Mediano'
                        : 'Grande'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Nivel de Energía */}
            <div>
              <label
                htmlFor="energyLevel"
                className="block text-base font-semibold mb-2 text-gray-800"
              >
                Nivel de Energía Preferido
              </label>
              <select
                id="energyLevel"
                name="energyLevel"
                value={preferences.energyLevel}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-3 px-4
                           focus:outline-none focus:ring-2 focus:ring-[#BF3952] focus:border-[#BF3952]
                           text-gray-900 text-base transition"
              >
                <option value="">Cualquiera</option>
                <option value="low">Bajo</option>
                <option value="medium">Medio</option>
                <option value="high">Alto</option>
              </select>
            </div>

            {/* Compatibilidad */}
            <div className="md:col-span-2">
              <label className="block text-base font-semibold mb-4 text-gray-800">
                Compatibilidad
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { key: 'withChildren', label: 'Con niños' },
                  { key: 'withOtherDogs', label: 'Con otros perros' },
                  { key: 'withCats', label: 'Con gatos' },
                  { key: 'withElderly', label: 'Con personas mayores' },
                ].map(option => (
                  <label
                    key={option.key}
                    className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer
                               hover:shadow-md transition duration-200 select-none bg-white"
                  >
                    <input
                      type="checkbox"
                      name={option.key}
                      checked={
                        preferences.compatibility[
                          option.key as keyof typeof preferences.compatibility
                        ]
                      }
                      onChange={handleCompatibilityChange}
                      className="form-checkbox text-[#BF3952] h-5 w-5"
                    />
                    <span className="ml-3 text-gray-900 text-base">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notas adicionales */}
            <div className="md:col-span-2">
              <label
                htmlFor="notes"
                className="block text-base font-semibold mb-2 text-gray-800"
              >
                Notas Adicionales
              </label>
              <textarea
                id="notes"
                name="notes"
                value={preferences.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Escriba cualquier preferencia adicional o nota"
                className="w-full border border-gray-300 rounded-md shadow-sm py-3 px-4
                           focus:outline-none focus:ring-2 focus:ring-[#BF3952] focus:border-[#BF3952]
                           text-gray-900 text-base resize-none transition"
              />
            </div>

            {/* Botones */}
            <div className="md:col-span-2 flex justify-center gap-6">
              <button
                type="submit"
                className="bg-[#BF3952] hover:bg-[#a32e45] text-white font-semibold px-12 py-3 rounded-md transition"
              >
                Guardar Preferencias
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-12 py-3 rounded-md transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">¡Éxito!</h2>
            <p className="mb-6 text-gray-800">Tus preferencias han sido guardadas correctamente.</p>
            <button
              onClick={closeModal}
              className="bg-[#BF3952] hover:bg-[#a32e45] text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfiguracionPreferencias;
