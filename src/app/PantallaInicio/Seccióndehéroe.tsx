'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  ArrowRight, 
  Play, 
  Star, 
  Users, 
  Award,
  PawPrint
} from 'lucide-react';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: "/Perros y Gatos/perritosygatitos2.jpg", alt: "Perrito y gatito jugando" },
    { src: "/Perros y Gatos/perritosygatitos3.jpg", alt: "Grupo de perritos y gatitos" },
    { src: "/Perros y Gatos/perritosygatitos4.jpg", alt: "Perrito y gatito durmiendo juntos" },
    { src: "/Perros y Gatos/perritosygatitos9.jpg", alt: "Perrito y gatito explorando" }
  ];

  const stats = [
    { icon: Heart, number: "2,500+", label: "Adopciones" },
    { icon: Users, number: "15,000+", label: "Familias" },
    { icon: Award, number: "500+", label: "Refugios" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Columna izquierda: contenido principal */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            
            {/* Badge simple */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#BF3952]/20 text-[#BF3952] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <PawPrint className="w-4 h-4" />
              ¡Bienvenido a MatchPet!
            </div>

            {/* Título principal simplificado */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight text-gray-800">
              Encuentra tu mejor amigo de cuatro patas
            </h1>

            {/* Subtítulo */}
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Conectamos corazones con patas. Descubre mascotas increíbles esperando un hogar lleno de amor.
            </p>

            {/* Estadísticas compactas */}
            <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto lg:mx-0">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <IconComponent className="w-5 h-5 text-[#30588C]" />
                    </div>
                    <div className="text-lg font-bold text-gray-800">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Botones de acción simplificados */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#BF3952] hover:bg-[#8B2B3B] text-white font-semibold text-base rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                Comenzar búsqueda
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 border border-[#30588C]/30 text-[#30588C] hover:bg-[#30588C] hover:text-white font-semibold text-base rounded-xl shadow-lg transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                Ver cómo funciona
              </Link>
            </div>

            {/* Testimonial simplificado */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-600">
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border border-white"></div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 font-medium">Miles de familias felices</span>
              </div>
            </div>
          </div>

          {/* Columna derecha: imagen simplificada */}
          <div className="w-full lg:w-2/5">
            <div className="relative max-w-lg mx-auto">
              
              {/* Imagen principal */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl bg-white p-3">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Indicadores simples */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white shadow-sm scale-125' 
                          : 'bg-white/60'
                      }`}
                      aria-label={`Ver imagen ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Badge simple */}
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  ¡Disponible!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}