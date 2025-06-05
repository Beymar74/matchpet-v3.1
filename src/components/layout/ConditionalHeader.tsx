"use client";

import { usePathname } from "next/navigation";
import HeaderAdmin from "./HeaderAdmin";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/AsignacionRolesPermisos"];

  const shouldHide = hideHeaderRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHide) return null;

  return <HeaderAdmin />;
}
