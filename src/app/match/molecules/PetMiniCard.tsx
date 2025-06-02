import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface PetMiniCardProps {
  pet: {
    nombre: string;
    raza: string;
    imagen: string;
    compatibilidad: number;
  };
  onClick?: () => void;
}

export const PetMiniCard: React.FC<PetMiniCardProps> = ({ pet, onClick }) => {
  return (
    <div 
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-12 h-12">
        <Image 
          src={pet.imagen} 
          alt={pet.nombre} 
          fill
          className="rounded-full object-cover ring-2 ring-white"
        />
      </div>
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