'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState('/Perfil/Usuario1.jpeg');
  const [nombreUsuario, setNombreUsuario] = useState('');

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    updateHeaderState();
    setIsOpen(false);
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

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
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

        <nav className="hidden md:flex space-x-6 font-medium text-sm" role="navigation">
          <Link href="/" className="text-gray-600 hover:text-[#BF3952] transition">Inicio</Link>
          <Link href="/about" className="text-gray-600 hover:text-[#BF3952] transition">Sobre Nosotros</Link>
          <Link href="/pets" className="text-gray-600 hover:text-[#BF3952] transition">Mascotas</Link>
          <Link href="/community" className="text-gray-600 hover:text-[#BF3952] transition">Comunidad</Link>
          <Link href="/contact" className="text-gray-600 hover:text-[#BF3952] transition">Contacto</Link>
        </nav>

        {isLoggedIn ? (
          <div className="relative">
            <button onClick={toggleMenu} className="flex items-center space-x-2 focus:outline-none">
              <Image
                src={fotoPerfil}
                alt="Perfil"
                width={36}
                height={36}
                className="rounded-full border hover:scale-105 transition"
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50">
                <div className="px-4 py-2 text-sm font-semibold text-gray-800">{nombreUsuario}</div>
                <Link href="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ver perfil</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Regístrate</Link>
            </Button>
          </div>
        )}

        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Abrir menú">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && !isLoggedIn && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
          <nav className="flex flex-col px-4 py-4 space-y-3 font-medium text-sm">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/about', label: 'Sobre Nosotros' },
              { href: '/pets', label: 'Mascotas' },
              { href: '/community', label: 'Comunidad' },
              { href: '/contact', label: 'Contacto' }
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-gray-700 hover:text-[#BF3952] transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col px-4 py-4 space-y-2 border-t border-gray-200">
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/login" onClick={closeMenu}>Iniciar Sesión</Link>
            </Button>
            <Button asChild size="sm" className="w-full">
              <Link href="/register" onClick={closeMenu}>Regístrate</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
