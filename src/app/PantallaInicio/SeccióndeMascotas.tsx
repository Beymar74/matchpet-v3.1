'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import Image from 'next/image';

const pets = [
  {
    name: 'Pelusa',
    tags: ['Juguetón', 'Joven'],
    selected: false,
    imageSrc: '/Perros/perritos1.jpg',
    alt: 'Un gato bonito llamado Pelusa',
  },
  {
    name: 'Kuro',
    tags: ['Tranquilo', 'Macho'],
    selected: false,
    imageSrc: '/Perros/perritos3.jpg',
    alt: 'Un gato tranquilo llamado Kuro',
  },
  {
    name: 'Iker',
    tags: ['Casa con Patio', 'Adulto'],
    selected: false,
    imageSrc: '/Gatos/gatito10.jpg',
    alt: 'Un perro llamado Iker que necesita casa con patio',
  },
  {
    name: 'Susanita',
    tags: ['Energética', 'Hembra'],
    selected: false,
    imageSrc: '/Gatos/gato2.jpg',
    alt: 'Una mascota enérgica llamada Susanita',
  },
];

export default function PetsSection() {
  const [selectedPet, setSelectedPet] = useState<string | null>(null);

  const handleSelectPet = (petName: string) => {
    setSelectedPet(petName === selectedPet ? null : petName);
  };

  const currentPet = pets.find(pet => pet.name === selectedPet) || pets[0];

  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 md:px-8 md:py-16 bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] text-white">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

        {/* Imagen destacada */}
        <div className="w-full lg:w-1/2 relative rounded-xl overflow-hidden bg-gray-700 aspect-[4/3] flex items-center justify-center shadow-lg group">
          <Image
            key={currentPet.imageSrc}
            src={currentPet.imageSrc}
            alt={currentPet.alt}
            fill
            className="object-cover transition-opacity duration-500 ease-in-out"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 sm:p-5 md:p-6 flex justify-between items-center">
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold drop-shadow-md">
              {currentPet.name}
            </h3>
            <button className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition duration-300 transform hover:scale-110">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        {/* Lista de mascotas */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">
            Mascotas Adoptables
          </h2>
          <div className="flex flex-col gap-4">
            {pets.map(pet => (
              <div
                key={pet.name}
                className={`flex items-center p-3 sm:p-4 rounded-xl border transition-all duration-300 transform cursor-pointer ${
                  selectedPet === pet.name
                    ? 'bg-gradient-to-r from-[#BF3952] to-[#30588C] border-transparent shadow-xl scale-105 text-white'
                    : 'bg-white bg-opacity-90 border-gray-300 hover:bg-opacity-100 hover:shadow-lg hover:border-[#6093BF] hover:scale-[1.02] text-gray-800'
                }`}
                onClick={() => handleSelectPet(pet.name)}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 relative shadow-sm">
                  <Image
                    src={pet.imageSrc}
                    alt={pet.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className={`font-semibold text-sm sm:text-base md:text-lg mb-1 ${selectedPet === pet.name ? 'text-white' : 'text-gray-900'}`}>
                    {pet.name}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {pet.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedPet === pet.name ? 'secondary' : 'outline'}
                        className={`text-xs font-medium ${
                          selectedPet === pet.name
                            ? 'bg-white/20 border-transparent text-white'
                            : 'bg-gray-100 border-gray-300 text-gray-600'
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <button className={`rounded-full p-2 transition duration-300 flex-shrink-0 ml-2 ${
                  selectedPet === pet.name ? 'bg-white/20 hover:bg-white/30' : 'bg-[#6093BF] hover:bg-[#30588C]'
                }`}>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
