import React from "react";

const mascotas = [
  {
    id: 1,
    nombre: "Firulais",
    edad: "3 años",
    descripcion: "Perro juguetón y amigable",
    foto: "https://placedog.net/400/300?id=1",
  },
  {
    id: 2,
    nombre: "Michi",
    edad: "2 años",
    descripcion: "Gato curioso y tranquilo",
    foto: "https://placekitten.com/400/300",
  },
  {
    id: 3,
    nombre: "Luna",
    edad: "1 año",
    descripcion: "Coneja blanca muy dulce",
    foto: "https://placeimg.com/400/300/animals",
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
