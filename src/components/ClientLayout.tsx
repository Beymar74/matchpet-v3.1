"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !pathname) return null;

  const isAdminRoute =
    pathname.startsWith("/admin") ||                    // ← ESTA ES LA LÍNEA NUEVA
    pathname.startsWith("/AsignacionRolesPermisos") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/usuarios");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={`flex-grow ${isAdminRoute ? "pt-0" : "pt-16"}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}