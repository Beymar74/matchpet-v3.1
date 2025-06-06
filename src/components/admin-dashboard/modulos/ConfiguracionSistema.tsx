// src/components/admin-dashboard/modulos/ConfiguracionSistema.tsx
import React, { useState } from 'react';
import { 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Shield,
  Database,
  Cloud,
  Key,
  Globe,
  HardDrive,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  Server,
  Lock,
  Archive,
  MonitorSpeaker
} from 'lucide-react';

const ConfiguracionSistema = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const estadisticasSistema = [
    {
      titulo: 'Uptime del Sistema',
      valor: 99.8,
      cambio: '30 días promedio',
      color: 'green',
      icon: Activity,
      unidad: '%'
    },
    {
      titulo: 'Backups Exitosos',
      valor: 24,
      cambio: 'Últimos 30 días',
      color: 'blue',
      icon: Database
    },
    {
      titulo: 'APIs Integradas',
      valor: 12,
      cambio: '3 activas',
      color: 'purple',
      icon: Globe
    },
    {
      titulo: 'Alertas Sistema',
      valor: 3,
      cambio: '2 críticas',
      color: 'yellow',
      icon: AlertTriangle
    }
  ];

  const accionesRapidas = [
    {
      titulo: 'Backup Manual',
      descripcion: 'Crear respaldo',
      icon: Archive,
      color: 'blue'
    },
    {
      titulo: 'Revisar Logs',
      descripcion: 'Actividad sistema',
      icon: MonitorSpeaker,
      color: 'green',
      badge: '127'
    },
    {
      titulo: 'Configurar APIs',
      descripcion: 'Integraciones',
      icon: Globe,
      color: 'purple'
    },
    {
      titulo: 'Seguridad',
      descripcion: 'Permisos y acceso',
      icon: Lock,
      color: 'red'
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todas', count: 156 },
    { id: 'servidor', label: 'Servidor', count: 67 },
    { id: 'base_datos', label: 'Base de Datos', count: 34 },
    { id: 'apis', label: 'APIs', count: 28 },
    { id: 'seguridad', label: 'Seguridad', count: 27 }
  ];

  const serviciosSistema = [
    {
      id: 1,
      nombre: 'API Principal',
      tipo: 'Backend',
      estado: 'Online',
      version: 'v2.1.3',
      uptime: '99.9%',
      ultima_actualizacion: '2024-05-28',
      cpu: 45,
      memoria: 67
    },
    {
      id: 2,
      nombre: 'Base de Datos',
      tipo: 'PostgreSQL',
      estado: 'Online',
      version: '14.8',
      uptime: '99.8%',
      ultima_actualizacion: '2024-05-25',
      cpu: 23,
      memoria: 78
    },
    {
      id: 3,
      nombre: 'CDN Storage',
      tipo: 'AWS S3',
      estado: 'Warning',
      version: '-',
      uptime: '97.2%',
      ultima_actualizacion: '2024-05-30',
      cpu: 0,
      memoria: 85
    },
    {
      id: 4,
      nombre: 'Notificaciones',
      tipo: 'Firebase',
      estado: 'Online',
      version: 'v9.23.0',
      uptime: '98.5%',
      ultima_actualizacion: '2024-06-01',
      cpu: 12,
      memoria: 34
    },
    {
      id: 5,
      nombre: 'Cache Redis',
      tipo: 'Redis',
      estado: 'Online',
      version: '7.0.11',
      uptime: '99.6%',
      ultima_actualizacion: '2024-05-26',
      cpu: 18,
      memoria: 42
    }
  ];

  const configuracionesGenerales = [
    {
      categoria: 'Aplicación',
      configuraciones: [
        { nombre: 'Nombre del Sistema', valor: 'MatchPet Admin', tipo: 'texto' },
        { nombre: 'URL Base', valor: 'https://admin.matchpet.com', tipo: 'url' },
        { nombre: 'Timezone', valor: 'America/La_Paz', tipo: 'select' },
        { nombre: 'Idioma Predeterminado', valor: 'Español', tipo: 'select' }
      ]
    },
    {
      categoria: 'Base de Datos',
      configuraciones: [
        { nombre: 'Host', valor: 'db.matchpet.com', tipo: 'texto' },
        { nombre: 'Puerto', valor: '5432', tipo: 'numero' },
        { nombre: 'Pool Connections', valor: '20', tipo: 'numero' },
        { nombre: 'Backup Automático', valor: 'Habilitado', tipo: 'boolean' }
      ]
    },
    {
      categoria: 'Email',
      configuraciones: [
        { nombre: 'SMTP Host', valor: 'smtp.mailgun.com', tipo: 'texto' },
        { nombre: 'Puerto SMTP', valor: '587', tipo: 'numero' },
        { nombre: 'Email Remitente', valor: 'noreply@matchpet.com', tipo: 'email' },
        { nombre: 'TLS Habilitado', valor: 'Sí', tipo: 'boolean' }
      ]
    },
    {
      categoria: 'APIs Externas',
      configuraciones: [
        { nombre: 'Google Maps API', valor: '••••••••••••9827', tipo: 'password' },
        { nombre: 'Firebase Key', valor: '••••••••••••4561', tipo: 'password' },
        { nombre: 'AWS Access Key', valor: '••••••••••••7834', tipo: 'password' },
        { nombre: 'PayPal Client ID', valor: '••••••••••••2156', tipo: 'password' }
      ]
    }
  ];

  const logsRecientes = [
    {
      id: 1,
      timestamp: '2024-06-06 14:30:25',
      nivel: 'INFO',
      servicio: 'API',
      mensaje: 'Usuario admin@matchpet.com inició sesión',
      detalles: 'Login exitoso desde IP 192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2024-06-06 14:25:12',
      nivel: 'ERROR',
      servicio: 'Database',
      mensaje: 'Timeout en consulta de adopciones',
      detalles: 'Query: SELECT * FROM adopciones WHERE...'
    },
    {
      id: 3,
      timestamp: '2024-06-06 14:20:08',
      nivel: 'WARNING',
      servicio: 'CDN',
      mensaje: 'Alta latencia en subida de imágenes',
      detalles: 'Tiempo promedio: 2.3s (límite: 2.0s)'
    },
    {
      id: 4,
      timestamp: '2024-06-06 14:15:33',
      nivel: 'INFO',
      servicio: 'Backup',
      mensaje: 'Backup automático completado',
      detalles: 'Tamaño: 2.3GB, Duración: 12min'
    },
    {
      id: 5,
      timestamp: '2024-06-06 14:10:45',
      nivel: 'SUCCESS',
      servicio: 'API',
      mensaje: 'Adopción #1247 procesada exitosamente',
      detalles: 'Usuario: maria.garcia@email.com'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Offline': return 'bg-gray-100 text-gray-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNivelLogColor = (nivel: string) => {
    switch (nivel) {
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'INFO': return 'bg-blue-100 text-blue-800';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800';
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'CRITICAL': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Online': return <CheckCircle className="h-3 w-3" />;
      case 'Warning': return <AlertTriangle className="h-3 w-3" />;
      case 'Error': return <AlertTriangle className="h-3 w-3" />;
      case 'Offline': return <Clock className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-100 rounded-2xl">
              <Settings className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>
              <p className="text-gray-600 mt-1">Configuraciones generales, backups y monitoreo</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Nueva Config</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasSistema.map((stat, index) => {
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

      {/* Estado de Servicios */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Estado de Servicios</h2>
        <div className="space-y-4">
          {serviciosSistema.map((servicio, index) => (
            <div
              key={servicio.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Server className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{servicio.nombre}</h3>
                    <p className="text-sm text-gray-600">{servicio.tipo} • {servicio.version}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(servicio.estado)}`}>
                  {getEstadoIcon(servicio.estado)}
                  <span>{servicio.estado}</span>
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Uptime:</span>
                  <p className="font-medium">{servicio.uptime}</p>
                </div>
                <div>
                  <span className="text-gray-600">CPU:</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${servicio.cpu > 80 ? 'bg-red-500' : servicio.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${servicio.cpu}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{servicio.cpu}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Memoria:</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${servicio.memoria > 80 ? 'bg-red-500' : servicio.memoria > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${servicio.memoria}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{servicio.memoria}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Actualizado:</span>
                  <p className="font-medium">{new Date(servicio.ultima_actualizacion).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuraciones Generales */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Configuraciones Generales</h2>
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Edit className="h-4 w-4" />
            <span>Editar</span>
          </button>
        </div>

        <div className="space-y-6">
          {configuracionesGenerales.map((categoria, index) => (
            <div key={categoria.categoria} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>{categoria.categoria}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoria.configuraciones.map((config, configIndex) => (
                  <div key={configIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{config.nombre}:</span>
                    <span className="text-sm font-medium text-gray-900">{config.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logs del Sistema */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Logs del Sistema</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {logsRecientes.length} entradas recientes
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en logs..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 w-64"
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

        <div className="space-y-2">
          {logsRecientes.map((log, index) => (
            <div
              key={log.id}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getNivelLogColor(log.nivel)}`}>
                      {log.nivel}
                    </span>
                    <span className="text-sm text-gray-600">{log.servicio}</span>
                    <span className="text-xs text-gray-500">{log.timestamp}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">{log.mensaje}</p>
                  <p className="text-xs text-gray-600">{log.detalles}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuración de Seguridad */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Configuración Avanzada
          </h2>
          <p className="text-gray-600 mb-6">
            Gestiona configuraciones críticas del sistema, backups y seguridad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="h-5 w-5" />
              <span>Configuraciones Avanzadas</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Shield className="h-5 w-5" />
              <span>Seguridad y Backups</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionSistema;