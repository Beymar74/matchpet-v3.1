// src/app/refugio/datos/ejemplos.ts
import { RefugioInfo, Estadisticas, Mascota, SolicitudAdopcion } from '../tipos';

export const refugioInfo: RefugioInfo = {
  nombre: "Refugio Esperanza Animal",
  ubicacion: "Santa Cruz de la Sierra, Bolivia",
  telefono: "+591 3 123-4567",
  email: "contacto@esperanzaanimal.org",
  capacidad: 150,
  ocupacion: 89
};

export const estadisticas: Estadisticas = {
  mascotasActivas: 42,
  adopcionesPendientes: 8,
  adopcionesCompletadas: 156,
  solicitudesNuevas: 12
};

export const mascotas: Mascota[] = [
  {
    id: 1,
    nombre: "Max",
    especie: "Perro",
    raza: "Mestizo",
    edad: "2 años",
    estado: "Disponible",
    compatibilidad: 85,
    foto: "🐕",
    fechaIngreso: "2024-05-15",
    solicitudes: 3
  },
  {
    id: 2,
    nombre: "Luna",
    especie: "Gato",
    raza: "Siamés",
    edad: "1 año",
    estado: "En proceso",
    compatibilidad: 92,
    foto: "🐱",
    fechaIngreso: "2024-06-01",
    solicitudes: 5
  },
  {
    id: 3,
    nombre: "Toby",
    especie: "Perro",
    raza: "Golden Retriever",
    edad: "3 años",
    estado: "Disponible",
    compatibilidad: 78,
    foto: "🦮",
    fechaIngreso: "2024-04-20",
    solicitudes: 2
  }
];

export const solicitudesPendientes: SolicitudAdopcion[] = [
  {
    id: 1,
    adoptante: "María García",
    mascota: "Max",
    fecha: "2024-06-02",
    compatibilidad: 85,
    estado: "Pendiente"
  },
  {
    id: 2,
    adoptante: "Carlos Mendez",
    mascota: "Luna",
    fecha: "2024-06-01",
    compatibilidad: 92,
    estado: "En evaluación"
  }
];