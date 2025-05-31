'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { Search, FileText, MessageSquare, CheckCircle } from 'lucide-react';

export default function AdoptionProcess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-16">

        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between mb-10 md:mb-14">
          {/* Izquierda */}
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Conoce el Proceso de Adopción que Manejamos
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              En MatchPet, buscamos que cada adopción sea especial, responsable y segura. Por eso, seguimos un proceso sencillo pero muy cuidado:
            </p>
          </div>
          {/* Derecha */}
          <div className="md:w-1/3 md:pl-8 text-left md:text-right text-sm sm:text-base text-gray-600">
            <p className="mb-4">
              Adoptar es más que un acto de amor. Es un compromiso de vida. En MatchPet, estamos aquí para acompañarte en cada paso.
            </p>
            <div className="flex justify-start md:justify-end">
              <Button
                className="px-6 py-3 text-base sm:text-lg bg-gradient-to-r from-[#BF3952] to-[#30588C] hover:from-[#BF3952] hover:to-[#254559] text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Más información
              </Button>
            </div>
          </div>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 md:gap-8">
          {/* Paso 1 */}
          <div className="bg-gradient-to-r from-[#6093BF] to-[#254559] p-5 sm:p-6 rounded-lg shadow-md text-left transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#30588C] mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Explora y elige</h3>
            <p className="text-sm sm:text-base text-white">
              Encuentra a tu compañero ideal entre las mascotas disponibles. Puedes filtrar por especie, edad, tamaño y compatibilidad.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="bg-gradient-to-r from-[#BF3952] to-[#30588C] p-5 sm:p-6 rounded-lg shadow-md text-left transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#BF3952] mb-4">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Envía tu solicitud</h3>
            <p className="text-sm sm:text-base text-white">
              Una vez que encuentres a tu match, completa una breve solicitud de adopción para conocerte mejor.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="bg-gradient-to-r from-[#254559] to-[#6093BF] p-5 sm:p-6 rounded-lg shadow-md text-left transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#011526] mb-4">
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Evaluación y contacto</h3>
            <p className="text-sm sm:text-base text-white">
              El refugio revisará tu solicitud y se pondrá en contacto contigo para coordinar una entrevista o visita.
            </p>
          </div>

          {/* Paso 4 */}
          <div className="bg-gradient-to-r from-[#6093BF] to-[#BF3952] p-5 sm:p-6 rounded-lg shadow-md text-left transition transform hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#30588C] mb-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">Adopción y nuevos comienzos</h3>
            <p className="text-sm sm:text-base text-white">
              ¡Si todo sale bien, la adopción se concreta! Llevarás a casa a un nuevo miembro de tu familia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
