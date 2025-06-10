import React, { useState, useEffect } from 'react';
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
  MonitorSpeaker,
  X,
  Save,
  RefreshCw,
  AlertCircle,
  Play,
  Pause,
  Trash2,
  Copy,
  ExternalLink
} from 'lucide-react';

const ConfiguracionSistema = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [modalConfig, setModalConfig] = useState(null);
  const [modalLogs, setModalLogs] = useState(null);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [configuracionesEditadas, setConfiguracionesEditadas] = useState({});

  // Estados para servicios
  const [serviciosSistema, setServiciosSistema] = useState([
    {
      id: 1,
      nombre: 'API Principal',
      tipo: 'Backend',
      estado: 'Online',
      version: 'v2.1.3',
      uptime: '99.9%',
      ultima_actualizacion: '2024-05-28',
      cpu: 45,
      memoria: 67,
      activo: true
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
      memoria: 78,
      activo: true
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
      memoria: 85,
      activo: true
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
      memoria: 34,
      activo: true
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
      memoria: 42,
      activo: true
    }
  ]);

  const [logs, setLogs] = useState([
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
  ]);

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

  const configuracionesGenerales = [
    {
      categoria: 'Aplicación',
      configuraciones: [
        { nombre: 'Nombre del Sistema', valor: 'MatchPet Admin', tipo: 'texto' },
        { nombre: 'URL Base', valor: 'https://admin.matchpet.com', tipo: 'url' },
        { nombre: 'Timezone', valor: 'America/La_Paz', tipo: 'select', opciones: ['America/La_Paz', 'UTC', 'America/New_York'] },
        { nombre: 'Idioma Predeterminado', valor: 'Español', tipo: 'select', opciones: ['Español', 'English', 'Português'] }
      ]
    },
    {
      categoria: 'Base de Datos',
      configuraciones: [
        { nombre: 'Host', valor: 'db.matchpet.com', tipo: 'texto' },
        { nombre: 'Puerto', valor: '5432', tipo: 'numero' },
        { nombre: 'Pool Connections', valor: '20', tipo: 'numero' },
        { nombre: 'Backup Automático', valor: true, tipo: 'boolean' }
      ]
    },
    {
      categoria: 'Email',
      configuraciones: [
        { nombre: 'SMTP Host', valor: 'smtp.mailgun.com', tipo: 'texto' },
        { nombre: 'Puerto SMTP', valor: '587', tipo: 'numero' },
        { nombre: 'Email Remitente', valor: 'noreply@matchpet.com', tipo: 'email' },
        { nombre: 'TLS Habilitado', valor: true, tipo: 'boolean' }
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

  const filtros = [
    { id: 'todos', label: 'Todas', count: logs.length },
    { id: 'INFO', label: 'Información', count: logs.filter(l => l.nivel === 'INFO').length },
    { id: 'ERROR', label: 'Errores', count: logs.filter(l => l.nivel === 'ERROR').length },
    { id: 'WARNING', label: 'Advertencias', count: logs.filter(l => l.nivel === 'WARNING').length },
    { id: 'SUCCESS', label: 'Exitosos', count: logs.filter(l => l.nivel === 'SUCCESS').length }
  ];

  // Función para agregar notificación
  const agregarNotificacion = (mensaje, tipo = 'info') => {
    const id = Date.now();
    setNotificaciones(prev => [...prev, { id, mensaje, tipo }]);
    setTimeout(() => {
      setNotificaciones(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Función para ejecutar backup manual
  const ejecutarBackupManual = async () => {
    setIsBackupRunning(true);
    setBackupProgress(0);
    
    // Simular progreso de backup
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setBackupProgress(i);
    }
    
    setIsBackupRunning(false);
    agregarNotificacion('Backup manual completado exitosamente', 'success');
    
    // Agregar nuevo log
    const nuevoLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('es-ES'),
      nivel: 'SUCCESS',
      servicio: 'Backup',
      mensaje: 'Backup manual ejecutado exitosamente',
      detalles: `Tamaño: ${(Math.random() * 3 + 1).toFixed(1)}GB, Duración: ${Math.floor(Math.random() * 15 + 5)}min`
    };
    setLogs(prev => [nuevoLog, ...prev]);
  };

  // Función para alternar estado de servicio
  const alternarServicio = (id) => {
    setServiciosSistema(prev => prev.map(servicio => 
      servicio.id === id 
        ? { 
            ...servicio, 
            activo: !servicio.activo,
            estado: servicio.activo ? 'Offline' : 'Online'
          }
        : servicio
    ));
    
    const servicio = serviciosSistema.find(s => s.id === id);
    agregarNotificacion(
      `Servicio ${servicio.nombre} ${servicio.activo ? 'desactivado' : 'activado'}`,
      servicio.activo ? 'warning' : 'success'
    );
  };

  // Función para guardar configuración
  const guardarConfiguracion = (categoria, configuracion, nuevoValor) => {
    agregarNotificacion(`Configuración "${configuracion}" actualizada`, 'success');
    setModalConfig(null);
  };

  // Función para exportar logs
  const exportarLogs = () => {
    const logsExportados = logsFiltrados.map(log => ({
      Timestamp: log.timestamp,
      Nivel: log.nivel,
      Servicio: log.servicio,
      Mensaje: log.mensaje,
      Detalles: log.detalles
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Timestamp,Nivel,Servicio,Mensaje,Detalles\n"
      + logsExportados.map(row => Object.values(row).map(val => `"${val}"`).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `logs_sistema_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    agregarNotificacion('Logs exportados exitosamente', 'success');
  };

  // Filtrar logs
  const logsFiltrados = logs.filter(log => {
    const coincideBusqueda = log.mensaje.toLowerCase().includes(busqueda.toLowerCase()) ||
                           log.servicio.toLowerCase().includes(busqueda.toLowerCase()) ||
                           log.detalles.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideFiltro = filtroActivo === 'todos' || log.nivel === filtroActivo;
    
    return coincideBusqueda && coincideFiltro;
  });

  // Funciones auxiliares
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Offline': return 'bg-gray-100 text-gray-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNivelLogColor = (nivel) => {
    switch (nivel) {
      case 'SUCCESS': return 'bg-green-100 text-green-800';
      case 'INFO': return 'bg-blue-100 text-blue-800';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800';
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'CRITICAL': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'Online': return <CheckCircle className="h-3 w-3" />;
      case 'Warning': return <AlertTriangle className="h-3 w-3" />;
      case 'Error': return <AlertTriangle className="h-3 w-3" />;
      case 'Offline': return <Clock className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const getNotificationColor = (tipo) => {
    switch (tipo) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Modal de configuración
  const ModalConfiguracion = () => {
    if (!modalConfig) return null;

    const { categoria, configuracion } = modalConfig;
    const [valor, setValor] = useState(configuracion.valor);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Editar Configuración</h3>
            <button 
              onClick={() => setModalConfig(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {configuracion.nombre}
              </label>
              {configuracion.tipo === 'select' ? (
                <select 
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {configuracion.opciones?.map(opcion => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              ) : configuracion.tipo === 'boolean' ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={valor}
                    onChange={(e) => setValor(e.target.checked)}
                    className="rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span>Habilitado</span>
                </div>
              ) : (
                <input
                  type={configuracion.tipo === 'numero' ? 'number' : configuracion.tipo === 'email' ? 'email' : 'text'}
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => guardarConfiguracion(categoria, configuracion.nombre, valor)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Guardar</span>
            </button>
            <button
              onClick={() => setModalConfig(null)}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal de detalles de log
  const ModalLog = () => {
    if (!modalLogs) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Detalles del Log</h3>
            <button 
              onClick={() => setModalLogs(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                <p className="text-sm text-gray-900">{modalLogs.timestamp}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Servicio</label>
                <p className="text-sm text-gray-900">{modalLogs.servicio}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Nivel</label>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getNivelLogColor(modalLogs.nivel)}`}>
                {modalLogs.nivel}
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Mensaje</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{modalLogs.mensaje}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Detalles</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded whitespace-pre-wrap">{modalLogs.detalles}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(modalLogs, null, 2));
                agregarNotificacion('Log copiado al portapapeles', 'success');
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>Copiar</span>
            </button>
            <button
              onClick={() => setModalLogs(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Notificaciones */}
      {notificaciones.length > 0 && (
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {notificaciones.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-lg border shadow-lg max-w-sm ${getNotificationColor(notif.tipo)}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{notif.mensaje}</span>
                <button
                  onClick={() => setNotificaciones(prev => prev.filter(n => n.id !== notif.id))}
                  className="ml-2 opacity-70 hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Actualizar</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Nueva Config</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progreso de Backup */}
      {isBackupRunning && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Archive className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">Ejecutando backup manual...</span>
            </div>
            <span className="text-sm text-blue-700">{backupProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${backupProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasSistema.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.titulo}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
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
          <button
            onClick={ejecutarBackupManual}
            disabled={isBackupRunning}
            className={`flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group relative ${isBackupRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Archive className={`h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform ${isBackupRunning ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-medium text-blue-900">Backup Manual</span>
            <span className="text-xs text-blue-600 mt-1">Crear respaldo</span>
          </button>

          <button
            onClick={() => document.getElementById('logs-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group relative"
          >
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {logs.length}
            </div>
            <MonitorSpeaker className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-green-900">Revisar Logs</span>
            <span className="text-xs text-green-600 mt-1">Actividad sistema</span>
          </button>

          <button
            onClick={() => agregarNotificacion('Función de configuración de APIs en desarrollo', 'info')}
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <Globe className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-purple-900">Configurar APIs</span>
            <span className="text-xs text-purple-600 mt-1">Integraciones</span>
          </button>

          <button
            onClick={() => agregarNotificacion('Panel de seguridad avanzada próximamente', 'info')}
            className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
          >
            <Lock className="h-8 w-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-red-900">Seguridad</span>
            <span className="text-xs text-red-600 mt-1">Permisos y acceso</span>
          </button>
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
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(servicio.estado)}`}>
                    {getEstadoIcon(servicio.estado)}
                    <span>{servicio.estado}</span>
                  </span>
                  <button
                    onClick={() => alternarServicio(servicio.id)}
                    className={`p-1 rounded ${servicio.activo ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'}`}
                    title={servicio.activo ? 'Desactivar servicio' : 'Activar servicio'}
                  >
                    {servicio.activo ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>
                </div>
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
            <span>Modo Edición</span>
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
                  <div key={configIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                    <span className="text-sm text-gray-700">{config.nombre}:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {config.tipo === 'boolean' 
                          ? (config.valor ? 'Habilitado' : 'Deshabilitado')
                          : config.valor
                        }
                      </span>
                      <button
                        onClick={() => setModalConfig({ categoria: categoria.categoria, configuracion: config })}
                        className="p-1 text-gray-400 hover:text-blue-600 rounded"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logs del Sistema */}
      <div id="logs-section" className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Logs del Sistema</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {logsFiltrados.length} de {logs.length} entradas
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
            <div className="flex items-center space-x-2">
              {filtros.map(filtro => (
                <button
                  key={filtro.id}
                  onClick={() => setFiltroActivo(filtro.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filtroActivo === filtro.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filtro.label} ({filtro.count})
                </button>
              ))}
            </div>
            <button 
              onClick={exportarLogs}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {logsFiltrados.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p>No se encontraron logs con los filtros actuales</p>
            </div>
          ) : (
            logsFiltrados.map((log, index) => (
              <div
                key={log.id}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setModalLogs(log)}
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
                    <p className="text-xs text-gray-600 truncate">{log.detalles}</p>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
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
            <button 
              onClick={() => agregarNotificacion('Panel de configuraciones avanzadas próximamente', 'info')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Configuraciones Avanzadas</span>
            </button>
            <button 
              onClick={() => agregarNotificacion('Panel de seguridad y backups próximamente', 'info')}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Shield className="h-5 w-5" />
              <span>Seguridad y Backups</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modales */}
      <ModalConfiguracion />
      <ModalLog />
    </div>
  );
};

export default ConfiguracionSistema;