'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Briefcase, 
  Heart, 
  Users, 
  Award, 
  MapPin, 
  Calendar,
  Star,
  Shield,
  PawPrint,
  Home,
  Sparkles,
  MessageCircle,
  CheckCircle,
  UserCheck
} from 'lucide-react';
import Image from 'next/image';

type Filter = 'Adoptantes' | 'Refugios' | 'Voluntarios' | 'Veterinarios';

interface CommunityMember {
  name: string;
  experience: string;
  image: string;
  location: string;
  joinDate: string;
  stats: {
    adoptions?: number;
    reviews?: number;
    experience?: string;
    speciality?: string;
  };
  badge?: string;
  isVerified?: boolean;
}

const filters: { key: Filter; label: string; icon: any; color: string }[] = [
  { key: 'Adoptantes', label: 'Adoptantes', icon: Heart, color: 'from-pink-500 to-red-500' },
  { key: 'Refugios', label: 'Refugios', icon: Home, color: 'from-blue-500 to-cyan-500' },
  { key: 'Voluntarios', label: 'Voluntarios', icon: Users, color: 'from-green-500 to-emerald-500' },
  { key: 'Veterinarios', label: 'Veterinarios', icon: Shield, color: 'from-purple-500 to-indigo-500' }
];

const communityData: Record<Filter, CommunityMember[]> = {
  Adoptantes: [
    {
      name: 'Dr. Jenny Wilson',
      experience: '20+ Años de Experiencia',
      image: '/Adoptante/Adoptante3.webp',
      location: 'La Paz, Bolivia',
      joinDate: '2020',
      stats: { adoptions: 5, reviews: 4.9 },
      badge: 'Adoptante Estrella',
      isVerified: true
    },
    {
      name: 'Dr. Jacob Jones',
      experience: 'Nuevo Adoptante',
      image: '/Adoptante/m_immedicohospitalario_estudio_asegura_perros_47965_04115049.jpg',
      location: 'Cochabamba, Bolivia',
      joinDate: '2024',
      stats: { adoptions: 1, reviews: 5.0 },
      badge: 'Principiante',
      isVerified: true
    },
    {
      name: 'Esther Howard',
      experience: 'Adoptante Comprometida',
      image: '/Adoptante/f.elconfidencial.com_original_63b_ccb_f29_63bccbf29136809df1e776621df0362a.jpg',
      location: 'Santa Cruz, Bolivia',
      joinDate: '2021',
      stats: { adoptions: 3, reviews: 4.8 },
      badge: 'Familia Activa',
      isVerified: true
    },
    {
      name: 'Wade Warren',
      experience: 'Especialista en Rescate',
      image: '/Adoptante/e6e6bf39-1ce3-4cee-8653-050a86630099_16-9-discover-aspect-ratio_default_0.jpg',
      location: 'Tarija, Bolivia',
      joinDate: '2019',
      stats: { adoptions: 8, reviews: 4.9 },
      badge: 'Héroe de Rescate',
      isVerified: true
    }
  ],
  Refugios: [
    {
      name: 'Refugio Esperanza',
      experience: 'Refugio Certificado',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
      location: 'La Paz, Bolivia',
      joinDate: '2018',
      stats: { adoptions: 450, reviews: 4.8 },
      badge: 'Refugio Premier',
      isVerified: true
    },
    {
      name: 'Casa de Amor Animal',
      experience: 'Organización sin fines de lucro',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      location: 'Cochabamba, Bolivia',
      joinDate: '2020',
      stats: { adoptions: 280, reviews: 4.9 },
      badge: 'Refugio Confiable',
      isVerified: true
    }
  ],
  Voluntarios: [
    {
      name: 'María González',
      experience: 'Voluntaria Senior',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face',
      location: 'La Paz, Bolivia',
      joinDate: '2021',
      stats: { experience: '3 años', speciality: 'Cuidado' },
      badge: 'Voluntaria Destacada',
      isVerified: true
    },
    {
      name: 'Carlos Mendoza',
      experience: 'Coordinador de Eventos',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      location: 'Santa Cruz, Bolivia',
      joinDate: '2022',
      stats: { experience: '2 años', speciality: 'Eventos' },
      badge: 'Organizador',
      isVerified: true
    }
  ],
  Veterinarios: [
    {
      name: 'Dr. Ana Rodríguez',
      experience: 'Veterinaria Especialista',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      location: 'La Paz, Bolivia',
      joinDate: '2019',
      stats: { experience: '15 años', speciality: 'Cirugía' },
      badge: 'Especialista',
      isVerified: true
    },
    {
      name: 'Dr. Luis Paredes',
      experience: 'Veterinario General',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      location: 'Cochabamba, Bolivia',
      joinDate: '2020',
      stats: { experience: '8 años', speciality: 'General' },
      badge: 'Veterinario',
      isVerified: true
    }
  ]
};

