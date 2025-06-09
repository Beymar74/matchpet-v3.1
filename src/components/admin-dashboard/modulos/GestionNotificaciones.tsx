// src/components/admin-dashboard/modulos/GestionNotificaciones.tsx
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import { 
  Bell,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Settings,
  Shield,
  Mail,
  MessageSquare,
  Smartphone,
  Send,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Pause,
  Play
} from 'lucide-react';

// Definir tipos
type EstadoCampana = 'Activa' | 'Programada' | 'Completada' | 'Borrador' | 'Pausada' | 'Error';
type TipoNotificacion = 'Email' | 'SMS' | 'Push';

interface Campana {
  id: number;
  nombre: string;
  tipo: TipoNotificacion;
  estado: EstadoCampana;
  enviadas: number;
  programadas: number;
  tasa_apertura: number;
  fecha: string;
  template: string;
}

interface Template {
  id: number;
  nombre: string;
  tipo: TipoNotificacion;
  descripcion: string;
  usos: number;
  ultima_modificacion: string;
  activo: boolean;
}

const GestionNotificaciones = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const estadisticasNotificaciones = [
    {
      titulo: 'Enviadas Hoy',
      valor: 1847,
      cambio: '+234 vs ayer',
      color: 'blue',
      icon: Bell
    },
    {
      titulo: 'Tasa de Apertura',
      valor: 73.2,
      cambio: '+2.1% vs mes anterior',
      color: 'green',
      icon: CheckCircle,
      unidad: '%'
    },
    {
      titulo: 'Campaigns Activas',
      valor: 8,
      cambio: '3 programadas',
      color: 'purple',
      icon: Send
    },
    {
      titulo: 'Suscriptores',
      valor: 2156,
      cambio: '+89 esta semana',
      color: 'orange',
      icon: Users
    }
  ];
  
  const accionesRapidas = [
    {
      titulo: 'Notificación Rápida',
      descripcion: 'Envío inmediato',
      icon: Bell,
      color: 'blue',
      badge: '1847'
    },
    {
      titulo: 'Campaña Email',
      descripcion: 'Newsletter masivo',
      icon: Mail,
      color: 'green'
    },
    {
      titulo: 'SMS Masivo',
      descripcion: 'Mensaje de texto',
      icon: MessageSquare,
      color: 'purple'
    },
    {
      titulo: 'Push Notification',
      descripcion: 'Notificación móvil',
      icon: Smartphone,
      color: 'orange'
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todas', count: 1847 },
    { id: 'email', label: 'Email', count: 1234 },
    { id: 'push', label: 'Push', count: 456 },
    { id: 'sms', label: 'SMS', count: 157 },
    { id: 'programadas', label: 'Programadas', count: 23 }
  ];

  const campanasRecientes: Campana[] = [
    {
      id: 1,
      nombre: 'Bienvenida Nuevos Usuarios',
      tipo: 'Email',
      estado: 'Activa',
      enviadas: 234,
      programadas: 0,
      tasa_apertura: 78.5,
      fecha: '2024-06-01',
      template: 'welcome_email'
    },
    {
      id: 2,
      nombre: 'Recordatorio de Cita',
      tipo: 'SMS',
      estado: 'Programada',
      enviadas: 0,
      programadas: 45,
      tasa_apertura: 0,
      fecha: '2024-06-02',
      template: 'appointment_reminder'
    },
    {
      id: 3,
      nombre: 'Nueva Mascota Disponible',
      tipo: 'Push',
      estado: 'Completada',
      enviadas: 1567,
      programadas: 0,
      tasa_apertura: 45.2,
      fecha: '2024-06-03',
      template: 'new_pet_alert'
    },
    {
      id: 4,
      nombre: 'Newsletter Semanal',
      tipo: 'Email',
      estado: 'Borrador',
      enviadas: 0,
      programadas: 2156,
      tasa_apertura: 0,
      fecha: '2024-06-04',
      template: 'weekly_newsletter'
    },
    {
      id: 5,
      nombre: 'Adopción Completada',
      tipo: 'Push',
      estado: 'Activa',
      enviadas: 89,
      programadas: 0,
      tasa_apertura: 92.1,
      fecha: '2024-06-05',
      template: 'adoption_success'
    }
  ];

  const templatesNotificacion: Template[] = [
    {
      id: 1,
      nombre: 'Bienvenida',
      tipo: 'Email',
      descripcion: 'Mensaje de bienvenida para nuevos usuarios',
      usos: 234,
      ultima_modificacion: '2024-05-20',
      activo: true
    },
    {
      id: 2,
      nombre: 'Recordatorio Cita',
      tipo: 'SMS',
      descripcion: 'Recordatorio automático de citas programadas',
      usos: 167,
      ultima_modificacion: '2024-05-18',
      activo: true
    },
    {
      id: 3,
      nombre: 'Nueva Mascota',
      tipo: 'Push',
      descripcion: 'Alerta cuando hay nueva mascota disponible',
      usos: 1567,
      ultima_modificacion: '2024-05-25',
      activo: true
    },
    {
      id: 4,
      nombre: 'Adopción Exitosa',
      tipo: 'Email',
      descripcion: 'Felicitación por adopción completada',
      usos: 89,
      ultima_modificacion: '2024-05-22',
      activo: false
    }
  ];

  // Funciones con tipos definidos
  const getEstadoColor = (estado: EstadoCampana): string => {
    switch (estado) {
      case 'Activa': return 'bg-green-100 text-green-800';
      case 'Programada': return 'bg-blue-100 text-blue-800';
      case 'Completada': return 'bg-purple-100 text-purple-800';
      case 'Borrador': return 'bg-yellow-100 text-yellow-800';
      case 'Pausada': return 'bg-gray-100 text-gray-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: TipoNotificacion): ReactElement => {
    switch (tipo) {
      case 'Email': return <Mail className="h-4 w-4 text-blue-500" />;
      case 'SMS': return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'Push': return <Smartphone className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEstadoIcon = (estado: EstadoCampana): ReactElement => {
    switch (estado) {
      case 'Activa': return <Play className="h-3 w-3" />;
      case 'Programada': return <Clock className="h-3 w-3" />;
      case 'Completada': return <CheckCircle className="h-3 w-3" />;
      case 'Pausada': return <Pause className="h-3 w-3" />;
      case 'Error': return <XCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };
  const router = useRouter();

const manejarRedireccion = (tipo: string) => {
  switch (tipo) {
    case 'Notificación Rápida':
      router.push('/GestionNotificaciones/notificacion-rapida');
      break;
    case 'Campaña Email':
      router.push('/GestionNotificaciones/campana-email');
      break;
    case 'SMS Masivo':
      router.push('/GestionNotificaciones/sms-masivo');
      break;
    case 'Push Notification':
      router.push('/GestionNotificaciones/push-notificacion');
      break;
    default:
      break;
  }
};


  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Notificaciones</h1>
              <p className="text-gray-600 mt-1">Gestionar alertas, avisos y notificaciones del sistema</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin, marketing</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasNotificaciones.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.titulo}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.titulo}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.valor.toLocaleString()}{stat.unidad || ''}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.cambio}</p>
                </div>
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {accionesRapidas.map((accion, index) => {
            const Icon = accion.icon;
            return (
              <button
                key={accion.titulo}
                onClick={() => manejarRedireccion(accion.titulo)}
                className={`flex flex-col items-center p-4 bg-${accion.color}-50 rounded-lg hover:bg-${accion.color}-100 transition-colors group relative`}
              >
                {accion.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {accion.badge}
                  </div>
                )}
                <Icon className={`h-8 w-8 text-${accion.color}-600 mb-2 group-hover:scale-110 transition-transform`} />
                <span className={`text-sm font-medium text-${accion.color}-900`}>{accion.titulo}</span>
                <span className={`text-xs text-${accion.color}-600 mt-1`}>{accion.descripcion}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Métricas de Engagement */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Emails</h3>
            <p className="text-2xl font-bold text-blue-600">73.2%</p>
            <p className="text-sm text-gray-500">Tasa de apertura</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">SMS</h3>
            <p className="text-2xl font-bold text-green-600">89.5%</p>
            <p className="text-sm text-gray-500">Tasa de lectura</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Smartphone className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Push</h3>
            <p className="text-2xl font-bold text-purple-600">45.8%</p>
            <p className="text-sm text-gray-500">Tasa de click</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Alcance</h3>
            <p className="text-2xl font-bold text-orange-600">2,156</p>
            <p className="text-sm text-gray-500">Usuarios activos</p>
          </div>
        </div>
      </div>

      {/* Templates de Notificación */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Templates de Notificación</h2>
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Nuevo Template</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templatesNotificacion.map((template, index) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getTipoIcon(template.tipo)}
                  <div>
                    <h3 className="font-medium text-gray-900">{template.nombre}</h3>
                    <p className="text-sm text-gray-600">{template.descripcion}</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${template.activo ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{template.usos} usos</span>
                <span>Modificado: {new Date(template.ultima_modificacion).toLocaleDateString('es-ES')}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{template.tipo}</span>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-orange-600 rounded">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Campañas */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Campañas Recientes</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {campanasRecientes.length} resultados
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar campañas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroActivo(filtro.id)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                filtroActivo === filtro.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{filtro.label}</span>
              <span className="bg-white px-1 rounded text-xs">{filtro.count}</span>
            </button>
          ))}
        </div>

        {/* Tabla de Campañas */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Campaña</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Enviadas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tasa Apertura</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {campanasRecientes.map((campana, index) => (
                <tr
                  key={campana.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {getTipoIcon(campana.tipo)}
                      <div>
                        <p className="font-medium text-gray-900">{campana.nombre}</p>
                        <p className="text-sm text-gray-500">{new Date(campana.fecha).toLocaleDateString('es-ES')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {campana.tipo}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(campana.estado)}`}>
                      {getEstadoIcon(campana.estado)}
                      <span>{campana.estado}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{campana.enviadas.toLocaleString()}</p>
                      {campana.programadas > 0 && (
                        <p className="text-xs text-gray-500">+{campana.programadas} programadas</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {campana.tasa_apertura > 0 ? (
                      <span className="text-sm text-gray-900">{campana.tasa_apertura}%</span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configuración */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Configuración de Notificaciones
          </h2>
          <p className="text-gray-600 mb-6">
            Personaliza templates, proveedores de envío y configuraciones de entrega.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Settings className="h-5 w-5" />
              <span>Configurar Providers</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="h-5 w-5" />
              <span>Templates y Automatización</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionNotificaciones;