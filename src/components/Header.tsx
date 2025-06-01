'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Logo/logo2.png" alt="MatchPet" width={40} height={40} />
          <span className="font-bold text-xl text-[#30588C]">MatchPet</span>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex space-x-6">
          <Link href="#about" className="text-gray-700 hover:text-[#BF3952] font-medium transition">Sobre Nosotros</Link>
          <Link href="#pets" className="text-gray-700 hover:text-[#BF3952] font-medium transition">Mascotas</Link>
          <Link href="#explorar" className="text-gray-700 hover:text-[#BF3952] font-medium transition">Explorar</Link>
          <Link href="#contacto" className="text-gray-700 hover:text-[#BF3952] font-medium transition">Contacto</Link>
        </nav>

        {/* Botones */}
        <div className="flex items-center space-x-4">
          <Link
            href="/acceso"
            className="text-sm font-semibold text-[#30588C] hover:underline"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="bg-[#BF3952] text-white text-sm px-4 py-2 rounded-full hover:bg-[#a53147] transition"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </header>
  );
}