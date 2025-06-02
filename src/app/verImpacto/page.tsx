import React from 'react';

const VerImpactoPage: React.FC = () => {
  // Placeholder for number of adopted pets
  const adoptedPetsCount = 1234;

  // Sample images from public folder
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
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Ver Impacto</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mascotas Adoptadas</h2>
        <div className="grid grid-cols-3 gap-4">
          {petImages.map((src, index) => (
            <div key={index} className="rounded overflow-hidden shadow-lg">
              <img src={src} alt={`Mascota adoptada ${index + 1}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Adoptantes</h2>
        <div className="grid grid-cols-3 gap-4">
          {adopterImages.map((src, index) => (
            <div key={index} className="rounded overflow-hidden shadow-lg">
              <img src={src} alt={`Adoptante ${index + 1}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-100 rounded-lg p-6 text-center mt-8">
        <p className="text-2xl font-semibold text-green-800 mb-2">Mascotas Adoptadas</p>
        <p className="text-6xl font-extrabold text-green-900">{adoptedPetsCount}</p>
      </section>
    </main>
  );
};

export default VerImpactoPage;
