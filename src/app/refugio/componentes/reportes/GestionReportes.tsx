// src/app/refugio/componentes/reportes/GestionReportes.tsx
import React from 'react';
import { BarChart3 } from 'lucide-react';

const GestionReportes: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <BarChart3 className="h-16 w-16 text-[#30588C] mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-[#011526] mb-2">Reportes y Estadísticas</h2>
      <p className="text-gray-600 mb-4">
        Visualiza métricas detalladas de adopciones y rendimiento
      </p>
      <button className="bg-[#BF3952] text-white px-6 py-2 rounded-lg hover:bg-[#254559]">
        Próximamente
      </button>
    </div>
  );
};

export default GestionReportes;