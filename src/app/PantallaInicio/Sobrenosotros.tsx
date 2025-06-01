'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  Home, 
  Shield, 
  Users, 
  Sparkles, 
  Award, 
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  PawPrint
} from 'lucide-react';

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    adoptions: 0,
    shelters: 0,
    families: 0
  });

  const finalNumbers = {
    adoptions: 2500,
    shelters: 150,
    families: 1800
  };

  const values = [
    {
      icon: Heart,
      title: "Amor Incondicional",
      description: "Creemos que cada mascota merece amor y cada familia merece la compañía perfecta.",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Adopción Responsable",
      description: "Facilitamos procesos seguros que garantizan el bienestar de nuestros amigos peludos.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Comunidad Unida",
      description: "Conectamos refugios, voluntarios y adoptantes en una red de esperanza.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const achievements = [
    "Más de 2,500 adopciones exitosas",
    "Presencia en toda Bolivia",
    "Red de 150+ refugios aliados",
    "Tecnología de matching inteligente",
    "Soporte 24/7 para adoptantes"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animar contadores
          Object.keys(finalNumbers).forEach((key) => {
            let current = 0;
            const increment = finalNumbers[key] / 100;
            const timer = setInterval(() => {
              current += increment;
              if (current >= finalNumbers[key]) {
                current = finalNumbers[key];
                clearInterval(timer);
              }
              setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
            }, 20);
          });
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('about-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#264653] via-[#2a4d5a] to-[#1e3a46] text-white py-20"
    >
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Patrones flotantes */}
        <div className="absolute top-1/4 right-1/4 animate-float">
          <PawPrint className="w-12 h-12 text-white/5" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-float delay-1000">
          <Heart className="w-10 h-10 text-white/5" />
        </div>
        <div className="absolute top-1/3 left-1/6 animate-float delay-2000">
          <Sparkles className="w-8 h-8 text-white/5" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Contenido principal */}
          <div className={`w-full lg:w-3/5 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            
            {/* Header de la sección */}
            <div className="text-center lg:text-left mb-12">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="font-semibold text-white/90">Nuestra Historia</span>
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Conectamos
                </span>
                <span className="block text-white">
                  corazones con patas
                </span>
              </h2>
            </div>

            {/* Descripción principal */}
            <div className="space-y-6 mb-12 text-center lg:text-left">
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                En <span className="font-bold text-cyan-400">MatchPet</span>, creemos que cada mascota merece un hogar lleno de amor 
                <Home className="inline w-5 h-5 mx-1 text-yellow-400" /> 
                y que cada persona merece encontrar a su compañero perfecto.
              </p>
              
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                Nacimos con la misión de <span className="font-semibold text-pink-400">conectar corazones</span>: 
                unir a mascotas rescatadas con adoptantes responsables, de forma fácil, segura y llena de esperanza.
              </p>
              
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                Trabajamos junto a refugios y asociaciones, usando <span className="font-semibold text-green-400">tecnología inteligente</span> que 
                mejora las coincidencias y agiliza el proceso de adopción.
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 border border-pink-500/30">
                  <Heart className="w-8 h-8 text-pink-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{counters.adoptions.toLocaleString()}+</div>
                <div className="text-sm text-blue-200">Adopciones</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{counters.shelters}+</div>
                <div className="text-sm text-blue-200">Refugios</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 border border-green-500/30">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{counters.families.toLocaleString()}+</div>
                <div className="text-sm text-blue-200">Familias</div>
              </div>
            </div>

            {/* Lista de logros */}
            <div className="space-y-3 mb-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 transform transition-all duration-500 delay-${index * 100} ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{achievement}</span>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <Target className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Nuestra Misión
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
                <Award className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ver Impacto
              </button>
            </div>
          </div>

          {/* Logo y valores */}
          <div className={`w-full lg:w-2/5 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            
            {/* Logo principal mejorado */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <Image
                  src="/Logo/logo2.png"
                  alt="MatchPet Logo"
                  width={300}
                  height={300}
                  className="object-contain w-full h-auto"
                  priority
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  ¡Confiable desde 2025!
                </div>
              </div>
            </div>

            {/* Valores core */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-white mb-6">
                Nuestros Valores
              </h3>
              
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={index}
                    className={`group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">{value.title}</h4>
                        <p className="text-blue-100 text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer de la sección */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 px-8 py-4 rounded-full">
            <PawPrint className="w-6 h-6 text-pink-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Somos MatchPet
            </span>
            <Heart className="w-6 h-6 text-pink-400 fill-current animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}