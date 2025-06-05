'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center animate-fade-in">
        {/* Imagen */}
        <div className="mb-6">
          <Image
            src="/Error404/error.png"
            alt="Página no encontrada"
            width={280}
            height={180}
            className="mx-auto rounded-lg"
          />
        </div>

        {/* Título y mensaje */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">¡Ups! Página no encontrada</h1>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" passHref>
            <button className="w-full sm:w-auto px-6 py-3 bg-[#4EDCD8] text-white rounded-xl font-semibold hover:bg-[#3bc6c3] shadow-md transition">
              🏠 Volver al inicio
            </button>
          </Link>
          <Link href="/explorar" passHref>
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-[#4EDCD8] border border-[#4EDCD8] rounded-xl font-semibold hover:bg-[#f1f1f1] transition shadow-md">
              🐾 Explorar MatchPet
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
