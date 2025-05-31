'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/Logo/logo2.png" alt="MatchPet" width={40} height={40} />
              <span className="font-bold text-xl text-white">MatchPet</span>
            </div>
            <p className="text-sm">
              Conectando corazones, uniendo familias. Encuentra a tu compañero peludo ideal o ayuda a aquellos que más lo necesitan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-white mb-4">Explora</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="hover:text-white transition">Sobre Nosotros</Link></li>
              <li><Link href="#pets" className="hover:text-white transition">Mascotas</Link></li>
              <li><Link href="#explorar" className="hover:text-white transition">Refugios</Link></li>
              <li><Link href="#contacto" className="hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-white mb-4">Contacto</h5>
            <div className="text-sm space-y-2">
              <p>Email: info@matchpet.com</p>
              <p>Teléfono: +123 456 7890</p>
              <p>Dirección: Calle Ficticia #123, Ciudad, País</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="font-semibold text-white mb-4">Síguenos</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          &copy; 2023 MatchPet. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}