"use client";

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Heart, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye, 
  FileText, 
  Phone,
  MapPin,
  Filter,
  Download
} from 'lucide-react';

import HeaderUsuario from '@/components/layout/HeaderUsuario';

const EstadoAdopcion = () => {
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [vistaDetalle, setVistaDetalle] = useState(null);

  // Datos simulados de solicitudes de adopción
  const solicitudes = [
    {
      id: 1,
      mascota: {
        nombre: "Luna",
        tipo: "Gato",
        edad: "2 años",
        imagen: "/api/placeholder/150/150",
        refugio: "Refugio Esperanza"
      },
      estado: "aprobada",
      fechaSolicitud: "2024-05-15",
      fechaRespuesta: "2024-05-18",
      siguientePaso: "Visita programada para el 25 de mayo",
      contactoRefugio: "+591 7123-4567",
      ubicacionRefugio: "Santa Cruz, Barrio Las Palmas",
      comentarios: "Solicitud aprobada. Luna se adapta perfectamente a tu perfil familiar.",
      documentosRequeridos: ["Cédula de identidad", "Comprobante de ingresos", "Fotos del hogar"]
    },
    {
      id: 2,
      mascota: {
        nombre: "Max",
        tipo: "Perro",
        edad: "3 años",
        imagen: "/api/placeholder/150/150",
        refugio: "Fundación Animal Care"
      },
      estado: "pendiente",
      fechaSolicitud: "2024-06-01",
      fechaRespuesta: null,
      siguientePaso: "Esperando evaluación del refugio",
      contactoRefugio: "+591 7654-3210",
      ubicacionRefugio: "Santa Cruz, Zona Norte",
      comentarios: "Tu solicitud está siendo revisada. Te contactaremos pronto.",
      documentosRequeridos: ["Cédula de identidad", "Comprobante de domicilio"]
    },
    {
      id: 3,
      mascota: {
        nombre: "Bella",
        tipo: "Perro",
        edad: "1 año",
        imagen: "/api/placeholder/150/150",
        refugio: "Hogar Canino Santa Cruz"
      },
      estado: "rechazada",
      fechaSolicitud: "2024-04-20",
      fechaRespuesta: "2024-04-23",
      siguientePaso: "Puedes aplicar nuevamente en 6 meses",
      contactoRefugio: "+591 7987-6543",
      ubicacionRefugio: "Santa Cruz, Plan 3000",
      comentarios: "Necesitas más experiencia con cachorros. Te recomendamos adoptar un perro adulto primero.",
      documentosRequeridos: []
    },
    {
      id: 4,
      mascota: {
        nombre: "Simba",
        tipo: "Gato",
        edad: "4 años",
        imagen: "/api/placeholder/150/150",
        refugio: "Refugio Esperanza"
      },
      estado: "adoptada",
      fechaSolicitud: "2024-03-10",
      fechaRespuesta: "2024-03-15",
      fechaAdopcion: "2024-03-25",
      siguientePaso: "Seguimiento post-adopción programado",
      contactoRefugio: "+591 7123-4567",
      ubicacionRefugio: "Santa Cruz, Barrio Las Palmas",
      comentarios: "¡Adopción exitosa! Simba está feliz en su nuevo hogar.",
      documentosRequeridos: []
    }
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'aprobada': return 'bg-green-100 text-green-800 border-green-200';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rechazada': return 'bg-red-100 text-red-800 border-red-200';
      case 'adoptada': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'aprobada': return <CheckCircle className="w-5 h-5" />;
      case 'pendiente': return <Clock className="w-5 h-5" />;
      case 'rechazada': return <XCircle className="w-5 h-5" />;
      case 'adoptada': return <Heart className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const solicitudesFiltradas = filtroEstado === 'todos' 
    ? solicitudes 
    : solicitudes.filter(s => s.estado === filtroEstado);

  const estadisticas = {
    total: solicitudes.length,
    aprobadas: solicitudes.filter(s => s.estado === 'aprobada').length,
    pendientes: solicitudes.filter(s => s.estado === 'pendiente').length,
    adoptadas: solicitudes.filter(s => s.estado === 'adoptada').length,
    rechazadas: solicitudes.filter(s => s.estado === 'rechazada').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderUsuario />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título y estadísticas */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#011526] mb-2">Estado de Adopciones</h1>
          <p className="text-[#254559] text-lg">Seguimiento de todas tus solicitudes de adopción</p>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-[#30588C]">{estadisticas.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-green-600">{estadisticas.aprobadas}</div>
              <div className="text-sm text-gray-600">Aprobadas</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-yellow-600">{estadisticas.pendientes}</div>
              <div className="text-sm text-gray-600">Pendientes</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{estadisticas.adoptadas}</div>
              <div className="text-sm text-gray-600">Adoptadas</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-red-600">{estadisticas.rechazadas}</div>
              <div className="text-sm text-gray-600">Rechazadas</div>
            </div>
          </div>
        </div>

        {/* Filtros y acciones */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-[#254559]" />
            <select 
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#6093BF] focus:border-transparent"
            >
              <option value="todos">Todas las solicitudes</option>
              <option value="pendiente">Pendientes</option>
              <option value="aprobada">Aprobadas</option>
              <option value="adoptada">Adoptadas</option>
              <option value="rechazada">Rechazadas</option>
            </select>
          </div>
          
          <button className="flex items-center space-x-2 bg-[#30588C] text-white px-4 py-2 rounded-lg hover:bg-[#254559] transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar reporte</span>
          </button>
        </div>

        {/* Lista de solicitudes */}
        <div className="space-y-6">
          {solicitudesFiltradas.map((solicitud) => (
            <div key={solicitud.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Información de la mascota */}
                  <div className="flex items-center space-x-4">
                    <img 
                      src={solicitud.mascota.imagen} 
                      alt={solicitud.mascota.nombre}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#6093BF]"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-[#011526]">{solicitud.mascota.nombre}</h3>
                      <p className="text-[#254559]">{solicitud.mascota.tipo} • {solicitud.mascota.edad}</p>
                      <p className="text-sm text-gray-600">{solicitud.mascota.refugio}</p>
                    </div>
                  </div>

                  {/* Estado y fechas */}
                  <div className="flex flex-col items-start lg:items-end space-y-2">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(solicitud.estado)}`}>
                      {getEstadoIcon(solicitud.estado)}
                      <span className="capitalize">{solicitud.estado}</span>
                    </span>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Solicitud: {new Date(solicitud.fechaSolicitud).toLocaleDateString('es-ES')}</span>
                      </div>
                      {solicitud.fechaRespuesta && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>Respuesta: {new Date(solicitud.fechaRespuesta).toLocaleDateString('es-ES')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Siguiente paso */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#254559] mb-2">Siguiente paso:</h4>
                  <p className="text-gray-700">{solicitud.siguientePaso}</p>
                </div>

                {/* Acciones */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button 
                    onClick={() => setVistaDetalle(solicitud)}
                    className="flex items-center space-x-2 bg-[#6093BF] text-white px-4 py-2 rounded-lg hover:bg-[#30588C] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver detalles</span>
                  </button>
                  
                  {solicitud.estado === 'aprobada' && (
                    <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>Contactar refugio</span>
                    </button>
                  )}
                  
                  {solicitud.estado === 'adoptada' && (
                    <button className="flex items-center space-x-2 bg-[#BF3952] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      <FileText className="w-4 h-4" />
                      <span>Seguimiento</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay solicitudes */}
        {solicitudesFiltradas.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay solicitudes {filtroEstado !== 'todos' ? `${filtroEstado}s` : ''}
            </h3>
            <p className="text-gray-500">
              {filtroEstado === 'todos' 
                ? '¡Comienza tu proceso de adopción explorando nuestras mascotas disponibles!'
                : `No tienes solicitudes ${filtroEstado}s en este momento.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {vistaDetalle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#011526]">
                  Detalles de adopción - {vistaDetalle.mascota.nombre}
                </h2>
                <button 
                  onClick={() => setVistaDetalle(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Información de la mascota */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={vistaDetalle.mascota.imagen} 
                    alt={vistaDetalle.mascota.nombre}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{vistaDetalle.mascota.nombre}</h3>
                    <p className="text-gray-600">{vistaDetalle.mascota.tipo} • {vistaDetalle.mascota.edad}</p>
                    <p className="text-sm text-gray-500">{vistaDetalle.mascota.refugio}</p>
                  </div>
                </div>

                {/* Estado actual */}
                <div>
                  <h4 className="font-semibold text-[#254559] mb-2">Estado actual:</h4>
                  <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(vistaDetalle.estado)}`}>
                    {getEstadoIcon(vistaDetalle.estado)}
                    <span className="capitalize">{vistaDetalle.estado}</span>
                  </span>
                </div>

                {/* Comentarios */}
                <div>
                  <h4 className="font-semibold text-[#254559] mb-2">Comentarios del refugio:</h4>
                  <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">{vistaDetalle.comentarios}</p>
                </div>

                {/* Información de contacto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#254559] mb-2">Contacto:</h4>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone className="w-4 h-4" />
                      <span>{vistaDetalle.contactoRefugio}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#254559] mb-2">Ubicación:</h4>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{vistaDetalle.ubicacionRefugio}</span>
                    </div>
                  </div>
                </div>

                {/* Documentos requeridos */}
                {vistaDetalle.documentosRequeridos.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[#254559] mb-2">Documentos requeridos:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {vistaDetalle.documentosRequeridos.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fechas importantes */}
                <div>
                  <h4 className="font-semibold text-[#254559] mb-2">Cronología:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fecha de solicitud:</span>
                      <span>{new Date(vistaDetalle.fechaSolicitud).toLocaleDateString('es-ES')}</span>
                    </div>
                    {vistaDetalle.fechaRespuesta && (
                      <div className="flex justify-between">
                        <span>Fecha de respuesta:</span>
                        <span>{new Date(vistaDetalle.fechaRespuesta).toLocaleDateString('es-ES')}</span>
                      </div>
                    )}
                    {vistaDetalle.fechaAdopcion && (
                      <div className="flex justify-between">
                        <span>Fecha de adopción:</span>
                        <span>{new Date(vistaDetalle.fechaAdopcion).toLocaleDateString('es-ES')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  onClick={() => setVistaDetalle(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                {vistaDetalle.estado === 'aprobada' && (
                  <button className="px-4 py-2 bg-[#30588C] text-white rounded-lg hover:bg-[#254559] transition-colors">
                    Contactar refugio
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstadoAdopcion;