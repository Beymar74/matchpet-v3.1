'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Building2, 
  Heart, 
  LogOut, 
  Bell, 
  Settings, 
  Sparkles, 
  Search,
  PawPrint,
  Plus,
  Users,
  BarChart3,
  FileText,
  Home,
  Calendar
} from 'lucide-react';

export default function HeaderRefugio() {
  const [isOpen, setIsOpen] = useState(false);
  const [fotoRefugio, setFotoRefugio] = useState('/Refugio/refugio1.jpeg');
  const [nombreRefugio, setNombreRefugio] = useState('');
  const [notificaciones, setNotificaciones] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);
  const toggleNotifications = () => setShowNotifications(prev => !prev);

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    window.location.href = '/';
  };

  useEffect(() => {
    const foto = localStorage.getItem('fotoRefugio');
    const nombre = localStorage.getItem('nombreRefugio');
    if (foto) setFotoRefugio(foto);
    if (nombre) setNombreRefugio(nombre);
  }, []);

  // Cierra los menús si se hace clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    if (isOpen || showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, showNotifications]);

  const mockNotifications = [
    { id: 1, message: "Nueva solicitud de adopción para Max", time: "Hace 10 min", type: "adoption" },
    { id: 2, message: "Nuevo perfil de adoptante visitó tu refugio", time: "Hace 30 min", type: "profile" },
    { id: 3, message: "Recordatorio: Vacunación de Luna", time: "Hace 1 hora", type: "reminder" },
    { id: 4, message: "Donación recibida: $150", time: "Hace 2 horas", type: "donation" },
    { id: 5, message: "Nuevo seguidor en redes sociales", time: "Hace 3 horas", type: "social" }
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">

          {/* Logo mejorado */}
          <Link href="/dashboard-refugio" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-[90px] sm:w-[110px] md:w-[130px] transform group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/Logo/logo4.png"
                  alt="MatchPet Logo"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain drop-shadow-md"
                  priority
                />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#4E9F3D] to-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </Link>

          {/* Barra de búsqueda central (oculta en móvil) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar mascotas, adoptantes..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4E9F3D]/20 focus:border-[#4E9F3D] transition-all duration-300 text-gray-700"
              />
            </div>
          </div>

          {/* Navegación mejorada */}
          <nav className="hidden md:flex items-center space-x-2 font-medium text-sm">
            <Link 
              href="/PantallaGestionMascotas" 
              className="px-4 py-2 rounded-xl text-gray-700 hover:text-[#4E9F3D] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-105"
            >
              Mis Mascotas
            </Link>
            <Link 
              href="/error" 
              className="px-4 py-2 rounded-xl text-gray-700 hover:text-[#30588C] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105"
            >
              Solicitudes
            </Link>
            <Link 
              href="/ver-perfil-refugio" 
              className="px-4 py-2 rounded-xl text-gray-700 hover:text-[#BF3952] hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105"
            >
              Perfil
            </Link>
          </nav>

          {/* Área de refugio mejorada */}
          <div className="flex items-center gap-3">
            
            {/* Notificaciones */}
            <div className="relative hidden md:block" ref={notifRef}>
              <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 focus:outline-none"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notificaciones > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#4E9F3D] to-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {notificaciones}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
                  <div className="p-4 bg-gradient-to-r from-[#4E9F3D] to-[#30588C] text-white">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notificaciones del Refugio
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notif.type === 'adoption' ? 'bg-green-500' : 
                            notif.type === 'profile' ? 'bg-blue-500' : 
                            notif.type === 'reminder' ? 'bg-orange-500' :
                            notif.type === 'donation' ? 'bg-purple-500' : 'bg-pink-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button className="text-sm text-[#4E9F3D] font-semibold hover:underline">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Perfil + Menú mejorado */}
            <div className="relative flex items-center gap-3" ref={menuRef}>
              <div className="hidden lg:flex flex-col items-end">
                <span className="font-semibold text-sm text-gray-800">{nombreRefugio}</span>
                <span className="text-xs text-gray-500">Refugio verificado</span>
              </div>
              
              <button 
                onClick={toggleMenu} 
                className="relative focus:outline-none group"
              >
                <div className="relative">
                  <Image
                    src={fotoRefugio}
                    alt="Refugio"
                    width={44}
                    height={44}
                    className="rounded-full border-3 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4E9F3D] to-[#30588C] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
                  
                  {/* Header del menú */}
                  <div className="relative bg-gradient-to-r from-[#4E9F3D] to-[#30588C] p-6 text-white">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <Image
                          src={fotoRefugio}
                          alt="Refugio"
                          width={70}
                          height={70}
                          className="rounded-full border-3 border-white shadow-lg object-cover"
                        />
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <h3 className="mt-3 font-bold text-lg">{nombreRefugio}</h3>
                      <p className="text-sm text-white/80">Refugio certificado</p>
                    </div>
                    <div className="absolute top-0 right-0 p-4">
                      <button
                        onClick={closeMenu}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stats rápidas */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border-b">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#4E9F3D]">32</div>
                      <div className="text-xs text-gray-600">Mascotas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#30588C]">8</div>
                      <div className="text-xs text-gray-600">Solicitudes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#BF3952]">142</div>
                      <div className="text-xs text-gray-600">Perfiles</div>
                    </div>
                  </div>

                  {/* Opciones del menú */}
                  <div className="py-2">
                    <Link
                      href="/ver-perfil-refugio"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-[#4E9F3D] transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Building2 size={18} className="text-[#4E9F3D]" />
                      </div>
                      <div>
                        <div className="font-medium">Perfil del refugio</div>
                        <div className="text-xs text-gray-500">Ver y editar información</div>
                      </div>
                    </Link>
                    
                    <Link
                      href="/dashboard-refugio"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-[#30588C] transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <PawPrint size={18} className="text-[#30588C]" />
                      </div>
                      <div>
                        <div className="font-medium">Gestionar mascotas</div>
                        <div className="text-xs text-gray-500">Ver, agregar y editar</div>
                      </div>
                    </Link>

                    <Link
                      href="/agregar-mascota"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-[#BF3952] transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <Plus size={18} className="text-[#BF3952]" />
                      </div>
                      <div>
                        <div className="font-medium">Agregar mascota</div>
                        <div className="text-xs text-gray-500">Nueva mascota</div>
                      </div>
                    </Link>

                    <Link
                      href="/error"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:text-orange-600 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <Heart size={18} className="text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium">Solicitudes de adopción</div>
                        <div className="text-xs text-gray-500">Revisar solicitudes</div>
                      </div>
                    </Link>

                    <Link
                      href="/ver-perfil-refugio"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-teal-600 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                        <Building2 size={18} className="text-teal-600" />
                      </div>
                      <div>
                        <div className="font-medium">Ver perfil del refugio</div>
                        <div className="text-xs text-gray-500">Información completa</div>
                      </div>
                    </Link>

                    <Link
                      href="/reportes"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:text-indigo-600 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                        <BarChart3 size={18} className="text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium">Reportes y estadísticas</div>
                        <div className="text-xs text-gray-500">Análisis del refugio</div>
                      </div>
                    </Link>

                    <Link
                      href="/configuracion-refugio"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 hover:text-gray-800 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <Settings size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">Configuración</div>
                        <div className="text-xs text-gray-500">Ajustes del refugio</div>
                      </div>
                    </Link>

                    <hr className="my-2 mx-4" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 w-full group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <LogOut size={18} />
                      </div>
                      <div>
                        <div className="font-medium">Cerrar sesión</div>
                        <div className="text-xs text-red-400">Salir del refugio</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Menú móvil */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu} 
                aria-label="Abrir menú"
                className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
              >
                {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil expandido */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
            <nav className="px-4 py-4 space-y-2">
              <Link 
                href="/dashboard-refugio" 
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-[#4E9F3D] transition-all duration-300"
              >
                🐾 Mis Mascotas
              </Link>
              <Link 
                href="/agregar-mascota" 
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-[#BF3952] transition-all duration-300"
              >
                ➕ Agregar Mascota
              </Link>
              <Link 
                href="/error" 
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-[#30588C] transition-all duration-300"
              >
                💝 Solicitudes
              </Link>
              <Link 
                href="/error" 
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 hover:text-teal-600 transition-all duration-300"
              >
                🏠 Mi Perfil
              </Link>
              <div className="pt-2 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <Bell className="w-5 h-5" />
                  <span>Notificaciones</span>
                  {notificaciones > 0 && (
                    <span className="ml-auto w-6 h-6 bg-[#4E9F3D] text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {notificaciones}
                    </span>
                  )}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </>
  );
}