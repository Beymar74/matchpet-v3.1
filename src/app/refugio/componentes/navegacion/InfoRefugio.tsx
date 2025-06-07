// src/app/refugio/componentes/navegacion/InfoRefugio.tsx
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { RefugioInfo } from '../../tipos';

interface InfoRefugioProps {
  refugioInfo: RefugioInfo;
}

const InfoRefugio: React.FC<InfoRefugioProps> = ({ refugioInfo }) => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-[#011526] mb-3">Información de Contacto</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{refugioInfo.telefono}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{refugioInfo.email}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoRefugio;