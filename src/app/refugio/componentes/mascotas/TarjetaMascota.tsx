// src/app/refugio/componentes/mascotas/TarjetaMascota.tsx
import React from 'react';
import { Edit, Eye } from 'lucide-react';
import { Mascota } from '../../tipos';

interface TarjetaMascotaProps {
  mascota: Mascota;
}

const TarjetaMascota: React.FC<TarjetaMascotaProps> = ({ mascota }) => {
  const getEstadoColor = (estado: string) => {
    switch(estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En proceso': return 'bg-yellow-100 text-yellow-800';
      case 'Adoptado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-4xl">{mascota.foto}</div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(mascota.estado)}`}>
            {mascota.estado}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-[#011526] mb-2">{mascota.nombre}</h3>
        
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p><span className="font-medium">Especie:</span> {mascota.especie}</p>
          <p><span className="font-medium">Raza:</span> {mascota.raza}</p>
          <p><span className="font-medium">Edad:</span> {mascota.edad}</p>
          <p><span className="font-medium">Ingreso:</span> {mascota.fechaIngreso}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <span className="text-gray-600">Compatibilidad promedio:</span>
            <span className="font-bold text-[#30588C] ml-1">{mascota.compatibilidad}%</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Solicitudes:</span>
            <span className="font-bold text-[#BF3952] ml-1">{mascota.solicitudes}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 bg-[#30588C] text-white py-2 px-3 rounded-md hover:bg-[#254559] text-sm flex items-center justify-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>Ver</span>
          </button>
          <button className="flex-1 bg-[#6093BF] text-white py-2 px-3 rounded-md hover:bg-[#30588C] text-sm flex items-center justify-center space-x-1">
            <Edit className="h-4 w-4" />
            <span>Editar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaMascota;