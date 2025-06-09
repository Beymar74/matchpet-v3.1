'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Shield,
  Settings,
  PawPrint,
  Camera,
  Star
} from 'lucide-react';

import { mascotasSimuladas } from '@/data/mascotasSimuladas'; 
import { useRouter } from "next/navigation";

export default function GestionMascotas() {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [mascotasRecientes, setMascotasRecientes] = useState(mascotasSimuladas);

  useEffect(() => {
    let filtradas = [...mascotasSimuladas];

    if (filtroActivo !== 'todos') {
      filtradas = filtradas.filter((m) => m.estado === filtroActivo);
    }

    if (busqueda.trim()) {
      filtradas = filtradas.filter((m) =>
        m.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setMascotasRecientes(filtradas);
  }, [busqueda, filtroActivo]);

  const filtros = [
    { id: 'todos', label: 'Todos', count: mascotasSimuladas.length },
    { id: 'Disponible', label: 'Disponibles', count: mascotasSimuladas.filter(m => m.estado === 'Disponible').length },
    { id: 'Adoptado', label: 'Adoptados', count: mascotasSimuladas.filter(m => m.estado === 'Adoptado').length },
    { id: 'En tratamiento', label: 'En tratamiento', count: mascotasSimuladas.filter(m => m.estado === 'En tratamiento').length },
    { id: 'En Proceso', label: 'En Proceso', count: mascotasSimuladas.filter(m => m.estado === 'En Proceso').length },
    { id: 'Pendiente', label: 'Pendientes', count: mascotasSimuladas.filter(m => m.estado === 'Pendiente').length }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En Proceso': return 'bg-yellow-100 text-yellow-800';
      case 'Adoptado': return 'bg-blue-100 text-blue-800';
      case 'Pendiente': return 'bg-red-100 text-red-800';
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

const estadisticasMascotas = [
  {
    titulo: 'Total Mascotas',
    valor: mascotasSimuladas.length,
    cambio: '+23 esta semana',
    color: 'red',
    icon: Heart,
  },
  {
    titulo: 'Disponibles',
    valor: mascotasSimuladas.filter(m => m.estado === 'Disponible').length,
    cambio: '+10',
    color: 'green',
    icon: CheckCircle,
  },
  {
    titulo: 'Adoptadas',
    valor: mascotasSimuladas.filter(m => m.estado === 'Adoptado').length,
    cambio: '+5',
    color: 'blue',
    icon: PawPrint,
  },
  {
    titulo: 'Pendientes',
    valor: mascotasSimuladas.filter(m => m.estado === 'Pendiente').length,
    cambio: '+2',
    color: 'yellow',
    icon: Clock,
  },
];

 const router = useRouter();
  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
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
          <div className="flex items-center space-x-2">
            <button
              onClick={() => router.push('/PantallaGestionMascotas/Registrar')}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        </div>
      </div>

      {/* Lista de Mascotas */}
<div className="bg-white rounded-xl shadow-md p-6">
  {/* Header */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
    <div className="flex items-center space-x-2">
      <h2 className="text-lg font-semibold text-gray-900">Lista de Mascotas</h2>
      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
        {mascotasRecientes.length} resultados
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

  {/* Filtros */}
  <div className="flex flex-wrap gap-2 mb-6">
    {filtros.map((filtro) => (
      <button
        key={filtro.id}
        onClick={() => setFiltroActivo(filtro.id)}
        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
          filtroActivo === filtro.id
            ? "bg-red-100 text-red-700 border border-red-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <span>{filtro.label}</span>
        <span className="bg-white px-1 rounded text-xs">{filtro.count}</span>
      </button>
    ))}
  </div>

    {/* Tabla de Mascotas */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Edad</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Refugio</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Especie</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Raza</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mascotasRecientes.map((mascota) => (
            <tr key={mascota.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-800">{mascota.nombre}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{mascota.edad}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{mascota.refugioid}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{mascota.tipo}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{mascota.raza}</td>
              <td className="px-4 py-2 text-sm">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${getEstadoColor(mascota.estado)}`}>
                  {mascota.estado}
                </span>
              </td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Edit className="h-4 w-4" />
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

