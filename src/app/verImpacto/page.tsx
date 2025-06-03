'use client';

import React from 'react';

const VerImpactoPage: React.FC = () => {
  const adoptedPetsCount = 1234;

  const petImages = [
    '/Perros/beagle.jpg',
    '/Perros/labrador.jpg',
    '/Perros/perrito_PA_10.png',
  ];

  const adopterImages = [
    '/Adoptante/Adoptante1.jpg',
    '/Adoptante/Adoptante2.jpg',
    '/Adoptante/Adoptante3.webp',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-[#011526] dark:via-[#254559] dark:to-[#30588C] transition-colors duration-500 text-gray-800 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">

        <h1 className="text-4xl font-bold text-center text-[#30588C] dark:text-[#6093BF]">Ver Impacto</h1>

        {/* Mascotas adoptadas */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#BF3952]">Mascotas Adoptadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {petImages.map((src, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg backdrop-blur-md bg-white/60 dark:bg-[#1e2e3c]/70 border border-white/20">
                <img src={src} alt={`Mascota ${index + 1}`} className="w-full h-48 object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Adoptantes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#BF3952]">Adoptantes Felices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {adopterImages.map((src, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg backdrop-blur-md bg-white/60 dark:bg-[#1e2e3c]/70 border border-white/20">
                <img src={src} alt={`Adoptante ${index + 1}`} className="w-full h-48 object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Estadísticas */}
        <section className="bg-green-100 dark:bg-green-700/30 backdrop-blur-md border border-green-300/30 dark:border-green-500/20 rounded-xl p-8 text-center shadow-md">
          <p className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-2">Mascotas Adoptadas</p>
          <p className="text-6xl font-extrabold text-green-900 dark:text-green-200">{adoptedPetsCount}</p>
        </section>

      </div>
    </main>
  );
};

export default VerImpactoPage;
