'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Heart,
  Shield,
  Star,
  Users,
  Home,
  PawPrint,
  Sparkles
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Explora y elige",
    description: "Encuentra a tu compañero ideal entre las mascotas disponibles. Puedes filtrar por especie, edad, tamaño y compatibilidad.",
    bgGradient: "from-cyan-400 via-blue-500 to-[#30588C]",
    iconBg: "bg-gradient-to-r from-cyan-500 to-blue-600",
    number: "01",
    duration: "5-15 min",
    features: ["Filtros inteligentes", "Perfiles detallados", "Fotos HD"]
  },
  {
    icon: FileText,
    title: "Envía tu solicitud",
    description: "Una vez que encuentres a tu match, completa una breve solicitud de adopción para conocerte mejor.",
    bgGradient: "from-[#BF3952] via-pink-500 to-purple-600",
    iconBg: "bg-gradient-to-r from-[#BF3952] to-pink-600",
    number: "02",
    duration: "10-20 min",
    features: ["Formulario simple", "Proceso seguro", "Respuesta rápida"]
  },
  {
    icon: MessageSquare,
    title: "Evaluación y contacto",
    description: "El refugio revisará tu solicitud y se pondrá en contacto contigo para coordinar una entrevista o visita.",
    bgGradient: "from-emerald-400 via-green-500 to-teal-600",
    iconBg: "bg-gradient-to-r from-emerald-500 to-green-600",
    number: "03",
    duration: "1-3 días",
    features: ["Evaluación profesional", "Entrevista personal", "Visita al hogar"]
  },
  {
    icon: CheckCircle,
    title: "¡Tu nuevo compañero!",
    description: "¡Si todo sale bien, la adopción se concreta! Llevarás a casa a un nuevo miembro de tu familia.",
    bgGradient: "from-orange-400 via-amber-500 to-yellow-500",
    iconBg: "bg-gradient-to-r from-orange-500 to-amber-600",
    number: "04",
    duration: "¡Para siempre!",
    features: ["Documentación completa", "Apoyo continuo", "Nueva familia"]
  },
];

const stats = [
  { icon: Heart, number: "98%", label: "Satisfacción" },
  { icon: Clock, number: "7", label: "Días promedio" },
  { icon: Shield, number: "100%", label: "Seguro" },
  { icon: Users, number: "2.5K+", label: "Familias felices" }
];

export default function AdoptionProcess() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('adoption-section');
    if (section) observer.observe(section);

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <section 
      id="adoption-section"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-20 overflow-hidden"
    >
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Patrones flotantes */}
        <div className="absolute top-1/4 right-1/5 animate-float">
          <PawPrint className="w-12 h-12 text-blue-200/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/6 animate-float delay-1000">
          <Heart className="w-10 h-10 text-pink-200/30" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float delay-2000">
          <Home className="w-8 h-8 text-green-200/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-16 relative z-10">

        {/* Header mejorado */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-700">Proceso de Adopción</span>
            <Heart className="w-5 h-5 text-pink-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-[#30588C] via-[#BF3952] to-purple-600 bg-clip-text text-transparent">
              Tu nueva familia
            </span>
            <span className="block text-gray-800">
              te está esperando
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            En MatchPet, cada adopción es una historia de amor. Nuestro proceso está diseñado para 
            asegurar que tanto tú como tu nueva mascota sean <span className="font-semibold text-[#BF3952]">perfectamente compatibles</span>.
          </p>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
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
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pasos del proceso mejorados */}
        <div className="relative">
          
          {/* Línea de conexión animada */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#30588C] via-[#BF3952] to-purple-600 rounded-full animate-gradient-x"></div>
          </div>

          {/* Grid de pasos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;
              
              return (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  } ${isActive ? 'scale-105 z-10' : 'hover:scale-105'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  
                  {/* Tarjeta principal */}
                  <div className={`relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 overflow-hidden transition-all duration-500 ${
                    isActive ? 'shadow-2xl border-white/80' : 'hover:shadow-2xl'
                  }`}>
                    
                    {/* Fondo gradiente animado */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Número del paso */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-black text-gray-700">{step.number}</span>
                    </div>
                    
                    {/* Duración */}
                    <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50">
                      <span className="text-xs font-semibold text-gray-600">{step.duration}</span>
                    </div>

                    {/* Icono principal */}
                    <div className="relative z-10 mb-6 pt-8">
                      <div className={`w-20 h-20 ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                        isActive ? 'animate-pulse' : ''
                      }`}>
                        <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="relative z-10 text-center">
                      <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-[#30588C] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Características */}
                      <div className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Indicador de conexión */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 -right-4 w-8 h-8 bg-white rounded-full shadow-lg border-4 border-[#30588C] z-20 animate-pulse">
                        <ArrowRight className="w-4 h-4 text-[#30588C] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
              <div className="inline-flex flex-col sm:flex-row gap-4">
        <Link 
          href="/login"
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#BF3952] to-pink-600 hover:from-[#8B2B3B] hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Comenzar adopción
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
          
          <p className="text-gray-500 mt-6 max-w-md mx-auto">
            ¿Tienes preguntas? Nuestro equipo está aquí para ayudarte en cada paso del proceso.
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
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
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
