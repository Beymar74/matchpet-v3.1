'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const images = [
    { src: "/Perros y Gatos/perritosygatitos2.jpg", alt: "Perrito y gatito jugando" },
    { src: "/Perros y Gatos/perritosygatitos3.jpg", alt: "Grupo de perritos y gatitos" },
    { src: "/Perros y Gatos/perritosygatitos4.jpg", alt: "Perrito y gatito durmiendo juntos" },
    { src: "/Perros y Gatos/perritosygatitos9.jpg", alt: "Perrito y gatito explorando" }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-12 bg-white text-gray-800">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        {/* Columna izquierda: texto y botones */}
        <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left">
          <span className="inline-block bg-pink-100 text-pink-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            ¡Bienvenido a MatchPet!
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            ¿Listo para cambiar una vida... o dos? <br /> ¡Únete hoy!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8">
            Donde cada historia comienza con un encuentro especial. ✨ Explora, conecta y encuentra el compañero perfecto: ya sea adoptando una mascota o ayudando a que más corazones se unan.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
            {/* Botón: Únete ahora */}
            <Button
              asChild
              className="px-6 py-3 text-base sm:text-lg bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
            >
              <Link href="/registro">Únete ahora</Link>
            </Button>

            {/* Botón: Iniciar sesión */}
            <Button
              asChild
              variant="outline"
              className="px-6 py-3 text-base sm:text-lg border-gray-400 text-gray-700 hover:bg-gray-200 hover:border-gray-500 rounded-lg shadow-md transition transform hover:scale-105"
            >
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>

        {/* Columna derecha: cuadrícula de imágenes */}
        <div className="w-full md:w-1/2 lg:w-2/5 grid grid-cols-2 gap-4 sm:gap-5">
          {images.map((image, index) => (
            <Link
              href="#"
              key={index}
              className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl aspect-square"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={500}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                priority={index < 2}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
