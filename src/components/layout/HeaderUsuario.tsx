'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, Heart, LogOut } from 'lucide-react';

export default function HeaderUsuario() {
  const [isOpen, setIsOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState('/Perfil/Usuario1.jpeg');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    window.location.href = '/';
  };

  useEffect(() => {
    const foto = localStorage.getItem('fotoPerfil');
    const nombre = localStorage.getItem('nombreUsuario');
    if (foto) setFotoPerfil(foto);
    if (nombre) setNombreUsuario(nombre);
  }, []);

  // Cierra el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-[80px] sm:w-[100px] md:w-[120px]">
            <Image
              src="/Logo/logo4.png"
              alt="MatchPet Logo"
              width={300}
              height={300}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex space-x-8 font-medium text-sm text-gray-700">
          <Link href="/match" className="hover:text-[#BF3952]">Match</Link>
          <Link href="/verperfil" className="hover:text-[#BF3952]">Perfil</Link>
          <Link href="/favoritos" className="hover:text-[#BF3952]">Favoritos</Link>
        </nav>

        {/* Perfil + Menú */}
        <div className="relative flex items-center gap-3" ref={menuRef}>
          <span className="hidden md:block font-medium text-sm text-gray-700">{nombreUsuario}</span>
          <button onClick={toggleMenu} className="focus:outline-none">
            <Image
              src={fotoPerfil}
              alt="Perfil"
              width={38}
              height={38}
              className="rounded-full border-2 border-[#30588C] hover:scale-105 transition"
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex flex-col items-center py-4 border-b">
                <Image
                  src={fotoPerfil}
                  alt="Perfil"
                  width={60}
                  height={60}
                  className="rounded-full border border-[#30588C]"
                />
                <p className="mt-2 font-semibold text-[#30588C]">{nombreUsuario}</p>
                <p className="text-xs text-gray-500">Mi cuenta</p>
              </div>

              <div className="flex flex-col py-2">
                <Link
                  href="/verperfil"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <User size={18} className="text-[#30588C]" /> Ver perfil
                </Link>
                <Link
                  href="/favoritos"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <Heart size={18} className="text-[#30588C]" /> Mis favoritos
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 transition w-full"
                >
                  <LogOut size={18} /> Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Menú móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Abrir menú">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
