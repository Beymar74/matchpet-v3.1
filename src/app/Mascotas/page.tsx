"use client";

import React from "react";

const mascotas = [
  {
    id: 1,
    nombre: "Firulais",
    edad: "3 años",
    tipo: "Perro",
    descripcion: "Perro juguetón y amigable",
    foto: "/Perros/beagle.jpg",
    genero: "Macho",
    tamaño: "Mediano"
  },
  {
    id: 2,
    nombre: "Michi",
    edad: "2 años",
    tipo: "Gato",
    descripcion: "Gato curioso y tranquilo",
    foto: "/Gatos/gatito_PA_10.png",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 3,
    nombre: "Luna",
    edad: "1 año",
    tipo: "Conejo",
    descripcion: "Coneja blanca muy dulce",
    foto: "/Perros/perrito_PA_10.png",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 4,
    nombre: "Max",
    edad: "4 años",
    tipo: "Perro",
    descripcion: "Perro protector y leal",
    foto: "/Perros/labrador.jpg",
    genero: "Macho",
    tamaño: "Grande"
  },
  {
    id: 5,
    nombre: "Nina",
    edad: "3 años",
    tipo: "Gato",
    descripcion: "Gata juguetona y cariñosa",
    foto: "/Gatos/gatito_PA_11.png",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 6,
    nombre: "Rocky",
    edad: "5 años",
    tipo: "Perro",
    descripcion: "Perro enérgico y amigable",
    foto: "/Perros/perrito_PA_11.png",
    genero: "Macho",
    tamaño: "Grande"
  },
  {
    id: 7,
    nombre: "Maya",
    edad: "2 años",
    tipo: "Gato",
    descripcion: "Gata tranquila y observadora",
    foto: "/Gatos/gatito_PA_12.png",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 8,
    nombre: "Toby",
    edad: "6 años",
    tipo: "Perro",
    descripcion: "Perro cariñoso y obediente",
    foto: "/Perros/perrito_PA_12.png",
    genero: "Macho",
    tamaño: "Mediano"
  },
  {
    id: 9,
    nombre: "Lola",
    edad: "1 año",
    tipo: "Gato",
    descripcion: "Gata curiosa y juguetona",
    foto: "/Gatos/gatito_PA_13.png",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 10,
    nombre: "Simba",
    edad: "3 años",
    tipo: "Perro",
    descripcion: "Perro activo y amigable",
    foto: "/Perros/perrito_PA_13.png",
    genero: "Macho",
    tamaño: "Mediano"
  },
  {
    id: 11,
    nombre: "Coco",
    edad: "4 años",
    tipo: "Gato",
    descripcion: "Gata dulce y cariñosa",
    foto: "/Gatos/gatito_PA_14.png",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 12,
    nombre: "Zeus",
    edad: "5 años",
    tipo: "Perro",
    descripcion: "Perro fuerte y protector",
    foto: "/Perros/perrito_PA_14.png",
    genero: "Macho",
    tamaño: "Grande"
  },
  {
    id: 13,
    nombre: "Mimi",
    edad: "2 años",
    tipo: "Gato",
    descripcion: "Gata juguetona y sociable",
    foto: "/Gatos/gatito_PA_15.png",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 14,
    nombre: "Bruno",
    edad: "3 años",
    tipo: "Perro",
    descripcion: "Perro amigable y activo",
    foto: "/Perros/perrito_PA_15.png",
    genero: "Macho",
    tamaño: "Mediano"
  },
  {
    id: 15,
    nombre: "Sasha",
    edad: "1 año",
    tipo: "Gato",
    descripcion: "Gata tranquila y cariñosa",
    foto: "/Gatos/gatito_PA_16.png",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 16,
    nombre: "Chico",
    edad: "4 años",
    tipo: "Perro",
    descripcion: "Perro juguetón y leal",
    foto: "/Perros/perrito_PA_16.png",
    genero: "Macho",
    tamaño: "Mediano"
  },
  {
    id: 17,
    nombre: "Nala",
    edad: "3 años",
    tipo: "Gato",
    descripcion: "Gata curiosa y activa",
    foto: "/Gatos/gato1.jpg",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 18,
    nombre: "Duke",
    edad: "5 años",
    tipo: "Perro",
    descripcion: "Perro protector y cariñoso",
    foto: "/Perros/labrador.jpg",
    genero: "Macho",
    tamaño: "Grande"
  },
  {
    id: 19,
    nombre: "Lily",
    edad: "2 años",
    tipo: "Gato",
    descripcion: "Gata dulce y juguetona",
    foto: "/Gatos/gato2.jpg",
    genero: "Hembra",
    tamaño: "Pequeño"
  },
  {
    id: 20,
    nombre: "Rex",
    edad: "6 años",
    tipo: "Perro",
    descripcion: "Perro enérgico y amigable",
    foto: "/Perros/beagle.jpg",
    genero: "Macho",
    tamaño: "Grande"
  },
];

export default function TodasLasMascotasMejorada() {
  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Perro": return "bg-blue-100 text-blue-800";
      case "Gato": return "bg-purple-100 text-purple-800";
      case "Conejo": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const MascotaCard = ({ mascota }) => (
    <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={mascota.foto}
          alt={mascota.nombre}
          className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-[#BF3952] truncate">{mascota.nombre}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(mascota.tipo)}`}>
            {mascota.tipo}
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-gray-600">
            <span><span className="font-semibold">Edad:</span> {mascota.edad}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{mascota.tamaño}</span>
          </div>
          <p className="text-gray-700 text-sm">{mascota.descripcion}</p>
          <p className="text-xs text-gray-500">{mascota.genero}</p>
        </div>
      </div>
    </article>
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#30588C] mb-4">
          Nuestras Mascotas
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Conoce a todos los increíbles animales que cuidamos. 
          Cada uno tiene su propia personalidad especial y está esperando encontrar su hogar ideal.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-[#30588C]">20</div>
          <div className="text-sm text-gray-600">Animales disponibles</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">12</div>
          <div className="text-sm text-gray-600">Perros</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">7</div>
          <div className="text-sm text-gray-600">Gatos</div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-[#BF3952]">3</div>
          <div className="text-sm text-gray-600">Especies diferentes</div>
        </div>
      </div>

      {/* Galería de animales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mascotas.map((mascota) => (
          <MascotaCard key={mascota.id} mascota={mascota} />
        ))}
      </div>
    </section>
  );
}