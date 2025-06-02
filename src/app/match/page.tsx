// src/app/match/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Filter, Sparkles, Shield, Home, Clock, Heart } from 'lucide-react';
import HeaderUsuario from '@/components/layout/HeaderUsuario';

// Importar componentes atómicos
import { Button } from './atoms/Button';
import { Badge } from './atoms/Badge';

// Importar moléculas
import { ActionControls } from './molecules/ActionControls';
import { PetMiniCard } from './molecules/PetMiniCard';

// Importar organismos
import { FilterPanel } from './organisms/FilterPanel';
import { PetCard } from './organisms/PetCard';
import { MatchModal } from './organisms/MatchModal';

// Importar datos y utilidades
import { todasLasMascotas, filtrarMascotas } from './data/pets';

export default function PantallaMatch() {
  const [indice, setIndice] = useState(0);
  const [historial, setHistorial] = useState<string[]>([]);
  const [match, setMatch] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    especie: 'todos',
    edad: 'cualquier',
    tamaño: 'cualquier'
  });

  // Filtrar mascotas según los filtros actuales
  const mascotasFiltradas = filtrarMascotas(todasLasMascotas, filters);
  const mascota = mascotasFiltradas[indice];

  useEffect(() => {
    if (match) {
      const timer = setTimeout(() => setMatch(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [match]);

  const handleLike = () => {
    if (isAnimating || !mascota) return;
    setIsAnimating(true);
    
    const nuevos = [...historial, mascota.nombre];
    setHistorial(nuevos);
    
    // Match aleatorio para demostración
    if (nuevos.length >= 2 && Math.random() > 0.3) {
      setMatch(mascota.nombre);
    }
    
    setTimeout(() => {
      pasar();
      setIsAnimating(false);
    }, 500);
  };

  const handleDislike = () => {
    if (isAnimating || !mascota) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      pasar();
      setIsAnimating(false);
    }, 500);
  };

  const pasar = () => {
    if (indice < mascotasFiltradas.length - 1) {
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

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setIndice(0); // Resetear al principio cuando se cambian los filtros
  };

  const handleApplyFilters = () => {
    console.log('Filtros aplicados:', filters);
    setShowFilters(false);
  };

  // Si no hay mascotas que mostrar
  if (!mascota) {
    return (
      <>
        <HeaderUsuario />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              No hay mascotas que coincidan con tus filtros
            </h2>
            <Button variant="primary" onClick={() => setFilters({
              especie: 'todos',
              edad: 'cualquier',
              tamaño: 'cualquier'
            })}>
              Restablecer filtros
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <HeaderUsuario />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20 px-4 relative overflow-hidden">
        
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
              onApply={handleApplyFilters}
              matchCount={historial.length}
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
                {mascotasFiltradas.slice(indice + 1, indice + 4).map((pet, idx) => (
                  <PetMiniCard 
                    key={pet.id} 
                    pet={pet} 
                    onClick={() => console.log('Ver', pet.nombre)} 
                  />
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
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
    </>
  );
}