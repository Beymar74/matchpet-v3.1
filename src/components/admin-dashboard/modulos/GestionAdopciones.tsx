'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserCheck,
  CheckCircle,
  MessageSquare,
  FileText,
  Shield,
  MapPin,
  Phone,
  AlertCircle,
  Clock,
  XCircle,
  Plus,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  Edit
} from 'lucide-react';

const GestionAdopciones = () => {
  const router = useRouter();
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // Estadísticas de adopciones
  const estadisticasAdopciones = [
    {
      titulo: 'Total Adopciones',
      valor: 127,
      cambio: '+23 este mes',
      color: 'green',
      icon: UserCheck
    },
    {
      titulo: 'Completadas',
      valor: 89,
      cambio: 'Subió un 15% este mes',
      color: 'purple',
      icon: CheckCircle
    },
    {
      titulo: 'En Proceso',
      valor: 34,
      cambio: 'Solicitudes activas',
      color: 'blue',
      icon: Clock
    },
    {
      titulo: 'Pendientes',
      valor: 8,
      cambio: 'Requieren atención',
      color: 'yellow',
      icon: AlertCircle
    }
  ];

  // Acciones Rápidas
  const accionesRapidas = [
    {
      titulo: 'Evaluar Solicitudes',
      descripcion: 'Revisar solicitudes nuevas',
      icon: CheckCircle,
      color: 'green',
      badge: '8',
      ruta: '/EvaluacionSolicitudes'
    },
    {
      titulo: 'Programar Visitas',
      descripcion: 'Coordinar encuentros',
      icon: Calendar,
      color: 'blue',
      badge: '12',
      ruta: '/GestionAdopciones/programar-visitas'
    },
    {
      titulo: 'Seguimiento Post-Adopción',
      descripcion: 'Supervisar mascotas adoptadas',
      icon: MessageSquare,
      color: 'purple',
      badge: '5',
      ruta: '/SeguimientoPostAdopcion'
    },
    {
      titulo: 'Documentos',
      descripcion: 'Generar contratos',
      icon: FileText,
      color: 'orange',
      ruta: '/DocumentosAdopcion'
    }
  ];

  // Filtros
  const filtros = [
    { id: 'todos', label: 'Todas', count: 127 },
    { id: 'pendientes', label: 'Pendientes', count: 8 },
    { id: 'proceso', label: 'En Proceso', count: 34 },
    { id: 'completadas', label: 'Completadas', count: 89 },
    { id: 'seguimiento', label: 'Seguimiento', count: 15 }
  ];

  // Lista de adopciones recientes
  const adopcionesRecientes = [
    {
      id: 1,
      adoptante: 'María García',
      mascota: 'Max',
      fecha: '2024-06-05',
      telefono: '+591 7123 4567',
      refugio: 'Refugio Central',
      estado: 'Completada',
      ubicacion: 'Santa Cruz'
    },
    {
      id: 2,
      adoptante: 'Carlos López',
      mascota: 'Luna',
      fecha: '2024-06-06',
      telefono: '+591 7234 5678',
      refugio: 'Hogar Canino',
      estado: 'En Proceso',
      ubicacion: 'La Paz'
    },
    {
      id: 3,
      adoptante: 'Ana Rodríguez',
      mascota: 'Bella',
      fecha: '2024-06-07',
      telefono: '+591 7345 6789',
      refugio: 'Refugio Norte',
      estado: 'Pendiente',
      ubicacion: 'Cochabamba'
    }
  ];

  // Funciones para determinar colores y iconos
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

  // Función de manejo de redirección para las acciones rápidas
  const handleQuickActionClick = (ruta: string) => {
    router.push(ruta);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-2xl">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Adopciones</h1>
              <p className="text-gray-600 mt-1">Monitorear solicitudes y post-adopciones</p>
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
            <button
              onClick={() => handleQuickActionClick('/GestionAdopciones/nueva-adopcion')}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo Proceso de Adopción</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas visuales mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {estadisticasAdopciones.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.titulo}
              className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.titulo}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.valor}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.cambio}</p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Frase destacada */}
      <div className="p-4 rounded-lg bg-slate-50 border-l-4 border-green-400 text-green-800">
        🐾 Recuerda revisar las solicitudes diariamente para mantener la fluidez del proceso de adopción.
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {accionesRapidas.map((accion) => {
            const Icon = accion.icon;
            return (
              <button
                key={accion.titulo}
                onClick={() => handleQuickActionClick(accion.ruta)}
                className={`flex flex-col items-center p-4 bg-${accion.color}-50 rounded-lg hover:bg-${accion.color}-100 transition-colors group relative`}
              >
                {accion.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {accion.badge}
                  </div>
                )}
                <Icon className={`h-8 w-8 text-${accion.color}-600 mb-2 group-hover:scale-110 transition-transform`} />
                <span className={`text-sm font-medium text-${accion.color}-900`}>{accion.titulo}</span>
                <span className={`text-xs text-${accion.color}-600 mt-1 text-center`}>{accion.descripcion}</span>
              </button>
            );
          })}
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
              <span className="text-xs bg-white px-1 rounded-full">{filtro.count}</span>
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
    </div>
  );
};

export default GestionAdopciones;