// src/app/refugio/componentes/configuracion/GestionConfiguracion.tsx
import React from 'react';
import { Settings } from 'lucide-react';

const GestionConfiguracion: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <Settings className="h-16 w-16 text-[#254559] mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-[#011526] mb-2">Configuración del Refugio</h2>
      <p className="text-gray-600 mb-4">
        Actualiza la información de tu refugio y preferencias
      </p>
      <button className="bg-[#BF3952] text-white px-6 py-2 rounded-lg hover:bg-[#254559]">
        Próximamente
      </button>
    </div>
  );
};

export default GestionConfiguracion;