const communityStats = [
  { icon: Users, number: "15,000+", label: "Miembros activos", color: "text-blue-600" },
  { icon: Heart, number: "2,500+", label: "Adopciones exitosas", color: "text-pink-600" },
  { icon: Home, number: "150+", label: "Refugios aliados", color: "text-green-600" },
  { icon: Award, number: "98%", label: "Satisfacción", color: "text-purple-600" }
];

export default function CommunitySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Adoptantes');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('community-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const currentMembers = communityData[activeFilter] || [];

  return (
    <section 
      id="community-section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20"
    >
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Patrones flotantes */}
        <div className="absolute top-1/4 right-1/5 animate-float">
          <Users className="w-12 h-12 text-blue-200/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/6 animate-float delay-1000">
          <Heart className="w-10 h-10 text-pink-200/30" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float delay-2000">
          <PawPrint className="w-8 h-8 text-green-200/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header mejorado */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-700">Nuestra Comunidad</span>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-[#30588C] via-[#BF3952] to-purple-600 bg-clip-text text-transparent">
              Conoce a las personas
            </span>
            <span className="block text-gray-800">
              que hacen la diferencia
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Nuestra comunidad está formada por <span className="font-semibold text-[#30588C]">personas increíbles</span> que 
            comparten el amor por los animales: adoptantes, refugios, voluntarios y veterinarios trabajando juntos.
          </p>

          {/* Estadísticas de la comunidad */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {communityStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="group text-center"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-gray-200/50">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filtros mejorados */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            const isActive = activeFilter === filter.key;
            
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`group relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#30588C] to-[#BF3952] text-white shadow-xl'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-[#30588C] shadow-lg border border-gray-200/50'
                }`}
              >
                <IconComponent className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`} />
                {filter.label}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid de miembros mejorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentMembers.map((member, index) => (
            <div
              key={`${activeFilter}-${index}-${member.name}`}
              className={`group relative bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              
              {/* Imagen con overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={member.image}
                  alt={`Imagen de ${member.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 4}
                />
                
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge de verificación */}
                {member.isVerified && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
                
                {/* Badge de categoría */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/50">
                  <span className="text-xs font-semibold text-gray-700">{member.badge}</span>
                </div>

                {/* Información adicional en hover */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  hoveredMember === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button className="bg-white/90 backdrop-blur-sm text-[#30588C] px-6 py-3 rounded-2xl font-semibold shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105">
                    Ver perfil completo
                  </button>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-[#30588C] transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{member.experience}</p>
                    
                    {/* Ubicación y fecha */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Desde {member.joinDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {member.stats.adoptions !== undefined && (
                    <div className="text-center p-2 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl">
                      <div className="text-lg font-bold text-pink-600">{member.stats.adoptions}</div>
                      <div className="text-xs text-gray-600">Adopciones</div>
                    </div>
                  )}
                  {member.stats.reviews !== undefined && (
                    <div className="text-center p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-lg font-bold text-orange-600">{member.stats.reviews}</span>
                      </div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  )}
                  {member.stats.experience && (
                    <div className="text-center p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <div className="text-sm font-bold text-blue-600">{member.stats.experience}</div>
                      <div className="text-xs text-gray-600">Experiencia</div>
                    </div>
                  )}
                  {member.stats.speciality && (
                    <div className="text-center p-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                      <div className="text-sm font-bold text-purple-600">{member.stats.speciality}</div>
                      <div className="text-xs text-gray-600">Especialidad</div>
                    </div>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-[#30588C] to-blue-600 hover:from-[#254559] hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Contactar
                  </button>
                  <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#BF3952] to-pink-600 hover:from-[#8B2B3B] hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <UserCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Únete a la comunidad
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-[#30588C]/20 text-[#30588C] hover:bg-[#30588C] hover:text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Ver todos los miembros
            </button>
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