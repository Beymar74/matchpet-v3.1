// src/components/admin-dashboard/modulos/GestionNotificaciones.tsx
'use client';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

import {
  Bell, Mail, MessageSquare, Smartphone,
  Send, Clock, Users, CheckCircle, XCircle, Pause, Play,
  Shield
} from 'lucide-react';

// Tipos
type EstadoCampana = 'Activa' | 'Programada' | 'Completada' | 'Borrador' | 'Pausada' | 'Error';
type TipoNotificacion = 'Email' | 'SMS' | 'Push';

// Función para asignar clases de color
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    red: { bg: 'bg-red-500', text: 'text-white' }
  };
  return colorMap[color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
};

const GestionNotificaciones = () => {
  const [filtroActivo, setFiltroActivo] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const router = useRouter();

  const estadisticasNotificaciones = [
    { titulo: 'Enviadas Hoy', valor: 1847, cambio: '+234 vs ayer', color: 'blue', icon: Bell },
    { titulo: 'Tasa de Apertura', valor: 73.2, cambio: '+2.1% vs mes anterior', color: 'green', icon: CheckCircle, unidad: '%' },
    { titulo: 'Campaigns Activas', valor: 8, cambio: '3 programadas', color: 'purple', icon: Send },
    { titulo: 'Suscriptores', valor: 2156, cambio: '+89 esta semana', color: 'orange', icon: Users }
  ];

  const accionesRapidas = [
    {
      titulo: 'Aviso de Nueva Mascota',
      descripcion: 'Notifica a usuarios cuando hay nuevas mascotas disponibles',
      icon: Bell,
      color: 'blue',
      badge: '+23'
    },
    {
      titulo: 'Campaña de Correo para Adopciones',
      descripcion: 'Promociona adopciones o campañas activas por email',
      icon: Mail,
      color: 'green'
    },
    {
      titulo: 'Recordatorio por SMS',
      descripcion: 'Envía mensajes sobre citas de adopción o seguimientos',
      icon: MessageSquare,
      color: 'purple'
    }
  ];

  const getEstadoColor = (estado: EstadoCampana): string => {
    switch (estado) {
      case 'Activa': return 'bg-green-100 text-green-800';
      case 'Programada': return 'bg-blue-100 text-blue-800';
      case 'Completada': return 'bg-purple-100 text-purple-800';
      case 'Borrador': return 'bg-yellow-100 text-yellow-800';
      case 'Pausada': return 'bg-gray-100 text-gray-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: TipoNotificacion): ReactElement => {
    switch (tipo) {
      case 'Email': return <Mail className="h-4 w-4 text-blue-500" />;
      case 'SMS': return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'Push': return <Smartphone className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEstadoIcon = (estado: EstadoCampana): ReactElement => {
    switch (estado) {
      case 'Activa': return <Play className="h-3 w-3" />;
      case 'Programada': return <Clock className="h-3 w-3" />;
      case 'Completada': return <CheckCircle className="h-3 w-3" />;
      case 'Pausada': return <Pause className="h-3 w-3" />;
      case 'Error': return <XCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const manejarRedireccion = (tipo: string) => {
    switch (tipo) {
      case 'Aviso de Nueva Mascota':
        router.push('/nueva-mascota'); // Ruta correcta
        break;
      case 'Campaña de Correo para Adopciones':
        router.push('/campana-adopciones'); // Ruta correcta
        break;
      case 'Recordatorio por SMS':
        router.push('/sms-recordatorio'); // Ruta correcta
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Notificaciones</h1>
              <p className="text-gray-600 mt-1">Gestionar alertas, avisos y notificaciones del sistema</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Permisos: admin, marketing</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasNotificaciones.map((stat) => {
          const Icon = stat.icon;
          const { bg, text } = getColorClasses(stat.color);
          return (
            <div key={stat.titulo} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.titulo}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.valor.toLocaleString()}{stat.unidad || ''}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.cambio}</p>
                </div>
                <div className={`p-2 rounded-lg ${bg}`}>
                  <Icon className={`h-5 w-5 ${text}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accesos Directos de Notificación */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Accesos Directos de Notificación</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {accionesRapidas.map((accion) => {
            const Icon = accion.icon;
            const { bg, text } = getColorClasses(accion.color);
            return (
              <button
                key={accion.titulo}
                onClick={() => manejarRedireccion(accion.titulo)}
                className={`flex flex-col items-center p-4 ${bg} rounded-lg hover:shadow transition-colors group relative`}
              >
                {accion.badge && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {accion.badge}
                  </div>
                )}
                <Icon className={`h-8 w-8 ${text} mb-2 group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium text-gray-900">{accion.titulo}</span>
                <span className="text-xs text-gray-600 mt-1">{accion.descripcion}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rendimiento por Tipo de Notificación */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento por Tipo de Notificación</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* EMAIL */}
          <div className="text-center hover:shadow-lg transition group cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Email</h3>
            <p className="text-2xl font-bold text-blue-600">73.2%</p>
            <p className="text-sm text-gray-500">+2.1% vs semana pasada</p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '73.2%' }}></div>
            </div>
            <span className="text-xs text-gray-400 mt-1 block">Últimos 7 días</span>
          </div>

          {/* SMS */}
          <div className="text-center hover:shadow-lg transition group cursor-pointer">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">SMS</h3>
            <p className="text-2xl font-bold text-green-600">89.5%</p>
            <p className="text-sm text-gray-500">+1.6% vs semana pasada</p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '89.5%' }}></div>
            </div>
            <span className="text-xs text-gray-400 mt-1 block">Últimos 7 días</span>
          </div>

          {/* ALCANCE */}
          <div className="text-center hover:shadow-lg transition group cursor-pointer">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Alcance</h3>
            <p className="text-2xl font-bold text-orange-600">2,156</p>
            <p className="text-sm text-gray-500">+89 esta semana</p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <span className="text-xs text-gray-400 mt-1 block">Últimos 7 días</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GestionNotificaciones;
