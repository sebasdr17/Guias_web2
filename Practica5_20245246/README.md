# Task Manager Pro 📝

Aplicación web completa de gestión de tareas construida con React, Firebase, Zustand y Tailwind CSS.

## 🚀 Características

- ✅ Autenticación de usuarios con Firebase Auth
- 📋 CRUD completo de tareas con Firestore
- 🎨 Interfaz moderna con Tailwind CSS
- 🔍 Filtrado por estado, categoría y búsqueda por texto
- 📊 Estadísticas y progreso de tareas
- 🌓 Tema claro/oscuro
- 📱 Diseño responsivo
- 🔔 Notificaciones toast
- ⏰ Fechas de vencimiento y alertas

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Firebase** - Backend (Authentication + Firestore)
- **Zustand** - Gestión de estado global
- **React Router** - Navegación
- **React Hook Form** - Manejo de formularios
- **Tailwind CSS** - Estilos y diseño
- **date-fns** - Manejo de fechas
- **react-hot-toast** - Notificaciones

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/         # Componentes reutilizables
│   ├── layout/         # Layout y navegación
│   └── tasks/          # Componentes de tareas
├── pages/
│   ├── auth/           # Login y registro
│   └── dashboard/      # Dashboard y detalles
├── services/           # Servicios de Firebase
├── store/             # Stores de Zustand
├── hooks/             # Custom hooks
├── routes/            # Configuración de rutas
├── utils/             # Utilidades y constantes
└── App.jsx            # Componente principal
```

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd Practica5_20245246
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
- Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
- Habilita Authentication (Email/Password)
- Crea una base de datos Firestore
- Copia las credenciales de configuración

4. **Configurar variables de entorno**
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env con tus credenciales de Firebase
```

5. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🎯 Funcionalidades

### Autenticación
- Registro de nuevos usuarios
- Inicio de sesión
- Cierre de sesión
- Protección de rutas

### Gestión de Tareas
- Crear tareas con título, descripción, categoría, prioridad y fecha
- Editar tareas existentes
- Marcar como completadas
- Eliminar tareas
- Ver detalles completos

### Filtros y Búsqueda
- Filtrar por estado (Todas/Pendientes/Completadas)
- Filtrar por categoría
- Búsqueda por título o descripción

### Estadísticas
- Total de tareas
- Tareas completadas
- Tareas pendientes
- Tareas vencidas
- Barra de progreso

## 📝 Categorías y Prioridades

**Categorías:**
- 🔵 Trabajo
- 🟢 Personal
- 🟣 Compras
- ⚪ Otros

**Prioridades:**
- 🟢 Baja
- 🟡 Media
- 🔴 Alta

## 🔐 Configuración de Firebase

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

### Firestore Indexes
Crea un índice compuesto en Firestore:
- Collection: `tasks`
- Fields: `userId` (Ascending), `createdAt` (Descending)

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📦 Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "firebase": "^11.1.0",
  "zustand": "^5.0.2",
  "react-hook-form": "^7.54.2",
  "date-fns": "^4.1.0",
  "react-hot-toast": "^2.4.1",
  "tailwindcss": "^4.0.0"
}
```

## 🎨 Personalización

### Colores del Tema
Los colores se pueden personalizar en `src/index.css` modificando las clases de Tailwind.

### Componentes Reutilizables
- `LoadingSpinner` - Spinner de carga
- `TaskStats` - Estadísticas de tareas
- `TaskCard` - Tarjeta individual de tarea
- `TaskForm` - Formulario crear/editar

## 🐛 Solución de Problemas

**Error: Firebase not configured**
- Verifica que el archivo `.env` existe y tiene todas las variables
- Reinicia el servidor de desarrollo

**Error: Permission denied**
- Revisa las reglas de seguridad de Firestore
- Verifica que el usuario esté autenticado

**Tareas no se actualizan en tiempo real**
- Verifica la conexión a internet
- Revisa la consola del navegador para errores

## 📄 Licencia

Este proyecto fue creado con fines educativos.

## 👨‍💻 Autor

Sebastian - Practica 5 - Web 2

---

**¡Gracias por usar Task Manager Pro!** 🎉

