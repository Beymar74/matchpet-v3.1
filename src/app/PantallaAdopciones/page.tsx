'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();

  const opciones = [
    {
      titulo: 'Evaluación de Solicitudes',
      ruta: 'EvaluacionSolicitudes',
      imagen: '/img/evaluacion.png',
    },
    {
      titulo: 'Estado de Solicitudes',
      ruta: 'EstadoSolicitud',
      imagen: '/img/estado.png',
    },
    {
      titulo: 'Seguimiento Post-Adopción',
      ruta: 'SeguimientoPostAdopcion',
      imagen: '/img/seguimiento.png',
    },
    {
      titulo: 'Visitas Previas',
      ruta: 'VisitasPrevias',
      imagen: '/img/visitas.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 py-2 px-6 text-sm text-gray-600 dark:text-gray-300">
        Inicio / Adopciones
      </div>

      {/* Banner */}
      <div className="relative w-full h-72 md:h-80">
        <Image
          src="/img/banner-adopciones.jpg"
          alt="Banner Adopciones"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
          Centro de Adopciones y Seguimiento
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl drop-shadow">
          Gestiona solicitudes, visitas y seguimientos post-adopción para asegurar que cada mascota encuentre un hogar responsable, amoroso y permanente.
          </p>
        </div>
      </div>

      {/* Tarjetas de opciones */}
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {opciones.map((op) => (
          <button
            key={op.ruta}
            onClick={() => router.push(`/PantallaAdopciones/${op.ruta}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition duration-300 overflow-hidden text-left"
          >
            <Image
              src={op.imagen}
              alt={op.titulo}
              width={500}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{op.titulo}</h2>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
