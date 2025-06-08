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
   rating?: number;
  refugioid?: string;
  fecha?: string;
  tipo?: string;
}

// 🐾 Datos por defecto (si localStorage está vacío)
const baseInicial: Mascota[] = [
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
  },
]

// 🧠 Cargar desde localStorage si existe
function cargarMascotas(): Mascota[] {
  if (typeof window === 'undefined') return baseInicial
  const data = localStorage.getItem('mascotas')
  return data ? JSON.parse(data) : baseInicial
}

// 🐶 Exportar el arreglo de mascotas actual
export const mascotasSimuladas: Mascota[] = cargarMascotas()

// ✅ Guardar en localStorage después de cualquier cambio
function guardarMascotas() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mascotas', JSON.stringify(mascotasSimuladas))
  }
}

// ➕ Agregar una nueva mascota
export function agregarMascota(nueva: Omit<Mascota, 'id'>): Mascota {
  const nuevaMascota: Mascota = {
    id: Date.now(),
    ...nueva,
    fechaIngreso: nueva.fechaIngreso ?? new Date().toISOString().split("T")[0],
    compatibilidad: nueva.compatibilidad ?? 0,
    solicitudes: nueva.solicitudes ?? 0,
  }
  mascotasSimuladas.push(nuevaMascota)
  guardarMascotas()
  console.log('📦 Mascota agregada:', nuevaMascota)
  return nuevaMascota
}

// 🧽 (opcional) Limpiar mascotas simuladas
export function limpiarMascotas() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mascotas')
    window.location.reload()
  }
}
