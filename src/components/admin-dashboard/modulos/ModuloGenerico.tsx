// src/components/admin-dashboard/modulos/ModuloGenerico.tsx
import React from 'react';
import Link from 'next/link';
import { 
  Settings,
  ArrowRight,
  Zap,
  Shield,
  Users,
  BarChart3
} from 'lucide-react';

interface ModuloGenericoProps {
  moduleData?: {
    id: string;
    name: string;
    icon: any;
    description: string;
    color: string;
    permissions: string[];
  };
}

const ModuloGenerico: React.FC<ModuloGenericoProps> = ({ moduleData }) => {
  if (!moduleData) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <Settings className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Módulo no encontrado
          </h3>
          <p className="text-gray-600">
            El módulo solicitado no existe o no está disponible.
          </p>
        </div>
      </div>
    );
  }

  const Icon = moduleData.icon;
  
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string; button: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', button: 'bg-blue-600 hover:bg-blue-700' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', button: 'bg-indigo-600 hover:bg-indigo-700' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', button: 'bg-red-600 hover:bg-red-700' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', button: 'bg-green-600 hover:bg-green-700' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', button: 'bg-purple-600 hover:bg-purple-700' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', button: 'bg-orange-600 hover:bg-orange-700' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', button: 'bg-yellow-600 hover:bg-yellow-700' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', button: 'bg-teal-600 hover:bg-teal-700' },
      gray: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', button: 'bg-gray-600 hover:bg-gray-700' }
    };
    return colorMap[color] || colorMap.gray;
  };

  const colors = getColorClasses(moduleData.color);

  const caracteristicas = [
    {
      icon: Zap,
      titulo: 'Automatización',
      descripcion: 'Procesos automatizados para mayor eficiencia'
    },
    {
      icon: Shield,
      titulo: 'Seguridad',
      descripcion: 'Controles de acceso y permisos granulares'
    },
    {
      icon: Users,
      titulo: 'Colaboración',
      descripcion: 'Herramientas para trabajo en equipo'
    },
    {
      icon: BarChart3,
      titulo: 'Analytics',
      descripcion: 'Reportes y métricas detalladas'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className={`bg-white rounded-xl shadow-md p-8 border-l-4 ${colors.border}`}>
        <div className="flex items-start space-x-6">
          <div className={`p-4 rounded-2xl ${colors.bg}`}>
            <Icon className={`h-12 w-12 ${colors.text}`} />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {moduleData.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {moduleData.description}
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Permisos: {moduleData.permissions.join(', ')}
                </span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 font-medium">Disponible</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estado del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Estado del Módulo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600 mb-1">✓</div>
            <p className="text-sm font-medium text-green-800">Configurado</p>
            <p className="text-xs text-green-600">Listo para usar</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">99.9%</div>
            <p className="text-sm font-medium text-blue-800">Disponibilidad</p>
            <p className="text-xs text-blue-600">Últimos 30 días</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">v2.1</div>
            <p className="text-sm font-medium text-purple-800">Versión</p>
            <p className="text-xs text-purple-600">Actualizada</p>
          </div>
        </div>
      </div>

      {/* Características */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Características Principales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caracteristicas.map((caracteristica, index) => {
            const CaracteristicaIcon = caracteristica.icon;
            return (
              <div
                key={caracteristica.titulo}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`p-2 rounded-lg ${colors.bg}`}>
                  <CaracteristicaIcon className={`h-5 w-5 ${colors.text}`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {caracteristica.titulo}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {caracteristica.descripcion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Acciones */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-gray-600 mb-6">
            Configura y personaliza este módulo según las necesidades de tu organización.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/AsignacionRolesPermisos">
              <button className={`inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg transition-colors ${colors.button}`}>
                <Settings className="h-5 w-5" />
                <span>Configurar Módulo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="h-5 w-5" />
              <span>Ver Documentación</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuloGenerico;