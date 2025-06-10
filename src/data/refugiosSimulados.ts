// src/app/refugio/data/refugiosSimulados.ts

export interface Refugio {
  id: string;
  nombre: string;
  ubicacion?: string;
  telefono?: string;
}

export const refugiosSimulados: Refugio[] = [
  { id: "r1", nombre: "Huellitas La Paz", ubicacion: "La Paz", telefono: "78912345" },
  { id: "r2", nombre: "Patitas Cochabamba", ubicacion: "Cochabamba", telefono: "71234567" },
  { id: "r3", nombre: "Peludos Santa Cruz", ubicacion: "Santa Cruz", telefono: "76543210" },
];
