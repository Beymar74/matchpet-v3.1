'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        
        {/* Logo con tamaño responsivo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-[80px] sm:w-[100px] md:w-[120px]">
          <Image
            src="/Logo/logo4.png" // ✅ Nuevo logo
            alt="MatchPet Logo"
            width={300}
            height={300}
            className="w-full h-auto object-contain"
            priority
          />

          </div>
        </Link>

        {/* Menú de escritorio */}
        <nav className="hidden md:flex space-x-6 font-medium text-sm" role="navigation">
          <Link href="/" className="text-gray-600 hover:text-[#BF3952] transition">Inicio</Link>
          <Link href="/about" className="text-gray-600 hover:text-[#BF3952] transition">Sobre Nosotros</Link>
          <Link href="/pets" className="text-gray-600 hover:text-[#BF3952] transition">Mascotas</Link>
          <Link href="/community" className="text-gray-600 hover:text-[#BF3952] transition">Comunidad</Link>
          <Link href="/contact" className="text-gray-600 hover:text-[#BF3952] transition">Contacto</Link>
        </nav>

        {/* Botones escritorio */}
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Regístrate</Link>
          </Button>
        </div>

        {/* Botón hamburguesa móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Abrir menú">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
          <nav className="flex flex-col px-4 py-4 space-y-3 font-medium text-sm">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/about', label: 'Sobre Nosotros' },
              { href: '/pets', label: 'Mascotas' },
              { href: '/community', label: 'Comunidad' },
              { href: '/contact', label: 'Contacto' },
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

          {/* Botones de autenticación móvil */}
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
