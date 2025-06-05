"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Heart, Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';

const HeaderAdmin = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Datos de ejemplo para las notificaciones
  const recentActivity = [
    { id: 1, type: 'adoption', message: 'Nueva adopción: Max adoptado por María García', time: '2 min', status: 'success' },
    { id: 2, type: 'user', message: 'Nuevo refugio registrado: Hogar Peludo', time: '15 min', status: 'info' },
    { id: 3, type: 'alert', message: 'Solicitud de adopción requiere revisión', time: '1 hora', status: 'warning' },
    { id: 4, type: 'system', message: 'Backup de base de datos completado', time: '2 horas', status: 'success' }
  ];

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">MatchPet Admin</h1>
          </div>
          
          {/* Sección derecha del header */}
          <div className="flex items-center space-x-4">
            {/* Barra de búsqueda */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuarios, mascotas..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            
            {/* Búsqueda móvil */}
            <button className="md:hidden p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Botón de notificaciones */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
                {recentActivity.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-red-500 text-xs text-white rounded-full">
                    {recentActivity.length > 9 ? '9+' : recentActivity.length}
                  </span>
                )}
              </button>
              
              {/* Dropdown de notificaciones */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-900">Notificaciones</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Marcar todas como leídas
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {recentActivity.slice(0, 5).map((item) => (
                      <div key={item.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(item.status)}`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{item.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Perfil del administrador */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AD</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-700">Admin</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {/* Dropdown del usuario */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <User className="h-4 w-4 mr-3" />
                      Mi Perfil
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                      <Settings className="h-4 w-4 mr-3" />
                      Configuración
                    </button>
                    <hr className="my-1" />
                    <button 
                      onClick={() => {
                        window.location.href = '/';
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors">
                      <LogOut className="h-4 w-4 mr-3" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;