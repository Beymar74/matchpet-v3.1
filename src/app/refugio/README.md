# 🐾 Sistema de Gestión para Refugios de Animales

Una aplicación web moderna para la gestión integral de refugios de animales, desarrollada con Next.js, React y TypeScript.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Componentes](#-componentes)
- [Tecnologías](#-tecnologías)
- [Próximas Funcionalidades](#-próximas-funcionalidades)
- [Contribución](#-contribución)

## ✨ Características

- 📊 **Dashboard interactivo** con estadísticas en tiempo real
- 🐕 **Gestión de mascotas** con filtros y búsqueda avanzada
- 📝 **Sistema de adopciones** con seguimiento de solicitudes
- 📈 **Reportes y métricas** detalladas del refugio
- ⚙️ **Configuración personalizable** del refugio
- 📱 **Diseño responsive** para todos los dispositivos
- 🎨 **Interfaz moderna** con Tailwind CSS

## 📁 Estructura del Proyecto

```
src/app/refugio/
├── 📄 page.tsx                                 # Página principal del refugio
├── 📁 componentes/
│   ├── 📁 navegacion/
│   │   ├── SidebarNavegacion.tsx              # Menú lateral de navegación
│   │   └── InfoRefugio.tsx                     # Información de contacto
│   ├── 📁 dashboard/
│   │   ├── TarjetasEstadisticas.tsx           # Métricas principales
│   │   ├── GraficoOcupacion.tsx               # Visualización de ocupación
│   │   └── SolicitudesRecientes.tsx           # Solicitudes recientes
│   ├── 📁 mascotas/
│   │   ├── GestionMascotas.tsx                # Gestión principal de mascotas
│   │   ├── TarjetaMascota.tsx                 # Tarjeta individual de mascota
│   │   └── FiltrosBusqueda.tsx                # Filtros y búsqueda
│   ├── 📁 adopciones/
│   │   └── GestionAdopciones.tsx              # Gestión de adopciones
│   ├── 📁 reportes/
│   │   └── GestionReportes.tsx                # Reportes y estadísticas
│   └── 📁 configuracion/
│       └── GestionConfiguracion.tsx           # Configuración del refugio
├── 📁 tipos/
│   └── index.ts                               # Interfaces TypeScript
└── 📁 datos/
    └── ejemplos.ts                            # Datos de prueba
```

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Next.js 13+

### Pasos de instalación

1. **Crear la estructura de carpetas:**

```bash
# Linux/macOS
mkdir -p src/app/refugio/{componentes/{navegacion,dashboard,mascotas,adopciones,reportes,configuracion},tipos,datos}

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "src/app/refugio/componentes/navegacion"
New-Item -ItemType Directory -Force -Path "src/app/refugio/componentes/dashboard"
New-Item -ItemType Directory -Force -Path "src/app/refugio/componentes/mascotas"
New-Item -ItemType Directory -Force -Path "src/app/refugio/componentes/adopciones"
New-Item -ItemType Directory -Force -Path "src/app/refugio/componentes/reportes"
New-Item -ItemType Directory -Force -Path "src/app/refugio/componentes/configuracion"
New-Item -ItemType Directory -Force -Path "src/app/refugio/tipos"
New-Item -ItemType Directory -Force -Path "src/app/refugio/datos"
```

2. **Instalar dependencias:**

```bash
npm install lucide-react
# o
yarn add lucide-react
```

3. **Copiar archivos:**
   - Copia cada componente en su carpeta correspondiente
   - Asegúrate de que los archivos React tengan extensión `.tsx`
   - Los archivos de tipos y datos deben tener extensión `.ts`

4. **Verificar importaciones:**
   - Asegúrate de que `HeaderRefugio` esté disponible en tu proyecto
   - Verifica que las rutas de importación sean correctas

## 🎯 Uso

### Navegación

La aplicación se divide en 5 secciones principales:

1. **🏠 Dashboard**: Vista general con estadísticas y métricas
2. **🐾 Mis Mascotas**: Gestión completa del inventario de animales
3. **👥 Adopciones**: Seguimiento de solicitudes y procesos
4. **📊 Reportes**: Análisis y métricas detalladas
5. **⚙️ Configuración**: Ajustes del refugio

### Funcionalidades Principales

#### Dashboard
- Visualización de estadísticas clave
- Gráfico de ocupación del refugio
- Lista de solicitudes recientes
- Métricas de adopciones exitosas

#### Gestión de Mascotas
- Agregar nuevas mascotas al sistema
- Buscar y filtrar por especie, estado, raza
- Ver detalles completos de cada animal
- Editar información existente
- Seguimiento de solicitudes por mascota

## 🧩 Componentes

### 📊 Dashboard

| Componente | Descripción | Props |
|------------|-------------|--------|
| `TarjetasEstadisticas` | Métricas principales del refugio | `estadisticas: Estadisticas` |
| `GraficoOcupacion` | Visualización de capacidad vs ocupación | `refugioInfo: RefugioInfo` |
| `SolicitudesRecientes` | Lista de últimas solicitudes | `solicitudesPendientes: SolicitudAdopcion[]` |

### 🐾 Mascotas

| Componente | Descripción | Props |
|------------|-------------|--------|
| `GestionMascotas` | Container principal de mascotas | `mascotas: Mascota[]` |
| `TarjetaMascota` | Tarjeta individual de animal | `mascota: Mascota` |
| `FiltrosBusqueda` | Controles de filtrado y búsqueda | - |

### 🧭 Navegación

| Componente | Descripción | Props |
|------------|-------------|--------|
| `SidebarNavegacion` | Menú lateral principal | `activeTab: TabType, setActiveTab: Function` |
| `InfoRefugio` | Datos de contacto del refugio | `refugioInfo: RefugioInfo` |

## 🛠 Tecnologías

- **Framework**: Next.js 13+ (App Router)
- **Frontend**: React 18+ con TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Estado**: React Hooks (useState)
- **Tipado**: TypeScript con interfaces estrictas

## 📅 Próximas Funcionalidades

### 🔄 En Desarrollo
- [ ] Sistema completo de adopciones
- [ ] Reportes avanzados con gráficos
- [ ] Configuración de refugio
- [ ] Gestión de usuarios y roles

### 🎯 Futuras Versiones
- [ ] Integración con base de datos
- [ ] Sistema de notificaciones
- [ ] Chat en tiempo real
- [ ] Aplicación móvil
- [ ] API REST completa
- [ ] Sistema de pagos
- [ ] Geolocalización de adopciones
- [ ] Seguimiento post-adopción

## 🎨 Personalización

### Colores del Sistema
```css
--primary: #011526    /* Azul marino oscuro */
--secondary: #BF3952  /* Rojo/Rosa */
--accent: #30588C     /* Azul medio */
--light: #6093BF      /* Azul claro */
--dark: #254559       /* Gris azulado */
```

### Modificar Datos de Ejemplo
Edita `src/app/refugio/datos/ejemplos.ts` para cambiar:
- Información del refugio
- Mascotas de prueba
- Estadísticas iniciales
- Solicitudes de ejemplo

## 🐛 Solución de Problemas

### Error: "No such file or directory"
- Verifica que todos los archivos tengan la extensión correcta (`.tsx` para componentes)
- Asegúrate de que las carpetas existan
- Revisa las rutas de importación

### Error: "Cannot find module"
- Instala `lucide-react`: `npm install lucide-react`
- Verifica que `HeaderRefugio` esté disponible
- Revisa las rutas relativas en las importaciones

### Estilos no aparecen
- Asegúrate de que Tailwind CSS esté configurado
- Verifica que las clases CSS sean válidas
- Revisa la configuración de `tailwind.config.js`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Convenciones de Código

- Usar TypeScript estricto
- Componentes funcionales con hooks
- Nombres de archivos en PascalCase
- Props con interfaces tipadas
- Comentarios en español
- Estructura modular y reutilizable

## 📞 Soporte

Si tienes preguntas o problemas:
1. Revisa la documentación
2. Busca en issues existentes
3. Crea un nuevo issue con detalles del problema

---

**Desarrollado con ❤️ para refugios de animales**

*Ayudando a conectar mascotas con familias loving desde Santa Cruz de la Sierra, Bolivia* 🇧🇴