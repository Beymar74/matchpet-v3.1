// src/app/refugio/componentes/reportes/GestionReportes.tsx
import React from 'react';
import { BarChart3 } from 'lucide-react';
import Exportador from '@/components/Exportador';

const GestionReportes: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <Exportador />
    </div>
  );
};

export default GestionReportes;