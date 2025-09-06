# Sistema Electoral

Un sistema de votación electrónica con blockchain integrado para elecciones universitarias.

## 🚀 Características

- **Autenticación de usuarios** con matrícula y contraseña
- **Sistema de votación** con prevención de votos duplicados
- **Blockchain simple** para transparencia electoral
- **Dashboard** con estadísticas en tiempo real
- **UI moderna** con Material-UI

## 📋 Requisitos

- Node.js (v16 o superior)
- MySQL (v8.0 o superior)
- npm o yarn

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Sistema-Electoral
```

### 2. Configurar la base de datos

Crear una base de datos MySQL y ejecutar el esquema:

```sql
-- Crear la base de datos
CREATE DATABASE sistema_electoral;
USE sistema_electoral;

-- Ejecutar el archivo schema.sql
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la carpeta `Backend_`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=sistema_electoral
PORT=3000
```

### 4. Instalar dependencias

```bash
# Backend
cd Backend_
npm install

# Frontend
cd ../Frontend_
npm install
```

### 5. Insertar datos de prueba

```bash
cd Backend_
npm run insert-test-data
```

### 6. Ejecutar el proyecto

**Terminal 1 - Backend:**
```bash
cd Backend_
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Frontend_
npm run dev
```

## 👤 Usuario de Prueba

- **Matrícula:** demo123
- **Contraseña:** demo123

## 🔧 Estructura del Proyecto

```
Sistema-Electoral/
├── Backend_/           # API REST con Express
│   ├── database/       # Esquema de base de datos
│   ├── index.js        # Servidor principal
│   └── insertTestData.js # Script de datos de prueba
└── Frontend_/          # Aplicación React
    ├── src/
    │   ├── context/    # Contexto de autenticación
    │   ├── pages/      # Páginas de la aplicación
    │   └── components/ # Componentes reutilizables
    └── public/         # Archivos estáticos
```

## 🎯 Funcionalidades

### Autenticación
- Login con matrícula y contraseña
- Registro de nuevos estudiantes
- Gestión de sesiones

### Votación
- Visualización de elecciones activas
- Votación por candidatos
- Prevención de votos duplicados

### Blockchain
- Almacenamiento seguro de votos
- Hash SHA-256 para integridad
- Visualización de bloques

### Dashboard
- Estadísticas en tiempo real
- Listado de elecciones
- Resumen de participación

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Validación de datos en frontend y backend
- Prevención de votos duplicados
- Blockchain para transparencia

## 🚀 Próximas Mejoras

- [ ] Panel de administración
- [ ] Gestión de candidatos (CRUD)
- [ ] Reportes avanzados con gráficos
- [ ] Notificaciones en tiempo real
- [ ] Tests unitarios y de integración
- [ ] JWT para autenticación robusta

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. 