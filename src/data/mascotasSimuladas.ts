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
}

// Simulación de base de datos en memoria
export const mascotasSimuladas: Mascota[] = [
  {
    id: 1,
    nombre: "Firulais",
    especie: "Perro",
    raza: "Beagle",
    edad: 3,
    estado: "Disponible",
    descripcion: "Perro juguetón y amigable",
    foto: "🐶", // o usa una URL como "/Perros/beagle.jpg"
    fechaIngreso: "2024-05-15",
    compatibilidad: 85,
    solicitudes: 2,
  },
  {
    id: 2,
    nombre: "Michi",
    especie: "Gato",
    raza: "Siames",
    edad: 2,
    estado: "Adoptado",
    descripcion: "Gato curioso y tranquilo",
    foto: "🐱", // o usa una URL como "/Gatos/persa.jpg"
    fechaIngreso: "2024-04-22",
    compatibilidad: 90,
    solicitudes: 3,
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
