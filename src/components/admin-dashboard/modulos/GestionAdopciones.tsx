// src/components/admin-dashboard/modulos/GestionAdopciones.tsx
import React, { useState } from 'react';
import { 
  UserCheck,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Shield,
  Settings,
  MessageSquare,
  FileText,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';

const GestionAdopciones = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const estadisticasAdopciones = [
    {
      titulo: 'Total Adopciones',
      valor: 127,
      cambio: '+23 este mes',
      color: 'green',
      icon: UserCheck
    },
    {
      titulo: 'En Proceso',
      valor: 34,
      cambio: 'Solicitudes activas',
      color: 'blue',
      icon: Clock
    },
    {
      titulo: 'Completadas',
      valor: 89,
      cambio: '+15% vs anterior',
      color: 'purple',
      icon: CheckCircle
    },
    {
      titulo: 'Pendientes Revisión',
      valor: 8,
      cambio: 'Requieren atención',
      color: 'yellow',
      icon: AlertCircle
    }
  ];

  const accionesRapidas = [
    {
      titulo: 'Aprobar Solicitudes',
      descripcion: 'Revisar pendientes',
      icon: CheckCircle,
      color: 'green',
      badge: '8'
    },
    {
      titulo: 'Programar Visitas',
      descripcion: 'Coordinar encuentros',
      icon: Calendar,
      color: 'blue',
      badge: '12'
    },
    {
      titulo: 'Seguimiento',
      descripcion: 'Post-adopción',
      icon: MessageSquare,
      color: 'purple',
      badge: '5'
    },
    {
      titulo: 'Documentos',
      descripcion: 'Generar contratos',
      icon: FileText,
      color: 'orange'
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todas', count: 127 },
    { id: 'pendientes', label: 'Pendientes', count: 8 },
    { id: 'proceso', label: 'En Proceso', count: 34 },
    { id: 'completadas', label: 'Completadas', count: 89 },
    { id: 'seguimiento', label: 'Seguimiento', count: 15 }
  ];

  const adopcionesRecientes = [
    {
      id: 1,
      adoptante: 'María García',
      mascota: 'Max',
      refugio: 'Hogar Peludo',
      estado: 'Completada',
      fecha: '2024-06-01',
      telefono: '+591 7123-4567',
      ubicacion: 'La Paz'
    },
    {
      id: 2,
      adoptante: 'Carlos López',
      mascota: 'Luna',
      refugio: 'Patitas Felices',
      estado: 'En Proceso',
      fecha: '2024-06-02',
      telefono: '+591 7234-5678',
      ubicacion: 'Cochabamba'
    },
    {
      id: 3,
      adoptante: 'Ana Martínez',
      mascota: 'Rocky',
      refugio: 'Refugio Central',
      estado: 'Pendiente',
      fecha: '2024-06-03',
      telefono: '+591 7345-6789',
      ubicacion: 'Santa Cruz'
    },
    {
      id: 4,
      adoptante: 'Luis Rodríguez',
      mascota: 'Bella',
      refugio: 'Amor Animal',
      estado: 'Seguimiento',
      fecha: '2024-06-04',
      telefono: '+591 7456-7890',
      ubicacion: 'Oruro'
    },
    {
      id: 5,
      adoptante: 'Carmen Silva',
      mascota: 'Charlie',
      refugio: 'Casa Canina',
      estado: 'En Proceso',
      fecha: '2024-06-05',
      telefono: '+591 7567-8901',
      ubicacion: 'Potosí'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Completada': return 'bg-green-100 text-green-800';
      case 'En Proceso': return 'bg-blue-100 text-blue-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Seguimiento': return 'bg-purple-100 text-purple-800';
      case 'Rechazada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Completada': return <CheckCircle className="h-3 w-3" />;
      case 'En Proceso': return <Clock className="h-3 w-3" />;
      case 'Pendiente': return <AlertCircle className="h-3 w-3" />;
      case 'Seguimiento': return <MessageSquare className="h-3 w-3" />;
      case 'Rechazada': return <XCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-2xl">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Adopciones</h1>
              <p className="text-gray-600 mt-1">Monitorear proceso de adopción y seguimiento</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin, moderator</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Nueva Adopción</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasAdopciones.map((stat, index) => {
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

      {/* Pipeline de Adopciones */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline de Adopciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-semibold">1</span>
            </div>
            <h3 className="font-medium text-yellow-900">Solicitud</h3>
            <p className="text-2xl font-bold text-yellow-600 mt-1">8</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-semibold">2</span>
            </div>
            <h3 className="font-medium text-blue-900">Revisión</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">12</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-semibold">3</span>
            </div>
            <h3 className="font-medium text-purple-900">Visita</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">15</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-semibold">4</span>
            </div>
            <h3 className="font-medium text-orange-900">Aprobación</h3>
            <p className="text-2xl font-bold text-orange-600 mt-1">7</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-semibold">5</span>
            </div>
            <h3 className="font-medium text-green-900">Completada</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">89</p>
          </div>
        </div>
      </div>

      {/* Lista de Adopciones */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Adopciones</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {adopcionesRecientes.length} resultados
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar adopciones..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
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
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{filtro.label}</span>
              <span className="bg-white px-1 rounded text-xs">{filtro.count}</span>
            </button>
          ))}
        </div>

        {/* Tabla de Adopciones */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Adoptante</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Mascota</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Refugio</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ubicación</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {adopcionesRecientes.map((adopcion, index) => (
                <tr
                  key={adopcion.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{adopcion.adoptante}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{adopcion.telefono}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{adopcion.mascota}</p>
                    <p className="text-sm text-gray-500">{new Date(adopcion.fecha).toLocaleDateString('es-ES')}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{adopcion.refugio}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(adopcion.estado)}`}>
                      {getEstadoIcon(adopcion.estado)}
                      <span>{adopcion.estado}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{adopcion.ubicacion}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded">
                        <MessageSquare className="h-4 w-4" />
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
            Configuración del Módulo
          </h2>
          <p className="text-gray-600 mb-6">
            Personaliza el proceso de adopción y los requisitos del sistema.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Settings className="h-5 w-5" />
              <span>Proceso de Adopción</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Templates de Documentos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionAdopciones;