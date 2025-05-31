'use client';

import React, { useState } from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import Image from 'next/image';

type Filter = 'Adoptantes';

interface CommunityMember {
  name: string;
  experience: string;
  image: string;
}

const filters: Filter[] = ['Adoptantes'];

const staticMembers: CommunityMember[] = [
  {
    name: 'Dr. Jenny Wilson',
    experience: '20+ Years Experience',
    image: '/Adoptante/Adoptante3.webp',
  },
  {
    name: 'Dr. Jacob Jones',
    experience: 'New Adopter',
    image: '/Adoptante/m_immedicohospitalario_estudio_asegura_perros_47965_04115049.jpg',
  },
  {
    name: 'Esther Howard',
    experience: 'Shelter Manager',
    image: '/Adoptante/f.elconfidencial.com_original_63b_ccb_f29_63bccbf29136809df1e776621df0362a.jpg',
  },
  {
    name: 'Wade Warren',
    experience: 'Vet Tech',
    image: '/Adoptante/e6e6bf39-1ce3-4cee-8653-050a86630099_16-9-discover-aspect-ratio_default_0.jpg',
  },
];

export default function CommunitySection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Adoptantes');

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto flex flex-col space-y-10 sm:space-y-12">
        <div className="text-center space-y-4 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Conoce a Nuestra Comunidad
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto">
            Aquí podrás conocer a quienes forman parte de esta hermosa comunidad: adoptantes, mascotas esperando un hogar y refugios que cambian vidas.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition duration-200 ${
                activeFilter === filter
                  ? 'bg-[#BF3952] text-white border-[#BF3952] hover:bg-[#a53147]'
                  : 'bg-white text-[#30588C] border-[#30588C] hover:bg-[#eef3f8] hover:text-[#254559]'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {staticMembers.map((member, index) => (
            <div
              key={`${activeFilter}-${index}-${member.name}`}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 group transition duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="bg-gray-100 aspect-[4/3] relative overflow-hidden">
                <Image
                  src={member.image}
                  alt={`Imagen de ${member.name}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 4}
                />
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{member.name}</h4>
                  <div className="flex items-center text-xs text-gray-500 flex-wrap">
                    <Briefcase className="w-3 h-3 mr-1 flex-shrink-0" />
                    {member.experience}
                  </div>
                </div>
                <button className="bg-[#30588C] hover:bg-[#254559] rounded-full p-2 transition duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
