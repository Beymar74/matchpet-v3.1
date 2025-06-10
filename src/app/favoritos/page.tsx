"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import HeaderUsuario from '@/components/layout/HeaderUsuario';
import { 
  Heart, 
  Dog, 
  Cat, 
  MapPin, 
  Star,
  Filter,
  Search,
  Grid3X3,
  List,
  Eye,
  Trash2,
  AlertCircle,
  SortAsc,
  X
} from 'lucide-react';

// Componente para mostrar imágenes consistentes con el match
const MatchPetImage = React.memo(({ especie, nombre, petId, className = "w-full h-48 object-cover" }) => {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const isMountedRef = useRef(true);
  const hasLoadedRef = useRef(false);
  
  // Función para generar imagen placeholder determinística
  const generatePlaceholderImage = useCallback((petId, especie) => {
    // Crear una imagen SVG como placeholder
    const iscat = especie?.toLowerCase() === 'gato';
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    
    // Usar el petId para generar un color consistente
    const colorIndex = petId ? Math.abs(petId.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length : 0;
    const bgColor = colors[colorIndex];
    
    // Crear formas SVG simples en lugar de emojis
    const animalShape = iscat ? 
      // Forma de gato (orejas triangulares)
      `<circle cx="150" cy="120" r="40" fill="white" opacity="0.9"/>
       <polygon points="120,90 140,70 160,90" fill="white" opacity="0.9"/>
       <polygon points="180,90 200,70 220,90" fill="white" opacity="0.9"/>
       <circle cx="135" cy="110" r="3" fill="${bgColor}"/>
       <circle cx="165" cy="110" r="3" fill="${bgColor}"/>
       <path d="M 140 130 Q 150 135 160 130" stroke="${bgColor}" stroke-width="2" fill="none"/>` :
      // Forma de perro (orejas colgantes)
      `<circle cx="150" cy="120" r="40" fill="white" opacity="0.9"/>
       <ellipse cx="125" cy="105" rx="12" ry="25" fill="white" opacity="0.9"/>
       <ellipse cx="175" cy="105" rx="12" ry="25" fill="white" opacity="0.9"/>
       <circle cx="135" cy="110" r="3" fill="${bgColor}"/>
       <circle cx="165" cy="110" r="3" fill="${bgColor}"/>
       <circle cx="150" cy="125" r="4" fill="${bgColor}"/>
       <path d="M 150 130 Q 140 140 130 135" stroke="${bgColor}" stroke-width="2" fill="none"/>
       <path d="M 150 130 Q 160 140 170 135" stroke="${bgColor}" stroke-width="2" fill="none"/>`;
    
    const svg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        ${animalShape}
        <text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle" 
              font-family="Arial, sans-serif" font-size="14" fill="white">
          ${nombre || (iscat ? 'Gatito' : 'Perrito')}
        </text>
      </svg>`;
    
    // Usar encodeURIComponent en lugar de btoa para manejar caracteres UTF-8
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }, []);
  
  useEffect(() => {
    isMountedRef.current = true;
    
    // Evitar cargar múltiples veces la misma imagen
    if (hasLoadedRef.current) return;
    
    // Si no hay especie o petId, usar placeholder inmediatamente
    if (!especie || !petId) {
      const placeholderImg = generatePlaceholderImage(petId, especie);
      setImageUrl(placeholderImg);
      hasLoadedRef.current = true;
      return;
    }
    
    const getImage = async () => {
      setIsLoading(true);
      setError(false);
      
      try {
        if (especie.toLowerCase() === 'gato') {
          // Para gatos, usar una URL más simple sin dependencias externas
          const staticCatImages = [
            'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
            'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
            'https://cdn2.thecatapi.com/images/MjA2ODM5MA.jpg',
            'https://cdn2.thecatapi.com/images/bpc.jpg',
            'https://cdn2.thecatapi.com/images/atn.jpg'
          ];
          
          // Seleccionar imagen basada en petId para consistencia
          const imageIndex = petId ? Math.abs(petId.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % staticCatImages.length : 0;
          const selectedImage = staticCatImages[imageIndex];
          
          if (isMountedRef.current) {
            setImageUrl(selectedImage);
            hasLoadedRef.current = true;
          }
          
        } else if (especie.toLowerCase() === 'perro') {
          // Para perros, usar directamente imágenes estáticas sin fetch
          const staticDogImages = [
            'https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg',
            'https://images.dog.ceo/breeds/bulldog-boston/n02096585_1638.jpg',
            'https://images.dog.ceo/breeds/retriever-golden/n02099601_7771.jpg',
            'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg',
            'https://images.dog.ceo/breeds/labrador/n02099712_2570.jpg'
          ];
          
          const imageIndex = petId ? Math.abs(petId.toString().split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % staticDogImages.length : 0;
          const selectedImage = staticDogImages[imageIndex];
          
          if (isMountedRef.current) {
            setImageUrl(selectedImage);
            hasLoadedRef.current = true;
          }
        }
      } catch (error) {
        console.error('Error general cargando imagen:', error);
        if (isMountedRef.current) {
          // Usar placeholder generado como último recurso
          const placeholderImg = generatePlaceholderImage(petId, especie);
          setImageUrl(placeholderImg);
          setError(true);
          hasLoadedRef.current = true;
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    };
    
    getImage();
    
    return () => {
      isMountedRef.current = false;
    };
  }, [especie, petId, generatePlaceholderImage]); // Removimos onImageLoad y nombre de las dependencias
  
  const handleImageError = useCallback(() => {
    if (isMountedRef.current && !error) {
      console.log('Image failed to load, using placeholder');
      const placeholderImg = generatePlaceholderImage(petId, especie);
      setImageUrl(placeholderImg);
      setError(true);
    }
  }, [petId, especie, error, generatePlaceholderImage]);
  
  const handleImageLoad = useCallback(() => {
    if (isMountedRef.current) {
      setIsLoading(false);
      setError(false);
    }
  }, []);
  
  return (
    <div className="relative">
      {isLoading && (
        <div className={`${className} bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center`}>
          <div className="text-gray-500 text-sm font-medium">
            {especie?.toLowerCase() === 'gato' ? '🐱' : '🐶'} Cargando...
          </div>
        </div>
      )}
      <img
        src={imageUrl}
        alt={nombre || 'Mascota'}
        className={`${className} ${isLoading ? 'hidden' : 'block'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
      {error && !isLoading && imageUrl.startsWith('data:image/svg') && (
        <div className="absolute bottom-1 right-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
          Imagen generada
        </div>
      )}
    </div>
  );
});

MatchPetImage.displayName = 'MatchPetImage';

const MisFavoritos = () => {
  const router = useRouter();
  const [vistaGrid, setVistaGrid] = useState(true);
  const [filtroEspecie, setFiltroEspecie] = useState('todos');
  const [filtroEdad, setFiltroEdad] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [ordenamiento, setOrdenamiento] = useState('reciente');
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [mascotasFavoritas, setMascotasFavoritas] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Verificar que estamos en el cliente para evitar errores de hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cargar favoritos desde localStorage solo en el cliente
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const favoritosGuardados = localStorage.getItem('mascotasFavoritas');
      if (favoritosGuardados) {
        const favoritos = JSON.parse(favoritosGuardados);
        if (Array.isArray(favoritos)) {
          setMascotasFavoritas(favoritos);
        }
      }
    } catch (error) {
      console.error('Error cargando favoritos:', error);
      setMascotasFavoritas([]);
    }
  }, [isClient]);

  // Función para guardar en favoritos - ya no necesitamos imageCache
  const guardarEnFavoritos = useCallback((mascota) => {
    if (!mascota?.id) return;
    
    try {
      const nuevasFavoritas = [...mascotasFavoritas, { ...mascota, fechaGuardado: new Date().toISOString() }];
      setMascotasFavoritas(nuevasFavoritas);
      
      if (isClient) {
        localStorage.setItem('mascotasFavoritas', JSON.stringify(nuevasFavoritas));
      }
    } catch (error) {
      console.error('Error guardando favorito:', error);
    }
  }, [mascotasFavoritas, isClient]);

  const eliminarDeFavoritos = useCallback((id) => {
    if (!id) return;
    
    try {
      const nuevasFavoritas = mascotasFavoritas.filter(mascota => mascota?.id !== id);
      setMascotasFavoritas(nuevasFavoritas);
      
      if (isClient) {
        localStorage.setItem('mascotasFavoritas', JSON.stringify(nuevasFavoritas));
      }
    } catch (error) {
      console.error('Error eliminando favorito:', error);
    }
  }, [mascotasFavoritas, isClient]);

  const solicitarAdopcion = useCallback((mascota) => {
    if (!mascota?.id) {
      console.error('ID de mascota no válido');
      return;
    }
    
    console.log(`Solicitar adopción de ${mascota.name || mascota.nombre || 'mascota desconocida'}`);
    router.push(`/solicitar-adopcion/${mascota.id}`);
  }, [router]);

  const verDetalles = useCallback((mascota) => {
    if (!mascota) return;
    setMascotaSeleccionada(mascota);
  }, []);

  const compartirMascota = useCallback(async (mascota) => {
    if (!mascota) return;
    
    const nombre = mascota.name || mascota.nombre || 'esta mascota';
    console.log(`Compartir ${nombre}`);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Conoce a ${nombre}`,
          text: `¡Mira esta adorable mascota en busca de un hogar!`,
          url: window.location.href
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error compartiendo:', error);
        }
      }
    } else {
      // Fallback para navegadores que no soportan Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      } catch (error) {
        console.error('Error copiando al portapapeles:', error);
      }
    }
  }, []);

  const filtrarMascotas = useCallback(() => {
    if (!Array.isArray(mascotasFavoritas)) return [];
    
    let mascotasFiltradas = [...mascotasFavoritas];

    // Filtro por especie
    if (filtroEspecie !== 'todos') {
      mascotasFiltradas = mascotasFiltradas.filter(m => {
        const especie = (m?.species || m?.tipo || '').toLowerCase();
        return especie === filtroEspecie.toLowerCase();
      });
    }

    // Filtro por edad
    if (filtroEdad !== 'todos') {
      mascotasFiltradas = mascotasFiltradas.filter(m => {
        const edad = m?.age || m?.edad || '';
        const edadNum = parseInt(edad) || 0;
        
        if (filtroEdad === 'joven') {
          return edad.includes('mes') || edadNum <= 2;
        }
        if (filtroEdad === 'adulto') {
          return edadNum >= 2 && edadNum <= 7;
        }
        if (filtroEdad === 'senior') {
          return edadNum > 7;
        }
        return true;
      });
    }

    // Búsqueda por nombre
    if (busqueda.trim()) {
      const busquedaLower = busqueda.toLowerCase().trim();
      mascotasFiltradas = mascotasFiltradas.filter(m => {
        const nombre = (m?.name || m?.nombre || '').toLowerCase();
        const ubicacion = (m?.location || m?.refugio || '').toLowerCase();
        return nombre.includes(busquedaLower) || ubicacion.includes(busquedaLower);
      });
    }

    // Ordenamiento
    mascotasFiltradas.sort((a, b) => {
      switch (ordenamiento) {
        case 'nombre':
          const nombreA = (a?.name || a?.nombre || '').toLowerCase();
          const nombreB = (b?.name || b?.nombre || '').toLowerCase();
          return nombreA.localeCompare(nombreB);
        case 'compatibilidad':
          const compA = a?.compatibility || 0;
          const compB = b?.compatibility || 0;
          return compB - compA;
        case 'reciente':
        default:
          const fechaA = new Date(a?.fechaGuardado || 0);
          const fechaB = new Date(b?.fechaGuardado || 0);
          return fechaB - fechaA;
      }
    });

    return mascotasFiltradas;
  }, [mascotasFavoritas, filtroEspecie, filtroEdad, busqueda, ordenamiento]);

  const mascotasFiltradas = filtrarMascotas();

  const getEstadoColor = useCallback((estado) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800 border-green-200';
      case 'En proceso': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Adoptada': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  }, []);

  // Mostrar loading mientras se inicializa el cliente
  if (!isClient) {
    return (
      <>
        <HeaderUsuario />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#BF3952] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando favoritos...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderUsuario />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-[#BF3952]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#011526]">Mis Favoritos</h1>
                <p className="text-[#254559] text-lg">Mascotas guardadas ({mascotasFavoritas.length})</p>
              </div>
            </div>
          </div>

          {/* Filtros y controles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Búsqueda */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o refugio..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6093BF] focus:border-transparent"
                />
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[#254559]" />
                  <select
                    value={filtroEspecie}
                    onChange={(e) => setFiltroEspecie(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#6093BF]"
                  >
                    <option value="todos">Todas las especies</option>
                    <option value="perro">Perros</option>
                    <option value="gato">Gatos</option>
                  </select>
                </div>

                <select
                  value={filtroEdad}
                  onChange={(e) => setFiltroEdad(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#6093BF]"
                >
                  <option value="todos">Todas las edades</option>
                  <option value="joven">Joven (0-2 años)</option>
                  <option value="adulto">Adulto (2-7 años)</option>
                  <option value="senior">Senior (7+ años)</option>
                </select>

                <div className="flex items-center space-x-2">
                  <SortAsc className="w-4 h-4 text-[#254559]" />
                  <select
                    value={ordenamiento}
                    onChange={(e) => setOrdenamiento(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#6093BF]"
                  >
                    <option value="reciente">Más recientes</option>
                    <option value="nombre">Por nombre</option>
                    <option value="compatibilidad">Por compatibilidad</option>
                  </select>
                </div>

                {/* Vista toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setVistaGrid(true)}
                    className={`p-2 rounded-md transition-colors ${vistaGrid ? 'bg-white shadow-sm text-[#30588C]' : 'text-gray-600'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setVistaGrid(false)}
                    className={`p-2 rounded-md transition-colors ${!vistaGrid ? 'bg-white shadow-sm text-[#30588C]' : 'text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lista/Grid de mascotas */}
          {mascotasFiltradas.length > 0 ? (
            <div className={vistaGrid 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {mascotasFiltradas.map((mascota) => {
                // Validación de datos de mascota
                if (!mascota?.id) return null;
                
                const nombre = mascota.name || mascota.nombre || 'Sin nombre';
                const especie = mascota.species || mascota.tipo || 'perro';
                const edad = mascota.age || mascota.edad || 'Edad no especificada';
                const sexo = mascota.gender || mascota.sexo || '';
                const ubicacion = mascota.location || mascota.refugio || 'Ubicación no especificada';
                const descripcion = mascota.description || mascota.descripcion || 'Sin descripción disponible';
                const caracteristicas = mascota.personality || mascota.caracteristicas || [];
                const compatibilidad = mascota.compatibility || 85;
                const estado = mascota.estado || 'Disponible';
                
                return vistaGrid ? (
                  // Vista Grid
                  <div key={mascota.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <MatchPetImage 
                        especie={especie} 
                        nombre={nombre}
                        petId={mascota.id}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => eliminarDeFavoritos(mascota.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                        aria-label={`Eliminar ${nombre} de favoritos`}
                      >
                        <Heart className="w-5 h-5 text-[#BF3952] fill-current" />
                      </button>
                      <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium border ${getEstadoColor(estado)}`}>
                        {estado}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-[#011526] truncate">{nombre}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{compatibilidad}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-[#254559] mb-2">
                        {especie.toLowerCase() === 'perro' ? 
                          <Dog className="w-4 h-4 mr-1" /> : 
                          <Cat className="w-4 h-4 mr-1" />
                        }
                        <span className="truncate">{especie} • {edad} {sexo && `• ${sexo}`}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{ubicacion}</span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{descripcion}</p>
                      
                      {caracteristicas.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {caracteristicas.slice(0, 2).map((caracteristica, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {caracteristica}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => verDetalles(mascota)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-[#6093BF] text-white px-3 py-2 rounded-lg hover:bg-[#30588C] transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver</span>
                        </button>
                        {estado === 'Disponible' && (
                          <button
                            onClick={() => solicitarAdopcion(mascota)}
                            className="flex-1 bg-[#BF3952] text-white px-3 py-2 rounded-lg hover:bg-[#a32e45] transition-colors text-sm"
                          >
                            Adoptar
                          </button>
                        )}
                      </div>
                      
                      {/* Botón de eliminar prominente */}
                      <button
                        onClick={() => eliminarDeFavoritos(mascota.id)}
                        className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm border border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Eliminar de favoritos</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Vista Lista
                  <div key={mascota.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative flex-shrink-0">
                        <MatchPetImage 
                          especie={especie} 
                          nombre={nombre}
                          petId={mascota.id}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <span className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(estado)}`}>
                          {estado}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-semibold text-[#011526] truncate">{nombre}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{compatibilidad}% compatible</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-[#254559] mb-1">
                          {especie.toLowerCase() === 'perro' ? 
                            <Dog className="w-4 h-4 mr-1" /> : 
                            <Cat className="w-4 h-4 mr-1" />
                          }
                          <span className="truncate">
                            {especie} • {edad} {sexo && `• ${sexo}`} {mascota.sizeGroup && `• ${mascota.sizeGroup}`}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{ubicacion} {mascota.distance && `- ${mascota.distance}`}</span>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">{descripcion}</p>
                        
                        {caracteristicas.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {caracteristicas.map((caracteristica, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {caracteristica}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2 flex-shrink-0">
                        <button
                          onClick={() => verDetalles(mascota)}
                          className="flex items-center space-x-1 bg-[#6093BF] text-white px-3 py-2 rounded-lg hover:bg-[#30588C] transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver detalles</span>
                        </button>
                        {estado === 'Disponible' && (
                          <button
                            onClick={() => solicitarAdopcion(mascota)}
                            className="bg-[#BF3952] text-white px-3 py-2 rounded-lg hover:bg-[#a32e45] transition-colors text-sm"
                          >
                            Adoptar
                          </button>
                        )}
                        <button
                          onClick={() => eliminarDeFavoritos(mascota.id)}
                          className="flex items-center justify-center space-x-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm border border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Estado vacío
            <div className="text-center py-16">
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {busqueda || filtroEspecie !== 'todos' || filtroEdad !== 'todos' 
                  ? 'No se encontraron mascotas' 
                  : 'Aún no tienes mascotas favoritas'
                }
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {busqueda || filtroEspecie !== 'todos' || filtroEdad !== 'todos'
                  ? 'Intenta cambiar los filtros de búsqueda para encontrar más resultados.'
                  : 'Explora nuestras mascotas disponibles y guarda tus favoritas haciendo clic en "Me gusta" en la pantalla de match.'
                }
              </p>
              <button
                onClick={() => router.push('/match')}
                className="bg-[#BF3952] text-white px-6 py-3 rounded-lg hover:bg-[#a32e45] transition-colors"
              >
                Ir al Match
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {mascotaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-[#011526]">
                  {mascotaSeleccionada.name || mascotaSeleccionada.nombre || 'Mascota'}
                </h2>
                <button 
                  onClick={() => setMascotaSeleccionada(null)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Cerrar modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Componente de imagen consistente */}
                <MatchPetImage 
                  especie={mascotaSeleccionada.species || mascotaSeleccionada.tipo || 'perro'} 
                  nombre={mascotaSeleccionada.name || mascotaSeleccionada.nombre || 'Mascota'}
                  petId={mascotaSeleccionada.id}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#254559] mb-2">Información básica</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="font-medium">Tipo:</span> {mascotaSeleccionada.species || mascotaSeleccionada.tipo || 'No especificado'}</div>
                      <div><span className="font-medium">Edad:</span> {mascotaSeleccionada.age || mascotaSeleccionada.edad || 'No especificada'}</div>
                      {(mascotaSeleccionada.weight || mascotaSeleccionada.peso) && (
                        <div><span className="font-medium">Peso:</span> {mascotaSeleccionada.weight || mascotaSeleccionada.peso}</div>
                      )}
                      {(mascotaSeleccionada.gender || mascotaSeleccionada.sexo) && (
                        <div><span className="font-medium">Sexo:</span> {mascotaSeleccionada.gender || mascotaSeleccionada.sexo}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#254559] mb-2">Refugio</h4>
                    <div className="space-y-1 text-sm">
                      <div>{mascotaSeleccionada.location || mascotaSeleccionada.refugio || 'Ubicación no especificada'}</div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {mascotaSeleccionada.distance || 'Distancia no especificada'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#254559] mb-2">Descripción</h4>
                  <p className="text-gray-700">
                    {mascotaSeleccionada.description || mascotaSeleccionada.descripcion || 'Sin descripción disponible'}
                  </p>
                </div>

                {(mascotaSeleccionada.personality || mascotaSeleccionada.caracteristicas) && (
                  <div>
                    <h4 className="font-semibold text-[#254559] mb-2">Características</h4>
                    <div className="flex flex-wrap gap-2">
                      {(mascotaSeleccionada.personality || mascotaSeleccionada.caracteristicas || []).map((caracteristica, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {caracteristica}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-medium">{mascotaSeleccionada.compatibility || 85}% compatible contigo</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(mascotaSeleccionada.estado)}`}>
                    {mascotaSeleccionada.estado || 'Disponible'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  onClick={() => setMascotaSeleccionada(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                {(mascotaSeleccionada.estado || 'Disponible') === 'Disponible' && (
                  <button 
                    onClick={() => solicitarAdopcion(mascotaSeleccionada)}
                    className="px-4 py-2 bg-[#BF3952] text-white rounded-lg hover:bg-[#a32e45] transition-colors"
                  >
                    Solicitar adopción
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MisFavoritos;