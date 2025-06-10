"use client";

import React from 'react';
import { MapPin, Phone, Mail, Users, Heart } from 'lucide-react';

const PantallaRefugios = () => {
  // Datos de ejemplo de refugios
  const refugios = [
    {
      id: 1,
      nombre: "Refugio Esperanza Animal",
      direccion: "Av. 6 de Agosto 1234, La Paz",
      telefono: "+591 78956423",
      email: "contacto@esperanzaanimal.org",
      capacidad: 150,
      animalesActuales: 87,
      especialidad: "Perros y Gatos",
      imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      nombre: "Fundación Patitas Felices",
      direccion: "Calle Sagárnaga 567, La Paz",
      telefono: "+591 69825347",
      email: "info@patitasfelices.bo",
      capacidad: 100,
      animalesActuales: 64,
      especialidad: "Perros abandonados",
      imagen: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      nombre: "Albergue Manos Amigas",
      direccion: "Av. El Alto km 8, La Paz",
      telefono: "+591 73481629",
      email: "ayuda@manosamigas.org",
      capacidad: 200,
      animalesActuales: 134,
      especialidad: "Animales en situación crítica",
      imagen: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      nombre: "Casa Hogar Animal Los Ángeles",
      direccion: "Zona Sur Calacoto, La Paz",
      telefono: "+591 75926384",
      email: "angeles@casahogar.bo",
      capacidad: 80,
      animalesActuales: 52,
      especialidad: "Gatos y animales pequeños",
      imagen: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      nombre: "Refugio Vida Nueva",
      direccion: "Av. Mariscal Santa Cruz 890, La Paz",
      telefono: "+591 61573928",
      email: "vidanueva@refugio.org",
      capacidad: 120,
      animalesActuales: 78,
      especialidad: "Rehabilitación animal",
      imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      nombre: "Protectora de Animales San Francisco",
      direccion: "Zona Miraflores, La Paz",
      telefono: "+591 79842657",
      email: "sanfrancisco@protectora.bo",
      capacidad: 90,
      animalesActuales: 61,
      especialidad: "Perros de raza y mestizos",
      imagen: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div className="w-full py-8 px-6" style={{ backgroundColor: '#30588C' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">
            Refugios Afiliados
          </h1>
          <p className="text-blue-100 text-lg">
            Conoce los refugios que forman parte de nuestra red de adopciones
          </p>
        </div>
      </div>

      {/* Refugios Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {refugios.map((refugio) => (
            <div key={refugio.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Imagen */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={refugio.imagen} 
                  alt={refugio.nombre}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#011526' }}>
                  {refugio.nombre}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{refugio.direccion}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{refugio.telefono}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{refugio.email}</span>
                  </div>
                </div>

                {/* Especialidad */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: '#BF3952' }}>
                    {refugio.especialidad}
                  </span>
                </div>

                {/* Capacidad */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">Capacidad: {refugio.capacidad}</span>
                  </div>
                  <div className="flex items-center" style={{ color: '#6093BF' }}>
                    <Heart className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{refugio.animalesActuales} animales</span>
                  </div>
                </div>

                {/* Barra de capacidad */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Ocupación actual</span>
                    <span>{Math.round((refugio.animalesActuales / refugio.capacidad) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(refugio.animalesActuales / refugio.capacidad) * 100}%`,
                        backgroundColor: '#6093BF'
                      }}
                    ></div>
                  </div>
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PantallaRefugios;