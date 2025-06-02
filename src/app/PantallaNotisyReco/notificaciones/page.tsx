'use client';

import { useState } from 'react';

interface Notificacion {
  id: number;
  tipo: 'info' | 'alerta' | 'mensaje';
  texto: string;
  fecha: string;
  leida: boolean;
}

export default function BandejaNotificaciones() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: 1,
      tipo: 'info',
      texto:
        '¡Felicidades! Tu solicitud de adopción para "Pelusa" ha sido aprobada por el refugio. Te recomendamos coordinar una visita para conocerla en persona y preparar todo para su llegada.',
      fecha: '2025-05-30T10:15:00',
      leida: false,
    },
    {
      id: 2,
      tipo: 'alerta',
      texto:
        'Se ha publicado una nueva mascota que coincide con tus preferencias en la zona de La Paz. Revisa las alertas para más detalles y no pierdas la oportunidad de darle un hogar.',
      fecha: '2025-05-28T08:45:00',
      leida: true,
    },
    {
      id: 3,
      tipo: 'mensaje',
      texto:
        'Recordatorio: Tienes una visita programada con el equipo de seguimiento post-adopción para el próximo 3 de junio a las 15:00 hrs. Asegúrate de tener toda la documentación necesaria.',
      fecha: '2025-05-25T14:30:00',
      leida: false,
    },
    {
      id: 4,
      tipo: 'info',
      texto:
        'Tu perfil ha sido actualizado exitosamente con la nueva información que proporcionaste. Gracias por mantener tus datos al día para una mejor experiencia en la plataforma.',
      fecha: '2025-05-24T16:00:00',
      leida: true,
    },
    {
      id: 5,
      tipo: 'mensaje',
      texto:
        'El refugio ha enviado un mensaje nuevo sobre la salud de la mascota que adoptaste. Por favor, revisa la sección de mensajes para más detalles y recomendaciones.',
      fecha: '2025-05-22T09:15:00',
      leida: false,
    },
    {
      id: 6,
      tipo: 'alerta',
      texto:
        'La mascota "Rocky" requiere atención urgente debido a un cambio en su comportamiento reportado por el refugio. Te sugerimos ponerte en contacto cuanto antes con los responsables.',
      fecha: '2025-05-20T17:50:00',
      leida: true,
    },
    {
      id: 7,
      tipo: 'info',
      texto:
        'Se ha añadido una nueva guía sobre cuidados post-adopción en la sección de recursos. Visítala para conocer recomendaciones que ayudarán a tu mascota a adaptarse mejor.',
      fecha: '2025-05-18T11:05:00',
      leida: false,
    },
    {
      id: 8,
      tipo: 'mensaje',
      texto:
        'Recibiste un comentario positivo del refugio respecto a tu compromiso y responsabilidad como adoptante. ¡Gracias por hacer la diferencia en la vida de una mascota!',
      fecha: '2025-05-15T13:20:00',
      leida: true,
    },
  ]);

  const iconos = {
    info: 'ℹ️',
    alerta: '⚠️',
    mensaje: '💬',
  };

  const colores = {
    info: 'bg-blue-100 text-blue-700',
    alerta: 'bg-red-100 text-red-700',
    mensaje: 'bg-green-100 text-green-700',
  };

  const marcarLeida = (id: number) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Bandeja de Notificaciones
      </h1>

      <ul className="max-w-3xl mx-auto space-y-4">
        {notificaciones.map(({ id, tipo, texto, fecha, leida }) => (
          <li
            key={id}
            className={`flex items-start gap-4 rounded-lg p-4 shadow-md cursor-pointer transition
              ${
                leida
                  ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-200 dark:bg-gray-700 font-semibold'
              }
              hover:shadow-xl hover:scale-[1.02]
            `}
            onClick={() => !leida && marcarLeida(id)}
            aria-label={`Notificación: ${texto} del tipo ${tipo} ${
              leida ? 'leída' : 'no leída'
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                !leida && marcarLeida(id);
              }
            }}
          >
            <div
              className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-xl font-bold
              ${colores[tipo]}
            `}
              aria-hidden="true"
            >
              {iconos[tipo]}
            </div>

            <div className="flex flex-col flex-grow">
              <p>{texto}</p>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formatearFecha(fecha)}
              </span>
            </div>

            {!leida && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  marcarLeida(id);
                }}
                className="ml-4 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                aria-label="Marcar como leído"
              >
                Marcar leído
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
