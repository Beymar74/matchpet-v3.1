// src/app/refugio/data/mascotasSimuladas.ts

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
  descripcion?: string;
  foto?: string;
  fechaIngreso?: string;
  compatibilidad?: number;
  solicitudes?: number;
  refugioId?: number;
}

export interface Refugio {
  id: number;
  nombre: string;
  direccion: string;
  responsable: string;
}

// Simulación de base de datos en memoria
export const refugiosSimulados: Refugio[] = [
  {
    id: 1,
    nombre: "Hogar Peludo",
    direccion: "Calle 12 #456, Zona Sur",
    responsable: "María López"
  },
  {
    id: 2,
    nombre: "Patitas Felices",
    direccion: "Av. Siempre Viva 123",
    responsable: "Carlos Pérez"
  },
  {
    id: 3,
    nombre: "Refugio Central",
    direccion: "Av. Libertad y Calle 5",
    responsable: "Ana Rivera"
  }
];

export const mascotasSimuladas: Mascota[] = [
  {
    id: 1,
    nombre: "Firulais",
    especie: "Perro",
    raza: "Beagle",
    edad: 3,
    estado: "Disponible",
    descripcion: "Perro juguetón y amigable",
    foto: "🐶",
    fechaIngreso: "2024-05-15",
    compatibilidad: 85,
    solicitudes: 2,
    refugioId: 1,
  },
  {
    id: 2,
    nombre: "Michi",
    especie: "Gato",
    raza: "Siames",
    edad: 2,
    estado: "Adoptado",
    descripcion: "Gato curioso y tranquilo",
    foto: "🐱",
    fechaIngreso: "2024-04-22",
    compatibilidad: 90,
    solicitudes: 3,
    refugioId: 2,
  },
];

// Simular la inserción de una nueva mascota
export function agregarMascota(nueva: Omit<Mascota, "id">) {
  const nuevaMascota: Mascota = {
    id: mascotasSimuladas.length + 1,
    ...nueva,
    fechaIngreso: nueva.fechaIngreso ?? new Date().toISOString().split("T")[0],
    compatibilidad: nueva.compatibilidad ?? 0,
    solicitudes: nueva.solicitudes ?? 0,
  };
  mascotasSimuladas.push(nuevaMascota);
  console.log("📦 Mascota agregada:", nuevaMascota);
}
