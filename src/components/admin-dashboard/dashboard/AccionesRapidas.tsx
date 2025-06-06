// src/components/admin-dashboard/dashboard/AccionesRapidas.tsx
import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  FileText, 
  Settings,
  Plus,
  UserCheck,
  Bell,
  MessageCircle,
  Shield,
  Download,
  Upload,
  Search
} from 'lucide-react';

const AccionesRapidas = () => {
  const [accionCargando, setAccionCargando] = useState<string | null>(null);

  const ejecutarAccion = async (accionId: string) => {
    setAccionCargando(accionId);
    // Simular acción
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAccionCargando(null);
  };

  const acciones = [
    {
      id: 'nuevo-usuario',
      titulo: 'Nuevo Usuario',
      descripcion: 'Registrar usuario manualmente',
      icon: Users,
      color: 'blue',
      accion: () => ejecutarAccion('nuevo-usuario')
    },
    {
      id: 'aprobar-mascota',
      titulo: 'Aprobar Mascota',
      descripcion: 'Revisar mascotas pendientes',
      icon: Heart,
      color: 'red',
      badge: '8',
      accion: () => ejecutarAccion('aprobar-mascota')
    },
    {
      id: 'generar-reporte',
      titulo: 'Generar Reporte',
      descripcion: 'Crear reporte personalizado',
      icon: FileText,
      color: 'green',
      accion: () => ejecutarAccion('generar-reporte')
    },
    {
      id: 'configurar-sistema',
      titulo: 'Configurar',
      descripcion: 'Ajustes del sistema',
      icon: Settings,
      color: 'purple',
      accion: () => ejecutarAccion('configurar-sistema')
    },
    {
      id: 'revisar-adopciones',
      titulo: 'Revisar Adopciones',
      descripcion: 'Solicitudes pendientes',
      icon: UserCheck,
      color: 'orange',
      badge: '23',
      accion: () => ejecutarAccion('revisar-adopciones')
    },
    {
      id: 'enviar-notificacion',
      titulo: 'Notificación Masiva',
      descripcion: 'Enviar aviso a usuarios',
      icon: Bell,
      color: 'yellow',
      accion: () => ejecutarAccion('enviar-notificacion')
    },
    {
      id: 'mensajes-soporte',
      titulo: 'Soporte',
      descripcion: 'Revisar tickets de ayuda',
      icon: MessageCircle,
      color: 'teal',
      badge: '5',
      accion: () => ejecutarAccion('mensajes-soporte')
    },
    {
      id: 'backup-sistema',
      titulo: 'Backup',
      descripcion: 'Respaldo manual',
      icon: Shield,
      color: 'indigo',
      accion: () => ejecutarAccion('backup-sistema')
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; hover: string; text: string; icon: string } } = {
      blue: { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', text: 'text-blue-900', icon: 'text-blue-600' },
      red: { bg: 'bg-red-50', hover: 'hover:bg-red-100', text: 'text-red-900', icon: 'text-red-600' },
      green: { bg: 'bg-green-50', hover: 'hover:bg-green-100', text: 'text-green-900', icon: 'text-green-600' },
      purple: { bg: 'bg-purple-50', hover: 'hover:bg-purple-100', text: 'text-purple-900', icon: 'text-purple-600' },
      orange: { bg: 'bg-orange-50', hover: 'hover:bg-orange-100', text: 'text-orange-900', icon: 'text-orange-600' },
      yellow: { bg: 'bg-yellow-50', hover: 'hover:bg-yellow-100', text: 'text-yellow-900', icon: 'text-yellow-600' },
      teal: { bg: 'bg-teal-50', hover: 'hover:bg-teal-100', text: 'text-teal-900', icon: 'text-teal-600' },
      indigo: { bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', text: 'text-indigo-900', icon: 'text-indigo-600' }
    };
    return colorMap[color];
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-600" />
          Acciones Rápidas
        </h3>
        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
          <Search className="h-4 w-4" />
          <span>Más</span>
        </button>
      </div>

      {/* Grid de Acciones */}
      <div className="grid grid-cols-2 gap-3">
        {acciones.map((accion, index) => {
          const Icon = accion.icon;
          const colors = getColorClasses(accion.color);
          const estaEjecutando = accionCargando === accion.id;
          
          return (
            <button
              key={accion.id}
              onClick={accion.accion}
              disabled={estaEjecutando}
              className={`relative flex flex-col items-center p-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${colors.bg} ${colors.hover} ${colors.text} disabled:opacity-50 disabled:cursor-not-allowed group`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              {accion.badge && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {accion.badge}
                </div>
              )}

              {/* Icono */}
              <div className={`mb-3 p-2 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow ${
                estaEjecutando ? 'animate-pulse' : ''
              }`}>
                <Icon className={`h-6 w-6 ${colors.icon} ${estaEjecutando ? 'animate-spin' : ''}`} />
              </div>

              {/* Contenido */}
              <div className="text-center">
                <span className="text-sm font-medium block">
                  {estaEjecutando ? 'Ejecutando...' : accion.titulo}
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  {accion.descripcion}
                </span>
              </div>

              {/* Indicador de carga */}
              {estaEjecutando && (
                <div className="absolute inset-0 bg-white bg-opacity-70 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-6 pt-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600">
            <Upload className="h-4 w-4" />
            <span>Importar</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm text-gray-600">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccionesRapidas;