// src/components/admin-dashboard/dashboard/EstadisticasCards.tsx
import React from 'react';
import FormattedNumber from '@/components/FormattedNumber';
import { 
  Users, 
  Heart, 
  CheckCircle, 
  MapPin, 
  Clock, 
  TrendingUp,
  UserPlus,
  Award,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface EstadisticasCardsProps {
  loading: boolean;
}

const EstadisticasCards: React.FC<EstadisticasCardsProps> = ({ loading }) => {
  const estadisticas = [
    {
      titulo: 'Total Usuarios',
      valor: 1247,
      cambio: +15,
      porcentaje: +12.5,
      icon: Users,
      color: 'blue',
      descripcion: 'Usuarios registrados'
    },
    {
      titulo: 'Total Mascotas',
      valor: 856,
      cambio: +8,
      porcentaje: +8.3,
      icon: Heart,
      color: 'red',
      descripcion: 'Mascotas en el sistema'
    },
    {
      titulo: 'Adopciones/Mes',
      valor: 127,
      cambio: +23,
      porcentaje: +22.1,
      icon: CheckCircle,
      color: 'green',
      descripcion: 'Adopciones exitosas'
    },
    {
      titulo: 'Refugios Activos',
      valor: 34,
      cambio: +2,
      porcentaje: +6.3,
      icon: MapPin,
      color: 'purple',
      descripcion: 'Refugios colaboradores'
    },
    {
      titulo: 'Pendientes',
      valor: 23,
      cambio: -5,
      porcentaje: -17.9,
      icon: Clock,
      color: 'yellow',
      descripcion: 'Solicitudes por revisar'
    },
    {
      titulo: 'Compatibilidad',
      valor: 92.5,
      cambio: +1.2,
      porcentaje: +1.3,
      icon: TrendingUp,
      color: 'indigo',
      descripcion: 'Precisión del algoritmo',
      sufijo: '%'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { border: string; bg: string; text: string; icon: string } } = {
      blue: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-900', icon: 'text-blue-500' },
      red: { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-900', icon: 'text-red-500' },
      green: { border: 'border-green-500', bg: 'bg-green-50', text: 'text-green-900', icon: 'text-green-500' },
      purple: { border: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-900', icon: 'text-purple-500' },
      yellow: { border: 'border-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-900', icon: 'text-yellow-500' },
      indigo: { border: 'border-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-900', icon: 'text-indigo-500' }
    };
    return colorMap[color];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {estadisticas.map((stat, index) => {
        const Icon = stat.icon;
        const colors = getColorClasses(stat.color);
        const isPositiveChange = stat.cambio > 0;
        
        return (
          <div
            key={stat.titulo}
            className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${colors.border} hover:shadow-lg transition-all duration-300 transform hover:scale-105 group`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {loading ? (
              <div className="animate-pulse">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-600">{stat.titulo}</p>
                  <div className={`p-2 rounded-lg ${colors.bg} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                </div>
                
                <div className="mb-2">
                  <p className="text-2xl font-bold text-gray-900">
                    <FormattedNumber value={stat.valor} />
                    {stat.sufijo && stat.sufijo}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{stat.descripcion}</span>
                  <div className={`flex items-center space-x-1 ${
                    isPositiveChange ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositiveChange ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    <span className="font-medium">
                      {Math.abs(stat.porcentaje)}%
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EstadisticasCards;