'use client';

import React, { useState, useEffect } from 'react';
import { Heart, XCircle, Undo2, Filter, MapPin, Star } from 'lucide-react';
import HeaderUsuario from '@/components/layout/HeaderUsuario';

const mascotasSimuladas = [
  {
    nombre: 'Luna',
    edad: '2 años',
    especie: 'Perro',
    raza: 'Labrador',
    descripcion: 'Juguetona, cariñosa y ama correr en el parque. Le encanta el agua y jugar con otros perros.',
    refugio: 'Refugio Amigo Fiel',
    compatibilidad: 92,
    imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face',
    personalidad: ['Juguetona', 'Cariñosa', 'Activa'],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    nombre: 'Michi',
    edad: '1 año',
    especie: 'Gato',
    raza: 'Angora',
    descripcion: 'Tranquilo, observador y le encanta dormir al sol. Perfecto compañero para momentos de calma.',
    refugio: 'Gatitos La Paz',
    compatibilidad: 88,
    imagen: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=face',
    personalidad: ['Tranquilo', 'Observador', 'Cariñoso'],
    color: 'from-purple-400 to-pink-500'
  },
  {
    nombre: 'Toby',
    edad: '3 años',
    especie: 'Perro',
    raza: 'Beagle',
    descripcion: 'Curioso, protector y muy amigable con niños. Un compañero leal para toda la familia.',
    refugio: 'Huellitas del Sur',
    compatibilidad: 95,
    imagen: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop&crop=face',
    personalidad: ['Protector', 'Amigable', 'Leal'],
    color: 'from-blue-400 to-cyan-500'
  }
];

export default function PantallaMatch() {
  const [indice, setIndice] = useState(0);
  const [historial, setHistorial] = useState([]);
  const [match, setMatch] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const mascota = mascotasSimuladas[indice];

  useEffect(() => {
    if (match) {
      const timer = setTimeout(() => setMatch(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [match]);

  const handleLike = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const nuevos = [...historial, mascota.nombre];
    setHistorial(nuevos);
    
    if (nuevos.length >= 2) {
      setMatch(mascota.nombre);
    }
    
    setTimeout(() => {
      pasar();
      setIsAnimating(false);
    }, 500);
  };

  const handleDislike = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      pasar();
      setIsAnimating(false);
    }, 500);
  };

  const pasar = () => {
    if (indice < mascotasSimuladas.length - 1) {
      setIndice(indice + 1);
    } else {
      setIndice(0);
      setHistorial([]);
    }
  };

  const deshacer = () => {
    if (indice > 0 && !isAnimating) {
      setIndice(indice - 1);
    }
  };

  return (
    <>
      <HeaderUsuario />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20 px-4 relative overflow-hidden">
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
          
          {/* Filtros laterales */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'} space-y-6`}>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5 text-[#30588C]" />
                <h3 className="text-xl font-bold text-[#30588C]">Filtros</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Especie</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#30588C]/20 transition-all">
                    <option>Todos</option>
                    <option>Perros</option>
                    <option>Gatos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Edad</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#30588C]/20 transition-all">
                    <option>Cualquier edad</option>
                    <option>Cachorro (0-1 año)</option>
                    <option>Joven (1-3 años)</option>
                    <option>Adulto (3+ años)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tamaño</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#30588C]/20 transition-all">
                    <option>Cualquier tamaño</option>
                    <option>Pequeño</option>
                    <option>Mediano</option>
                    <option>Grande</option>
                  </select>
                </div>

                <button className="w-full bg-gradient-to-r from-[#30588C] to-[#BF3952] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Aplicar filtros
                </button>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
              <h4 className="font-bold text-[#30588C] mb-4">Tus matches</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#BF3952] mb-2">{historial.length}</div>
                <div className="text-sm text-gray-600">mascotas favoritas</div>
              </div>
            </div>
          </aside>

          {/* Tarjeta principal */}
          <section className="flex-1 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#30588C] to-[#BF3952] bg-clip-text text-transparent mb-2">
                Encuentra tu mejor amigo
              </h1>
              <p className="text-gray-600">Desliza para conocer a tu compañero perfecto 🐾</p>
            </div>

            <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ${isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'}`}>
              
              {/* Imagen de la mascota */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={mascota.imagen}
                  alt={mascota.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${mascota.color} opacity-20`}></div>
                
                {/* Porcentaje de compatibilidad flotante */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-[#30588C]">{mascota.compatibilidad}%</span>
                  </div>
                </div>
              </div>

              {/* Información de la mascota */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#30588C]">{mascota.nombre}</h2>
                  <span className="text-lg text-gray-600">{mascota.edad}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{mascota.especie}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{mascota.raza}</span>
                </div>

                {/* Personalidad */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Personalidad</h4>
                  <div className="flex flex-wrap gap-2">
                    {mascota.personalidad.map((trait, idx) => (
                      <span key={idx} className="bg-gradient-to-r from-blue-100 to-purple-100 text-[#30588C] px-3 py-1 rounded-full text-sm font-medium">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{mascota.descripcion}</p>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{mascota.refugio}</span>
                </div>

                {/* Barra de compatibilidad mejorada */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Compatibilidad</span>
                    <span className="text-sm font-bold text-[#30588C]">{mascota.compatibilidad}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#30588C] to-[#BF3952] h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${mascota.compatibilidad}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles de acción */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={handleDislike}
                disabled={isAnimating}
                className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transform hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <XCircle className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={deshacer}
                disabled={isAnimating || indice === 0}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transform hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Undo2 className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={handleLike}
                disabled={isAnimating}
                className="w-16 h-16 bg-gradient-to-r from-[#BF3952] to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transform hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Heart className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </section>

          {/* Recomendaciones */}
          <aside className="lg:w-80 hidden lg:block space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-[#30588C] mb-6">Próximas recomendaciones</h3>
              <div className="space-y-4">
                {mascotasSimuladas.slice(indice + 1, indice + 4).map((pet, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <img src={pet.imagen} alt={pet.nombre} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{pet.nombre}</h4>
                      <p className="text-sm text-gray-600">{pet.raza}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#30588C]">{pet.compatibilidad}%</div>
                      <Star className="w-4 h-4 text-yellow-500 fill-current mx-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
              <h4 className="font-bold text-[#30588C] mb-4">💡 Consejos</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Considera el espacio de tu hogar</p>
                <p>• Piensa en tu estilo de vida</p>
                <p>• Evalúa el tiempo disponible</p>
                <p>• Considera otros miembros de la familia</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Botón flotante para filtros en móvil */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-[#30588C] to-[#BF3952] rounded-full shadow-lg flex items-center justify-center z-50"
        >
          <Filter className="w-6 h-6 text-white" />
        </button>

        {/* Notificación de match */}
        {match && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-[#30588C] mb-2">¡Es un Match!</h3>
              <p className="text-gray-600 mb-4">
                Tú y <span className="font-bold text-[#BF3952]">{match}</span> son una pareja perfecta
              </p>
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-[#30588C] to-[#BF3952] text-white font-semibold py-3 px-6 rounded-xl">
                  Ver perfil completo
                </button>
                <button
                  onClick={() => setMatch(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold"
                >
                  Seguir explorando
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </>
  );
}