'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Building2, 
  Heart, 
  LogOut, 
  Bell, 
  Settings, 
  Sparkles, 
  Search,
  PawPrint,
  Plus,
  Users,
  BarChart3,
  FileText,
  Home,
  Calendar
} from 'lucide-react';

// Tipos TypeScript para mejor tipado
interface Notification {
  id: number;
  message: string;
  time: string;
  type: 'adoption' | 'profile' | 'reminder' | 'donation' | 'social';
}

interface RefugioData {
  nombre: string;
  fotoPerfil: string;
}

// Datos mock de notificaciones (se pueden mover a un archivo separado)
const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, message: "Nueva solicitud de adopción para Max", time: "Hace 10 min", type: "adoption" },
  { id: 2, message: "Nuevo perfil de adoptante visitó tu refugio", time: "Hace 30 min", type: "profile" },
  { id: 3, message: "Recordatorio: Vacunación de Luna", time: "Hace 1 hora", type: "reminder" },
  { id: 4, message: "Donación recibida: $150", time: "Hace 2 horas", type: "donation" },
  { id: 5, message: "Nuevo seguidor en redes sociales", time: "Hace 3 horas", type: "social" }
];

// Enlaces de navegación principal
const MAIN_NAV_LINKS = [
  { id: "main-mascotas", href: "/PantallaGestionMascotas", label: "Mis Mascotas", color: "green" },
  { id: "main-solicitudes", href: "/solicitudes-adopcion", label: "Solicitudes", color: "blue" },
  { id: "main-perfil", href: "/ver-perfil-refugio", label: "Perfil", color: "pink" }
];

// Enlaces del menú desplegable
const MENU_LINKS = [
  { 
    id: "menu-perfil-refugio",
    href: "/ver-perfil-refugio", 
    label: "Perfil del refugio",
    description: "Ver y editar información",
    icon: Building2,
    color: "green"
  },
  { 
    id: "menu-gestionar-mascotas",
    href: "/dashboard-refugio", 
    label: "Gestionar mascotas",
    description: "Ver, agregar y editar",
    icon: PawPrint,
    color: "blue"
  },
  { 
    id: "menu-agregar-mascota",
    href: "/agregar-mascota", 
    label: "Agregar mascota",
    description: "Nueva mascota",
    icon: Plus,
    color: "purple"
  },
  { 
    id: "menu-solicitudes-adopcion",
    href: "/solicitudes-adopcion", 
    label: "Solicitudes de adopción",
    description: "Revisar solicitudes",
    icon: Heart,
    color: "orange"
  },
  { 
    id: "menu-reportes",
    href: "/reportes", 
    label: "Reportes y estadísticas",
    description: "Análisis del refugio",
    icon: BarChart3,
    color: "indigo"
  },
  { 
    id: "menu-configuracion",
    href: "/configuracion-refugio", 
    label: "Configuración",
    description: "Ajustes del refugio",
    icon: Settings,
    color: "gray"
  }
];

// Enlaces móviles
const MOBILE_NAV_LINKS = [
  { id: "mobile-mascotas", href: "/dashboard-refugio", label: "🐾 Mis Mascotas", color: "green" },
  { id: "mobile-agregar", href: "/agregar-mascota", label: "➕ Agregar Mascota", color: "purple" },
  { id: "mobile-solicitudes", href: "/solicitudes-adopcion", label: "💝 Solicitudes", color: "blue" },
  { id: "mobile-perfil", href: "/ver-perfil-refugio", label: "🏠 Mi Perfil", color: "teal" }
];

// Función para obtener estilos de color
const getColorClasses = (color: string) => {
  const colorMap: Record<string, string> = {
    green: "hover:text-[#4E9F3D] hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50",
    blue: "hover:text-[#30588C] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50",
    pink: "hover:text-[#BF3952] hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50",
    purple: "hover:text-[#BF3952] hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50",
    orange: "hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50",
    indigo: "hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50",
    gray: "hover:text-gray-800 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50",
    teal: "hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50"
  };
  return colorMap[color] || colorMap.gray;
};

// Función para obtener estilos de notificaciones
const getNotificationColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    adoption: 'bg-green-500',
    profile: 'bg-blue-500',
    reminder: 'bg-orange-500',
    donation: 'bg-purple-500',
    social: 'bg-pink-500'
  };
  return colorMap[type] || 'bg-gray-500';
};

