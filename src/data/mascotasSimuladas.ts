export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  estado: string;
  descripcion?: string;
  foto?: string;
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
    foto: "/Perros/beagle.jpg",
  },
  {
    id: 2,
    nombre: "Michi",
    especie: "Gato",
    raza: "Siames",
    edad: 2,
    estado: "Adoptado",
    descripcion: "Gato curioso y tranquilo",
    foto: "/Gatos/persa.jpg",
  },
];

// Simular la inserción de una nueva mascota
export function agregarMascota(nueva: Omit<Mascota, "id">) {
  const nuevaMascota: Mascota = {
    id: mascotasSimuladas.length + 1,
    ...nueva,
  };
  mascotasSimuladas.push(nuevaMascota);
  console.log("📦 Mascota agregada:", nuevaMascota);
}
