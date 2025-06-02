'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NotiyRecoDashboard() {
  const router = useRouter();

  const opciones = [
    {
      titulo: 'Bandeja de Notificaciones',
      ruta: 'notificaciones',
      imagen: '/Perros/perrito_PA_10.png', // Cambia por la imagen que quieras
    },
    {
      titulo: 'Historial de Recomendaciones',
      ruta: 'historial-recomendaciones',
      imagen: '/Perros/perrito_PA_11.png',
    },
    {
      titulo: 'Alertas Nuevas Mascotas',
      ruta: 'alertas-nuevas-mascotas',
      imagen: '/Gatos/gatito_PA_10.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 py-2 px-6 text-sm text-gray-600 dark:text-gray-300">
        Inicio / Notificaciones y Recomendaciones
      </div>

      {/* Banner */}
      <div className="relative w-full h-72 md:h-80">
        <Image
          src="/Perros y Gatos/bannerprincipaladopciones.jpg" // Puedes cambiar a una imagen acorde
          alt="Banner Notificaciones y Recomendaciones"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">
            Módulo de Notificaciones y Recomendaciones
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl drop-shadow">
            Gestiona y revisa tus notificaciones, recomendaciones y alertas de mascotas según tus preferencias.
          </p>
        </div>
      </div>

      {/* Tarjetas de opciones */}
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {opciones.map((op) => (
          <button
            key={op.ruta}
            onClick={() => router.push(`/PantallaNotisyReco/${op.ruta}`)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition duration-300 overflow-hidden text-left"
            type="button"
          >
            <Image
              src={op.imagen}
              alt={op.titulo}
              width={500}
              height={300}
              className="w-full h-40 object-cover"
              priority
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
