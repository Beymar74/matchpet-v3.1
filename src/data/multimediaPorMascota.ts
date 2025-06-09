// src/data/multimediaMascota.ts
export interface MultimediaMascota {
  idMascota: number
  url: string
  tipo: 'imagen' | 'video'
  descripcion?: string
}

export const multimediaMascotaBase: MultimediaMascota[] = [
  {
    idMascota: 1,
    url: 'https://res.cloudinary.com/dsblosz1l/image/upload/v1717800000/matchpet_mascotas/perro1.jpg',
    tipo: 'imagen',
    descripcion: 'Mascota jugando en el parque'
  },
  {
    idMascota: 1,
    url: 'https://res.cloudinary.com/dsblosz1l/image/upload/v1717800010/matchpet_mascotas/perro1_video.mp4',
    tipo: 'video',
    descripcion: 'Video corto de la mascota corriendo'
  },
  {
    idMascota: 2,
    url: 'https://res.cloudinary.com/dsblosz1l/image/upload/v1717800020/matchpet_mascotas/gato1.jpg',
    tipo: 'imagen',
    descripcion: 'Gato descansando'
  }
]

export function cargarMultimedia(): MultimediaMascota[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('multimediaMascotas')
  try {
    return data ? JSON.parse(data) : multimediaMascotaBase
  } catch {
    return multimediaMascotaBase
  }
}

export function guardarMultimedia(data: MultimediaMascota[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('multimediaMascotas', JSON.stringify(data))
  }
}

export function agregarMultimediaAMascota(nuevoArchivo: MultimediaMascota) {
  const multimedia = cargarMultimedia()
  multimedia.push(nuevoArchivo)
  guardarMultimedia(multimedia)
}
