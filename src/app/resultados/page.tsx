'use client';

import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  PawPrint, 
  Home, 
  RefreshCw, 
  Share2, 
  Download, 
  Heart,
  Star,
  Calendar,
  User,
  MapPin,
  Clock,
  Award,
  Sparkles,
  Activity,
  Shield,
  Users,
  Target
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import HeaderMain from '@/components/layout/HeaderMain';

// Función para generar mascotas recomendadas basadas en las respuestas del test
const generarMascotasRecomendadas = (respuestas: {[key: string]: string}) => {
  const mascotas = [
    {
      id: 1,
      nombre: "Luna",
      tipo: "Gato",
      edad: "2 años",
      tamaño: "Mediano",
      personalidad: "Tranquila y cariñosa",
      imagen: "/mascotas/gato1.jpg",
      refugio: "Refugio Esperanza",
      caracteristicas: ["Independiente", "Cariñosa", "Ideal para departamentos"]
    },
    {
      id: 2,
      nombre: "Max",
      tipo: "Perro",
      edad: "3 años",
      tamaño: "Mediano",
      personalidad: "Juguetón y leal",
      imagen: "/mascotas/perro1.jpg",
      refugio: "Casa de Amor Animal",
      caracteristicas: ["Energético", "Protector", "Necesita ejercicio diario"]
    },
    {
      id: 3,
      nombre: "Mia",
      tipo: "Gato",
      edad: "1 año",
      tamaño: "Pequeño",
      personalidad: "Activa y curiosa",
      imagen: "/mascotas/gato2.jpg",
      refugio: "Refugio Patitas",
      caracteristicas: ["Juguetona", "Sociable", "Perfecta para familias"]
    },
    {
      id: 4,
      nombre: "Rocky",
      tipo: "Perro",
      edad: "5 años",
      tamaño: "Grande",
      personalidad: "Tranquilo y protector",
      imagen: "/mascotas/perro2.jpg",
      refugio: "Hogar Animal",
      caracteristicas: ["Maduro", "Protector", "Ideal para casas con patio"]
    },
    {
      id: 5,
      nombre: "Bella",
      tipo: "Perro",
      edad: "6 meses",
      tamaño: "Pequeño",
      personalidad: "Enérgica y cariñosa",
      imagen: "/mascotas/perro3.jpg",
      refugio: "Refugio Esperanza",
      caracteristicas: ["Cachorra", "Muy activa", "Necesita entrenamiento"]
    },
    {
      id: 6,
      nombre: "Simba",
      tipo: "Gato",
      edad: "4 años",
      tamaño: "Grande",
      personalidad: "Independiente y sereno",
      imagen: "/mascotas/gato3.jpg",
      refugio: "Casa de Amor Animal",
      caracteristicas: ["Maduro", "Independiente", "Perfecto para personas ocupadas"]
    }
  ];

  // Algoritmo de compatibilidad basado en las respuestas
  const mascotasFiltradas = mascotas.map(mascota => {
    let compatibilidad = 50; // Base de compatibilidad

    // Filtro por preferencia de animal
    if (respuestas.preferencia_animal) {
      if (respuestas.preferencia_animal === mascota.tipo) {
        compatibilidad += 25;
      } else if (respuestas.preferencia_animal === 'Ambos me gustan') {
        compatibilidad += 15;
      } else if (respuestas.preferencia_animal === 'No estoy seguro/a') {
        compatibilidad += 10;
      }
    }

    // Filtro por tamaño
    if (respuestas.tamaño_preferido) {
      const tamaño = respuestas.tamaño_preferido;
      if (tamaño.includes('Pequeño') && mascota.tamaño === 'Pequeño') compatibilidad += 20;
      if (tamaño.includes('Mediano') && mascota.tamaño === 'Mediano') compatibilidad += 20;
      if (tamaño.includes('Grande') && mascota.tamaño === 'Grande') compatibilidad += 20;
      if (tamaño.includes('Sin preferencia')) compatibilidad += 10;
    }

    // Filtro por espacio exterior
    if (respuestas.espacio_exterior) {
      if (respuestas.espacio_exterior.includes('patio grande') && mascota.tipo === 'Perro') {
        compatibilidad += 15;
      }
      if (respuestas.espacio_exterior.includes('No tengo') && mascota.tipo === 'Gato') {
        compatibilidad += 10;
      }
    }

    // Filtro por experiencia
    if (respuestas.experiencia) {
      if (respuestas.experiencia === 'Mucha experiencia') {
        compatibilidad += 10;
      } else if (respuestas.experiencia === 'Soy principiante' && mascota.edad.includes('años')) {
        compatibilidad += 15; // Mascotas adultas para principiantes
      }
    }

    // Filtro por edad preferida
    if (respuestas.edad_preferida) {
      if (respuestas.edad_preferida === 'Cachorro/Gatito' && (mascota.edad.includes('meses') || parseInt(mascota.edad) <= 1)) {
        compatibilidad += 20;
      } else if (respuestas.edad_preferida === 'Adulto' && parseInt(mascota.edad) >= 2) {
        compatibilidad += 15;
      } else if (respuestas.edad_preferida === 'Senior' && parseInt(mascota.edad) >= 7) {
        compatibilidad += 25;
      }
    }

    // Filtro por actividad física
    if (respuestas.actividad_fisica) {
      if (respuestas.actividad_fisica.includes('Más de 2 horas') && mascota.personalidad.includes('Juguetón')) {
        compatibilidad += 20;
      } else if (respuestas.actividad_fisica.includes('Menos de 30') && mascota.personalidad.includes('Tranquil')) {
        compatibilidad += 20;
      }
    }

    // Filtro por otras mascotas
    if (respuestas.otras_mascotas) {
      if (respuestas.otras_mascotas === 'No tengo mascotas') {
        compatibilidad += 5; // Cualquier mascota es buena para empezar
      } else if (respuestas.otras_mascotas.includes(mascota.tipo.toLowerCase())) {
        compatibilidad += 15; // Ya tiene experiencia con ese tipo
      }
    }

    // Filtro por horas fuera de casa
    if (respuestas.horas_fuera) {
      if (respuestas.horas_fuera.includes('Más de 8') && mascota.tipo === 'Gato') {
        compatibilidad += 15; // Gatos son más independientes
      } else if (respuestas.horas_fuera.includes('Menos de 4') && mascota.tipo === 'Perro') {
        compatibilidad += 10; // Perros necesitan más atención
      }
    }

    return {
      ...mascota,
      compatibilidad: Math.min(Math.max(compatibilidad, 40), 98) // Entre 40% y 98%
    };
  }).sort((a, b) => b.compatibilidad - a.compatibilidad);

  return mascotasFiltradas.slice(0, 4); // Devolver las 4 mejores coincidencias
};

export default function ResultadoPage() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    fotoPerfil: '/Perfil/Usuario1.jpeg',
  });
  const [respuestasTest, setRespuestasTest] = useState<{[key: string]: string}>({});
  const [fechaTest, setFechaTest] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [mascotasRecomendadas, setMascotasRecomendadas] = useState<any[]>([]);

  useEffect(() => {
    // Cargar datos del usuario
    const nombre = localStorage.getItem('nombreUsuario') || 'Usuario';
    const foto = localStorage.getItem('fotoPerfil');
    setUsuario({
      nombre,
      fotoPerfil: foto && foto.trim() !== '' ? foto : '/Perfil/Usuario1.jpeg',
    });

    // Cargar respuestas del test
    const testData = localStorage.getItem('matchpet_test_respuestas');
    if (testData) {
      try {
        const data = JSON.parse(testData);
        const respuestas = data.respuestas || {};
        setRespuestasTest(respuestas);
        setFechaTest(new Date(data.timestamp).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }));

        // Generar mascotas recomendadas basadas en las respuestas
        const mascotas = generarMascotasRecomendadas(respuestas);
        setMascotasRecomendadas(mascotas);
      } catch (error) {
        console.error('Error loading test data:', error);
      }
    }

    setLoading(false);
  }, []);

  // Mapeo de respuestas con íconos y descripciones mejoradas
  const preferenciasCompletas = [
    { 
      key: 'vivienda', 
      titulo: 'Tipo de vivienda', 
      icon: Home,
      valor: respuestasTest.vivienda || 'No especificado',
      categoria: 'Hogar'
    },
    { 
      key: 'espacio_exterior', 
      titulo: 'Espacio exterior', 
      icon: MapPin,
      valor: respuestasTest.espacio_exterior || 'No especificado',
      categoria: 'Hogar'
    },
    { 
      key: 'horas_fuera', 
      titulo: 'Horas fuera de casa', 
      icon: Clock,
      valor: respuestasTest.horas_fuera || 'No especificado',
      categoria: 'Estilo de vida'
    },
    { 
      key: 'preferencia_animal', 
      titulo: 'Preferencia de animal', 
      icon: PawPrint,
      valor: respuestasTest.preferencia_animal || 'No especificado',
      categoria: 'Preferencias'
    },
    { 
      key: 'experiencia', 
      titulo: 'Experiencia previa', 
      icon: Award,
      valor: respuestasTest.experiencia || 'No especificado',
      categoria: 'Experiencia'
    },
    { 
      key: 'personalidad_ideal', 
      titulo: 'Personalidad ideal', 
      icon: Heart,
      valor: respuestasTest.personalidad_ideal || 'No especificado',
      categoria: 'Personalidad'
    },
    { 
      key: 'otras_mascotas', 
      titulo: 'Otras mascotas en casa', 
      icon: Users,
      valor: respuestasTest.otras_mascotas || 'No especificado',
      categoria: 'Convivencia'
    },
    { 
      key: 'alergias', 
      titulo: 'Alergias o restricciones', 
      icon: Shield,
      valor: respuestasTest.alergias || 'Ninguna especificada',
      categoria: 'Salud'
    },
    { 
      key: 'tamaño_preferido', 
      titulo: 'Tamaño preferido', 
      icon: Target,
      valor: respuestasTest.tamaño_preferido || 'No especificado',
      categoria: 'Características'
    },
    { 
      key: 'edad_preferida', 
      titulo: 'Edad preferida', 
      icon: Calendar,
      valor: respuestasTest.edad_preferida || 'No especificado',
      categoria: 'Características'
    },
    { 
      key: 'actividad_fisica', 
      titulo: 'Tiempo para ejercicio', 
      icon: Activity,
      valor: respuestasTest.actividad_fisica || 'No especificado',
      categoria: 'Estilo de vida'
    },
    { 
      key: 'motivacion', 
      titulo: 'Motivación para adoptar', 
      icon: Star,
      valor: respuestasTest.motivacion || 'No especificado',
      categoria: 'Motivación'
    }
  ];

  const compartirResultados = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mis resultados de MatchPet',
        text: `¡Acabo de completar mi test de compatibilidad en MatchPet! Mi mejor coincidencia tiene ${mascotasRecomendadas[0]?.compatibilidad}% de compatibilidad 🐾`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const descargarResultados = () => {
    // Simular descarga de PDF
    alert('Funcionalidad de descarga próximamente disponible');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderMain />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30588C] mx-auto mb-4"></div>
            <p className="text-gray-600">Analizando tus respuestas...</p>
          </div>
        </div>
      </div>
    );
  }

  const respuestasCompletadas = Object.keys(respuestasTest).length;
  const mejorCompatibilidad = mascotasRecomendadas[0]?.compatibilidad || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderMain />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header de Resultados */}
        <div className="bg-gradient-to-r from-[#30588C] to-[#6093BF] rounded-2xl p-8 text-white text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">¡Test Completado! 🎉</h1>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Hemos analizado tus {respuestasCompletadas} respuestas y encontrado las mejores coincidencias para ti
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>{usuario.nombre}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Completado el {fechaTest}</span>
            </div>
            {mejorCompatibilidad > 0 && (
              <div className="flex items-center space-x-2">
                <Sparkles size={16} />
                <span>Mejor match: {mejorCompatibilidad}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel Izquierdo - Perfil y Resumen */}
          <div className="lg:col-span-1 space-y-6">
            {/* Perfil del Usuario */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <Image
                    src={usuario.fotoPerfil}
                    alt="Foto perfil"
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-[#30588C]/20"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-3 border-white">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-[#30588C]">{usuario.nombre}</h2>
                <p className="text-gray-600 text-sm">Perfil de adopción completado</p>
              </div>

              {/* Acciones Rápidas */}
              <div className="space-y-3">
                <Button
                  onClick={compartirResultados}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 border-[#30588C]/30 text-[#30588C] hover:bg-[#30588C]/5"
                >
                  <Share2 size={18} />
                  <span>Compartir resultados</span>
                </Button>
                
                <Button
                  onClick={descargarResultados}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 border-[#BF3952]/30 text-[#BF3952] hover:bg-[#BF3952]/5"
                >
                  <Download size={18} />
                  <span>Descargar PDF</span>
                </Button>
              </div>
            </div>

            {/* Estadísticas del Test */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Test</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Respuestas completadas</span>
                  <span className="font-semibold text-[#30588C]">{respuestasCompletadas}/12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Coincidencias encontradas</span>
                  <span className="font-semibold text-[#BF3952]">{mascotasRecomendadas.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mejor compatibilidad</span>
                  <span className="font-semibold text-green-600">{mejorCompatibilidad}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completitud del perfil</span>
                  <span className="font-semibold text-blue-600">{Math.round((respuestasCompletadas/12)*100)}%</span>
                </div>
              </div>
            </div>

            {/* Análisis Rápido */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Análisis Rápido</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Tu preferencia:</strong> {respuestasTest.preferencia_animal || 'No especificado'}
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800">
                    <strong>Mejor para ti:</strong> {respuestasTest.tamaño_preferido || 'Cualquier tamaño'}
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-purple-800">
                    <strong>Tu estilo:</strong> {respuestasTest.actividad_fisica || 'Estilo moderado'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Central y Derecho - Contenido Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mascotas Recomendadas */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#30588C] flex items-center space-x-2">
                    <Sparkles className="text-[#BF3952]" />
                    <span>Tus Mejores Coincidencias</span>
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">Basado en tu test de compatibilidad personalizado</p>
                </div>
              </div>

              {mascotasRecomendadas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mascotasRecomendadas.map((mascota, index) => (
                    <div key={mascota.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="relative">
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <PawPrint size={40} className="text-gray-400" />
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className={`bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold ${
                            mascota.compatibilidad >= 90 ? 'text-green-600' :
                            mascota.compatibilidad >= 80 ? 'text-blue-600' :
                            mascota.compatibilidad >= 70 ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            {mascota.compatibilidad}% compatible
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-3 left-3">
                            <div className="bg-[#BF3952] text-white rounded-full px-2 py-1 text-xs font-bold">
                              #1 MATCH
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-800">{mascota.nombre}</h3>
                          <Heart size={18} className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p><strong>Tipo:</strong> {mascota.tipo}</p>
                          <p><strong>Edad:</strong> {mascota.edad}</p>
                          <p><strong>Tamaño:</strong> {mascota.tamaño}</p>
                          <p><strong>Personalidad:</strong> {mascota.personalidad}</p>
                          <p><strong>Refugio:</strong> {mascota.refugio}</p>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-1">Características clave:</p>
                          <div className="flex flex-wrap gap-1">
                            {mascota.caracteristicas.map((car: string, i: number) => (
                              <span key={i} className="text-xs bg-[#30588C]/10 text-[#30588C] px-2 py-1 rounded-full">
                                {car}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                          <Button
                            size="sm"
                            className="w-full bg-[#30588C] hover:bg-[#254559] text-white"
                          >
                            Ver perfil completo
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PawPrint size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No se pudieron generar recomendaciones. Completa el test para ver tus coincidencias.</p>
                </div>
              )}
            </div>

            {/* Resumen Detallado de Preferencias */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#30588C]">Tu Perfil Detallado de Adopción</h2>
                <Link href="/match">
                  <Button
                    size="sm"
                    className="bg-[#BF3952] hover:bg-[#a53044] text-white"
                  >
                    Editar respuestas
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preferenciasCompletas.map((item, index) => {
                  const IconComponent = item.icon;
                  const tieneRespuesta = item.valor !== 'No especificado' && item.valor !== 'Ninguna especificada';
                  
                  return (
                    <div key={index} className={`rounded-xl p-4 border transition-all duration-200 ${
                      tieneRespuesta 
                        ? 'bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] border-gray-200' 
                        : 'bg-gray-50 border-gray-100'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          tieneRespuesta ? 'bg-[#30588C]/10' : 'bg-gray-200'
                        }`}>
                          <IconComponent size={20} className={tieneRespuesta ? 'text-[#30588C]' : 'text-gray-400'} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-800 text-sm">{item.titulo}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              tieneRespuesta ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {item.categoria}
                            </span>
                          </div>
                          <p className={`text-sm mt-1 ${tieneRespuesta ? 'text-gray-700' : 'text-gray-400 italic'}`}>
                            {item.valor}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Acciones Principales */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Qué quieres hacer ahora?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/mascotas" className="group">
                  <div className="bg-gradient-to-br from-[#30588C] to-[#6093BF] text-white p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                    <PawPrint size={24} className="mx-auto mb-2" />
                    <p className="font-semibold text-sm">Explorar mascotas</p>
                  </div>
                </Link>
                
                <Link href="/match" className="group">
                  <div className="bg-gradient-to-br from-[#BF3952] to-[#d14a63] text-white p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                    <RefreshCw size={24} className="mx-auto mb-2" />
                    <p className="font-semibold text-sm">Repetir test</p>
                  </div>
                </Link>
                
                <Link href="/solicitudes" className="group">
                  <div className="bg-gradient-to-br from-[#6093BF] to-[#87ceeb] text-white p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                    <Star size={24} className="mx-auto mb-2" />
                    <p className="font-semibold text-sm">Mis solicitudes</p>
                  </div>
                </Link>
                
                <Link href="/dashboard" className="group">
                  <div className="bg-gradient-to-br from-[#254559] to-[#30588C] text-white p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                    <Home size={24} className="mx-auto mb-2" />
                    <p className="font-semibold text-sm">Ir al dashboard</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recomendaciones Personalizadas */}
            <div className="bg-gradient-to-br from-[#30588C]/5 to-[#BF3952]/5 rounded-2xl p-6 border border-[#30588C]/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Sparkles className="text-[#BF3952]" size={20} />
                <span>Consejos Personalizados</span>
              </h3>
              
              <div className="space-y-4">
                {/* 
                  ==============================================
                  SECCIÓN PARA CONSEJOS DINÁMICOS DESDE BD
                  ==============================================
                  Aquí puedes agregar la lógica para mostrar consejos
                  basados en las respuestas de la base de datos
                */}
                
                {/* Consejo basado en experiencia */}
                {respuestasTest.experiencia === 'Soy principiante' && (
                  <div className="bg-white/80 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">💡 Para principiantes</h4>
                    <p className="text-blue-700 text-sm">
                      Como eres nuevo en el cuidado de mascotas, te recomendamos considerar animales adultos que ya estén entrenados y tengan un temperamento estable.
                    </p>
                  </div>
                )}

                {/* Consejo basado en espacio */}
                {respuestasTest.espacio_exterior?.includes('No tengo') && (
                  <div className="bg-white/80 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">🏠 Espacio interior</h4>
                    <p className="text-green-700 text-sm">
                      Sin espacio exterior, los gatos o perros pequeños serían ideales. Asegúrate de tener juguetes y actividades para mantenerlos activos en casa.
                    </p>
                  </div>
                )}

                {/* Consejo basado en tiempo */}
                {respuestasTest.horas_fuera?.includes('Más de 8') && (
                  <div className="bg-white/80 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">⏰ Horario ocupado</h4>
                    <p className="text-purple-700 text-sm">
                      Con tu horario, los gatos o perros independientes serían perfectos. Considera también tener juguetes interactivos para cuando no estés.
                    </p>
                  </div>
                )}

                {/* Consejo basado en otras mascotas */}
                {respuestasTest.otras_mascotas?.includes('Sí') && (
                  <div className="bg-white/80 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-800 mb-2">🐕 Convivencia</h4>
                    <p className="text-orange-700 text-sm">
                      Ya tienes experiencia con mascotas. Busca animales que sean sociables y se lleven bien con otros para una integración exitosa.
                    </p>
                  </div>
                )}

                {/* Consejo general si no hay respuestas específicas */}
                {Object.keys(respuestasTest).length < 8 && (
                  <div className="bg-white/80 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">📋 Completa tu perfil</h4>
                    <p className="text-yellow-700 text-sm">
                      Para obtener mejores recomendaciones, considera completar todas las preguntas del test. ¡Cada respuesta nos ayuda a encontrar tu match perfecto!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Próximos Pasos */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 Próximos Pasos Recomendados</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#30588C] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-gray-800">Explora los perfiles detallados</h4>
                    <p className="text-gray-600 text-sm">Revisa las mascotas recomendadas y lee sus historias completas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#30588C] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-gray-800">Programa una visita al refugio</h4>
                    <p className="text-gray-600 text-sm">Conoce en persona a las mascotas que te interesan</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#30588C] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-gray-800">Prepara tu hogar</h4>
                    <p className="text-gray-600 text-sm">Asegúrate de tener todo lo necesario para recibir a tu nuevo amigo</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#BF3952] text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium text-gray-800">Inicia el proceso de adopción</h4>
                    <p className="text-gray-600 text-sm">Completa la solicitud oficial y dale un hogar a tu nueva mascota</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con Logo */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <Image
            src="/Logo/logo1.png"
            alt="Logo MatchPet"
            width={80}
            height={80}
            className="mx-auto opacity-60"
          />
          <p className="text-gray-500 text-sm mt-2">
            MatchPet - Conectando corazones con patas desde 2024
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-400">
            <span>Test completado con {respuestasCompletadas} respuestas</span>
            <span>•</span>
            <span>{mascotasRecomendadas.length} coincidencias encontradas</span>
            <span>•</span>
            <span>Algoritmo de compatibilidad v2.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}