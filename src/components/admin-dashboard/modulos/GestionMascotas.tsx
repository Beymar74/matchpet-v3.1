// src/components/admin-dashboard/modulos/GestionMascotas.tsx

"use client"

import React, { useState } from 'react';
import { 
  Heart, Plus, Search, Filter, Download, Eye, Edit,
  CheckCircle, XCircle, Clock, MapPin, Shield,
  Settings, PawPrint, Camera, Star
} from 'lucide-react';
import { mascotasSimuladas } from '@/data/mascotasSimuladas';
import { useRouter } from "next/navigation";
import RegistrarMascota from "@/app/refugio/componentes/mascotas/modales/RegistrarMascota";


const GestionMascotas = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const router = useRouter();


  const estadisticasMascotas = [
    { titulo: 'Total Mascotas', valor: 856, cambio: '+23 esta semana', color: 'red', icon: Heart },
    { titulo: 'Disponibles', valor: 634, cambio: 'Para adopción', color: 'green', icon: CheckCircle },
    { titulo: 'En Proceso', valor: 142, cambio: 'Adoptándose', color: 'blue', icon: Clock },
    { titulo: 'Pendientes Revisión', valor: 12, cambio: 'Requieren aprobación', color: 'yellow', icon: XCircle }
  ];

  const filtros = [
    { id: 'todos', label: 'Todas', count: 856 },
    { id: 'disponibles', label: 'Disponibles', count: 634 },
    { id: 'proceso', label: 'En Proceso', count: 142 },
    { id: 'adoptadas', label: 'Adoptadas', count: 68 },
    { id: 'pendientes', label: 'Pendientes', count: 12 }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En Proceso': return 'bg-blue-100 text-blue-800';
      case 'Adoptado': return 'bg-purple-100 text-purple-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Disponible': return <CheckCircle className="h-3 w-3" />;
      case 'En Proceso': return <Clock className="h-3 w-3" />;
      case 'Adoptado': return <Heart className="h-3 w-3" />;
      case 'Pendiente': return <XCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-2xl">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Mascotas</h1>
              <p className="text-gray-600 mt-1">Supervisar registro, aprobación y estado de mascotas</p>
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
          <div>
            <button
              onClick={() => setMostrarModal(true)}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Nueva Mascota</span>
            </button>

          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasMascotas.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.titulo} className="bg-white rounded-lg shadow-md p-4">
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
          <button className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group">
            <CheckCircle className="h-8 w-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-red-900">Aprobar Mascotas</span>
            <span className="text-xs text-red-600 mt-1">12 pendientes</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
            <Camera className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-blue-900">Actualizar Fotos</span>
            <span className="text-xs text-blue-600 mt-1">23 sin foto</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
            <PawPrint className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-green-900">Estado de Salud</span>
            <span className="text-xs text-green-600 mt-1">5 revisiones</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
            <MapPin className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-purple-900">Por Ubicación</span>
            <span className="text-xs text-purple-600 mt-1">Ver mapa</span>
          </button>
        </div>
      </div>

      {/* Lista de Mascotas */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Mascotas</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {mascotasSimuladas.length} resultados
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar mascotas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
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

        {/* Filtros Rápidos */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filtros.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroActivo(filtro.id)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                filtroActivo === filtro.id
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{filtro.label}</span>
              <span className="bg-white px-1 rounded text-xs">{filtro.count}</span>
            </button>
          ))}
        </div>
        

        {/* Tarjetas de Mascotas con filtros aplicados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mascotasSimuladas
            .filter((mascota) => {
              const texto = busqueda.toLowerCase();
              const coincideTexto =
                mascota.nombre.toLowerCase().includes(texto) ||
                mascota.raza.toLowerCase().includes(texto);

              const coincideEstado =
                filtroActivo === 'todos' ||
                (filtroActivo === 'disponibles' && mascota.estado === 'Disponible') ||
                (filtroActivo === 'proceso' && mascota.estado === 'En Proceso') ||
                (filtroActivo === 'adoptadas' && mascota.estado === 'Adoptado') ||
                (filtroActivo === 'pendientes' && mascota.estado === 'Pendiente');

              return coincideTexto && coincideEstado;
            })
            .map((mascota, index) => (
              <div key={mascota.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center text-4xl">
                    {mascota.foto || '🐾'}
                  </div>
                  <div className={`absolute top-2 right-2 inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(mascota.estado)}`}>
                    {getEstadoIcon(mascota.estado)}
                    <span>{mascota.estado}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{mascota.nombre}</h3>
                      <p className="text-sm text-gray-600">{mascota.raza}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{mascota.compatibilidad ?? 5.0}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p>🎂 {mascota.edad} años</p>
                    <p>🏠 {mascota.refugio ?? 'Refugio Central'}</p>
                    <p>📅 {new Date(mascota.fechaIngreso ?? '').toLocaleDateString('es-ES')}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{mascota.especie}</span>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default GestionMascotas;
