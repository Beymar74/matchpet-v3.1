"use client"

import React, { useState } from 'react';
import { Heart, X, Star, MapPin, Calendar, Weight, Award, Filter, ArrowLeft, ArrowRight, Camera, Phone, MessageCircle, Info } from 'lucide-react';
import HeaderUsuario from '@/components/layout/HeaderUsuario';

const MatchPetScreen = () => {
  const [currentPet, setCurrentPet] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [likedPets, setLikedPets] = useState([]);

  const pets = [
    {
      id: 1,
      name: "Luna",
      breed: "Labrador",
      age: "2 años",
      weight: "25 kg",
      gender: "Hembra",
      location: "Refugio Amigo Fiel",
      distance: "2.5 km",
      compatibility: 92,
      personality: ["Juguetona", "Cariñosa", "Activa"],
      description: "Luna es una perra muy cariñosa que ama jugar y estar con familia. Le encanta el agua y es perfecta para familias activas.",
      vaccinated: true,
      sterilized: true,
      images: ["/api/placeholder/400/500", "/api/placeholder/400/500", "/api/placeholder/400/500"]
    },
    {
      id: 2,
      name: "Max",
      breed: "Golden Retriever",
      age: "4 años",
      weight: "30 kg",
      gender: "Macho",
      location: "Refugio Santa Clara",
      distance: "1.8 km",
      compatibility: 88,
      personality: ["Tranquilo", "Protector", "Leal"],
      description: "Max es un perro muy tranquilo y protector, ideal para familias con niños. Es muy obediente y cariñoso.",
      vaccinated: true,
      sterilized: true,
      images: ["/api/placeholder/400/500", "/api/placeholder/400/500"]
    },
    {
      id: 3,
      name: "Bella",
      breed: "Pastor Alemán",
      age: "3 años",
      weight: "28 kg",
      gender: "Hembra",
      location: "Refugio Ciudad",
      distance: "3.2 km",
      compatibility: 85,
      personality: ["Inteligente", "Activa", "Guardiana"],
      description: "Bella es muy inteligente y activa. Necesita una familia que le dedique tiempo para ejercicio y entrenamiento.",
      vaccinated: true,
      sterilized: false,
      images: ["/api/placeholder/400/500"]
    }
  ];

  const nextPet = () => {
    setCurrentPet((prev) => (prev + 1) % pets.length);
  };

  const previousPet = () => {
    setCurrentPet((prev) => (prev - 1 + pets.length) % pets.length);
  };

  const handleLike = () => {
    setLikedPets([...likedPets, pets[currentPet].id]);
    nextPet();
  };

  const handlePass = () => {
    nextPet();
  };

  const pet = pets[currentPet];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <HeaderUsuario />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Encuentra tu compañero perfecto</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter size={20} />
              <span>Filtros</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm">
              <Heart size={16} className="text-red-500" />
              <span>{likedPets.length} favoritos</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Filtros Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros de búsqueda</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Especie</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Todos</option>
                    <option>Perros</option>
                    <option>Gatos</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Cualquier edad</option>
                    <option>Cachorro (0-1 año)</option>
                    <option>Joven (1-3 años)</option>
                    <option>Adulto (3-7 años)</option>
                    <option>Senior (7+ años)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Cualquier tamaño</option>
                    <option>Pequeño (0-10 kg)</option>
                    <option>Mediano (10-25 kg)</option>
                    <option>Grande (25+ kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distancia máxima</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Sin límite</option>
                    <option>2 km</option>
                    <option>5 km</option>
                    <option>10 km</option>
                    <option>20 km</option>
                  </select>
                </div>

                <button className="w-full bg-gradient-to-r from-red-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-fit">
              
              {/* Pet Image and Info Combined */}
              <div className="grid lg:grid-cols-5 gap-0">
                
                {/* Pet Image Section */}
                <div className="lg:col-span-3 relative h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    src={pet.images[0]} 
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Compatibility Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star size={16} fill="currentColor" />
                    <span>{pet.compatibility}% compatible</span>
                  </div>

                  {/* Navigation Arrows */}
                  <button 
                    onClick={previousPet}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button 
                    onClick={nextPet}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                  >
                    <ArrowRight size={20} />
                  </button>

                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {pet.images.map((_, index) => (
                      <div key={index} className="w-2 h-2 rounded-full bg-white/60"></div>
                    ))}
                  </div>
                </div>

                {/* Pet Info Section - Now beside the image */}
                <div className="lg:col-span-2 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{pet.name}</h2>
                        <p className="text-lg text-gray-600">{pet.breed}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {pet.vaccinated && (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-medium">
                            Vacunado
                          </div>
                        )}
                        {pet.sterilized && (
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                            Esterilizado
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <Calendar size={16} className="mx-auto text-gray-600 mb-1" />
                        <p className="text-xs font-medium text-gray-800">{pet.age}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <Weight size={16} className="mx-auto text-gray-600 mb-1" />
                        <p className="text-xs font-medium text-gray-800">{pet.weight}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <MapPin size={16} className="mx-auto text-gray-600 mb-1" />
                        <p className="text-xs font-medium text-gray-800">{pet.distance}</p>
                      </div>
                    </div>

                    {/* Personality Tags */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Personalidad</h4>
                      <div className="flex flex-wrap gap-1">
                        {pet.personality.map((trait, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-xs">{pet.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={handlePass}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-1"
                      >
                        <X size={16} />
                        <span className="text-sm">Pasar</span>
                      </button>
                      <button 
                        onClick={handleLike}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-1"
                      >
                        <Heart size={16} />
                        <span className="text-sm">Me gusta</span>
                      </button>
                    </div>

                    {/* Additional Actions */}
                    <div className="flex justify-center space-x-4 pt-3 border-t border-gray-100">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                        <Camera size={14} />
                        <span className="text-xs">Más fotos</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors">
                        <Phone size={14} />
                        <span className="text-xs">Contactar refugio</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors">
                        <Info size={14} />
                        <span className="text-xs">Más info</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description section below */}
              <div className="px-6 pb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Sobre {pet.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{pet.description}</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximas recomendaciones</h3>
              
              <div className="space-y-4">
                {pets.filter((_, index) => index !== currentPet).slice(0, 3).map((recommendedPet, index) => (
                  <div key={recommendedPet.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <img 
                      src={recommendedPet.images[0]} 
                      alt={recommendedPet.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">{recommendedPet.name}</h4>
                      <p className="text-xs text-gray-600">{recommendedPet.breed}</p>
                      <div className="flex items-center mt-1">
                        <Star size={12} className="text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{recommendedPet.compatibility}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-gray-800 text-sm mb-2">💡 Consejo de adopción</h4>
                <p className="text-xs text-gray-600">
                  Recuerda que adoptar una mascota es una responsabilidad de por vida. Asegúrate de tener tiempo, espacio y recursos para cuidarla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPetScreen;