'use client';

import React from 'react';
import { Heart, Users, Gift } from 'lucide-react';
import Link from 'next/link';

export default function ExploreSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Explora y Únete a la Familia
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-10 sm:mb-12">
          Descubre más sobre cómo puedes ayudar y formar parte de nuestra comunidad.
        </p>

        {/* Grid of Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Option 1: Adoptar */}
          <Link href="/#pets" passHref>
            <div className="explore-card bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl cursor-pointer h-full">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-5">
                <Heart className="w-8 h-8 text-pink-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">Adopta un Amigo</h3>
              <p className="text-gray-600 mb-2 text-sm text-center">
                Encuentra a tu compañero perfecto y dale un hogar lleno de amor.
              </p>
            </div>
          </Link>

          {/* Option 2: Voluntariado */}
          <Link href="/#contact" passHref>
            <div className="explore-card bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl cursor-pointer h-full">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-5">
                <Users className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">Sé Voluntario</h3>
              <p className="text-gray-600 mb-2 text-sm text-center">
                Únete a nuestro equipo y ayuda a cuidar a nuestras mascotas y organizar eventos.
              </p>
            </div>
          </Link>

          {/* Option 3: Donar */}
          <Link href="/#donate" passHref>
            <div className="explore-card bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl cursor-pointer h-full">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-5">
                <Gift className="w-8 h-8 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">Haz una Donación</h3>
              <p className="text-gray-600 mb-2 text-sm text-center">
                Tu apoyo financiero nos ayuda a proporcionar alimento, refugio y atención médica.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
