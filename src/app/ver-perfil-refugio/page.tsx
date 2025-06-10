'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Edit3, 
  Heart, 
  Home, 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  Shield, 
  Award, 
  Camera,
  Settings,
  MapPin,
  Clock,
  Trophy,
  PawPrint,
  TrendingUp,
  Activity,
  CheckCircle,
  Lock,
  ExternalLink
} from 'lucide-react';

// Importa tu header
import HeaderUsuario from '@/components/layout/HeaderRefugio';

const VerPerfilPage = () => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    correo: '',
    rol: '',
    telefono: '',
    fotoPerfil: '/Perfil/Usuario1.jpeg',
    fechaRegistro: '',
    ubicacion: 'La Paz, Bolivia',
    miembro: 'Premium'
  });

  const [estadisticas, setEstadisticas] = useState({
    matches: 12,
    favoritos: 8,
    visitas: 45,
    adopciones: 2
  });

  const [logros, setLogros] = useState([
    { nombre: 'Primer Match', icono: '🎯', completado: true, descripcion: 'Encontraste tu primera coincidencia' },
    { nombre: 'Amante de Mascotas', icono: '❤️', completado: true, descripcion: 'Marcaste 10 mascotas como favoritas' },
    { nombre: 'Explorador', icono: '🔍', completado: true, descripcion: 'Visitaste 25 perfiles de mascotas' },
    { nombre: 'Adopción Exitosa', icono: '🏆', completado: false, descripcion: 'Completa tu primera adopción' }
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) {
      setLoading(false);
      return;
    }
  
    fetch(`/api/usuario/${idUsuario}`)
      .then(res => res.json())
      .then(data => {
        setPerfil({
          nombre: data.nombre,
          correo: data.correo,
          telefono: data.telefono ?? 'No registrado',
          fotoPerfil: data.fotoPerfil ?? '/Perfil/Usuario1.jpeg',
          fechaRegistro: data.fechaRegistro ?? '01/06/2025',
          rol: data.rol,
          ubicacion: 'La Paz, Bolivia',
          miembro: 'Premium'
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar perfil:', error);
        setError('Error al cargar el perfil');
        setLoading(false);
      });
  }, []);

  const estadisticasData = [
    { 
      label: 'Matches', 
      value: estadisticas.matches, 
      icon: PawPrint, 
      color: 'from-blue-500 to-blue-600',
      bg: 'from-blue-50 to-blue-100'
    },
    { 
      label: 'Favoritos', 
      value: estadisticas.favoritos, 
      icon: Heart, 
      color: 'from-pink-500 to-rose-600',
      bg: 'from-pink-50 to-rose-100'
    },
    { 
      label: 'Visitas', 
      value: estadisticas.visitas, 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-600',
      bg: 'from-green-50 to-emerald-100'
    },
    { 
      label: 'Adopciones', 
      value: estadisticas.adopciones, 
      icon: Trophy, 
      color: 'from-amber-500 to-orange-600',
      bg: 'from-amber-50 to-orange-100'
    }
  ];

  const accionesRapidas = [
    {
      href: '/match',
      icon: PawPrint,
      label: 'Buscar Mascotas',
      description: 'Encuentra tu compañero ideal',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50'
    },
    {
      href: '/favoritos',
      icon: Heart,
      label: 'Ver Favoritos',
      description: 'Mascotas que te gustan',
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50'
    },
    {
      href: '/configuracion',
      icon: Settings,
      label: 'Configuración',
      description: 'Ajustes de tu cuenta',
      gradient: 'from-gray-500 to-slate-600',
      bgGradient: 'from-gray-50 to-slate-50'
    }
  ];

  if (loading) {
    return (
      <>
        <HeaderUsuario />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30588C] mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando perfil...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !perfil || !perfil.nombre) {
    return (
      <>
        <HeaderUsuario />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Error al cargar el perfil'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#30588C] text-white px-4 py-2 rounded-lg hover:bg-[#254559] transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <HeaderUsuario />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        
        {/* Elementos decorativos de fondo optimizados */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-full mx-auto px-4 py-8 relative z-10">
          
          {/* Tarjeta principal del perfil - Pantalla completa */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 hover:shadow-3xl transition-all duration-500">
            
            {/* Header de la tarjeta con gradiente mejorado */}
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-[#30588C]/5 to-[#BF3952]/5 rounded-2xl"></div>
              <div className="relative p-8">
                
                {/* Foto de perfil mejorada */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="relative group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#30588C] to-[#BF3952] rounded-full blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
                      <Image
                        src={perfil.fotoPerfil}
                        alt="Foto de perfil"
                        width={160}
                        height={160}
                        className="relative mx-auto rounded-full border-4 border-white shadow-2xl transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 right-3 w-10 h-10 bg-gradient-to-r from-[#BF3952] to-pink-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all duration-300 group">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    {/* Badge de estado mejorado */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {perfil.miembro}
                    </div>
                  </div>

                  {/* Información básica reorganizada */}
                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">{perfil.nombre}</h2>
                    
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-[#BF3952]/10 to-pink-500/10 px-4 py-2 rounded-full">
                        <Shield className="w-4 h-4 text-[#BF3952]" />
                        <span className="text-[#BF3952] font-semibold text-sm">{perfil.rol}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 rounded-full">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600 font-medium text-sm">{perfil.ubicacion}</span>
                      </div>
                    </div>
                    

                  </div>
                </div>
              </div>
            </div>

            {/* Información de contacto mejorada */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#30588C] to-blue-600 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Información Personal</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-blue-50 hover:to-indigo-50 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Email</p>
                      <p className="font-semibold text-gray-800 truncate">{perfil.correo}</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-green-50 hover:to-emerald-50 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Teléfono</p>
                      <p className="font-semibold text-gray-800">{perfil.telefono}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#BF3952] to-pink-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Información de Cuenta</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-purple-50 hover:to-violet-50 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Miembro desde</p>
                      <p className="font-semibold text-gray-800">{perfil.fechaRegistro}</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover:border-green-300 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green-600 font-medium">Estado</p>
                      <p className="font-bold text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Cuenta Verificada
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de acción - Solo Editar Perfil centrado */}
            <div className="flex justify-center">
              <Link href="/editar-perfil-refigio" className="group">
                <div className="bg-gradient-to-r from-[#30588C] to-blue-600 hover:from-[#254559] hover:to-blue-700 text-white p-8 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl cursor-pointer w-80">
                  <div className="flex items-center justify-between mb-4">
                    <Edit3 className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <ExternalLink className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Editar Perfil</h4>
                  <p className="text-blue-100">Actualiza tu información personal</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerPerfilPage;