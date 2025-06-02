'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Sparkles, 
  Heart, 
  Home, 
  Users, 
  Mail, 
  Info,
  PawPrint,
  ChevronDown
} from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState('/Perfil/Usuario1.jpeg');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);
  const toggleProfile = () => setIsProfileOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.clear();
    updateHeaderState();
    setIsOpen(false);
    setIsProfileOpen(false);
    window.location.href = '/';
  };

  const updateHeaderState = () => {
    const logged = localStorage.getItem('isLoggedIn') === 'true';
    const foto = localStorage.getItem('fotoPerfil');
    const nombre = localStorage.getItem('nombreUsuario');

    setIsLoggedIn(logged);
    setFotoPerfil(foto && foto.trim() !== '' ? foto : '/Perfil/Usuario1.jpeg');
    setNombreUsuario(nombre || '');
  };

  useEffect(() => {
    updateHeaderState();

    // Listener por si otro componente modifica localStorage
    const handleStorageChange = () => updateHeaderState();
    window.addEventListener('storage', handleStorageChange);

    // Detectar scroll para cambiar estilo del header
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cerrar menús al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-menu') && !e.target.closest('.mobile-menu')) {
        setIsProfileOpen(false);
        setIsOpen(false);
      }
    };

    if (isProfileOpen || isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isOpen]);

  const navigationLinks = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/about', label: 'Sobre Nosotros', icon: Info },
    { href: '/Mascotas', label: 'Mascotas', icon: PawPrint },
    { href: '/community', label: 'Comunidad', icon: Users },
    { href: '/contact', label: 'Contacto', icon: Mail }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-white shadow-md'
      }`}>
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

          {/* Navegación principal mejorada */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm" role="navigation">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-4 py-2 rounded-xl text-gray-700 hover:text-[#BF3952] transition-all duration-300 flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="group-hover:font-semibold transition-all">{link.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
              );
            })}
          </nav>

          {/* Área de usuario */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative profile-menu">
                <button 
                  onClick={toggleProfile}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group focus:outline-none"
                >
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-semibold text-gray-800">{nombreUsuario}</span>
                    <span className="text-xs text-gray-500">Ver perfil</span>
                  </div>
                  <div className="relative">
                    <Image
                      src={fotoPerfil}
                      alt="Perfil"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
                    
                    {/* Header del menú */}
                    <div className="bg-gradient-to-r from-[#30588C] to-[#BF3952] p-4 text-white">
                      <div className="flex items-center gap-3">
                        <Image
                          src={fotoPerfil}
                          alt="Perfil"
                          width={50}
                          height={50}
                          className="rounded-full border-2 border-white"
                        />
                        <div>
                          <h3 className="font-semibold">{nombreUsuario}</h3>
                          <p className="text-sm text-white/80">Usuario activo</p>
                        </div>
                      </div>
                    </div>

                    {/* Opciones del menú */}
                    <div className="p-2">
                      <Link
                        href="/verperfil"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-[#30588C] rounded-xl transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <User className="w-4 h-4 text-[#30588C]" />
                        </div>
                        <span className="font-medium">Ver perfil</span>
                      </Link>
                      
                      <Link
                        href="/match"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-[#BF3952] rounded-xl transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                          <Heart className="w-4 h-4 text-[#BF3952]" />
                        </div>
                        <span className="font-medium">Buscar mascotas</span>
                      </Link>

                      <hr className="my-2" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 w-full group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Cerrar sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-gray-700 hover:text-[#30588C] font-medium rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#BF3952] to-pink-500 hover:from-[#8B2B3B] hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Regístrate
                </Link>
              </div>
            )}

            {/* Botón menú móvil */}
            <div className="lg:hidden">
              <button 
                onClick={toggleMenu} 
                aria-label="Abrir menú"
                className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 mobile-menu"
              >
                {isOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil expandido */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg mobile-menu animate-slide-down">
            
            {/* Navegación móvil */}
            <nav className="px-4 py-4 space-y-2">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-[#BF3952] transition-all duration-300 group"
                  >
                    <IconComponent className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Perfil móvil (si está logueado) */}
            {isLoggedIn && (
              <div className="px-4 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={fotoPerfil}
                    alt="Perfil"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{nombreUsuario}</p>
                    <p className="text-sm text-gray-600">Usuario activo</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link
                    href="/verperfil"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-[#30588C] transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    <span>Ver perfil</span>
                  </Link>
                  
                  <Link
                    href="/match"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-white hover:text-[#BF3952] transition-all duration-300"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Buscar mascotas</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-600 hover:bg-white transition-all duration-300 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}

            {/* Botones de login/registro móvil (si NO está logueado) */}
            {!isLoggedIn && (
              <div className="px-4 py-4 border-t border-gray-200 space-y-3">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block w-full px-6 py-3 text-center text-gray-700 hover:text-[#30588C] font-medium rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-gray-200"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="block w-full px-6 py-3 text-center bg-gradient-to-r from-[#BF3952] to-pink-500 hover:from-[#8B2B3B] hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
                  Regístrate
                </Link>
              </div>
            )}
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
      `}</style>
    </>
  );
}