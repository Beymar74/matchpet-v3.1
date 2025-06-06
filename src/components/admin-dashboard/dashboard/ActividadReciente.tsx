// src/components/admin-dashboard/dashboard/ActividadReciente.tsx
import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Filter,
  ExternalLink,
  Eye
} from 'lucide-react';

const ActividadReciente = () => {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  
  const actividades = [
    { 
      id: 1, 
      tipo: 'adopcion', 
      titulo: 'Adopción Completada',
      mensaje: 'Max fue adoptado por María García', 
      tiempo: '2 min', 
      status: 'success',
      usuario: 'María García',
      mascota: 'Max',
      detalles: 'Golden Retriever, 3 años'
    },
    { 
      id: 2, 
      tipo: 'usuario', 
      titulo: 'Nuevo Refugio',
      mensaje: 'Refugio "Hogar Peludo" se registró', 
      tiempo: '15 min', 
      status: 'info',
      usuario: 'Hogar Peludo',
      detalles: 'Ubicación: Ciudad de México'
    },
    { 
      id: 3, 
      tipo: 'alerta', 
      titulo: 'Revisión Requerida',
      mensaje: 'Solicitud de adopción necesita aprobación', 
      tiempo: '1 hora', 
      status: 'warning',
      usuario: 'Carlos López',
      mascota: 'Luna',
      detalles: 'Pastor Alemán, 2 años'
    },
    { 
      id: 4, 
      tipo: 'sistema', 
      titulo: 'Backup Completado',
      mensaje: 'Respaldo de base de datos exitoso', 
      tiempo: '2 horas', 
      status: 'success',
      detalles: 'Tamaño: 2.3 GB'
    },
    { 
      id: 5, 
      tipo: 'adopcion', 
      titulo: 'Nueva Solicitud',
      mensaje: 'Ana Martínez solicitó adoptar a Bella', 
      tiempo: '3 horas', 
      status: 'info',
      usuario: 'Ana Martínez',
      mascota: 'Bella',
      detalles: 'Gato persa, 1 año'
    },
    { 
      id: 6, 
      tipo: 'usuario', 
      titulo: 'Perfil Actualizado',
      mensaje: 'Refugio "Patitas Felices" actualizó información', 
      tiempo: '4 horas', 
      status: 'info',
      usuario: 'Patitas Felices'
    }
  ];

  const tiposActividad = [
    { valor: 'todos', label: 'Todas', icon: Activity },
    { valor: 'adopcion', label: 'Adopciones', icon: Heart },
    { valor: 'usuario', label: 'Usuarios', icon: Users },
    { valor: 'alerta', label: 'Alertas', icon: AlertTriangle },
    { valor: 'sistema', label: 'Sistema', icon: CheckCircle }
  ];

  const actividadesFiltradas = filtroTipo === 'todos' 
    ? actividades 
    : actividades.filter(act => act.tipo === filtroTipo);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 border-green-200';
      case 'warning': return 'bg-yellow-100 border-yellow-200';
      case 'error': return 'bg-red-100 border-red-200';
      default: return 'bg-blue-100 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          Actividad Reciente
        </h3>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tiposActividad.map(tipo => (
              <option key={tipo.valor} value={tipo.valor}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Actividades */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {actividadesFiltradas.map((actividad, index) => (
          <div
            key={actividad.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md group ${getStatusColor(actividad.status)}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(actividad.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {actividad.titulo}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {actividad.tiempo}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-1">
                  {actividad.mensaje}
                </p>
                
                {actividad.detalles && (
                  <p className="text-xs text-gray-500 mt-1">
                    {actividad.detalles}
                  </p>
                )}
                
                {(actividad.usuario || actividad.mascota) && (
                  <div className="flex items-center space-x-3 mt-2 text-xs">
                    {actividad.usuario && (
                      <span className="bg-white px-2 py-1 rounded text-gray-600 border">
                        👤 {actividad.usuario}
                      </span>
                    )}
                    {actividad.mascota && (
                      <span className="bg-white px-2 py-1 rounded text-gray-600 border">
                        🐾 {actividad.mascota}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center space-x-1">
          <span>Ver toda la actividad</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default ActividadReciente;