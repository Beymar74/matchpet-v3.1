'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, Heart, LogOut, Bell, Settings, Sparkles, Search } from 'lucide-react';

export default function HeaderUsuario() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState(3);
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

  const [nombreUsuario, setNombre] = useState('Usuario');
  const [fotoUsuario, setFoto] = useState('/Perfil/Usuario1.jpeg');

  useEffect(() => {
    const id = localStorage.getItem("idUsuario");
    if (!id) return;

    fetch(`/api/usuario/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.nombre) setNombre(data.nombre);
        if (data.fotoPerfil) setFoto(data.fotoPerfil);
      })
      .catch((err) => console.error("Error al cargar datos del usuario:", err));
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
  
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  const mockNotifications = [
    { id: 1, message: "¡Nuevo match con Luna!", time: "Hace 5 min", type: "match" },
    { id: 2, message: "Tu perfil ha sido visitado", time: "Hace 1 hora", type: "visit" },
    { id: 3, message: "Mensaje de Refugio Amigo Fiel", time: "Hace 2 horas", type: "message" }
  ];
  
  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">

          {/* Logo mejorado */}
          <Link href="/" className="flex items-center gap-3 group">
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
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#BF3952] to-pink-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                placeholder="Buscar mascotas, refugios..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#30588C]/20 focus:border-[#30588C] transition-all duration-300 text-gray-700"
              />
            </div>
          </div>

          {/* Navegación mejorada */}
          <nav className="hidden md:flex items-center space-x-2 font-medium text-sm">
            <Link 
              href="/match" 
              className="px-4 py-2 rounded-xl text-gray-700 hover:text-[#BF3952] hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105"
            >
              Match
            </Link>
            <Link 
              href="/verperfil" 
              className="px-4 py-2 rounded-xl text-gray-700 hover:text-[#BF3952] hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105"
            >
              Mi Perfil
            </Link>

            <Link 
              href="/estado-adopcion" 
              className="px-4 py-2 rounded-xl text-gray-700 hover:text-[#BF3952] hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105"
            >
              Estado de Adopción
            </Link>

          </nav>

          {/* Área de usuario mejorada */}
          <div className="flex items-center gap-3">
            
            {/* Notificaciones desktop */}
            <div className="relative hidden lg:block" ref={notifRef}>
              <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 focus:outline-none"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notificaciones > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#BF3952] to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {notificaciones}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
                  <div className="p-4 bg-gradient-to-r from-[#30588C] to-[#BF3952] text-white">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notificaciones
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockNotifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notif.type === 'match' ? 'bg-pink-500' : 
                            notif.type === 'visit' ? 'bg-blue-500' : 'bg-green-500'
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
                    <button className="text-sm text-[#30588C] font-semibold hover:underline">
                      Ver todas las notificaciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Perfil + Menú mejorado */}
            <div className="relative flex items-center gap-3" ref={menuRef}>
              <div className="hidden lg:flex flex-col items-end">
                <span className="font-semibold text-sm text-gray-800">{nombreUsuario}</span>
                <span className="text-xs text-gray-500">Usuario activo</span>
              </div>
              
              <button 
                onClick={toggleMenu} 
                className="relative focus:outline-none group"
              >
                <div className="relative">
                <Image
                    src={fotoUsuario}
                    alt={nombreUsuario}

                    width={44}
                    height={44}
                    className="rounded-full border-3 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#30588C] to-[#BF3952] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
                  
                  {/* Header del menú */}
                  <div className="relative bg-gradient-to-r from-[#30588C] to-[#BF3952] p-6 text-white">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                      <Image
                          src={fotoUsuario}
                          alt={nombreUsuario}

                          width={70}
                          height={70}
                          className="rounded-full border-3 border-white shadow-lg"
                        />
                        {/* <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div> */}
                      </div>
                      <h3 className="mt-3 font-bold text-lg">{nombreUsuario}</h3>
                      <p className="text-sm text-white/80">Miembro desde 2024</p>
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
                      <div className="text-lg font-bold text-[#30588C]">12</div>
                      <div className="text-xs text-gray-600">Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#BF3952]">5</div>
                      <div className="text-xs text-gray-600">Favoritos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">3</div>
                      <div className="text-xs text-gray-600">Visitas</div>
                    </div>
                  </div>

                  {/* Opciones del menú */}
                  <div className="py-2">
                    <Link
                      href="/verperfil"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-[#30588C] transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <User size={18} className="text-[#30588C]" />
                      </div>
                      <div>
                        <div className="font-medium">Ver perfil</div>
                        <div className="text-xs text-gray-500">Editar información</div>
                      </div>
                    </Link>
                    
                    <Link
                      href="/favoritos"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-[#BF3952] transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                        <Heart size={18} className="text-[#BF3952]" />
                      </div>
                      <div>
                        <div className="font-medium">Mis favoritos</div>
                        <div className="text-xs text-gray-500">Mascotas guardadas</div>
                      </div>
                    </Link>

                    <Link
                      href="/configuracion"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 hover:text-gray-800 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <Settings size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">Configuración</div>
                        <div className="text-xs text-gray-500">Preferencias</div>
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
                        <div className="text-xs text-red-400">Salir de la cuenta</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Menú móvil */}
            <div className="lg:hidden">
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
          <div className="lg:hidden bg-white border-t border-gray-200 animate-slide-down">
            <nav className="px-4 py-4 space-y-2">
              <Link 
                href="/Match" 
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-[#BF3952] transition-all duration-300"
              >
                🐾 Match
              </Link>
              <Link 
                href="/verperfil" 
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-[#30588C] transition-all duration-300"
              >
                👤 Mi Perfil
              </Link>
              <Link 
                href="/estado-adopcion" 
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-[#30588C] transition-all duration-300"
              >
                📄 Estado de Adopción
              </Link>

              <div className="pt-2 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <Bell className="w-5 h-5" />
                  <span>Notificaciones</span>
                  {notificaciones > 0 && (
                    <span className="ml-auto w-6 h-6 bg-[#BF3952] text-white text-xs font-bold rounded-full flex items-center justify-center">
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