import React from 'react';
import Image from 'next/image';
import { MapPin, Star, Sparkles, Clock, Shield, Home } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { ProgressBar } from '../atoms/ProgressBar';

interface Pet {
  nombre: string;
  edad: string;
  especie: string;
  raza: string;
  descripcion: string;
  refugio: string;
  compatibilidad: number;
  imagen: string;
  personalidad: string[];
  color: string;
}

interface PetCardProps {
  pet: Pet;
  isAnimating: boolean;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, isAnimating }) => {
  return (
    <div className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
      isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
    }`}>
      <div className="relative h-96 overflow-hidden group">
        <Image
          src={pet.imagen}
          alt={pet.nombre}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${pet.color} opacity-20`} />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="primary" className="backdrop-blur-sm bg-white/90">
            <Sparkles className="w-3 h-3 inline mr-1" />
            Nuevo
          </Badge>
        </div>
        
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-bold text-[#30588C]">{pet.compatibilidad}%</span>
          </div>
        </div>
      </div>

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

        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
          {pet.descripcion}
        </p>

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

        <ProgressBar value={pet.compatibilidad} animated />
      </div>
    </div>
  );
};