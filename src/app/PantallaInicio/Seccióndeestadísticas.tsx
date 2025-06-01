'use client';

import React, { useEffect, useState } from 'react';
import { 
  Heart, 
  Home, 
  Users, 
  Target, 
  Sparkles, 
  TrendingUp, 
  Award,
  PawPrint,
  Star,
  CheckCircle,
  ArrowUp
} from 'lucide-react';

const stats = [
  {
    value: 1200,
    label: 'Mascotas Adoptadas',
    icon: Heart,
    description: "Cada mascota adoptada significa una vida transformada y una familia más feliz.",
    percentage: 80,
    progressColor: 'from-pink-500 to-red-500',
    bgGradient: 'from-pink-50 to-red-50',
    iconColor: 'text-pink-600',
    trend: '+15%',
    suffix: '+',
    category: 'Adopciones'
  },
  {
    value: 150,
    label: 'Refugios Asociados',
    icon: Home,
    description: "Una red sólida de refugios comprometidos con el bienestar animal.",
    percentage: 65,
    progressColor: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-600',
    trend: '+8%',
    suffix: '+',
    category: 'Red'
  },
  {
    value: 15000,
    label: 'Miembros Activos',
    icon: Users,
    description: "Una comunidad comprometida que crece día a día con nuevos miembros.",
    percentage: 90,
    progressColor: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
    iconColor: 'text-green-600',
    trend: '+25%',
    suffix: '+',
    category: 'Comunidad'
  },
  {
    value: 2500,
    label: 'Historias de Éxito',
    icon: Target,
    description: "Miles de historias felices que nos motivan a seguir adelante.",
    percentage: 95,
    progressColor: 'from-purple-500 to-indigo-500',
    bgGradient: 'from-purple-50 to-indigo-50',
    iconColor: 'text-purple-600',
    trend: '+20%',
    suffix: '+',
    category: 'Impacto'
  },
];

const achievements = [
  { icon: Award, label: "Mejor Plataforma 2024", color: "text-yellow-500" },
  { icon: Star, label: "5 estrellas promedio", color: "text-yellow-500" },
  { icon: CheckCircle, label: "Certificado de Calidad", color: "text-green-500" },
  { icon: TrendingUp, label: "Crecimiento del 300%", color: "text-blue-500" }
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const [animatedPercentages, setAnimatedPercentages] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animar números
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.value / 100;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              setAnimatedValues(prev => {
                const newValues = [...prev];
                newValues[index] = Math.floor(current);
                return newValues;
              });
            }, 20);
          });

          // Animar porcentajes de progreso
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.percentage / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.percentage) {
                current = stat.percentage;
                clearInterval(timer);
              }
              setAnimatedPercentages(prev => {
                const newValues = [...prev];
                newValues[index] = Math.floor(current);
                return newValues;
              });
            }, 40);
          });
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
  };

  return (
    <section 
      id="stats-section"
      className="relative min-h-screen py-20 bg-gradient-to-br from-[#30588C] via-[#6093BF] to-[#254559] text-white overflow-hidden"
    >
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Patrones flotantes */}
        <div className="absolute top-1/4 right-1/5 animate-float">
          <PawPrint className="w-16 h-16 text-white/10" />
        </div>
        <div className="absolute bottom-1/4 left-1/6 animate-float delay-1000">
          <Heart className="w-12 h-12 text-white/10" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float delay-2000">
          <Sparkles className="w-14 h-14 text-white/10" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header mejorado */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-white/90">Nuestro Impacto</span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent">
              Cifras que llenan
            </span>
            <span className="block text-white">
              el corazón
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Cada número representa una <span className="font-semibold text-cyan-400">historia real</span>, 
            una <span className="font-semibold text-pink-400">vida transformada</span> y un 
            <span className="font-semibold text-yellow-400"> futuro más brillante</span> para nuestros amigos peludos.
          </p>

          {/* Logros destacados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={index}
                  className="group text-center"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                    <IconComponent className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <div className="text-xs text-white/80">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid de estadísticas mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                
                {/* Tarjeta principal */}
                <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-3xl hover:scale-105 hover:-translate-y-2">
                  
                  {/* Fondo gradiente sutil */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  
                  {/* Badge de categoría */}
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50">
                    <span className="text-xs font-semibold text-gray-700">{stat.category}</span>
                  </div>

                  {/* Trend indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                    <ArrowUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-bold text-green-700">{stat.trend}</span>
                  </div>

                  {/* Icono principal */}
                  <div className="relative z-10 mb-6 pt-4">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                      <IconComponent className={`w-10 h-10 ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Número principal */}
                  <div className="relative z-10 text-center mb-6">
                    <div className="text-4xl lg:text-5xl font-black text-gray-800 mb-2">
                      {formatNumber(animatedValues[index])}{stat.suffix}
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-3">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Barra de progreso mejorada */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-600">Progreso</span>
                      <span className="text-xs font-bold text-gray-800">{animatedPercentages[index]}%</span>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.progressColor} rounded-full transition-all duration-1000 ease-out relative`}
                        style={{ width: `${animatedPercentages[index]}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out"></div>
                </div>

                {/* Elementos decorativos flotantes */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Star className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer de la sección */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full">
            <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
            <span className="text-lg font-semibold text-white">
              Cada número cuenta una historia de amor
            </span>
            <PawPrint className="w-6 h-6 text-cyan-400" />
          </div>
          
          <p className="text-blue-200 mt-4 max-w-md mx-auto">
            Únete a nosotros y sé parte de estas estadísticas que cambian vidas
          </p>
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
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}