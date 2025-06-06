// src/components/admin-dashboard/dashboard/EstadoSistema.tsx
import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Server, 
  Wifi, 
  HardDrive,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Cpu,
  MemoryStick,
  Cloud
} from 'lucide-react';

const EstadoSistema = () => {
  const [actualizando, setActualizando] = useState(false);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(new Date());

  const servicios = [
    {
      nombre: 'Base de Datos',
      estado: 'online',
      latencia: '12ms',
      descripcion: 'PostgreSQL 14.2',
      icon: Database,
      uptime: '99.98%',
      color: 'green'
    },
    {
      nombre: 'API Principal',
      estado: 'online',
      latencia: '45ms',
      descripcion: 'Node.js + Express',
      icon: Server,
      uptime: '99.95%',
      color: 'green'
    },
    {
      nombre: 'CDN/Storage',
      estado: 'warning',
      latencia: '120ms',
      descripcion: 'AWS S3 + CloudFront',
      icon: Cloud,
      uptime: '99.85%',
      color: 'yellow'
    },
    {
      nombre: 'Notificaciones',
      estado: 'degraded',
      latencia: '2.1s',
      descripcion: 'Firebase Push',
      icon: Wifi,
      uptime: '98.2%',
      color: 'orange'
    }
  ];

  const metricas = [
    {
      nombre: 'CPU',
      valor: 45,
      maximo: 100,
      unidad: '%',
      icon: Cpu,
      estado: 'normal'
    },
    {
      nombre: 'RAM',
      valor: 6.8,
      maximo: 16,
      unidad: 'GB',
      icon: MemoryStick,
      estado: 'normal'
    },
    {
      nombre: 'Disco',
      valor: 284,
      maximo: 500,
      unidad: 'GB',
      icon: HardDrive,
      estado: 'warning'
    },
    {
      nombre: 'Red',
      valor: 2.3,
      maximo: 10,
      unidad: 'Mbps',
      icon: Activity,
      estado: 'normal'
    }
  ];

  const actualizarEstado = async () => {
    setActualizando(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUltimaActualizacion(new Date());
    setActualizando(false);
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'offline': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'online': return 'bg-green-100 border-green-200';
      case 'warning': return 'bg-yellow-100 border-yellow-200';
      case 'degraded': return 'bg-orange-100 border-orange-200';
      case 'offline': return 'bg-red-100 border-red-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const getProgressColor = (porcentaje: number, estado?: string) => {
    if (estado === 'warning' || porcentaje > 80) return 'bg-yellow-500';
    if (porcentaje > 60) return 'bg-orange-500';
    return 'bg-green-500';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUltimaActualizacion(new Date());
    }, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Database className="h-5 w-5 mr-2 text-indigo-600" />
          Estado del Sistema
        </h3>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            Actualizado: {ultimaActualizacion.toLocaleTimeString('es-ES')}
          </span>
          <button
            onClick={actualizarEstado}
            disabled={actualizando}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${actualizando ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Servicios */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Servicios</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {servicios.map((servicio, index) => {
            const Icon = servicio.icon;
            return (
              <div
                key={servicio.nombre}
                className={`p-4 rounded-lg border transition-all duration-200 ${getEstadoColor(servicio.estado)}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {servicio.nombre}
                      </p>
                      <p className="text-xs text-gray-500">
                        {servicio.descripcion}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      {getEstadoIcon(servicio.estado)}
                      <span className="text-xs font-medium capitalize">
                        {servicio.estado === 'online' ? 'En línea' :
                         servicio.estado === 'warning' ? 'Advertencia' :
                         servicio.estado === 'degraded' ? 'Degradado' : 'Fuera de línea'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>Latencia: {servicio.latencia}</span>
                      <br />
                      <span>Uptime: {servicio.uptime}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Métricas de Recursos */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recursos del Servidor</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metricas.map((metrica, index) => {
            const Icon = metrica.icon;
            const porcentaje = (metrica.valor / metrica.maximo) * 100;
            
            return (
              <div
                key={metrica.nombre}
                className="p-3 bg-gray-50 rounded-lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-4 w-4 text-gray-600" />
                  <span className="text-xs text-gray-500">{metrica.nombre}</span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">
                      {metrica.valor} {metrica.unidad}
                    </span>
                    <span className="text-gray-500">
                      {Math.round(porcentaje)}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(porcentaje, metrica.estado)}`}
                    style={{ width: `${Math.min(porcentaje, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EstadoSistema;