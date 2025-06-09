// src/components/admin-dashboard/modulos/GestionComunicacion.tsx
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { 
  MessageCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Settings,
  Shield,
  Users,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Flag,
  Archive,
  Reply,
  Forward
} from 'lucide-react';

const GestionComunicacion = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const estadisticasComunicacion = [
    {
      titulo: 'Mensajes Totales',
      valor: 3247,
      cambio: '+145 hoy',
      color: 'blue',
      icon: MessageCircle
    },
    {
      titulo: 'Tiempo Respuesta',
      valor: 2.3,
      cambio: '-0.5h mejora',
      color: 'green',
      icon: Clock,
      unidad: 'h'
    },
    {
      titulo: 'Tickets Abiertos',
      valor: 23,
      cambio: '5 prioritarios',
      color: 'yellow',
      icon: AlertTriangle
    },
    {
      titulo: 'Satisfacción',
      valor: 4.7,
      cambio: '+0.2 vs mes anterior',
      color: 'purple',
      icon: Star,
      unidad: '/5'
    }
  ];

  const accionesRapidas = [
    {
      titulo: 'Respuesta Rápida',
      descripcion: 'Contestar mensaje',
      icon: Reply,
      color: 'blue',
      badge: '23'
    },
    {
      titulo: 'Moderar Chat',
      descripcion: 'Revisar contenido',
      icon: Flag,
      color: 'red',
      badge: '7'
    },
    {
      titulo: 'Broadcast',
      descripcion: 'Mensaje masivo',
      icon: Send,
      color: 'green'
    },
    {
      titulo: 'Análisis',
      descripcion: 'Métricas detalladas',
      icon: MessageCircle,
      color: 'purple'
    }
  ];

  const filtros = [
    { id: 'todos', label: 'Todos', count: 3247 },
    { id: 'pendientes', label: 'Pendientes', count: 23 },
    { id: 'resueltos', label: 'Resueltos', count: 3156 },
    { id: 'escalados', label: 'Escalados', count: 12 },
    { id: 'spam', label: 'Spam/Moderación', count: 56 }
  ];

  const conversacionesRecientes = [
    {
      id: 1,
      usuario: 'María García',
      tipo: 'Consulta',
      asunto: 'Proceso de adopción de Max',
      estado: 'Abierto',
      prioridad: 'Alta',
      ultimoMensaje: 'Hace 15 min',
      agente: 'Carlos Admin',
      mensajes: 8,
      rating: null
    },
    {
      id: 2,
      usuario: 'Luis Rodríguez',
      tipo: 'Soporte',
      asunto: 'Error en la aplicación móvil',
      estado: 'En Progreso',
      prioridad: 'Media',
      ultimoMensaje: 'Hace 1 hora',
      agente: 'Ana Support',
      mensajes: 12,
      rating: null
    },
    {
      id: 3,
      usuario: 'Carmen Silva',
      tipo: 'Queja',
      asunto: 'Problema con refugio verificado',
      estado: 'Escalado',
      prioridad: 'Alta',
      ultimoMensaje: 'Hace 2 horas',
      agente: 'Manager',
      mensajes: 15,
      rating: null
    },
    {
      id: 4,
      usuario: 'Pedro Morales',
      tipo: 'Consulta',
      asunto: 'Compatibilidad con gatos',
      estado: 'Resuelto',
      prioridad: 'Baja',
      ultimoMensaje: 'Hace 4 horas',
      agente: 'Sofia Help',
      mensajes: 5,
      rating: 5
    },
    {
      id: 5,
      usuario: 'Ana Martínez',
      tipo: 'Feedback',
      asunto: 'Excelente experiencia de adopción',
      estado: 'Cerrado',
      prioridad: 'Baja',
      ultimoMensaje: 'Hace 6 horas',
      agente: 'Auto',
      mensajes: 3,
      rating: 5
    }
  ];

  const equipoSoporte = [
    {
      id: 1,
      nombre: 'Carlos Admin',
      rol: 'Lead Support',
      estado: 'Online',
      conversaciones: 8,
      rating: 4.9,
      tiempo_respuesta: '1.2h'
    },
    {
      id: 2,
      nombre: 'Ana Support',
      rol: 'Support Agent',
      estado: 'Online',
      conversaciones: 12,
      rating: 4.7,
      tiempo_respuesta: '2.1h'
    },
    {
      id: 3,
      nombre: 'Sofia Help',
      rol: 'Support Agent',
      estado: 'Ocupado',
      conversaciones: 6,
      rating: 4.8,
      tiempo_respuesta: '1.8h'
    },
    {
      id: 4,
      nombre: 'Manager',
      rol: 'Supervisor',
      estado: 'Offline',
      conversaciones: 2,
      rating: 5.0,
      tiempo_respuesta: '0.5h'
    }
  ];

  const templatesMensajes = [
    {
      id: 1,
      nombre: 'Bienvenida',
      categoria: 'Onboarding',
      usos: 234,
      contenido: 'Hola {nombre}, bienvenid@ a MatchPet...'
    },
    {
      id: 2,
      nombre: 'Info Adopción',
      categoria: 'Adopciones',
      usos: 167,
      contenido: 'Para iniciar el proceso de adopción...'
    },
    {
      id: 3,
      nombre: 'Problema Técnico',
      categoria: 'Soporte',
      usos: 89,
      contenido: 'Lamentamos los inconvenientes técnicos...'
    },
    {
      id: 4,
      nombre: 'Seguimiento',
      categoria: 'Post-adopción',
      usos: 156,
      contenido: '¿Cómo va todo con tu nueva mascota?...'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Abierto': return 'bg-red-100 text-red-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Escalado': return 'bg-purple-100 text-purple-800';
      case 'Resuelto': return 'bg-green-100 text-green-800';
      case 'Cerrado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoAgente = (estado: string) => {
    switch (estado) {
      case 'Online': return 'bg-green-500';
      case 'Ocupado': return 'bg-yellow-500';
      case 'Offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };
  const router = useRouter();

  const manejarClickNuevoTicket = () => {
    router.push("/pantallaComunicacion/Chat/admin/conversacion/nueva");
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Comunicación</h1>
              <p className="text-gray-600 mt-1">Centro de mensajes, chat y soporte al usuario</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin, support</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={manejarClickNuevoTicket}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasComunicacion.map((stat, index) => {
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

      {/* Equipo de Soporte */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Equipo de Soporte en Línea</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipoSoporte.map((agente, index) => (
            <div
              key={agente.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {agente.nombre.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getEstadoAgente(agente.estado)} rounded-full border-2 border-white`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{agente.nombre}</h3>
                  <p className="text-sm text-gray-600">{agente.rol}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversaciones:</span>
                  <span className="font-medium">{agente.conversaciones}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="font-medium">{agente.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Respuesta:</span>
                  <span className="font-medium">{agente.tiempo_respuesta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Templates de Respuesta */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Templates de Respuesta</h2>
          <button className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Nuevo Template</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templatesMensajes.map((template, index) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{template.nombre}</h3>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 mt-1 inline-block">
                    {template.categoria}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{template.usos} usos</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.contenido}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600 font-medium">Activo</span>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-purple-600 rounded">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Conversaciones */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Conversaciones Recientes</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {conversacionesRecientes.length} resultados
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar conversaciones..."
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

        {/* Tabla de Conversaciones */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Usuario</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Asunto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Agente</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Último Mensaje</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {conversacionesRecientes.map((conversacion, index) => (
                <tr
                  key={conversacion.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{conversacion.usuario}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{conversacion.tipo}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getPrioridadColor(conversacion.prioridad)}`}>
                          {conversacion.prioridad}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{conversacion.asunto}</p>
                    <p className="text-sm text-gray-500">{conversacion.mensajes} mensajes</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(conversacion.estado)}`}>
                      {conversacion.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{conversacion.agente}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{conversacion.ultimoMensaje}</span>
                      {conversacion.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs">{conversacion.rating}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                        <Reply className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded">
                        <Forward className="h-4 w-4" />
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

export default GestionComunicacion;