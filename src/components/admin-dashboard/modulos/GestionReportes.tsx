// src/components/admin-dashboard/modulos/GestionReportes.tsx
import React, { useState } from 'react';
import { 
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Settings,
  Shield,
  Calendar,
  FileText,
  TrendingUp,
  PieChart,
  Clock,
  Share2,
  Mail,
  Printer
} from 'lucide-react';
import Link from 'next/link';

const GestionReportes = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const estadisticasReportes = [
    {
      titulo: 'Reportes Generados',
      valor: 234,
      cambio: '+18 este mes',
      color: 'blue',
      icon: BarChart3
    },
    {
      titulo: 'Programados',
      valor: 12,
      cambio: 'Automáticos activos',
      color: 'green',
      icon: Clock
    },
    {
      titulo: 'Compartidos',
      valor: 67,
      cambio: 'Último mes',
      color: 'purple',
      icon: Share2
    },
    {
      titulo: 'KPIs Monitoreados',
      valor: 24,
      cambio: 'Métricas clave',
      color: 'orange',
      icon: TrendingUp
    }
  ];

  const accionesRapidas = [
    {
      titulo: 'Reporte Rápido',
      descripcion: 'Generar instantáneo',
      icon: BarChart3,
      color: 'blue'
    },
    {
      titulo: 'Programar Reporte',
      descripcion: 'Automatizar envío',
      icon: Calendar,
      color: 'green'
    },
    {
      titulo: 'Dashboard KPIs',
      descripcion: 'Métricas en vivo',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      titulo: 'Exportar Datos',
      descripcion: 'CSV, PDF, Excel',
      icon: Download,
      color: 'orange'
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todos', count: 234 },
    { id: 'adopciones', label: 'Adopciones', count: 89 },
    { id: 'usuarios', label: 'Usuarios', count: 67 },
    { id: 'mascotas', label: 'Mascotas', count: 45 },
    { id: 'financieros', label: 'Financieros', count: 33 }
  ];

  const reportesRecientes = [
    {
      id: 1,
      nombre: 'Reporte Mensual de Adopciones',
      tipo: 'Adopciones',
      formato: 'PDF',
      estado: 'Completado',
      fechaCreacion: '2024-06-01',
      creadoPor: 'Admin',
      tamaño: '2.3 MB',
      descargas: 15
    },
    {
      id: 2,
      nombre: 'Análisis de Usuarios Q2',
      tipo: 'Usuarios',
      formato: 'Excel',
      estado: 'Procesando',
      fechaCreacion: '2024-06-02',
      creadoPor: 'María García',
      tamaño: '5.1 MB',
      descargas: 8
    },
    {
      id: 3,
      nombre: 'Métricas de Compatibilidad',
      tipo: 'Algoritmo',
      formato: 'PDF',
      estado: 'Completado',
      fechaCreacion: '2024-06-03',
      creadoPor: 'Carlos López',
      tamaño: '1.8 MB',
      descargas: 23
    },
    {
      id: 4,
      nombre: 'Dashboard Financiero',
      tipo: 'Financiero',
      formato: 'Dashboard',
      estado: 'Programado',
      fechaCreacion: '2024-06-04',
      creadoPor: 'Sistema',
      tamaño: '-',
      descargas: 0
    },
    {
      id: 5,
      nombre: 'Estado de Refugios',
      tipo: 'Refugios',
      formato: 'CSV',
      estado: 'Completado',
      fechaCreacion: '2024-06-05',
      creadoPor: 'Ana Martínez',
      tamaño: '847 KB',
      descargas: 12
    }
  ];

  const templatesPredefinidos = [
    {
      id: 1,
      nombre: 'Adopciones Mensual',
      descripcion: 'Estadísticas completas de adopciones del mes',
      categoria: 'Adopciones',
      frecuencia: 'Mensual',
      campos: 12,
      activo: true
    },
    {
      id: 2,
      nombre: 'Performance Refugios',
      descripcion: 'Métricas de rendimiento por refugio',
      categoria: 'Refugios',
      frecuencia: 'Semanal',
      campos: 8,
      activo: true
    },
    {
      id: 3,
      nombre: 'Engagement Usuarios',
      descripcion: 'Actividad y participación de usuarios',
      categoria: 'Usuarios',
      frecuencia: 'Diario',
      campos: 15,
      activo: false
    },
    {
      id: 4,
      nombre: 'Análisis Financiero',
      descripcion: 'Ingresos, gastos y presupuestos',
      categoria: 'Financiero',
      frecuencia: 'Trimestral',
      campos: 10,
      activo: true
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Procesando': return 'bg-blue-100 text-blue-800';
      case 'Programado': return 'bg-purple-100 text-purple-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Pausado': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatoIcon = (formato: string) => {
    switch (formato) {
      case 'PDF': return <FileText className="h-4 w-4 text-red-500" />;
      case 'Excel': return <FileText className="h-4 w-4 text-green-500" />;
      case 'CSV': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Dashboard': return <BarChart3 className="h-4 w-4 text-purple-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
const botonesModulo7 = [
  { nombre: 'Inicio', ruta: '/admin' },
  { nombre: 'Comparativa', ruta: '/ComparativaAdopciones' },
  { nombre: 'Evolución', ruta: '/EvolucionHistorica' },
  { nombre: 'Región', ruta: '/ActividadRegion' },
  { nombre: 'Favoritos', ruta: '/FavoritosFrecuentes' },
  { nombre: 'Logs', ruta: '/LogsAuditorias' },
];


  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
          {botonesModulo7.map((btn, i) => (
            <Link
              key={i}
              href={btn.ruta}
              className={`px-3 py-1 text-sm rounded-full transition font-medium ${
                btn.nombre === 'Inicio'
                  ? 'bg-[#30588C] text-white'
                  : 'bg-[#BF3952] text-white hover:bg-[#a82f46]'
              }`}
            >
              {btn.nombre}
            </Link>
          ))}
        </div>
            <div className="p-3 bg-blue-100 rounded-2xl">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Reportes</h1>
              <p className="text-gray-600 mt-1">Estadísticas detalladas y exportación de datos</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin, analyst</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Nuevo Reporte</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasReportes.map((stat, index) => {
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
                  <p className="text-xl font-bold text-gray-900">{stat.valor.toLocaleString()}</p>
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
                className={`flex flex-col items-center p-4 bg-${accion.color}-50 rounded-lg hover:bg-${accion.color}-100 transition-colors group`}
              >
                <Icon className={`h-8 w-8 text-${accion.color}-600 mb-2 group-hover:scale-110 transition-transform`} />
                <span className={`text-sm font-medium text-${accion.color}-900`}>{accion.titulo}</span>
                <span className={`text-xs text-${accion.color}-600 mt-1`}>{accion.descripcion}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* KPIs Dashboard */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">KPIs en Tiempo Real</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">+12.5%</span>
            </div>
            <h3 className="text-sm font-medium text-blue-900">Adopciones/Mes</h3>
            <p className="text-2xl font-bold text-blue-700">127</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <PieChart className="h-5 w-5 text-green-600" />
              <span className="text-xs text-green-600 font-medium">+8.2%</span>
            </div>
            <h3 className="text-sm font-medium text-green-900">Tasa de Éxito</h3>
            <p className="text-2xl font-bold text-green-700">92.5%</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">+5.7%</span>
            </div>
            <h3 className="text-sm font-medium text-purple-900">Usuarios Activos</h3>
            <p className="text-2xl font-bold text-purple-700">1,247</p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-xs text-orange-600 font-medium">-2.1s</span>
            </div>
            <h3 className="text-sm font-medium text-orange-900">Tiempo Promedio</h3>
            <p className="text-2xl font-bold text-orange-700">4.2 días</p>
          </div>
        </div>
      </div>

      {/* Templates Predefinidos */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Templates Predefinidos</h2>
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Nuevo Template</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templatesPredefinidos.map((template, index) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{template.nombre}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.descripcion}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${template.activo ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{template.categoria}</span>
                <span>{template.frecuencia}</span>
                <span>{template.campos} campos</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs ${template.activo ? 'text-green-600' : 'text-gray-500'}`}>
                  {template.activo ? 'Activo' : 'Inactivo'}
                </span>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-orange-600 rounded">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Reportes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Reportes Recientes</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {reportesRecientes.length} resultados
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar reportes..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
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

        {/* Tabla de Reportes */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reporte</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Creado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tamaño</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportesRecientes.map((reporte, index) => (
                <tr
                  key={reporte.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {getFormatoIcon(reporte.formato)}
                      <div>
                        <p className="font-medium text-gray-900">{reporte.nombre}</p>
                        <p className="text-sm text-gray-500">Por {reporte.creadoPor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {reporte.tipo}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(reporte.estado)}`}>
                      {reporte.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(reporte.fechaCreacion).toLocaleDateString('es-ES')}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{reporte.tamaño}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded">
                        <Share2 className="h-4 w-4" />
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
            Configuración de Reportes
          </h2>
          <p className="text-gray-600 mb-6">
            Personaliza templates, programación automática y formatos de exportación.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Settings className="h-5 w-5" />
              <span>Configurar Templates</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="h-5 w-5" />
              <span>Programación Automática</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionReportes;