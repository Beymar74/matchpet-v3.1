'use client';

import React, { useState, useEffect } from 'react';
import {
  Heart, Plus, Search, Filter, Download, Eye, Edit, CheckCircle,
  XCircle, Clock, Shield, PawPrint
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Mascota {
  ID_Mascota: number;
  Nombre: string;
  Edad: number;
  Raza: string;
  ID_Refugio: number;
  ID_Estado: number;
  NombreRefugio?: string;
  Nombre_Estado?: string;
  Nombre_Especie?: string;
  Nombre_Tamanio?: string;
  Nombre_Color?: string;
  Foto?: string;
}

export default function GestionMascotas() {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [mascotasFiltradas, setMascotasFiltradas] = useState<Mascota[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const res = await fetch('/api/mascotasAdmin/ver');
        const data = await res.json();

        if (Array.isArray(data)) {
          setMascotas(data);
          setMascotasFiltradas(data);
        } else {
          console.error('❌ La respuesta no es un arreglo:', data);
        }
      } catch (error) {
        console.error('❌ Error al cargar mascotas:', error);
      }
    };
    fetchMascotas();
  }, []);

  useEffect(() => {
    let filtradas = Array.isArray(mascotas) ? [...mascotas] : [];

    if (filtroActivo !== 'todos') {
      filtradas = filtradas.filter(m =>
        m.Nombre_Estado?.toLowerCase() === filtroActivo.toLowerCase()
      );
    }

    if (busqueda.trim()) {
      filtradas = filtradas.filter(m =>
        m.Nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setMascotasFiltradas(filtradas);
  }, [filtroActivo, busqueda, mascotas]);

  const getEstadoColor = (estado: string | undefined) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En Proceso': return 'bg-yellow-100 text-yellow-800';
      case 'Adoptado': return 'bg-blue-100 text-blue-800';
      case 'Pendiente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filtros = [
    'Disponible',
    'Adoptado',
    'En Proceso',
    'Pendiente'
  ];

  const filtrosConConteo = [
    { id: 'todos', label: 'Todos', count: mascotas.length },
    ...filtros.map((estado) => ({
      id: estado,
      label: estado,
      count: mascotas.filter((m) => m.Nombre_Estado === estado).length,
    })),
  ];

  const estadisticasMascotas = [
    {
      titulo: 'Total Mascotas',
      valor: mascotas.length,
      cambio: '+23 esta semana',
      color: 'red',
      icon: Heart,
    },
    {
      titulo: 'Disponibles',
      valor: mascotas.filter(m => m.Nombre_Estado === 'Disponible').length,
      cambio: '+10',
      color: 'green',
      icon: CheckCircle,
    },
    {
      titulo: 'Adoptadas',
      valor: mascotas.filter(m => m.Nombre_Estado === 'Adoptado').length,
      cambio: '+5',
      color: 'blue',
      icon: PawPrint,
    },
    {
      titulo: 'Pendientes',
      valor: mascotas.filter(m => m.Nombre_Estado === 'Pendiente').length,
      cambio: '+2',
      color: 'yellow',
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Mascotas</h1>
            <p className="text-gray-600">Supervisar registro, aprobación y estado de mascotas</p>
          </div>
          <button
            onClick={() => router.push('/PantallaGestionMascotas/Registrar')}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva Mascota</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasMascotas.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.titulo}</p>
                <p className="text-xl font-bold text-gray-900">{stat.valor}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.cambio}</p>
              </div>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros y Tabla */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar mascotas..."
            className="pl-4 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {filtrosConConteo.map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFiltroActivo(filtro.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                filtroActivo === filtro.id
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filtro.label} ({filtro.count})
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Edad</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Raza</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Refugio</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mascotasFiltradas.map((m) => (
                <tr key={m.ID_Mascota}>
                  <td className="px-4 py-2 text-sm">{m.Nombre}</td>
                  <td className="px-4 py-2 text-sm">{m.Edad}</td>
                  <td className="px-4 py-2 text-sm">{m.Raza}</td>
                  <td className="px-4 py-2 text-sm">{m.NombreRefugio ?? '-'}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getEstadoColor(m.Nombre_Estado)}`}>
                      {m.Nombre_Estado ?? 'Desconocido'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700"><Eye className="h-4 w-4" /></button>
                      <button className="text-red-500 hover:text-red-700"><Edit className="h-4 w-4" /></button>
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
}
