'use client';

import { useState, useMemo } from 'react';

interface MascotaAlerta {
  id: number;
  nombre: string;
  especie: string;
  edad: string;
  tamaño: string;
  energia: string;
  compatibilidadNinos: string;
  compatibilidadMascotas: string;
  tipoVivienda: string;
  tiempoDisponible: string;
  intereses: string[];
  personalidad: string[];
  motivoAdopcion: string;
  descripcion: string;
  imagen: string;
}

const MASCOTAS_SIMULADAS: MascotaAlerta[] = [
  {
    id: 1,
    nombre: 'Kira',
    especie: 'Perro',
    edad: 'Joven',
    tamaño: 'Mediano',
    energia: 'Muy Activo',
    compatibilidadNinos: 'Sí',
    compatibilidadMascotas: 'Sí (ambos)',
    tipoVivienda: 'Casa con patio',
    tiempoDisponible: 'Tiempo completo',
    intereses: ['Paseos al aire libre', 'Entrenamiento'],
    personalidad: ['Juguetón', 'Cariñoso'],
    motivoAdopcion: 'Compañía',
    descripcion: 'Perrita enérgica que necesita espacio y tiempo para ejercitarse.',
    imagen: '/Perros/perrito_PA_12.png',
  },
  {
    id: 2,
    nombre: 'Milo',
    especie: 'Gato',
    edad: 'Cachorro',
    tamaño: 'Pequeño',
    energia: 'Moderado',
    compatibilidadNinos: 'Indiferente',
    compatibilidadMascotas: 'Sí (gatos)',
    tipoVivienda: 'Departamento pequeño',
    tiempoDisponible: 'Medio tiempo',
    intereses: ['Tiempo en casa'],
    personalidad: ['Independiente'],
    motivoAdopcion: 'Rescate animal',
    descripcion: 'Gatito tranquilo, ideal para espacios pequeños.',
    imagen: '/Gatos/gatito_PA_14.png',
  },
  {
    id: 3,
    nombre: 'Luna',
    especie: 'Perro',
    edad: 'Adulto',
    tamaño: 'Grande',
    energia: 'Moderado',
    compatibilidadNinos: 'Sí',
    compatibilidadMascotas: 'No importante',
    tipoVivienda: 'Casa rural',
    tiempoDisponible: 'Medio tiempo',
    intereses: ['Correr', 'Senderismo'],
    personalidad: ['Protector'],
    motivoAdopcion: 'Terapia emocional',
    descripcion: 'Perro adulto que se adapta a la vida al aire libre.',
    imagen: '/Perros/perrito_PA_15.png',
  },
  {
    id: 4,
    nombre: 'Simba',
    especie: 'Gato',
    edad: 'Joven',
    tamaño: 'Pequeño',
    energia: 'Tranquilo',
    compatibilidadNinos: 'No',
    compatibilidadMascotas: 'No',
    tipoVivienda: 'Departamento grande',
    tiempoDisponible: 'Pocas horas al día',
    intereses: ['Tiempo en casa'],
    personalidad: ['Independiente', 'Tranquilo'],
    motivoAdopcion: 'Compañía',
    descripcion: 'Gato tranquilo y reservado, necesita un hogar tranquilo.',
    imagen: '/Gatos/gatito_PA_16.png',
  },
  // Más datos simulados para probar paginación y filtros
  {
    id: 5,
    nombre: 'Rocky',
    especie: 'Perro',
    edad: 'Adulto',
    tamaño: 'Grande',
    energia: 'Muy Activo',
    compatibilidadNinos: 'Sí',
    compatibilidadMascotas: 'Sí (perros)',
    tipoVivienda: 'Casa con patio',
    tiempoDisponible: 'Tiempo completo',
    intereses: ['Paseos al aire libre', 'Entrenamiento'],
    personalidad: ['Juguetón', 'Protector'],
    motivoAdopcion: 'Actividad física',
    descripcion: 'Perro fuerte y enérgico, requiere dueño activo.',
    imagen: '/Perros/perrito_PA_17.png',
  },
  {
    id: 6,
    nombre: 'Nala',
    especie: 'Gato',
    edad: 'Adulto',
    tamaño: 'Pequeño',
    energia: 'Moderado',
    compatibilidadNinos: 'No',
    compatibilidadMascotas: 'No importante',
    tipoVivienda: 'Departamento pequeño',
    tiempoDisponible: 'Medio tiempo',
    intereses: ['Tiempo en casa', 'Entrenamiento'],
    personalidad: ['Cariñoso', 'Tranquilo'],
    motivoAdopcion: 'Compañía',
    descripcion: 'Gata calmada y cariñosa, perfecta para departamentos.',
    imagen: '/Gatos/gatito_PA_17.png',
  },
  {
    id: 7,
    nombre: 'Max',
    especie: 'Perro',
    edad: 'Joven',
    tamaño: 'Mediano',
    energia: 'Moderado',
    compatibilidadNinos: 'Indiferente',
    compatibilidadMascotas: 'Sí (ambos)',
    tipoVivienda: 'Casa con patio',
    tiempoDisponible: 'Medio tiempo',
    intereses: ['Senderismo', 'Entrenamiento'],
    personalidad: ['Juguetón', 'Independiente'],
    motivoAdopcion: 'Rescate animal',
    descripcion: 'Perro joven que se adapta a diferentes estilos de vida.',
    imagen: '/Perros/perrito_PA_18.png',
  },
  {
    id: 8,
    nombre: 'Lola',
    especie: 'Gato',
    edad: 'Cachorro',
    tamaño: 'Pequeño',
    energia: 'Muy Activo',
    compatibilidadNinos: 'Sí',
    compatibilidadMascotas: 'Sí (gatos)',
    tipoVivienda: 'Departamento grande',
    tiempoDisponible: 'Tiempo completo',
    intereses: ['Paseos al aire libre', 'Tiempo en casa'],
    personalidad: ['Juguetón', 'Cariñoso'],
    motivoAdopcion: 'Compañía',
    descripcion: 'Gatita juguetona que requiere mucha atención.',
    imagen: '/Gatos/gatito_PA_18.png',
  },
  // Agrega más si quieres...
];

const OPCIONES_FILTRO = {
  especie: ['Perro', 'Gato', 'Otro'],
  tamaño: ['Pequeño', 'Mediano', 'Grande'],
  edad: ['Cachorro', 'Joven', 'Adulto'],
  energia: ['Tranquilo', 'Moderado', 'Muy Activo'],
  compatibilidadNinos: ['Sí', 'No', 'Indiferente'],
  compatibilidadMascotas: [
    'Sí (perros)',
    'Sí (gatos)',
    'Sí (ambos)',
    'No',
    'No importante',
  ],
  tipoVivienda: [
    'Casa con patio',
    'Departamento pequeño',
    'Departamento grande',
    'Casa rural',
  ],
  tiempoDisponible: ['Pocas horas al día', 'Medio tiempo', 'Tiempo completo'],
  intereses: [
    'Paseos al aire libre',
    'Correr',
    'Senderismo',
    'Tiempo en casa',
    'Entrenamiento',
  ],
  personalidad: [
    'Juguetón',
    'Independiente',
    'Protector',
    'Tranquilo',
    'Cariñoso',
  ],
  motivoAdopcion: [
    'Compañía',
    'Actividad física',
    'Terapia emocional',
    'Rescate animal',
    'Otro',
  ],
};

export default function AlertasNuevasMascotasFiltros() {
  const [filtros, setFiltros] = useState<Record<string, string[]>>(() => {
    const initialFilters: Record<string, string[]> = {};
    for (const key in OPCIONES_FILTRO) {
      initialFilters[key] = [];
    }
    return initialFilters;
  });

  const [cantidadMostrar, setCantidadMostrar] = useState(12);

  const toggleFiltroArray = (clave: string, valor: string) => {
    setFiltros((prev) => {
      const arr = prev[clave] || [];
      if (arr.includes(valor)) {
        return { ...prev, [clave]: arr.filter((v) => v !== valor) };
      } else {
        return { ...prev, [clave]: [...arr, valor] };
      }
    });
  };

  const mascotasFiltradas = useMemo(() => {
    return MASCOTAS_SIMULADAS.filter((m) => {
      for (const clave in filtros) {
        const valoresFiltro = filtros[clave];
        if (valoresFiltro.length === 0) continue; // no filtra este criterio
        const valorMascota = (m as any)[clave];

        if (Array.isArray(valorMascota)) {
          if (!valorMascota.some((v) => valoresFiltro.includes(v))) {
            return false;
          }
        } else {
          if (!valoresFiltro.includes(valorMascota)) {
            return false;
          }
        }
      }
      return true;
    });
  }, [filtros]);

  const mascotasMostrar = mascotasFiltradas.slice(0, cantidadMostrar);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Alertas Nuevas Mascotas
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <aside className="md:w-64 bg-white dark:bg-gray-800 rounded p-4 overflow-auto max-h-[70vh]">
          {Object.entries(OPCIONES_FILTRO).map(([clave, opciones]) => (
            <div key={clave} className="mb-4 last:mb-0">
              <h3 className="text-lg font-semibold mb-2 capitalize">{clave}</h3>
              <div className="flex flex-wrap gap-2">
                {(opciones as string[]).map((op) => {
                  const activo = filtros[clave]?.includes(op);
                  return (
                    <button
                      key={op}
                      type="button"
                      onClick={() => toggleFiltroArray(clave, op)}
                      className={`px-3 py-1 rounded-full border transition select-none
                        ${
                          activo
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <section className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mascotasMostrar.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300 col-span-full text-center">
              No se encontraron mascotas que coincidan con los filtros.
            </p>
          ) : (
            <>
              {mascotasMostrar.map((m) => (
                <div
                  key={m.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={m.imagen}
                    alt={`Foto de ${m.nombre}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {m.nombre}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                      {m.especie} - {m.edad} - {m.tamaño}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 flex-grow">
                      {m.descripcion}
                    </p>
                    <button
                      type="button"
                      className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => alert(`Solicitar adopción para ${m.nombre} (simulado)`)}
                    >
                      Solicitar Adopción
                    </button>
                  </div>
                </div>
              ))}

              {/* Tarjeta botón Cargar más */}
              {cantidadMostrar < mascotasFiltradas.length && (
                <button
                  type="button"
                  onClick={() => setCantidadMostrar((c) => c + 12)}
                  className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg p-4 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cargar más...
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
