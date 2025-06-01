// /PantallaNotiyReco/page.tsx
import Link from 'next/link';

export default function NotiyRecoDashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Módulo de Notificaciones y Recomendaciones</h1>

      <nav className="flex flex-col gap-3">
        <Link href="/notificaciones/notificaciones" className="text-blue-600 hover:underline">
          Bandeja de Notificaciones
        </Link>
        <Link href="/notificaciones/historial-recomendaciones" className="text-blue-600 hover:underline">
          Historial de Recomendaciones
        </Link>
        <Link href="/notificaciones/alertas-nuevas-mascotas" className="text-blue-600 hover:underline">
          Alertas Nuevas Mascotas
        </Link>
      </nav>
    </main>
  );
}
