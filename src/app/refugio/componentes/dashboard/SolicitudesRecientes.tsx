// src/app/refugio/componentes/dashboard/SolicitudesRecientes.tsx
import React from 'react';
import { SolicitudAdopcion } from '../../tipos';

interface SolicitudesRecientesProps {
  solicitudesPendientes: SolicitudAdopcion[];
}

const SolicitudesRecientes: React.FC<SolicitudesRecientesProps> = ({ solicitudesPendientes }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#011526]">Solicitudes Recientes</h3>
        <button className="text-[#30588C] hover:text-[#254559] font-medium text-sm">
          Ver todas
        </button>
      </div>
      <div className="space-y-3">
        {solicitudesPendientes.map((solicitud) => (
          <div 
            key={solicitud.id} 
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#6093BF] rounded-full flex items-center justify-center text-white font-semibold">
                {solicitud.adoptante.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-[#011526]">{solicitud.adoptante}</p>
                <p className="text-sm text-gray-600">Solicita adoptar a {solicitud.mascota}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-[#30588C] font-medium">
                {solicitud.compatibilidad}% compatibilidad
              </span>
              <button className="bg-[#BF3952] text-white px-3 py-1 rounded-md hover:bg-[#254559] text-sm">
                Evaluar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolicitudesRecientes;