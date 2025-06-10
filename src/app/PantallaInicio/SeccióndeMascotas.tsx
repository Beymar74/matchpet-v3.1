'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, MapPin, Calendar, Info } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

const pets = [
  {
    id: 1,
    name: 'Pelusa',
    age: '2 años',
    location: 'La Paz Centro',
    tags: ['Juguetón', 'Joven', 'Sociable'],
    imageSrc: '/Gatos/gatito4.jpg',
    alt: 'Un gato bonito llamado Pelusa',
    description: 'Pelusa es un gato muy juguetón que ama la compañía humana. Perfecto para familias con niños.',
    gender: 'Macho',
    vaccinated: true,
    sterilized: false
  },
  {
    id: 2,
    name: 'Kuro',
    age: '4 años',
    location: 'Sopocachi',
    tags: ['Tranquilo', 'Macho', 'Independiente'],
    imageSrc: '/Gatos/gatito8.jpg',
    alt: 'Un gato tranquilo llamado Kuro',
    description: 'Kuro es un compañero leal y tranquilo, ideal para personas que buscan una mascota relajada.',
    gender: 'Macho',
    vaccinated: true,
    sterilized: true
  },
  {
    id: 3,
    name: 'Iker',
    age: '3 años',
    location: 'Zona Sur',
    tags: ['Casa con Patio', 'Adulto', 'Activo'],
    imageSrc: '/Perros/perritos12.jpg',
    alt: 'Un perro llamado Iker que necesita casa con patio',
    description: 'Iker necesita espacio para correr y jugar. Un perro lleno de energía que busca una familia activa.',
    gender: 'Macho',
    vaccinated: true,
    sterilized: false
  },
  {
    id: 4,
    name: 'Susanita',
    age: '1.5 años',
    location: 'Miraflores',
    tags: ['Energética', 'Hembra', 'Cariñosa'],
    imageSrc: '/Perros/perritos15.jpg',
    alt: 'Una perra enérgica llamada Susanita',
    description: 'Susanita es una compañera llena de amor y energía. Le encanta jugar y recibir caricias.',
    gender: 'Hembra',
    vaccinated: false,
    sterilized: false
  },
];

export default function PetsSection() {
  const [selectedPet, setSelectedPet] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [imageError, setImageError] = useState<Set<number>>(new Set());

  const handleSelectPet = (petId: number) => {
    if (petId !== selectedPet) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedPet(petId);
        setIsAnimating(false);
      }, 200);
    }
  };

  const toggleFavorite = (petId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(petId)) {
        newFavorites.delete(petId);
      } else {
        newFavorites.add(petId);
      }
      return newFavorites;
    });
  };

  const handleImageError = (petId: number) => {
    setImageError(prev => new Set(prev).add(petId));
    console.error(`Error loading image for pet ${petId}`);
  };

  const currentPet = pets.find(pet => pet.id === selectedPet) || pets[0];

  // Auto-rotate pets every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPet(prev => {
        const currentIndex = pets.findIndex(pet => pet.id === prev);
        const nextIndex = (currentIndex + 1) % pets.length;
        return pets[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 md:px-8 md:py-16 bg-gradient-to-br from-[#1e3a5f] via-[#2a4d73] to-[#1a2f4a] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-200 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Encuentra tu Compañero Perfecto
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Cada mascota tiene una historia única y está esperando encontrar un hogar lleno de amor
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-start">
          {/* Featured Pet Image - CUADRO GRANDE QUE SE ACTUALIZA */}
          <div className="w-full xl:w-3/5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 aspect-[4/3] shadow-2xl group">
              <div className={`absolute inset-0 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {!imageError.has(currentPet.id) ? (
                  <img
                    key={currentPet.imageSrc}
                    src={currentPet.imageSrc}
                    alt={currentPet.alt}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(currentPet.id)}
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🐾</div>
                      <p className="text-white text-lg">{currentPet.name}</p>
                      <p className="text-gray-300 text-sm">Imagen no disponible</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Heart button */}
              <button
                onClick={(e) => toggleFavorite(currentPet.id, e)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 transform hover:scale-110 z-10"
                aria-label={`${favorites.has(currentPet.id) ? 'Quitar de' : 'Agregar a'} favoritos`}
              >
                <Heart 
                  className={`w-5 h-5 transition-colors ${
                    favorites.has(currentPet.id) ? 'fill-red-500 text-red-500' : 'text-white'
                  }`} 
                />
              </button>

              {/* Pet info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
                <div className="flex items-end justify-between">
                  <div className="flex-grow">
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                      {currentPet.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-blue-100">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{currentPet.age}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{currentPet.location}</span>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm md:text-base mb-3 line-clamp-2">
                      {currentPet.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentPet.tags.slice(0, 3).map(tag => (
                        <Badge
                          key={tag}
                          className="bg-blue-500/80 border-transparent text-white text-xs backdrop-blur-sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full p-3 ml-4 transition-all duration-300 transform hover:scale-110 shadow-lg">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Status indicators */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {currentPet.vaccinated && (
                  <Badge className="bg-green-500/90 border-transparent text-white text-xs backdrop-blur-sm">
                    Vacunado
                  </Badge>
                )}
                {currentPet.sterilized && (
                  <Badge className="bg-purple-500/90 border-transparent text-white text-xs backdrop-blur-sm">
                    Esterilizado
                  </Badge>
                )}
              </div>
            </div>

            {/* Pet navigation dots */}
            <div className="flex justify-center mt-6 gap-2">
              {pets.map(pet => (
                <button
                  key={pet.id}
                  onClick={() => handleSelectPet(pet.id)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    selectedPet === pet.id 
                      ? 'bg-blue-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Ver ${pet.name}`}
                />
              ))}
            </div>
          </div>

          {/* Pets List - LISTA DE SELECCIÓN */}
          <div className="w-full xl:w-2/5">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center xl:text-left bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Nuevas Mascotas Disponibles
              </h2>
              
              <div className="space-y-4">
                {pets.map(pet => {
                  const isSelected = selectedPet === pet.id;
                  const isFavorite = favorites.has(pet.id);
                  
                  return (
                    <div
                      key={pet.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      onClick={() => handleSelectPet(pet.id)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectPet(pet.id);
                        }
                      }}
                      className={`relative flex items-center p-4 rounded-xl border transition-all duration-300 transform cursor-pointer select-none group
                        ${isSelected
                          ? 'bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border-blue-400/50 shadow-xl scale-[1.02] backdrop-blur-sm'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:scale-[1.01] backdrop-blur-sm'
                        }
                      `}
                    >
                      {/* Pet thumbnail */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mr-4 flex-shrink-0 shadow-lg ring-2 ring-white/20">
                        {!imageError.has(pet.id) ? (
                          <img
                            src={pet.imageSrc}
                            alt={pet.alt}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={() => handleImageError(pet.id)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-600">
                            <span className="text-2xl">🐾</span>
                          </div>
                        )}
                      </div>

                      {/* Pet info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-base sm:text-lg text-white truncate">
                            {pet.name}
                          </h4>
                          {isFavorite && (
                            <Heart className="w-4 h-4 fill-red-500 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 mb-2 text-xs text-blue-100">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {pet.age}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {pet.location}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {pet.tags.slice(0, 2).map(tag => (
                            <Badge
                              key={tag}
                              className={`text-xs font-medium transition-colors ${
                                isSelected
                                  ? 'bg-blue-400/30 border-blue-300/50 text-blue-100'
                                  : 'bg-white/10 border-white/20 text-white/80'
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))}
                          {pet.tags.length > 2 && (
                            <Badge
                              className={`text-xs font-medium ${
                                isSelected
                                  ? 'bg-blue-400/30 border-blue-300/50 text-blue-100'
                                  : 'bg-white/10 border-white/20 text-white/80'
                              }`}
                            >
                              +{pet.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action button */}
                      <button
                        aria-label={`Ver detalles de ${pet.name}`}
                        className={`rounded-full p-2 transition-all duration-300 flex-shrink-0 ml-3 group-hover:scale-110 ${
                          isSelected 
                            ? 'bg-blue-500/50 text-white shadow-lg' 
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Call to action */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 rounded-xl border border-blue-400/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  <h3 className="font-semibold text-blue-100">¿Listo para adoptar?</h3>
                </div>
                <p className="text-sm text-blue-200/80 mb-3">
                  Contáctanos para conocer más sobre el proceso de adopción y los requisitos.
                </p>
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg" onClick={() => window.location.href = '/login'}>
                  Iniciar Adopción
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}