"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Clock, Sparkles, Star, Rocket, Facebook, Instagram, Twitter } from 'lucide-react';

const PantallaProximamente = () => {
  const [particles, setParticles] = useState([]);
  const [currentColor, setCurrentColor] = useState(0);
  const router = useRouter();

  // Paleta de colores MatchPet
  const matchPetColors = ['#BF3952', '#30588C', '#6093BF', '#254559'];
  
  useEffect(() => {
    // Solo 10 partículas para mejor rendimiento móvil
    const initialParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
      color: matchPetColors[i % matchPetColors.length]
    }));
    setParticles(initialParticles);

    // Cambiar color cada 3 segundos
    const colorInterval = setInterval(() => {
      setCurrentColor(prev => (prev + 1) % matchPetColors.length);
    }, 3000);

    return () => clearInterval(colorInterval);
  }, []);

  const handleButtonClick = (e) => {
    // Efecto de click simple
    e.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
      e.target.style.transform = 'scale(1)';
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px ${matchPetColors[currentColor]}40; }
          50% { box-shadow: 0 0 40px ${matchPetColors[currentColor]}80; }
        }
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Partículas flotantes ligeras */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full opacity-60"
          style={{
            left: `${10 + (particle.id * 8)}%`,
            top: `${20 + (particle.id * 6)}%`,
            backgroundColor: particle.color,
            animation: `float ${3 + particle.delay}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Círculo principal optimizado */}
          <div className="mb-8 relative">
            <div 
              className="w-32 h-32 rounded-full mx-auto flex items-center justify-center mb-4 relative cursor-pointer transition-all duration-500 hover:scale-110"
              style={{ 
                backgroundColor: matchPetColors[currentColor],
                animation: 'pulse-glow 2s ease-in-out infinite'
              }}
              onClick={handleButtonClick}
            >
              <Clock className="w-16 h-16 text-white" style={{ animation: 'float 3s ease-in-out infinite' }} />
              
              {/* Solo 4 sparkles */}
              {[...Array(4)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute w-4 h-4 text-yellow-300"
                  style={{
                    top: i < 2 ? '10%' : '80%',
                    left: i % 2 === 0 ? '10%' : '80%',
                    animation: `sparkle ${2 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
            
            {/* Iconos flotantes simples */}
            <Heart
              className="absolute top-8 left-1/4 w-6 h-6 cursor-pointer hover:scale-125 transition-transform"
              style={{ 
                color: matchPetColors[0],
                animation: 'float 2.5s ease-in-out infinite',
                animationDelay: '0.5s'
              }}
            />
            <Rocket
              className="absolute top-16 right-1/4 w-6 h-6 cursor-pointer hover:scale-125 transition-transform"
              style={{ 
                color: matchPetColors[1],
                animation: 'float 3.5s ease-in-out infinite',
                animationDelay: '1s'
              }}
            />
          </div>

          {/* Título dinámico con MatchPet */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 mr-2" style={{ color: matchPetColors[0], animation: 'float 2s ease-in-out infinite' }} />
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: matchPetColors[1] }}>
                MatchPet
              </h2>
              <Heart className="w-8 h-8 ml-2" style={{ color: matchPetColors[0], animation: 'float 2s ease-in-out infinite', animationDelay: '0.5s' }} />
            </div>
            
            <h1 
              className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-500 hover:scale-105"
              style={{ 
                color: matchPetColors[currentColor],
                textShadow: `0 0 20px ${matchPetColors[currentColor]}40`,
                animation: 'float 4s ease-in-out infinite'
              }}
            >
              ¡Próximamente!
            </h1>
          </div>
          
          <p 
            className="text-xl md:text-2xl mb-6 font-semibold"
            style={{ color: matchPetColors[3] }}
          >
            🚀 MatchPet está preparando algo increíble 🌟
          </p>

          {/* Descripción optimizada */}
          <div className="mb-8 max-w-lg mx-auto">
            <div 
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:scale-105"
              style={{ borderColor: matchPetColors[2] }}
            >
              <p className="text-lg leading-relaxed mb-4 font-medium" style={{ color: matchPetColors[3] }}>
                🎨 En MatchPet estamos desarrollando nuevas funcionalidades increíbles para hacer que encuentres a tu compañero perfecto de la manera más fácil y divertida!
              </p>
              <p className="text-gray-600">
                💝 Somos la plataforma líder en adopción responsable. Mientras tanto, explora los refugios y mascotas que ya están esperando por ti...
              </p>
            </div>
          </div>

          {/* Barra de progreso simple */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Rocket className="w-5 h-5" style={{ color: matchPetColors[0], animation: 'float 2s ease-in-out infinite' }} />
              <span className="text-lg font-semibold" style={{ color: matchPetColors[3] }}>
                MatchPet en desarrollo...
              </span>
              <Sparkles className="w-5 h-5" style={{ color: matchPetColors[0], animation: 'sparkle 2s ease-in-out infinite' }} />
            </div>
            <div className="w-72 mx-auto bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: '75%',
                  backgroundColor: matchPetColors[currentColor],
                  boxShadow: `0 0 15px ${matchPetColors[currentColor]}60`
                }}
              ></div>
            </div>
            <p className="text-sm font-medium mt-2" style={{ color: matchPetColors[2] }}>
              ✨ 75% completado ✨
            </p>
          </div>

          {/* Botones optimizados */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              className="px-8 py-3 rounded-lg text-white font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center shadow-lg"
              style={{ backgroundColor: matchPetColors[1] }}
              onClick={(e) => {
                handleButtonClick(e);
                router.push('/refugios');
              }}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Explorar Refugios
            </button>
            
            <button 
              className="px-8 py-3 rounded-lg text-white font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center shadow-lg"
              style={{ backgroundColor: matchPetColors[0] }}
              onClick={(e) => {
                handleButtonClick(e);
                router.push('/Mascotas');
              }}
            >
              <Heart className="w-5 h-5 mr-2" />
              Ver Mascotas
            </button>
          </div>

          {/* Footer optimizado */}
          <div 
            className="p-6 bg-white rounded-2xl shadow-lg border-2 hover:shadow-xl transition-all duration-300"
            style={{ borderColor: matchPetColors[1] }}
          >
            <div className="flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 mr-2" style={{ color: matchPetColors[0], animation: 'float 2s ease-in-out infinite' }} />
              <span className="font-bold text-xl" style={{ color: matchPetColors[3] }}>
                ¡Gracias por confiar en MatchPet!
              </span>
              <Heart className="w-6 h-6 ml-2" style={{ color: matchPetColors[0], animation: 'float 2s ease-in-out infinite', animationDelay: '0.5s' }} />
            </div>
            <p className="text-gray-600 font-medium mb-4">
              🌈 En MatchPet trabajamos cada día para conectar mascotas con familias amorosas 🐾
            </p>
            
            {/* Redes sociales */}
            <div className="flex justify-center space-x-4">
              <a 
                href="/Proximamente" 
                className="p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ backgroundColor: matchPetColors[1] }}
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a 
                href="/Proximamente" 
                className="p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ backgroundColor: matchPetColors[0] }}
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a 
                href="/Proximamente" 
                className="p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ backgroundColor: matchPetColors[3] }}
              >
                <Twitter className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantallaProximamente;