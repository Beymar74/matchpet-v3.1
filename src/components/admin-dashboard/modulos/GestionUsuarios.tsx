// src/components/admin-dashboard/modulos/GestionUsuarios.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users,
  UserPlus,
  Settings,
  Shield,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  User,
  UserCheck
} from 'lucide-react';

const GestionUsuarios = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const estadisticasUsuarios = [
    {
      titulo: 'Total Usuarios',
      valor: 1247,
      cambio: '+15 este mes',
      color: 'blue',
      icon: Users
    },
    {
      titulo: 'Usuarios Activos',
      valor: 892,
      cambio: '+12% vs mes anterior',
      color: 'green',
      icon: UserCheck
    },
    {
      titulo: 'Nuevos Registros',
      valor: 47,
      cambio: 'Últimos 7 días',
      color: 'purple',
      icon: UserPlus
    },
    {
      titulo: 'Pendientes Revisión',
      valor: 8,
      cambio: 'Requieren aprobación',
      color: 'yellow',
      icon: AlertTriangle
    }
  ];

  const usuariosRecientes = [
    {
      id: 1,
      nombre: 'María García',
      email: 'maria.garcia@email.com',
      rol: 'Usuario',
      estado: 'Activo',
      fechaRegistro: '2024-06-01',
      avatar: 'MG'
    },
    {
      id: 2,
      nombre: 'Carlos López',
      email: 'carlos.lopez@email.com',
      rol: 'Refugio',
      estado: 'Pendiente',
      fechaRegistro: '2024-06-02',
      avatar: 'CL'
    },
    {
      id: 3,
      nombre: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      rol: 'Usuario',
      estado: 'Activo',
      fechaRegistro: '2024-06-03',
      avatar: 'AM'
    },
    {
      id: 4,
      nombre: 'Hogar Peludo',
      email: 'contacto@hogarpeludo.org',
      rol: 'Refugio',
      estado: 'Verificado',
      fechaRegistro: '2024-06-04',
      avatar: 'HP'
    },
    {
      id: 5,
      nombre: 'Luis Rodríguez',
      email: 'luis.rodriguez@email.com',
      rol: 'Moderador',
      estado: 'Activo',
      fechaRegistro: '2024-06-05',
      avatar: 'LR'
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todos', count: 1247 },
    { id: 'usuarios', label: 'Usuarios', count: 892 },
    { id: 'refugios', label: 'Refugios', count: 34 },
    { id: 'moderadores', label: 'Moderadores', count: 12 },
    { id: 'pendientes', label: 'Pendientes', count: 8 }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Activo': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Verificado': return 'bg-blue-100 text-blue-800';
      case 'Inactivo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRolIcon = (rol: string) => {
    switch (rol) {
      case 'Usuario': return <User className="h-4 w-4" />;
      case 'Refugio': return <Shield className="h-4 w-4" />;
      case 'Moderador': return <Crown className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-2xl">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
              <p className="text-gray-600 mt-1">Administrar usuarios, roles y permisos del sistema</p>
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
            <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <UserPlus className="h-4 w-4" />
              <span>Nuevo Usuario</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasUsuarios.map((stat, index) => {
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

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Usuarios</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {usuariosRecientes.length} resultados
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            
            {/* Botones de acción */}
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              <span>Importar</span>
            </button>
          </div>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroActivo(filtro.id)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                filtroActivo === filtro.id
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{filtro.label}</span>
              <span className="bg-white px-1 rounded text-xs">{filtro.count}</span>
            </button>
          ))}
        </div>

        {/* Tabla de Usuarios */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Usuario</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rol</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha Registro</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosRecientes.map((usuario, index) => (
                <tr
                  key={usuario.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {usuario.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{usuario.nombre}</p>
                        <p className="text-sm text-gray-500">{usuario.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getRolIcon(usuario.rol)}
                      <span className="text-sm text-gray-900">{usuario.rol}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(usuario.estado)}`}>
                      {usuario.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(usuario.fechaRegistro).toLocaleDateString('es-ES')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Mostrando 1 a 5 de 1,247 usuarios
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm">
              Anterior
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm">
              3
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-sm">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Configuración del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Configuración Avanzada
          </h2>
          <p className="text-gray-600 mb-6">
            Personaliza las funcionalidades del módulo de gestión de usuarios.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/AsignacionRolesPermisos">
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Settings className="h-5 w-5" />
                <span>Roles y Permisos</span>
              </button>
            </Link>
            
            <button className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Shield className="h-5 w-5" />
              <span>Configurar Seguridad</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionUsuarios;