"use client"

import React, { useEffect, useState, useMemo } from 'react';
import { Heart, X, Star, MapPin, Calendar, Weight, Award, Filter, ArrowLeft, ArrowRight, Camera, Phone, MessageCircle, Info } from 'lucide-react';
import HeaderUsuario from '@/components/layout/HeaderUsuario';
import { basePetsData } from '@/data/petsData';

const MatchPetImage = ({ especie, nombre, petId, imageCache, setImageCache }) => {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg');
  
  useEffect(() => {
    // Verificar si ya tenemos la imagen en cache
    if (imageCache[petId]) {
      setImageUrl(imageCache[petId]);
      return;
    }
    
    const getImage = async () => {
      let newImageUrl = '/placeholder.jpg';
      
      if (especie.toLowerCase() === 'gato') {
        // Gato sin texto personalizado
        newImageUrl = `https://cataas.com/cat?${petId}`; // Usar petId para consistencia
      } else if (especie.toLowerCase() === 'perro') {
        // Imagen aleatoria de perro
        try {
          const res = await fetch('https://dog.ceo/api/breeds/image/random');
          const data = await res.json();
          newImageUrl = data.message;
        } catch (error) {
          console.error('Error cargando imagen de perro:', error);
        }
      }
      
      // Guardar en cache y actualizar estado
      setImageUrl(newImageUrl);
      setImageCache(prev => ({
        ...prev,
        [petId]: newImageUrl
      }));
    };
    
    getImage();
  }, [especie, nombre, petId, imageCache, setImageCache]);
  
  return (
    <img
      src={imageUrl}
      alt={nombre}
      className="w-full h-full object-cover"
      onError={() => setImageUrl('/placeholder.jpg')} // Fallback en caso de error
    />
  );
};

const MatchPetScreen = () => {
  const [currentPet, setCurrentPet] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [likedPets, setLikedPets] = useState([]);
  // Cache de imágenes para mantener las mismas al navegar
  const [imageCache, setImageCache] = useState({});
  
  // Estados para filtros
  const [filters, setFilters] = useState({
    especie: 'todos',
    edad: 'cualquier',
    tamaño: 'cualquier',
    distancia: 'sin-limite'
  });

  // Filtrar mascotas según los criterios seleccionados
  const filteredPets = useMemo(() => {
    return basePetsData.filter(pet => {
      if (filters.especie !== 'todos' && pet.species !== filters.especie) return false;
      if (filters.edad !== 'cualquier' && pet.ageGroup !== filters.edad) return false;
      if (filters.tamaño !== 'cualquier' && pet.sizeGroup !== filters.tamaño) return false;
      if (filters.distancia !== 'sin-limite') {
        const petDistance = parseFloat(pet.distance);
        const maxDistance = parseFloat(filters.distancia);
        if (petDistance > maxDistance) return false;
      }
      return true;
    });
  }, [filters]);

  const pets = filteredPets.length > 0 ? filteredPets : basePetsData;

  // Efecto para resetear currentPet cuando cambien los filtros
  useEffect(() => {
    if (currentPet >= pets.length) {
      setCurrentPet(0);
    }
  }, [pets.length, currentPet]);

  const nextPet = () => {
    setCurrentPet((prev) => (prev + 1) % pets.length);
  };

  const previousPet = () => {
    setCurrentPet((prev) => (prev - 1 + pets.length) % pets.length);
  };

  const handleLike = () => {
    const currentPetData = pets[currentPet];
    
    // Agregar a favoritos locales
    setLikedPets([...likedPets, currentPetData.id]);
    
    // Guardar en localStorage para persistencia
    const favoritosGuardados = JSON.parse(localStorage.getItem('mascotasFavoritas') || '[]');
    const nuevaFavorita = {
      ...currentPetData,
      fechaGuardado: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      estado: 'Disponible'
    };
    
    // Evitar duplicados
    const yaExiste = favoritosGuardados.some(fav => fav.id === currentPetData.id);
    if (!yaExiste) {
      favoritosGuardados.push(nuevaFavorita);
      localStorage.setItem('mascotasFavoritas', JSON.stringify(favoritosGuardados));
    }
    
    nextPet();
  };

  const handlePass = () => {
    nextPet();
  };

  // Manejar cambios en filtros
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPet(0); // Resetear a la primera mascota cuando cambien los filtros
  };

  // Aplicar filtros
  const applyFilters = () => {
    setCurrentPet(0);
    setShowFilters(false);
  };

  const pet = pets[currentPet] || pets[0];

  if (!pet) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <HeaderUsuario />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Encuentra tu compañero perfecto</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter size={20} />
              <span>Filtros</span>
              {(filters.especie !== 'todos' || filters.edad !== 'cualquier' || filters.tamaño !== 'cualquier' || filters.distancia !== 'sin-limite') && (
                <span className="bg-red-500 text-white text-xs rounded-full w-2 h-2"></span>
              )}
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
                  <select 
                    value={filters.especie}
                    onChange={(e) => handleFilterChange('especie', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="todos">Todos</option>
                    <option value="perro">Perros</option>
                    <option value="gato">Gatos</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                  <select 
                    value={filters.edad}
                    onChange={(e) => handleFilterChange('edad', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="cualquier">Cualquier edad</option>
                    <option value="cachorro">Cachorro (0-1 año)</option>
                    <option value="joven">Joven (1-3 años)</option>
                    <option value="adulto">Adulto (3-7 años)</option>
                    <option value="senior">Senior (7+ años)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
                  <select 
                    value={filters.tamaño}
                    onChange={(e) => handleFilterChange('tamaño', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="cualquier">Cualquier tamaño</option>
                    <option value="pequeño">Pequeño (0-10 kg)</option>
                    <option value="mediano">Mediano (10-25 kg)</option>
                    <option value="grande">Grande (25+ kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distancia máxima</label>
                  <select 
                    value={filters.distancia}
                    onChange={(e) => handleFilterChange('distancia', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="sin-limite">Sin límite</option>
                    <option value="2">2 km</option>
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                    <option value="20">20 km</option>
                  </select>
                </div>

                <button 
                  onClick={applyFilters}
                  className="w-full bg-gradient-to-r from-red-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Aplicar filtros
                </button>
                
                {filteredPets.length === 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      No se encontraron mascotas con estos filtros. Mostrando todas las mascotas disponibles.
                    </p>
                  </div>
                )}
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
                  <MatchPetImage 
                    especie={pet.species} 
                    nombre={pet.name} 
                    petId={pet.id}
                    imageCache={imageCache}
                    setImageCache={setImageCache}
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
                    <div className="w-2 h-2 rounded-full bg-white/60"></div>
                    <div className="w-2 h-2 rounded-full bg-white/60"></div>
                    <div className="w-2 h-2 rounded-full bg-white/60"></div>
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
                  <div 
                    key={recommendedPet.id} 
                    onClick={() => setCurrentPet(pets.findIndex(p => p.id === recommendedPet.id))}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <MatchPetImage 
                        especie={recommendedPet.species} 
                        nombre={recommendedPet.name}
                        petId={recommendedPet.id}
                        imageCache={imageCache}
                        setImageCache={setImageCache}
                      />
                    </div>
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
                  {pet.species === 'gato' 
                    ? 'Los gatos necesitan espacios seguros y verticales para explorar. Considera torres para gatos y ventanas seguras.'
                    : 'Los perros necesitan ejercicio diario y socialización. Asegúrate de tener tiempo para paseos y juegos.'
                  }
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