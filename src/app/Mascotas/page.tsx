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
    <div style={{ padding: 20 }}>
      <h1>Listado de todas las mascotas</h1>
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        {mascotas.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              width: 250,
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={m.foto}
              alt={m.nombre}
              style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 6 }}
            />
            <h2 style={{ margin: "10px 0 5px" }}>{m.nombre}</h2>
            <p><b>Edad:</b> {m.edad}</p>
            <p>{m.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
