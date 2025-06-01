'use client';

import HeaderUsuario from '@/components/layout/HeaderUsuario';
import React, { useState, useEffect } from 'react';
import { Heart, XCircle, Undo2, Filter, MapPin, Star, Sparkles, Clock, Shield, Home } from 'lucide-react';


const Button = ({ variant = 'primary', size = 'md', children, onClick, disabled, className = '', ...props }) => {
  const baseStyles = 'font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#30588C] to-[#BF3952] text-white hover:shadow-lg transform hover:scale-105',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl',
    ghost: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    danger: 'bg-white text-red-500 hover:bg-red-50 shadow-lg',
    success: 'bg-gradient-to-r from-[#BF3952] to-pink-500 text-white hover:shadow-xl transform hover:scale-110'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    icon: 'w-12 h-12 rounded-full',
    'icon-lg': 'w-16 h-16 rounded-full'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Badge para etiquetas
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-gradient-to-r from-blue-100 to-purple-100 text-[#30588C]',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Icono con animación
const AnimatedIcon = ({ icon: Icon, className = '', animate = true }) => {
  return (
    <Icon className={`${className} ${animate ? 'group-hover:scale-110 transition-transform' : ''}`} />
  );
};

// Barra de progreso
const ProgressBar = ({ value, max = 100, className = '', showLabel = true, animated = true }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Compatibilidad</span>
          <span className="text-sm font-bold text-[#30588C]">{value}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`bg-gradient-to-r from-[#30588C] to-[#BF3952] h-full rounded-full ${
            animated ? 'transition-all duration-1000 ease-out' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ===================
// MOLÉCULAS
// ===================

// Tarjeta de estadística
const StatCard = ({ icon: Icon, value, label, color = 'blue' }) => {
  const colors = {
    blue: 'from-blue-400 to-cyan-500',
    pink: 'from-pink-400 to-rose-500',
    purple: 'from-purple-400 to-indigo-500'
  };
  
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 bg-gradient-to-r ${colors[color]} rounded-xl flex items-center justify-center text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
};

// Selector de filtro
const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <select 
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#30588C]/20 transition-all"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

// Tarjeta de mascota en miniatura
const PetMiniCard = ({ pet, onClick }) => {
  return (
    <div 
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={pet.imagen} 
        alt={pet.nombre} 
        className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{pet.nombre}</h4>
        <p className="text-sm text-gray-600">{pet.raza}</p>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-[#30588C]">{pet.compatibilidad}%</div>
        <Star className="w-4 h-4 text-yellow-500 fill-current mx-auto" />
      </div>
    </div>
  );
};

// Controles de acción
const ActionControls = ({ onDislike, onUndo, onLike, canUndo, isAnimating }) => {
  return (
    <div className="flex justify-center items-center gap-6">
      <Button
        variant="danger"
        size="icon-lg"
        onClick={onDislike}
        disabled={isAnimating}
        className="group"
      >
        <AnimatedIcon icon={XCircle} className="w-7 h-7" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        onClick={onUndo}
        disabled={isAnimating || !canUndo}
      >
        <Undo2 className="w-5 h-5" />
      </Button>

      <Button
        variant="success"
        size="icon-lg"
        onClick={onLike}
        disabled={isAnimating}
        className="group"
      >
        <AnimatedIcon icon={Heart} className="w-7 h-7" />
      </Button>
    </div>
  );
};

// ===================
// ORGANISMOS
// ===================

// Panel de filtros
const FilterPanel = ({ filters, onFilterChange, onApply }) => {
  return (
    <aside className="lg:w-80 space-y-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-5 h-5 text-[#30588C]" />
          <h3 className="text-xl font-bold text-[#30588C]">Filtros</h3>
        </div>
        
        <div className="space-y-4">
          <FilterSelect
            label="Especie"
            value={filters.especie}
            onChange={(e) => onFilterChange('especie', e.target.value)}
            options={[
              { value: 'todos', label: 'Todos' },
              { value: 'perros', label: 'Perros' },
              { value: 'gatos', label: 'Gatos' }
            ]}
          />

          <FilterSelect
            label="Edad"
            value={filters.edad}
            onChange={(e) => onFilterChange('edad', e.target.value)}
            options={[
              { value: 'cualquier', label: 'Cualquier edad' },
              { value: 'cachorro', label: 'Cachorro (0-1 año)' },
              { value: 'joven', label: 'Joven (1-3 años)' },
              { value: 'adulto', label: 'Adulto (3+ años)' }
            ]}
          />

          <FilterSelect
            label="Tamaño"
            value={filters.tamaño}
            onChange={(e) => onFilterChange('tamaño', e.target.value)}
            options={[
              { value: 'cualquier', label: 'Cualquier tamaño' },
              { value: 'pequeño', label: 'Pequeño' },
              { value: 'mediano', label: 'Mediano' },
              { value: 'grande', label: 'Grande' }
            ]}
          />

          <Button variant="primary" size="md" onClick={onApply} className="w-full">
            Aplicar filtros
          </Button>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={Heart} value="12" label="Matches" color="pink" />
        <StatCard icon={Clock} value="3d" label="Activo" color="blue" />
      </div>
    </aside>
  );
};

// Tarjeta principal de mascota
const PetCard = ({ pet, isAnimating }) => {
  return (
    <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
      isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
    }`}>
      {/* Imagen con overlay mejorado */}
      <div className="relative h-96 overflow-hidden group">
        <img
          src={pet.imagen}
          alt={pet.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${pet.color} opacity-20`} />
        
        {/* Badges flotantes */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="primary" className="backdrop-blur-sm bg-white/90">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Nuevo
          </Badge>
        </div>
        
        {/* Compatibilidad */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-bold text-[#30588C]">{pet.compatibilidad}%</span>
          </div>
        </div>
      </div>

      {/* Información mejorada */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#30588C]">{pet.nombre}</h2>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4" />
              {pet.edad}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge>{pet.especie}</Badge>
            <Badge>{pet.raza}</Badge>
          </div>
        </div>

        {/* Personalidad con iconos */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Personalidad
          </h4>
          <div className="flex flex-wrap gap-2">
            {pet.personalidad.map((trait, idx) => (
              <Badge key={idx} variant="primary">
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
          {pet.descripcion}
        </p>

        {/* Ubicación mejorada */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="flex items-center gap-2 text-gray-700">
            <Home className="w-5 h-5 text-[#30588C]" />
            <span className="font-medium">{pet.refugio}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>2.5 km</span>
          </div>
        </div>

        {/* Barra de compatibilidad */}
        <ProgressBar value={pet.compatibilidad} animated />
      </div>
    </div>
  );
};

// Modal de Match
const MatchModal = ({ pet, onClose, onViewProfile }) => {
  if (!pet) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
        <div className="relative">
          <div className="text-6xl mb-4">🎉</div>
          <Sparkles className="absolute top-0 right-1/4 w-6 h-6 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute bottom-0 left-1/4 w-4 h-4 text-pink-400 animate-pulse delay-75" />
        </div>
        
        <h3 className="text-2xl font-bold text-[#30588C] mb-2">¡Es un Match!</h3>
        <p className="text-gray-600 mb-6">
          Tú y <span className="font-bold text-[#BF3952]">{pet}</span> son una pareja perfecta
        </p>
        
        <div className="flex gap-3">
          <Button variant="primary" size="md" onClick={onViewProfile} className="flex-1">
            Ver perfil completo
          </Button>
          <Button variant="ghost" size="md" onClick={onClose}>
            Seguir
          </Button>
        </div>
      </div>
    </div>
  );
};

// ===================
// DATOS SIMULADOS
// ===================
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

// ===================
// COMPONENTE PRINCIPAL
// ===================
export default function PantallaMatch() {
  const [indice, setIndice] = useState(0);
  const [historial, setHistorial] = useState([]);
  const [match, setMatch] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    especie: 'todos',
    edad: 'cualquier',
    tamaño: 'cualquier'
  });

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
    
    if (nuevos.length >= 2 && Math.random() > 0.3) {
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
    }
  };

  const deshacer = () => {
    if (indice > 0 && !isAnimating) {
      setIndice(indice - 1);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20 px-4 relative overflow-hidden">
      <HeaderUsuario />
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-xl animate-pulse delay-100" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-xl animate-pulse delay-200" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Panel de Filtros */}
        <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterPanel 
            filters={filters}
            onFilterChange={handleFilterChange}
            onApply={() => console.log('Aplicar filtros:', filters)}
          />
        </div>

        {/* Sección principal */}
        <section className="flex-1 max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#30588C] to-[#BF3952] bg-clip-text text-transparent mb-2">
              Encuentra tu mejor amigo
            </h1>
            <p className="text-gray-600">Desliza para conocer a tu compañero perfecto 🐾</p>
          </div>

          <PetCard pet={mascota} isAnimating={isAnimating} />
          
          <div className="mt-8">
            <ActionControls
              onDislike={handleDislike}
              onUndo={deshacer}
              onLike={handleLike}
              canUndo={indice > 0}
              isAnimating={isAnimating}
            />
          </div>
        </section>

        {/* Panel lateral derecho */}
        <aside className="lg:w-80 hidden lg:block space-y-6">
          {/* Próximas recomendaciones */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-[#30588C] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Próximas recomendaciones
            </h3>
            <div className="space-y-4">
              {mascotasSimuladas.slice(indice + 1, indice + 4).map((pet, idx) => (
                <PetMiniCard key={idx} pet={pet} onClick={() => console.log('Ver', pet.nombre)} />
              ))}
            </div>
          </div>

          {/* Consejos mejorados */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl p-6 border border-white/20">
            <h4 className="font-bold text-[#30588C] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Consejos de adopción
            </h4>
            <div className="space-y-3">
              {[
                { icon: Home, text: 'Evalúa el espacio de tu hogar' },
                { icon: Clock, text: 'Considera tu tiempo disponible' },
                { icon: Heart, text: 'Piensa en tu estilo de vida' },
                { icon: Shield, text: 'Prepara tu hogar para su llegada' }
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                  <tip.icon className="w-4 h-4 text-[#30588C] mt-0.5 flex-shrink-0" />
                  <span>{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Botón flotante para filtros en móvil */}
      <Button
        variant="primary"
        size="icon-lg"
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden fixed bottom-6 left-6 z-50 shadow-2xl"
      >
        <Filter className="w-6 h-6" />
      </Button>

      {/* Modal de Match */}
      <MatchModal 
        pet={match}
        onClose={() => setMatch(null)}
        onViewProfile={() => console.log('Ver perfil de', match)}
      />

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
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-75 {
          animation-delay: 75ms;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </main>
  );
}