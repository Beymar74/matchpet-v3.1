'use client';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="relative w-full h-72 md:h-80">
      <Image
        src="/Perros y Gatos/bannerprincipaladopciones.jpg"
        alt="Banner Adopciones"
        fill
        className="object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
          Centro de Adopciones y Seguimiento
        </h1>
        <p className="text-white text-sm md:text-lg max-w-2xl drop-shadow">
          Gestiona solicitudes, visitas y seguimientos post-adopción para asegurar que cada mascota
          encuentre un hogar responsable, amoroso y permanente.
        </p>
      </div>
    </div>
  );
};

export default Banner;
