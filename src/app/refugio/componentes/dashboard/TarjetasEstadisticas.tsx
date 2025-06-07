// src/app/refugio/componentes/dashboard/TarjetasEstadisticas.tsx
import React from 'react';
import { Heart, FileText, CheckCircle, Bell } from 'lucide-react';
import { Estadisticas } from '../../tipos';

interface TarjetasEstadisticasProps {
  estadisticas: Estadisticas;
}

const TarjetasEstadisticas: React.FC<TarjetasEstadisticasProps> = ({ estadisticas }) => {
  const tarjetas = [
    {
      titulo: "Mascotas Activas",
      valor: estadisticas.mascotasActivas,
      icon: Heart,
      color: "border-[#BF3952]",
      iconColor: "text-[#BF3952]"
    },
    {
      titulo: "Solicitudes Pendientes",
      valor: estadisticas.adopcionesPendientes,
      icon: FileText,
      color: "border-[#30588C]",
      iconColor: "text-[#30588C]"
    },
    {
      titulo: "Adopciones Exitosas",
      valor: estadisticas.adopcionesCompletadas,
      icon: CheckCircle,
      color: "border-[#6093BF]",
      iconColor: "text-[#6093BF]"
    },
    {
      titulo: "Solicitudes Nuevas",
      valor: estadisticas.solicitudesNuevas,
      icon: Bell,
      color: "border-[#254559]",
      iconColor: "text-[#254559]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tarjetas.map((tarjeta, index) => {
        const Icon = tarjeta.icon;
        return (
          <div key={index} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${tarjeta.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{tarjeta.titulo}</p>
                <p className="text-3xl font-bold text-[#011526]">{tarjeta.valor}</p>
              </div>
              <Icon className={`h-12 w-12 ${tarjeta.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TarjetasEstadisticas;