// src/app/refugio/tipos/index.ts

export interface RefugioInfo {
    nombre: string;
    ubicacion: string;
    telefono: string;
    email: string;
    capacidad: number;
    ocupacion: number;
  }
  
  export interface Estadisticas {
    mascotasActivas: number;
    adopcionesPendientes: number;
    adopcionesCompletadas: number;
    solicitudesNuevas: number;
  }
  
  export interface Mascota {
    adoptabilidad: number;
    id: number;
    nombre: string;
    especie: string;
    raza: string;
    edad: string;
    estado: 'Disponible' | 'En proceso' | 'Adoptado';
    compatibilidad: number;
    foto: string;
    fechaIngreso: string;
    solicitudes: number;
  }
  
  export interface SolicitudAdopcion {
    id: number;
    adoptante: string;
    mascota: string;
    fecha: string;
    compatibilidad: number;
    estado: 'Pendiente' | 'En evaluación' | 'Aprobada' | 'Rechazada';
  }
  
  export type TabType = 'dashboard' | 'mascotas' | 'adopciones' | 'reportes' | 'configuracion';