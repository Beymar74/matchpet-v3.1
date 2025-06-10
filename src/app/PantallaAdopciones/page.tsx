'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();

  const opciones = [
    {
      titulo: 'Evaluación de Solicitudes',
      ruta: '/EstadoSolicitud',
      imagen: '/Perros/perrito_PA_10.png',
    },
    {
      titulo: 'Estado de Solicitudes',
      ruta: '/EvaluacionSolicitudesRefugio',
      imagen: '/Perros/perrito_PA_11.png',
    },
    {
      titulo: 'Seguimiento Post-Adopción',
      ruta: '/SeguimientoPostAdopcion',
      imagen: '/Gatos/gatito_PA_10.png',
    },
  ];

  // Datos de ejemplo para las solicitudes
  const solicitudes = [
    { estado: 'Pendiente', cantidad: 5 },
    { estado: 'Aceptada', cantidad: 8 },
    { estado: 'Rechazada', cantidad: 3 },
  ];

  // Cálculos para porcentajes de progreso
  const totalSolicitudes = solicitudes.reduce((acc, sol) => acc + sol.cantidad, 0);
  const pendientePorcentaje = (solicitudes.find((sol) => sol.estado === 'Pendiente')?.cantidad || 0) / totalSolicitudes;
  const aceptadaPorcentaje = (solicitudes.find((sol) => sol.estado === 'Aceptada')?.cantidad || 0) / totalSolicitudes;
  const rechazadaPorcentaje = (solicitudes.find((sol) => sol.estado === 'Rechazada')?.cantidad || 0) / totalSolicitudes;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Banner */}
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

      {/* Botón de Volver atrás */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push('/refugio')}
          className="px-6 py-2 text-sm bg-[#2D3B5A] text-white rounded-full hover:bg-[#254266] transition duration-300"
        >
          Volver al Refugio
        </button>
      </div>

      {/* Estadísticas Visuales */}
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {/* Estadísticas de Solicitudes */}
        {solicitudes.map((sol, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-[#6093BF] rounded-full text-white text-lg font-semibold">
              {sol.estado.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{sol.estado}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">{sol.cantidad} Solicitudes</div>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-2 bg-gray-300 rounded-full">
                <div
                  className="h-full bg-[#30588C] rounded-full"
                  style={{ width: `${Math.round((sol.cantidad / totalSolicitudes) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tarjetas de opciones */}
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {opciones.map((op) => (
          <button
            key={op.ruta}
            onClick={() => router.push(op.ruta)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden text-left p-4"
          >
            <Image
              src={op.imagen}
              alt={op.titulo}
              width={500}
              height={300}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{op.titulo}</h2>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
