// src/components/admin-dashboard/modulos/GestionAdopciones.tsx
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
  XCircle
} from 'lucide-react';

const GestionAdopciones = () => {
  const router = useRouter();
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

  const ultimasActividades = [
    {
      adoptante: 'María García',
      mascota: 'Max',
      fecha: '2024-06-05'
    },
    {
      adoptante: 'Carlos López',
      mascota: 'Luna',
      fecha: '2024-06-06'
    }
  ];

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {accionesRapidas.map((accion) => {
            const Icon = accion.icon;
            return (
              <button
                key={accion.titulo}
                onClick={() => accion.ruta && router.push(accion.ruta)}
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

      {/* Últimas Actividades */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Adopciones Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ultimasActividades.map((actividad, i) => (
            <div
              key={i}
              className="border-l-4 border-green-400 bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-gray-700">
                <strong>{actividad.adoptante}</strong> completó la adopción de <strong>{actividad.mascota}</strong> el{' '}
                <span className="text-gray-600">{new Date(actividad.fecha).toLocaleDateString()}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestionAdopciones;
