// src/app/refugio/componentes/adopciones/GestionAdopciones.tsx
import React from 'react';
import { Users } from 'lucide-react';

const GestionAdopciones: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <Users className="h-16 w-16 text-[#6093BF] mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-[#011526] mb-2">Gestión de Adopciones</h2>
      <p className="text-gray-600 mb-4">
        Administra las solicitudes de adopción y el seguimiento post-adopción
      </p>
      <button className="bg-[#BF3952] text-white px-6 py-2 rounded-lg hover:bg-[#254559]">
        Próximamente
      </button>
    </div>
  );
};

export default GestionAdopciones;