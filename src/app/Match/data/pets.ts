// src/app/match/data/pets.ts
export interface Pet {
    id: number;
    nombre: string;
    edad: string;
    especie: 'Perro' | 'Gato';
    raza: string;
    descripcion: string;
    refugio: string;
    compatibilidad: number;
    imagen: string;
    personalidad: string[];
    color: string;
    tamaño: 'pequeño' | 'mediano' | 'grande';
  }
  
  // Datos de mascotas usando las imágenes locales
  export const perros: Pet[] = [
    {
      id: 1,
      nombre: 'Luna',
      edad: '2 años',
      especie: 'Perro',
      raza: 'Labrador',
      descripcion: 'Juguetona, cariñosa y ama correr en el parque. Le encanta el agua y jugar con otros perros.',
      refugio: 'Refugio Amigo Fiel',
      compatibilidad: 92,
      imagen: '/Perros/labrador.jpg',
      personalidad: ['Juguetona', 'Cariñosa', 'Activa'],
      color: 'from-yellow-400 to-orange-500',
      tamaño: 'grande'
    },
    {
      id: 2,
      nombre: 'Max',
      edad: '3 años',
      especie: 'Perro',
      raza: 'Beagle',
      descripcion: 'Curioso, protector y muy amigable con niños. Un compañero leal para toda la familia.',
      refugio: 'Huellitas del Sur',
      compatibilidad: 95,
      imagen: '/Perros/beagle.jpg',
      personalidad: ['Protector', 'Amigable', 'Leal'],
      color: 'from-blue-400 to-cyan-500',
      tamaño: 'mediano'
    },
    {
      id: 3,
      nombre: 'Rocky',
      edad: '1 año',
      especie: 'Perro',
      raza: 'Mestizo',
      descripcion: 'Enérgico y juguetón, ideal para familias activas. Le encanta aprender trucos nuevos.',
      refugio: 'Patitas La Paz',
      compatibilidad: 88,
      imagen: '/Perros/perrito_PA_10.png',
      personalidad: ['Enérgico', 'Inteligente', 'Sociable'],
      color: 'from-green-400 to-emerald-500',
      tamaño: 'mediano'
    },
    {
      id: 4,
      nombre: 'Bella',
      edad: '4 años',
      especie: 'Perro',
      raza: 'Mestizo',
      descripcion: 'Tranquila y cariñosa, perfecta para apartamentos. Ama las siestas y los paseos cortos.',
      refugio: 'Refugio Esperanza',
      compatibilidad: 90,
      imagen: '/Perros/perrito_PA_11.png',
      personalidad: ['Tranquila', 'Cariñosa', 'Independiente'],
      color: 'from-pink-400 to-rose-500',
      tamaño: 'pequeño'
    },
    {
      id: 5,
      nombre: 'Duke',
      edad: '2 años',
      especie: 'Perro',
      raza: 'Mestizo',
      descripcion: 'Guardián natural pero gentil. Excelente con otros perros y muy obediente.',
      refugio: 'Amigos Peludos',
      compatibilidad: 87,
      imagen: '/Perros/perrito_PA_12.png',
      personalidad: ['Protector', 'Gentil', 'Obediente'],
      color: 'from-purple-400 to-indigo-500',
      tamaño: 'grande'
    }
  ];
  
  export const gatos: Pet[] = [
    {
      id: 6,
      nombre: 'Michi',
      edad: '1 año',
      especie: 'Gato',
      raza: 'Mestizo',
      descripcion: 'Tranquilo, observador y le encanta dormir al sol. Perfecto compañero para momentos de calma.',
      refugio: 'Gatitos La Paz',
      compatibilidad: 88,
      imagen: '/Gatos/Gatinha_.jpg',
      personalidad: ['Tranquilo', 'Observador', 'Cariñoso'],
      color: 'from-purple-400 to-pink-500',
      tamaño: 'pequeño'
    },
    {
      id: 7,
      nombre: 'Luna',
      edad: '2 años',
      especie: 'Gato',
      raza: 'Siamés',
      descripcion: 'Elegante y juguetona. Le encanta trepar y explorar cada rincón de la casa.',
      refugio: 'Michis Felices',
      compatibilidad: 91,
      imagen: '/Gatos/gatito_PA_10.png',
      personalidad: ['Curiosa', 'Juguetona', 'Elegante'],
      color: 'from-blue-400 to-purple-500',
      tamaño: 'mediano'
    },
    {
      id: 8,
      nombre: 'Simba',
      edad: '3 años',
      especie: 'Gato',
      raza: 'Mestizo',
      descripcion: 'Rey de la casa, cariñoso cuando quiere. Ideal para personas que respetan su espacio.',
      refugio: 'Refugio Minino',
      compatibilidad: 85,
      imagen: '/Gatos/gatito_PA_11.png',
      personalidad: ['Independiente', 'Majestuoso', 'Selectivo'],
      color: 'from-orange-400 to-red-500',
      tamaño: 'mediano'
    },
    {
      id: 9,
      nombre: 'Nieve',
      edad: '6 meses',
      especie: 'Gato',
      raza: 'Persa',
      descripcion: 'Cachorra juguetona y muy cariñosa. Busca mimos constantemente.',
      refugio: 'Gatitos del Sur',
      compatibilidad: 93,
      imagen: '/Gatos/gatito_PA_12.png',
      personalidad: ['Mimosa', 'Juguetona', 'Tierna'],
      color: 'from-gray-400 to-gray-600',
      tamaño: 'pequeño'
    }
  ];
  
  // Combinar todas las mascotas
  export const todasLasMascotas: Pet[] = [...perros, ...gatos];
  
  // Función para filtrar mascotas
  export const filtrarMascotas = (
    mascotas: Pet[],
    filtros: {
      especie: string;
      edad: string;
      tamaño: string;
    }
  ): Pet[] => {
    return mascotas.filter(mascota => {
      // Filtrar por especie
      if (filtros.especie !== 'todos') {
        if (filtros.especie === 'perros' && mascota.especie !== 'Perro') return false;
        if (filtros.especie === 'gatos' && mascota.especie !== 'Gato') return false;
      }
  
      // Filtrar por edad
      if (filtros.edad !== 'cualquier') {
        const edadNumero = parseInt(mascota.edad);
        if (filtros.edad === 'cachorro' && edadNumero > 1) return false;
        if (filtros.edad === 'joven' && (edadNumero < 1 || edadNumero > 3)) return false;
        if (filtros.edad === 'adulto' && edadNumero < 3) return false;
      }
  
      // Filtrar por tamaño
      if (filtros.tamaño !== 'cualquier' && mascota.tamaño !== filtros.tamaño) {
        return false;
      }
  
      return true;
    });
  };