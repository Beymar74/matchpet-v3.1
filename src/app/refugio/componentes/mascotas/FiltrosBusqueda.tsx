// src/app/refugio/componentes/mascotas/FiltrosBusqueda.tsx
import React from 'react';
import { Search } from 'lucide-react';

const FiltrosBusqueda: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar mascota por nombre, raza..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C] focus:border-transparent"
          />
        </div>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C]">
            <option>Todas las especies</option>
            <option>Perro</option>
            <option>Gato</option>
            <option>Otros</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#30588C]">
            <option>Todos los estados</option>
            <option>Disponible</option>
            <option>En proceso</option>
            <option>Adoptado</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltrosBusqueda;