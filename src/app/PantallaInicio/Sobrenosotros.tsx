'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] text-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center">

        {/* Texto */}
        <div className="w-full md:w-3/5 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Sobre Nosotros
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4">
            En MatchPet, creemos que cada mascota merece un hogar lleno de amor y que cada persona merece encontrar a su compañero perfecto.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4">
            Nacimos con la misión de conectar corazones: unir a mascotas rescatadas con adoptantes responsables, de forma fácil, segura y llena de esperanza.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4">
            Trabajamos junto a refugios y asociaciones, usando tecnología que mejora las coincidencias y agiliza el proceso de adopción. Cada conexión que logramos no es solo una adopción: es el comienzo de una nueva historia.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 font-semibold mt-6">
            Somos MatchPet.
          </p>
        </div>

        {/* Logo */}
        <div className="w-full md:w-2/5 flex justify-center">
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-2xl border border-gray-300 max-w-[240px] sm:max-w-[280px] md:max-w-xs">
            <Image
              src="/Logo/logo2.png"
              alt="MatchPet Logo"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
