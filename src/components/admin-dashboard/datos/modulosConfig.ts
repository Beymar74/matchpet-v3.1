// src/components/admin-dashboard/datos/modulosConfig.ts
import { 
    BarChart3,
    Users, 
    Heart, 
    UserCheck,
    PawPrint,
    PieChart, 
    Bell, 
    MessageCircle, 
    Settings 
  } from 'lucide-react';
  
  export const modulos = [
    { 
      id: 'dashboard', 
      name: 'Panel Principal', 
      icon: BarChart3, 
      description: 'Vista general del sistema y estadísticas principales',
      color: 'blue',
      permissions: ['admin', 'moderator']
    },
    { 
      id: 'usuarios', 
      name: 'Gestión de Usuarios', 
      icon: Users, 
      description: 'Administrar usuarios, roles y permisos del sistema',
      color: 'indigo',
      permissions: ['admin']
    },
    { 
      id: 'mascotas', 
      name: 'Gestión de Mascotas', 
      icon: Heart, 
      description: 'Supervisar registro, aprobación y estado de mascotas',
      color: 'red',
      permissions: ['admin', 'moderator']
    },
    { 
      id: 'adopciones', 
      name: 'Adopciones', 
      icon: UserCheck, 
      description: 'Monitorear proceso de adopción y seguimiento',
      color: 'green',
      permissions: ['admin', 'moderator']
    },
    { 
      id: 'compatibilidad', 
      name: 'Compatibilidad', 
      icon: PawPrint, 
      description: 'Configurar algoritmo de matching y parámetros',
      color: 'purple',
      permissions: ['admin']
    },
    { 
      id: 'reportes', 
      name: 'Reportes y Analytics', 
      icon: PieChart, 
      description: 'Estadísticas detalladas y exportaciones de datos',
      color: 'orange',
      permissions: ['admin', 'moderator']
    },
    { 
      id: 'notificaciones', 
      name: 'Notificaciones', 
      icon: Bell, 
      description: 'Gestionar alertas, avisos y notificaciones del sistema',
      color: 'yellow',
      permissions: ['admin', 'moderator']
    },
    { 
      id: 'comunicacion', 
      name: 'Comunicación', 
      icon: MessageCircle, 
      description: 'Supervisar mensajes, chats y comunicaciones',
      color: 'teal',
      permissions: ['admin', 'moderator']
    },
    { 
      id: 'configuracion', 
      name: 'Configuración', 
      icon: Settings, 
      description: 'Ajustes del sistema, parámetros y personalización',
      color: 'gray',
      permissions: ['admin']
    }
  ];
  
  export const estadisticasIniciales = {
    totalUsuarios: 1247,
    totalMascotas: 856,
    adopcionesMes: 127,
    refugiosActivos: 34,
    solicitudesPendientes: 23,
    compatibilidadPromedio: 92.5,
    nuevosUsuariosHoy: 15,
    mascotasAprobadas: 8,
    adopcionesCompletadas: 3,
    mensajesEnviados: 142
  };