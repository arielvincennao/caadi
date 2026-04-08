## CAADI

CAADI es una plataforma digital para centralizar informacion administrativa, cultural y de servicios orientados a personas con discapacidad.
El objetivo es facilitar el acceso a recursos utiles y promover una participacion mas autonoma e inclusiva.

El proyecto esta dividido en:

- `frontend`: aplicacion React + Vite.
- `backend`: API REST con Express.
- `Supabase`: base de datos y servicios de datos.

---

## Requisitos previos

- Node.js 18 o superior (recomendado: version LTS actual).
- npm 9 o superior.
- Una cuenta/proyecto de Supabase con las tablas necesarias.

---

## Estructura del proyecto

- `frontend/`: interfaz de usuario y logica cliente.
- `backend/`: servidor, rutas publicas/privadas y controladores.
- `backend/db/supabaseClient.js`: cliente de Supabase para el backend.
- `frontend/db/supabaseClient.js`: cliente de Supabase para el frontend.

---

## Variables de entorno

### Backend (`backend/.env`)

Crear un archivo `backend/.env` con:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
PORT=3000
```

### Frontend (`frontend/.env`)

Crear un archivo `frontend/.env` con:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### Consideraciones importantes sobre claves

- No subir archivos `.env` al repositorio.

---

## Instalacion

Desde la raiz del proyecto:

```bash
cd backend
npm install
cd ../frontend
npm install
```

---

## Ejecucion en desarrollo

Se deben levantar **dos servicios** (backend y frontend).

### 1) Levantar backend

```bash
cd backend
npm run dev
```

Backend disponible en `http://localhost:3000` (o el `PORT` configurado).

### 2) Levantar frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

Frontend disponible en `http://localhost:5173`.

---

## Endpoints base del backend

- `GET /` - estado basico del servidor.
- `GET /menu` - menu publico (titulos e iconos de secciones).
- `GET /sections/:slug` - detalle de una seccion publica por slug.
- `GET /admin/sections` - listado de secciones para administracion.
- `GET /admin/sections/:slug` - ruta declarada para admin (revisar implementacion en controlador privado).

---
