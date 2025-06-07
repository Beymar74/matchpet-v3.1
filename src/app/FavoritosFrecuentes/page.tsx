"use client";

import React, { useState } from "react";
import Link from "next/link";

const botonesModulo7 = [
  { nombre: "Comparativa", ruta: "/ComparativaAdopciones" },
  { nombre: "Evolución", ruta: "/EvolucionHistorica" },
  { nombre: "Región", ruta: "/ActividadRegion" },
  { nombre: "Favoritos", ruta: "/FavoritosFrecuentes" },
  { nombre: "Logs", ruta: "/LogsAuditorias" },
];

const mascotasFavoritas = [
  {
    id: 1,
    nombre: "Luna",
    tipo: "Perro",
    raza: "Labrador",
    color: "Negro",
    edad: "2 años",
    refugio: "Refugio Esperanza",
    imagen: "/mascotas/luna.jpg",
    favoritos: 82,
  },
  {
    id: 2,
    nombre: "Max",
    tipo: "Gato",
    raza: "Siames",
    color: "Blanco",
    edad: "3 años",
    refugio: "Patitas Felices",
    imagen: "/mascotas/max.jpg",
    favoritos: 75,
  },
  {
    id: 3,
    nombre: "Bella",
    tipo: "Perro",
    raza: "Poodle",
    color: "Blanco",
    edad: "1 año",
    refugio: "Huellitas del Sur",
    imagen: "/mascotas/bella.jpg",
    favoritos: 68,
  },
  {
    id: 4,
    nombre: "Rocky",
    tipo: "Perro",
    raza: "Bulldog",
    color: "Marrón",
    edad: "4 años",
    refugio: "Vida Animal",
    imagen: "/mascotas/rocky.jpg",
    favoritos: 59,
  },
  {
    id: 5,
    nombre: "Milo",
    tipo: "Gato",
    raza: "Persa",
    color: "Gris",
    edad: "2 años",
    refugio: "Patas Unidas",
    imagen: "/mascotas/milo.jpg",
    favoritos: 52,
  },
];

export default function FavoritosFrecuentes() {
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroColor, setFiltroColor] = useState("Todos");
  const [filtroRaza, setFiltroRaza] = useState("Todos");
  const [filtroRefugio, setFiltroRefugio] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const tipos = ["Todos", ...new Set(mascotasFavoritas.map((m) => m.tipo))];
  const colores = ["Todos", ...new Set(mascotasFavoritas.map((m) => m.color))];
  const razas = ["Todos", ...new Set(mascotasFavoritas.map((m) => m.raza))];
  const refugios = ["Todos", ...new Set(mascotasFavoritas.map((m) => m.refugio))];

  const filtradas = mascotasFavoritas.filter((m) =>
    (filtroTipo === "Todos" || m.tipo === filtroTipo) &&
    (filtroColor === "Todos" || m.color === filtroColor) &&
    (filtroRaza === "Todos" || m.raza === filtroRaza) &&
    (filtroRefugio === "Todos" || m.refugio === filtroRefugio) &&
    m.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPerros = mascotasFavoritas.filter((m) => m.tipo === "Perro").length;
  const totalGatos = mascotasFavoritas.filter((m) => m.tipo === "Gato").length;

  return (
    <div className="p-6 bg-white shadow-2xl rounded-2xl max-w-7xl mx-auto mt-6 border border-[#264653]">

      {/* Menú superior */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {botonesModulo7.map((btn, i) => (
          <Link
            key={i}
            href={btn.ruta}
            className={`px-3 py-1 text-sm rounded-full transition font-medium ${
              btn.nombre === "Favoritos"
                ? "bg-[#30588C] text-white"
                : "bg-[#BF3952] text-white hover:bg-[#a82f46]"
            }`}
          >
            {btn.nombre}
          </Link>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-[#BF3952]">
        Mascotas Más Favoritas
      </h2>

      {/* Barra de búsqueda */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Buscar por nombre de mascota..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border border-[#30588C] rounded-lg text-sm text-[#0D1B2A]"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {[{ label: "Tipo", value: filtroTipo, setValue: setFiltroTipo, opciones: tipos },
          { label: "Color", value: filtroColor, setValue: setFiltroColor, opciones: colores },
          { label: "Raza", value: filtroRaza, setValue: setFiltroRaza, opciones: razas },
          { label: "Refugio", value: filtroRefugio, setValue: setFiltroRefugio, opciones: refugios }]
          .map((filtro, i) => (
            <select
              key={i}
              value={filtro.value}
              onChange={(e) => filtro.setValue(e.target.value)}
              className="border border-[#264653] rounded px-4 py-2 text-[#0D1B2A] bg-[#C9D6DF] focus:ring-2 focus:ring-[#BF3952]"
            >
              {filtro.opciones.map((op, j) => (
                <option key={j} value={op}>{filtro.label === "Refugio" ? op : op}</option>
              ))}
            </select>
        ))}
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtradas.map((mascota) => (
          <div
            key={mascota.id}
            className="bg-white border border-[#C9D6DF] rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={mascota.imagen}
              alt={mascota.nombre}
              className="w-full h-52 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold text-[#30588C] mb-1">{mascota.nombre}</h3>
              <p className="text-[#0D1B2A] text-sm">
                {mascota.tipo} - {mascota.edad}
              </p>
              <p className="text-sm text-[#264653]">Raza: {mascota.raza}</p>
              <p className="text-sm text-[#264653]">Color: {mascota.color}</p>
              <p className="text-sm text-[#264653] mb-2">{mascota.refugio}</p>
              <p className="text-[#BF3952] font-semibold text-sm">
                ❤️ {mascota.favoritos} favoritos
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="mt-10 text-center text-sm text-[#0D1B2A]">
        <p>Total de perros favoritos: <strong>{totalPerros}</strong></p>
        <p>Total de gatos favoritos: <strong>{totalGatos}</strong></p>
      </div>
    </div>
  );
}
