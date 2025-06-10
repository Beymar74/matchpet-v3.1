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
          </div>
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