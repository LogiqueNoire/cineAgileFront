#CineAgile Frontend

Frontend del sistema CineAgile, una aplicación web para la gestión y visualización de películas, funciones y ventas de un cine, incluyendo un módulo público y un módulo de intranet (administración).

El proyecto está desarrollado con React y organizado por dominios funcionales, facilitando el mantenimiento y la escalabilidad.

Tecnologías usadas
- React
- JavaScript (ES6+)
- CSS
- Vite
- Context API (manejo de estado global)
- Fetch / Axios (consumo de API REST)
- ESLint

Estructura del proyecto
cineAgileFront/
├── public/
├── src/
│   ├── assets/            # Recursos estáticos (imágenes, íconos)
│   ├── components/        # Componentes reutilizables
│   ├── configuracion/     # Configuración general del proyecto
│   ├── context/           # Context API (autenticación, estado global)
│   ├── intranet/          # Módulo administrativo
│   │   ├── ajustes
│   │   ├── analiticas
│   │   ├── auditoria
│   │   ├── dev
│   │   ├── funciones
│   │   ├── generos
│   │   ├── peliculas
│   │   ├── sedes-salas
│   │   ├── usuarios
│   │   ├── intranet.css
│   │   ├── Intranet.jsx
│   │   ├── IntranetPanel.jsx
│   │   └── LoginForm.jsx
│   ├── services/          # Servicios para consumo de la API
│   ├── venta/             # Módulo de ventas
│   │   ├── 1 cartelera
│   │   ├── 2 sedes-horarios
│   │   ├── 3 butacas
│   │   ├── 4 precios
│   │   ├── 5 pago
│   │   ├── 6 entradas
│   ├── index.jsx          # Punto de entrada de React
│   ├── globals.css        # Estilos de la página principal
│   └── utils.jsx          # Funciones utilitarias
│
├── .env
├── .env.template
├── .gitignore
├── eslint.config.js
├── index.html
├── Jenkinsfile
└── jsconfig.json

Módulos principales
Módulo Público
- Visualización de películas
- Consulta de funciones
- Flujo de venta de entradas

Módulo Intranet (Administración)
- Acceso restringido para gestión interna del cine:
- Gestión de películas
- Gestión de géneros
- Gestión de funciones
- Gestión de sedes y salas
- Gestión de usuarios
- Auditoría
- Analíticas
- Opciones para desarrollador

Variables de entorno

El proyecto usa variables de entorno para conectarse al backend.

Archivo base:
.env.template


Ejemplo:
VITE_API_URL=http://localhost:8080/api


Copia el archivo:
cp .env.template .env


Y ajusta la URL según tu backend.

Ejecución en desarrollo
npm install
npm run dev


Luego abre:

http://localhost:5173

Build de producción
npm run build

Los archivos se generarán en la carpeta dist/.

Autenticación

El módulo Intranet utiliza un formulario de login (LoginForm.jsx) y manejo de sesión mediante Context API, restringiendo el acceso a funcionalidades administrativas.

Calidad y CI

ESLint configurado para mantener buenas prácticas

Jenkinsfile incluido para integración continua

Backend

Este frontend consume un backend REST (por ejemplo, Spring Boot), encargado de:

Autenticación

Gestión de películas, funciones y ventas

Persistencia de datos

Arquitectura cliente-servidor

Optimización de procesos
