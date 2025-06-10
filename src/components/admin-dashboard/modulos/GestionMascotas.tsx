'use client';

import React, { useState, useEffect } from 'react';
import {
  Heart, Plus, Search, Filter, Download, Eye, Edit, CheckCircle,
  XCircle, Clock, Shield, PawPrint, Camera
} from 'lucide-react';
import { useRouter } from "next/navigation";

export default function GestionMascotas() {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [mascotasRecientes, setMascotasRecientes] = useState([]);
  const router = useRouter();

    useEffect(() => {
      const fetchMascotas = async () => {
        try {
          const res = await fetch('/api/mascotas');
          const data = await res.json();
          console.log("🐶 Datos de mascotas:", data); // <-- VERIFICA ESTO EN CONSOLE
          setMascotasRecientes(data);
        } catch (error) {
          console.error("Error al obtener mascotas:", error);
        }
      };
    
      fetchMascotas();
    }, []);

  const mascotasFiltradas = mascotasRecientes.filter((m) => {
  
    const coincideFiltro = filtroActivo === 'todos' || estado === filtroActivo;
    const coincideBusqueda = nombre.includes(busqueda.toLowerCase());
  
    return coincideFiltro && coincideBusqueda;
  });

  const filtros = [
    { id: 'todos', label: 'Todos' },
    { id: 'Disponible', label: 'Disponibles' },
    { id: 'Adoptado', label: 'Adoptados' },
    { id: 'En tratamiento', label: 'En tratamiento' },
    { id: 'En Proceso', label: 'En Proceso' },
    { id: 'Pendiente', label: 'Pendientes' }
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

  const irAFichaMedica = () => router.push('/PantallaGestionMascotas/ficha-medica');
  const irAMultimedia = () => router.push('/PantallaGestionMascotas/multimedia');

  return (
    <div className="space-y-6">
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
          <button
            onClick={() => router.push('/PantallaGestionMascotas/Registrar')}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva Mascota</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={irAMultimedia}
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
          >
            <Camera className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-blue-900">Actualizar Fotos</span>
            <span className="text-xs text-blue-600 mt-1">0 sin foto</span>
          </button>
          <button
            onClick={irAFichaMedica}
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
          >
            <PawPrint className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-green-900">Estado de Salud</span>
            <span className="text-xs text-green-600 mt-1">0 revisiones</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Mascotas</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {mascotasFiltradas.length} resultados
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
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Foto</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Edad</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Especie</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Raza</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Refugio</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {mascotasFiltradas.length === 0 ? (
        <tr>
          <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
            No hay mascotas registradas
          </td>
        </tr>
      ) : (
        mascotasFiltradas.map((mascota: any) => (
          <tr key={mascota.id} className="hover:bg-gray-50">
            <td className="px-4 py-2">
              {mascota.foto ? (
                <img
                  src={mascota.foto}
                  alt={mascota.nombre}
                  className="w-12 h-12 rounded-full object-cover border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  Sin foto
                </div>
              )}
            </td>
            <td className="px-4 py-2 text-sm text-gray-800">{mascota.nombre}</td>
            <td className="px-4 py-2 text-sm text-gray-600">{mascota.edad}</td>
            <td className="px-4 py-2 text-sm text-gray-600">{mascota.especie}</td>
            <td className="px-4 py-2 text-sm text-gray-600">{mascota.raza}</td>
            <td className="px-4 py-2 text-sm">
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${getEstadoColor(mascota.estado)}`}>
                {mascota.estado}
              </span>
            </td>
            <td className="px-4 py-2 text-sm text-gray-600">{mascota.refugio}</td>
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
        ))
      )}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
}
