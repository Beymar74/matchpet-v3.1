
import React from 'react';

const NuestraMisionPage: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Nuestra Misión</h1>
      <section className="mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          En MatchPet, nuestra misión es conectar mascotas necesitadas con hogares amorosos, 
          promoviendo la adopción responsable y el bienestar animal. Trabajamos para crear 
          un mundo donde cada mascota tenga la oportunidad de una vida feliz y segura.
        </p>
      </section>
      <section className="flex justify-center">
        {/* Placeholder for mission-related image */}
        <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Imagen de la misión aquí</span>
        </div>
      </section>
    </main>
  );
};

export default NuestraMisionPage;
