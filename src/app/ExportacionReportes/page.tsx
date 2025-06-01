'use client';

import dynamic from "next/dynamic";

// Carga dinámica del componente Exportador (evita SSR)
const Exportador = dynamic(() => import("@/components/Exportador"), {
  ssr: false,
});

export default function ExportacionReportesPage() {
  return <Exportador />;
}