// Componente de Logo
const Logo = React.memo(() => (
  <Link href="/dashboard-refugio" className="flex items-center gap-3 group">
    <div className="relative">
      <div className="w-[90px] sm:w-[110px] md:w-[130px] transform group-hover:scale-105 transition-transform duration-300">
        <Image
          src="/Logo/logo4.png"
          alt="MatchPet Logo"
          width={300}
          height={300}
          className="w-full h-auto object-contain drop-shadow-md"
          priority
        />
      </div>
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#4E9F3D] to-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
    </div>
  </Link>
));

// Componente de Barra de Búsqueda
const SearchBar = React.memo(() => (
  <div className="hidden lg:flex flex-1 max-w-md mx-8">
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar mascotas, adoptantes..."
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4E9F3D]/20 focus:border-[#4E9F3D] transition-all duration-300 text-gray-700"
        aria-label="Buscar mascotas, adoptantes"
      />
    </div>
  </div>
));

// Componente de Navegación Principal
const MainNavigation = React.memo(() => (
  <nav className="hidden md:flex items-center space-x-2 font-medium text-sm">
    {MAIN_NAV_LINKS.map((link) => (
      <Link 
        key={link.id}
        href={link.href} 
        className={`px-4 py-2 rounded-xl text-gray-700 transition-all duration-300 transform hover:scale-105 ${getColorClasses(link.color)}`}
      >
        {link.label}
      </Link>
    ))}
  </nav>
));

// Componente de Notificación Individual
const NotificationItem = React.memo(({ notification }: { notification: Notification }) => (
  <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
    <div className="flex items-start gap-3">
      <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationColor(notification.type)}`}></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
      </div>
    </div>
  </div>
));

// Componente de Panel de Notificaciones
const NotificationsPanel = React.memo(({ 
  showNotifications, 
  notificaciones, 
  toggleNotifications 
}: {
  showNotifications: boolean;
  notificaciones: number;
  toggleNotifications: () => void;
}) => (
  <div className="relative hidden md:block">
    <button
      onClick={toggleNotifications}
      className="relative p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4E9F3D]/20"
      aria-label={`Notificaciones ${notificaciones > 0 ? `(${notificaciones} nuevas)` : ''}`}
    >
      <Bell className="w-5 h-5 text-gray-600" />
      {notificaciones > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#4E9F3D] to-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
          {notificaciones}
        </span>
      )}
    </button>

    {showNotifications && (
      <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
        <div className="p-4 bg-gradient-to-r from-[#4E9F3D] to-[#30588C] text-white">
          <h3 className="font-semibold flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones del Refugio
          </h3>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <NotificationItem key={notif.id} notification={notif} />
          ))}
        </div>
        <div className="p-3 text-center">
          <button className="text-sm text-[#4E9F3D] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#4E9F3D]/20 rounded">
            Ver todas las notificaciones
          </button>
        </div>
      </div>
    )}
  </div>
));

// Componente del Elemento del Menú
const MenuItem = React.memo(({ 
  item, 
  closeMenu 
}: { 
  item: typeof MENU_LINKS[0]; 
  closeMenu: () => void;
}) => {
  const Icon = item.icon;
  const bgColorClass = `bg-${item.color}-100`;
  const hoverBgColorClass = `group-hover:bg-${item.color}-200`;
  const iconColorClass = item.color === 'gray' ? 'text-gray-600' : `text-${item.color}-600`;
  
  return (
    <Link
      href={item.href}
      onClick={closeMenu}
      className={`flex items-center gap-3 px-6 py-3 text-gray-700 transition-all duration-300 group ${getColorClasses(item.color)}`}
    >
      <div className={`w-10 h-10 rounded-xl ${bgColorClass} flex items-center justify-center ${hoverBgColorClass} transition-colors`}>
        <Icon size={18} className={iconColorClass} />
      </div>
      <div>
        <div className="font-medium">{item.label}</div>
        <div className="text-xs text-gray-500">{item.description}</div>
      </div>
    </Link>
  );
});

// Componente del Menú del Perfil
const ProfileMenu = React.memo(({ 
  isOpen, 
  nombreRefugio, 
  fotoRefugio, 
  closeMenu, 
  handleLogout 
}: {
  isOpen: boolean;
  nombreRefugio: string;
  fotoRefugio: string;
  closeMenu: () => void;
  handleLogout: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-slide-down">
      {/* Header del menú */}
      <div className="relative bg-gradient-to-r from-[#4E9F3D] to-[#30588C] p-6 text-white">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={fotoRefugio}
              alt="Refugio"
              width={70}
              height={70}
              className="rounded-full border-3 border-white shadow-lg object-cover"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <h3 className="mt-3 font-bold text-lg">{nombreRefugio}</h3>
          <p className="text-sm text-white/80">Refugio certificado</p>
        </div>
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={closeMenu}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border-b">
        <div className="text-center">
          <div className="text-lg font-bold text-[#4E9F3D]">32</div>
          <div className="text-xs text-gray-600">Mascotas</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-[#30588C]">8</div>
          <div className="text-xs text-gray-600">Solicitudes</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-[#BF3952]">142</div>
          <div className="text-xs text-gray-600">Perfiles</div>
        </div>
      </div>

      {/* Opciones del menú */}
      <div className="py-2">
        {MENU_LINKS.map((item) => (
          <MenuItem key={item.id} item={item} closeMenu={closeMenu} />
        ))}

        <hr className="my-2 mx-4" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 w-full group focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
            <LogOut size={18} />
          </div>
          <div>
            <div className="font-medium">Cerrar sesión</div>
            <div className="text-xs text-red-400">Salir del refugio</div>
          </div>
        </button>
      </div>
    </div>
  );
});

// Componente del Menú Móvil
const MobileMenu = React.memo(({ 
  isOpen, 
  closeMenu, 
  notificaciones 
}: {
  isOpen: boolean;
  closeMenu: () => void;
  notificaciones: number;
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200 animate-slide-down">
      <nav className="px-4 py-4 space-y-2">
        {MOBILE_NAV_LINKS.map((link) => (
          <Link 
            key={link.id}
            href={link.href} 
            onClick={closeMenu}
            className={`block px-4 py-3 rounded-xl text-gray-700 transition-all duration-300 ${getColorClasses(link.color)}`}
          >
            {link.label}
          </Link>
        ))}
        <div className="pt-2 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
            <Bell className="w-5 h-5" />
            <span>Notificaciones</span>
            {notificaciones > 0 && (
              <span className="ml-auto w-6 h-6 bg-[#4E9F3D] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notificaciones}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
});

// Componente Principal del Header
export default function HeaderRefugio() {
  // Estados
  const [isOpen, setIsOpen] = useState(false);
  const [fotoRefugio, setFotoRefugio] = useState('/Refugio/refugio1.jpeg');
  const [nombreRefugio, setNombreRefugio] = useState('');
  const [notificaciones, setNotificaciones] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);

  // Referencias
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Callbacks memoizados para mejor rendimiento
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleNotifications = useCallback(() => setShowNotifications(prev => !prev), []);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setIsOpen(false);
    window.location.href = '/';
  }, []);

  // Efecto para cargar datos del refugio
  useEffect(() => {
    const idRefugio = localStorage.getItem('idRefugio');
    if (!idRefugio) return;
  
    fetch(`/api/refugio/${idRefugio}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNombreRefugio(data.nombre);
          setFotoRefugio(data.fotoPerfil || '/Refugio/refugio1.jpeg');
        }
      })
      .catch((err) => {
        console.error('❌ Error al obtener datos del refugio:', err);
      });
  }, []);

  // Efecto para cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (isOpen || showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, showNotifications]);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Barra de búsqueda */}
          <SearchBar />

          {/* Navegación principal */}
          <MainNavigation />

          {/* Área de refugio */}
          <div className="flex items-center gap-3">
            {/* Notificaciones */}
            <div ref={notifRef}>
              <NotificationsPanel 
                showNotifications={showNotifications}
                notificaciones={notificaciones}
                toggleNotifications={toggleNotifications}
              />
            </div>

            {/* Perfil + Menú */}
            <div className="relative flex items-center gap-3" ref={menuRef}>
              <div className="hidden lg:flex flex-col items-end">
                <span className="font-semibold text-sm text-gray-800">{nombreRefugio}</span>
                <span className="text-xs text-gray-500">Refugio verificado</span>
              </div>
              
              <button 
                onClick={toggleMenu} 
                className="relative focus:outline-none focus:ring-2 focus:ring-[#4E9F3D]/20 rounded-full group"
                aria-label="Abrir menú de perfil"
              >
                <div className="relative">
                  <Image
                    src={fotoRefugio}
                    alt="Refugio"
                    width={44}
                    height={44}
                    className="rounded-full border-3 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4E9F3D] to-[#30588C] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
              </button>

              <ProfileMenu 
                isOpen={isOpen}
                nombreRefugio={nombreRefugio}
                fotoRefugio={fotoRefugio}
                closeMenu={closeMenu}
                handleLogout={handleLogout}
              />
            </div>

            {/* Botón menú móvil */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu} 
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4E9F3D]/20"
              >
                {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil expandido */}
        <MobileMenu 
          isOpen={isOpen}
          closeMenu={closeMenu}
          notificaciones={notificaciones}
        />
      </header>

      {/* Estilos CSS */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </>
  );
}