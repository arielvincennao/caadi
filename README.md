## CAADI

CAADI es una plataforma digital para centralizar informacion administrativa, cultural y de servicios orientados a personas con discapacidad.
El objetivo es facilitar el acceso a recursos utiles y promover una participacion mas autonoma e inclusiva.

El proyecto esta dividido en:

- `frontend`: aplicacion React + Vite.
- `Supabase`: base de datos y servicios de datos.
- `frontend/src/api`: capa de acceso a datos y servicios de negocio en cliente.

---

## Requisitos previos

- Node.js 18 o superior (recomendado: version LTS actual).
- npm 9 o superior.
- Una cuenta/proyecto de Supabase con las tablas necesarias.

---

## Estructura del proyecto

- `frontend/`: interfaz de usuario y logica cliente.
- `frontend/db/supabaseClient.js`: cliente de Supabase para el frontend.
- `frontend/src/api/repositories/`: acceso directo a datos (consultas a Supabase).
- `frontend/src/api/services/`: casos de uso para la UI.

---

## Variables de entorno

### Frontend (`frontend/.env`)

Crear un archivo `frontend/.env` con:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### Consideraciones importantes sobre claves

- `VITE_SUPABASE_ANON_KEY` es publica y se usa en el cliente.
- Mantener activas las politicas RLS y permisos correctos en Supabase.
- No subir archivos `.env` al repositorio.

---

## Instalacion

Desde la raiz del proyecto:

```bash
cd frontend
npm install
```

---

## Ejecucion en desarrollo

Se levanta el frontend:

```bash
cd frontend
npm run dev
```

Frontend disponible en `http://localhost:5173`.

---

## Capa API en frontend

Leer README de `/frontend/src/api`.

---
