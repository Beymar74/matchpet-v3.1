import React from "react";

const mascotas = [
  {
    id: 1,
    nombre: "Firulais",
    edad: "3 años",
    descripcion: "Perro juguetón y amigable",
    foto: "/Perros/beagle.jpg",
  },
  {
    id: 2,
    nombre: "Michi",
    edad: "2 años",
    descripcion: "Gato curioso y tranquilo",
    foto: "/Gatos/gatito_PA_10.png",
  },
  {
    id: 3,
    nombre: "Luna",
    edad: "1 año",
    descripcion: "Coneja blanca muy dulce",
    foto: "/Perros/perrito_PA_10.png",
  },
  {
    id: 4,
    nombre: "Max",
    edad: "4 años",
    descripcion: "Perro protector y leal",
    foto: "/Perros/labrador.jpg",
  },
  {
    id: 5,
    nombre: "Nina",
    edad: "3 años",
    descripcion: "Gata juguetona y cariñosa",
    foto: "/Gatos/gatito_PA_11.png",
  },
  {
    id: 6,
    nombre: "Rocky",
    edad: "5 años",
    descripcion: "Perro enérgico y amigable",
    foto: "/Perros/perrito_PA_11.png",
  },
  {
    id: 7,
    nombre: "Maya",
    edad: "2 años",
    descripcion: "Gata tranquila y observadora",
    foto: "/Gatos/gatito_PA_12.png",
  },
  {
    id: 8,
    nombre: "Toby",
    edad: "6 años",
    descripcion: "Perro cariñoso y obediente",
    foto: "/Perros/perrito_PA_12.png",
  },
  {
    id: 9,
    nombre: "Lola",
    edad: "1 año",
    descripcion: "Gata curiosa y juguetona",
    foto: "/Gatos/gatito_PA_13.png",
  },
  {
    id: 10,
    nombre: "Simba",
    edad: "3 años",
    descripcion: "Perro activo y amigable",
    foto: "/Perros/perrito_PA_13.png",
  },
  {
    id: 11,
    nombre: "Coco",
    edad: "4 años",
    descripcion: "Gata dulce y cariñosa",
    foto: "/Gatos/gatito_PA_14.png",
  },
  {
    id: 12,
    nombre: "Zeus",
    edad: "5 años",
    descripcion: "Perro fuerte y protector",
    foto: "/Perros/perrito_PA_14.png",
  },
  {
    id: 13,
    nombre: "Mimi",
    edad: "2 años",
    descripcion: "Gata juguetona y sociable",
    foto: "/Gatos/gatito_PA_15.png",
  },
  {
    id: 14,
    nombre: "Bruno",
    edad: "3 años",
    descripcion: "Perro amigable y activo",
    foto: "/Perros/perrito_PA_15.png",
  },
  {
    id: 15,
    nombre: "Sasha",
    edad: "1 año",
    descripcion: "Gata tranquila y cariñosa",
    foto: "/Gatos/gatito_PA_16.png",
  },
  {
    id: 16,
    nombre: "Chico",
    edad: "4 años",
    descripcion: "Perro juguetón y leal",
    foto: "/Perros/perrito_PA_16.png",
  },
  {
    id: 17,
    nombre: "Nala",
    edad: "3 años",
    descripcion: "Gata curiosa y activa",
    foto: "/Gatos/gato1.jpg",
  },
  {
    id: 18,
    nombre: "Duke",
    edad: "5 años",
    descripcion: "Perro protector y cariñoso",
    foto: "/Perros/labrador.jpg",
  },
  {
    id: 19,
    nombre: "Lily",
    edad: "2 años",
    descripcion: "Gata dulce y juguetona",
    foto: "/Gatos/gato2.jpg",
  },
  {
    id: 20,
    nombre: "Rex",
    edad: "6 años",
    descripcion: "Perro enérgico y amigable",
    foto: "/Perros/beagle.jpg",
  },
];

export default function TodasLasMascotas() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-white via-[#f1f5f9] to-[#e0ecf6] dark:from-[#011526] dark:via-[#254559] dark:to-[#30588C] text-gray-900 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center text-[#30588C] dark:text-[#6093BF] mb-12">
          Listado de todas las mascotas
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {mascotas.map((m) => (
            <article
              key={m.id}
              className="bg-white/90 dark:bg-[#1e2e3c]/80 dark:backdrop-blur-md border border-gray-200 dark:border-[#30588C]/40 text-gray-900 dark:text-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
            >
              <img
                src={m.foto}
                alt={m.nombre}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[#BF3952] dark:text-[#BF3952] mb-2">
                  {m.nombre}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white">Edad:</span> {m.edad}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{m.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}