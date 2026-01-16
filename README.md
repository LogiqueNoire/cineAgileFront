# CineAgile Frontend

Frontend del sistema **CineAgile**, una aplicación web para la gestión y visualización de películas, funciones y ventas de un cine, que incluye un **módulo público** y un **módulo de intranet (administración)**.

El proyecto está desarrollado con **React** y organizado por **dominios funcionales**, facilitando el mantenimiento, la escalabilidad y la optimización de procesos del negocio.

---

## Tecnologías usadas

- React
- JavaScript (ES6+)
- CSS
- Vite
- Context API (manejo de estado global)
- Fetch / Axios (consumo de API REST)
- ESLint
- Jenkins (CI)

---

## Estructura del proyecto

```text
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
│   │   ├── 1-cartelera
│   │   ├── 2-sedes-horarios
│   │   ├── 3-butacas
│   │   ├── 4-precios
│   │   ├── 5-pago
│   │   └── 6-entradas
│   ├── index.jsx          # Punto de entrada de React
│   ├── globals.css        # Estilos globales
│   └── utils.jsx          # Funciones utilitarias
│
├── .env
├── .env.template
├── .gitignore
├── eslint.config.js
├── index.html
├── Jenkinsfile
└── jsconfig.json
```

## Módulos principales

### Módulo Público
- Visualización de películas  
- Consulta de funciones por sede y fecha  
- Flujo de venta de entradas  

### Módulo Intranet (Administración)
Acceso restringido para la gestión interna del cine:

- Gestión de películas  
- Gestión de géneros  
- Gestión de funciones  
- Gestión de sedes y salas  
- Gestión de usuarios  
- Auditoría  
- Analíticas  
- Opciones para desarrollador  

---

## Variables de entorno

El proyecto utiliza variables de entorno para conectarse al backend.

Archivo base:
```bash
.env.template
```

## Ejecución en desarrollo

Instalar dependencias:
```bash
npm install
```
Ejecutar proyecto:
```bash
npm run dev
```

Abrir en el navegador:
```bash

http://localhost:5173
```
Build de producción
```bash
npm run build
```

Los archivos de producción se generarán en la carpeta:
```bash
dist/
```

Autenticación

El módulo Intranet utiliza un formulario de login (LoginForm.jsx) y manejo de sesión mediante Context API, restringiendo el acceso a funcionalidades administrativas según el estado de autenticación.


✔ Jerarquía correcta  
✔ Bloques de código bien definidos  
✔ Estilo estándar de GitHub  

Si quieres, seguimos con otra sección o armamos el **README completo final** en una sola pieza.
