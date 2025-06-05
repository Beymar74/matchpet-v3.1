'use client';

import React, { useEffect, useState } from 'react';
import { 
  Heart, 
  Users, 
  Gift, 
  Sparkles, 
  PawPrint,
  Home,
  HandHeart,
  DollarSign,
  Star,
  Calendar,
  MapPin,
  Clock,
  Check
} from 'lucide-react';
import Link from 'next/link';

const exploreOptions = [
  {
    title: "Adopta un Amigo",
    description: "Encuentra a tu compañero perfecto y dale un hogar lleno de amor.",
    icon: Heart,
    href: "/#pets",
    bgGradient: "from-pink-500 to-red-500",
    cardBg: "from-pink-50 to-red-50",
    iconBg: "bg-gradient-to-r from-pink-500 to-red-500",
    hoverColor: "hover:from-pink-600 hover:to-red-600",
    features: ["Perfiles detallados", "Matching inteligente", "Soporte 24/7"],
    stats: "2,500+ adopciones exitosas",
    badge: "Más Popular",
    time: "Proceso: 3-7 días",
    cta: "Buscar mascotas"
  },
  {
    title: "Sé Voluntario",
    description: "Únete a nuestro equipo y ayuda a cuidar mascotas y organizar eventos.",
    icon: Users,
    href: "/#contact",
    bgGradient: "from-blue-500 to-cyan-500",
    cardBg: "from-blue-50 to-cyan-50",
    iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
    hoverColor: "hover:from-blue-600 hover:to-cyan-600",
    features: ["Horarios flexibles", "Capacitación gratuita", "Comunidad activa"],
    stats: "500+ voluntarios activos",
    badge: "Impacto Social",
    time: "Compromiso: 4h/semana",
    cta: "Unirse ahora"
  },
  {
    title: "Haz una Donación",
    description: "Tu apoyo financiero ayuda a proporcionar alimento, refugio y atención médica.",
    icon: Gift,
    href: "/#donate",
    bgGradient: "from-green-500 to-emerald-500",
    cardBg: "from-green-50 to-emerald-50",
    iconBg: "bg-gradient-to-r from-green-500 to-emerald-500",
    hoverColor: "hover:from-green-600 hover:to-emerald-600",
    features: ["100% transparencia", "Impacto mensurable", "Certificado fiscal"],
    stats: "$50,000+ recaudados",
    badge: "Tax Deductible",
    time: "Desde: $10/mes",
    cta: "Donar ahora"
  }
];

const impactStats = [
  { icon: PawPrint, number: "15K+", label: "Vidas tocadas" },
  { icon: Home, number: "150+", label: "Refugios aliados" },
  { icon: Star, number: "4.9", label: "Rating promedio" }
];

export default function ExploreSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('explore-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="explore-section"
      className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/4 right-1/5 animate-float">
          <Heart className="w-12 h-12 text-pink-200/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/6 animate-float delay-1000">
          <HandHeart className="w-10 h-10 text-blue-200/30" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float delay-2000">
          <Sparkles className="w-8 h-8 text-purple-200/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header mejorado */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="font-semibold text-gray-700">Únete a la Familia</span>
            <Heart className="w-5 h-5 text-pink-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-[#30588C] via-[#BF3952] to-purple-600 bg-clip-text text-transparent">
              Hay muchas formas
            </span>
            <span className="block text-gray-800">
              de hacer la diferencia
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Cada acción cuenta, cada gesto importa. Descubre cómo puedes ser parte del cambio y 
            ayudar a crear <span className="font-semibold text-[#BF3952]">historias de amor</span> que duran para siempre.
          </p>

          {/* Estadísticas de impacto */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="group text-center"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-gray-200/50">
                    <IconComponent className="w-6 h-6 text-[#30588C]" />
                  </div>
                  <div className="text-lg font-bold text-gray-800">{stat.number}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid de opciones mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {exploreOptions.map((option, index) => {
            const IconComponent = option.icon;
            const isHovered = hoveredCard === index;
            return (
              <Link 
                key={index}
                href={option.href}
                className={`block group relative bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-4 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Fondo gradiente */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.cardBg} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
                
                {/* Badge flotante */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {option.badge}
                </div>
                
                {/* Contenido principal */}
                <div className="relative z-10 p-8">
                  {/* Icono principal */}
                  <div className="mb-6">
                    <div className={`w-20 h-20 ${option.iconBg} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Título y descripción */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#30588C] transition-colors duration-300">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  
                  {/* Información adicional */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        {option.time}
                      </div>
                      <div className="text-[#30588C] font-semibold">
                        {option.stats}
                      </div>
                    </div>
                    
                    {/* Características */}
                    <div className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Call to action */}
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r ${option.bgGradient} ${option.hoverColor} text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform group-hover:shadow-xl`}>
                      {index === 0 && <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                      {index === 1 && <HandHeart className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                      {index === 2 && <DollarSign className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                      {option.cta}
                    </div>
                  </div>
                </div>
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out"></div>
                
                {/* Elementos decorativos */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${option.iconBg} flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isHovered ? 'scale-110 animate-bounce' : 'scale-0'
                }`}>
                  <Star className="w-4 h-4 text-white" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to action final */}
        <div className={`text-center transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PawPrint className="w-8 h-8 text-[#30588C]" />
              <h3 className="text-2xl font-bold text-gray-800">¿Listo para comenzar?</h3>
              <Heart className="w-8 h-8 text-[#BF3952] fill-current animate-pulse" />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              No importa cómo elijas ayudar, cada acción hace la diferencia. 
              Únete a nuestra comunidad y sé parte del cambio que necesitan nuestros amigos peludos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/login"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#30588C] to-blue-600 hover:from-[#254559] hover:to-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Programar visita
              </Link>
            </div>
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