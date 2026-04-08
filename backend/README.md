# Backend

Este documento resume los componentes mas importantes del backend y su rol dentro del sistema CAADI.

## Componentes clave

- `server.js`  
  Punto de entrada del backend. Inicializa Express, configura middlewares globales, prepara el cliente de Supabase, monta rutas publicas/privadas y levanta el servidor.

- `db/supabaseClient.js`  
  Encapsula la conexion a Supabase con variables de entorno (`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`) para reutilizarla en controladores.

- `src/routes/public_routes/menuAPI.js`  
  Router publico para el menu. Expone el endpoint GET y delega la logica de negocio al controlador `menuDB`.

- `src/controllers/public_controllers/menuDB.js`  
  Controlador publico de menu. Consulta la tabla `section` y retorna los campos necesarios (`title`, `icon`) para renderizar el menu en frontend.

- `src/routes/public_routes/sectionBySlugAPI.js`  
  Router publico para obtener una seccion por `slug`.

- `src/controllers/public_controllers/sectionBySlugDB.js`  
  Controlador publico que busca una seccion por `slug` en Supabase. Devuelve la seccion encontrada, responde `404` si no existe y `500` ante errores.

- `src/routes/private_routes/private.routes.js`  
  Router privado (admin). Centraliza endpoints administrativos bajo `/admin`.

- `src/controllers/private_controllers/private.controller.js`  
  Controlador privado para gestion de secciones administrativas. Incluye la obtencion de todas las secciones.
