# API Frontend

Esta carpeta centraliza la capa de acceso a datos del frontend, proporcionando una abstracción clara entre la lógica de negocio y los detalles de infraestructura.

## Estructura

- `repositories/`  
  Contiene la capa de acceso directo a datos.

  Aquí se implementan funciones encargadas de interactuar con las fuentes de datos (por ejemplo, Supabase o APIs HTTP), incluyendo operaciones como consultas, inserciones, actualizaciones y eliminaciones para los distintos dominios (Auth, Section, Office, Claim, Storage, entre otros).

  Su responsabilidad principal es encapsular el cómo se accede a los datos, evitando que los componentes de UI dependan de detalles de implementación o tecnología.

- `services/`  
  Define la capa de casos de uso del frontend.

  Orquesta uno o más repositories para resolver necesidades específicas de la aplicación, aplicando reglas de negocio simples, normalizando respuestas y exponiendo métodos listos para ser consumidos por hooks o componentes.

  Su objetivo es encapsular el qué necesita la interfaz, manteniendo la UI desacoplada, más limpia y fácil de mantener.
