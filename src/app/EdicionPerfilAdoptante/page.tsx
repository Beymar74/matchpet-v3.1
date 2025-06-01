'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';

const EdicionPerfilAdoptante: React.FC = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    dateOfBirth: null as Date | null,
    address: '',
    phoneNumber: '',
    lifestyleInfo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setProfileData(prev => ({ ...prev, dateOfBirth: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile data:', profileData);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-6 py-12">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center text-[#30588C] mb-8">
          Edición de Perfil del Adoptante
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-800 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
              placeholder="Ej. Juan Pérez"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-800 mb-1">
              Fecha de Nacimiento
            </label>
            <DatePicker
              id="dateOfBirth"
              locale={es}
              selected={profileData.dateOfBirth}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccionar fecha"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
            />
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-800 mb-1">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              placeholder="Ej. Calle Falsa 123, La Paz"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-800 mb-1">
              Número de Teléfono
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Ej. 71234567"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
            />
          </div>

          {/* Estilo de vida */}
          <div>
            <label htmlFor="lifestyleInfo" className="block text-sm font-medium text-gray-800 mb-1">
              Información del Estilo de Vida
            </label>
            <textarea
              id="lifestyleInfo"
              name="lifestyleInfo"
              value={profileData.lifestyleInfo}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe tu rutina, tiempo disponible, si tienes patio, etc."
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30588C]"
            />
          </div>

          {/* Botón */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#BF3952] hover:bg-[#a03045] text-white font-semibold px-8 py-3 rounded-xl transition duration-200"
            >
              Guardar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EdicionPerfilAdoptante;
