// src/app/refugio/componentes/dashboard/GraficoOcupacion.tsx
import React from 'react';
import { RefugioInfo } from '../../tipos';

interface GraficoOcupacionProps {
  refugioInfo: RefugioInfo;
}

const GraficoOcupacion: React.FC<GraficoOcupacionProps> = ({ refugioInfo }) => {
  const porcentajeOcupacion = Math.round((refugioInfo.ocupacion / refugioInfo.capacidad) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-[#011526] mb-4">Ocupación del Refugio</h3>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Capacidad utilizada</span>
            <span className="text-sm font-medium text-[#011526]">
              {refugioInfo.ocupacion}/{refugioInfo.capacidad}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-[#BF3952] h-3 rounded-full transition-all duration-300"
              style={{ width: `${porcentajeOcupacion}%` }}
            ></div>
          </div>
        </div>
        <div className="text-2xl font-bold text-[#BF3952]">
          {porcentajeOcupacion}%
        </div>
      </div>
    </div>
  );
};

export default GraficoOcupacion;