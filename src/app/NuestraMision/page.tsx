'use client';

import React from 'react';

const NuestraMisionPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-slate-100 to-blue-50 dark:from-[#011526] dark:via-[#254559] dark:to-[#30588C] text-gray-800 dark:text-white transition-colors duration-500 px-6 py-12">

      {/* Fondos decorativos difuminados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 left-10 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-16 right-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl"></div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#30588C] dark:text-[#6093BF]">
          Nuestra Misión
        </h1>

        <section className="mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
            En MatchPet, nuestra misión es transformar vidas a través de la conexión entre personas y animales.
            Buscamos generar un impacto positivo promoviendo la adopción responsable, brindando una segunda
            oportunidad a mascotas que han sido abandonadas, maltratadas o simplemente necesitan un hogar lleno de amor.
            <br /><br />
            Creemos que cada animal merece una vida digna, segura y feliz, por eso trabajamos día a día para facilitar
            procesos de adopción transparentes, accesibles y humanizados. Nos esforzamos por comprender tanto las
            necesidades de los adoptantes como las particularidades de cada mascota, utilizando tecnología y empatía
            para lograr coincidencias que favorezcan relaciones duraderas.
            <br /><br />
            Nuestro compromiso se extiende más allá del acto de adoptar: impulsamos el bienestar animal mediante
            educación, sensibilización y apoyo continuo a las familias adoptantes. Queremos ser el puente que une
            historias, corazones y esperanzas, construyendo juntos una comunidad más compasiva y consciente del valor
            de cada vida animal.
          </p>
        </section>

        {/* Imagen decorativa opcional */}
        <section className="flex justify-center">
          <div className="w-full max-w-md h-64 bg-gray-200 dark:bg-[#254559] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-gray-400 dark:text-gray-300">Imagen de la misión aquí</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NuestraMisionPage;
