"use client";

import { useEffect, useState } from "react";
import HeaderAdmin from "@/components/layout/HeaderAdmin";
import HeaderUsuario from "@/components/layout/HeaderUsuario";
import HeaderRefugio from "@/components/layout/HeaderRefugio";

export default function HeaderMain() {
  const [rol, setRol] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string | null>(null);
  const [foto, setFoto] = useState<string | null>(null);

  useEffect(() => {
    const storedRol = localStorage.getItem("rolUsuario");
    const storedNombre = localStorage.getItem("nombreUsuario");
    const storedFoto = localStorage.getItem("fotoPerfil");

    if (storedRol) setRol(storedRol);
    if (storedNombre) setNombre(storedNombre);
    if (storedFoto) setFoto(storedFoto);
  }, []);

  if (!rol) return null;

  switch (rol) {
    case "Administrador":
      return <HeaderAdmin nombre={nombre} foto={foto} />;
    case "Refugio":
    case "Asociación":
      return <HeaderRefugio nombre={nombre} foto={foto} />;
    case "Adoptante":
    default:
      return <HeaderUsuario nombre={nombre} foto={foto} />;
  }
}
