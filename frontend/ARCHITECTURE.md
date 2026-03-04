# Arquitectura en Capas - Frontend CAADI

## Descripción General

Se ha refactorizado el código siguiendo una **arquitectura en capas** que separa claramente las responsabilidades. Esto mejora:
- Testabilidad
- Mantenibilidad
- Reutilización de código
- Debugging y seguimiento de errores

---

## Estructura de Capas

```
src/
├── api/                              # Capa de Acceso a Datos y Lógica de Negocio
│   ├── repositories/
│   │   └── SectionRepository.js       # Acceso directo a BD (Supabase)
│   └── services/
│       └── SectionService.js          # Lógica de negocio y orquestación
├── hooks/                            # Capa de Lógica de React
│   └── useSectionData.js             # Custom hook con estado de React
├── utils/                            # Funciones Utilitarias
│   └── dataTransformers.js           # Transformación de datos (puras)
└── pages/                            # Capa de Presentación
    ├── DynamicSection.jsx            # Container Component
    └── Section.jsx                   # Presentational Component
```

---

## Capas Explicadas

### 1. **REPOSITORIES** (Acceso a Datos)
**Ubicación:** `src/api/repositories/`

**Responsabilidad ÚNICA:** Comunicación con Supabase

```javascript
// SectionRepository.js
- getSectionBySlug(slug)          // Query simple a BD
- getContentBlocksBySection(id)   // Query simple a BD
- getSectionWithBlocks(slug)      // Combina dos queries
```

**Reglas:**
- ✅ Llamadas a `supabase.from().select()...`
- ✅ Manejo básico de errores
- ✅ Retornar datos sin transformar
- ❌ NO lógica de negocio
- ❌ NO transformaciones complejas

---

### 2. **SERVICES** (Lógica de Negocio)
**Ubicación:** `src/api/services/`

**Responsabilidad:** Orquestar repositorios y aplicar lógica de negocio

```javascript
// SectionService.js
- getSectionWithBlocks(slug)      // Llama a repo + transforma datos
- sectionExists(slug)              // Validación lógica
```

**Reglas:**
- ✅ Importar y usar Repositories
- ✅ Importar y usar Utils (dataTransformers)
- ✅ Validaciones y transformaciones complejas
- ✅ Encapsular lógica reutilizable
- ❌ NO acceso directo a BD
- ❌ NO estado de React

---

### 3. **UTILS** (Funciones Utilitarias)
**Ubicación:** `src/utils/`

**Responsabilidad:** Funciones puras para transformar datos

```javascript
// dataTransformers.js
- parseBlockData(raw)              // Parsear JSON con manejo de errores
- mapBlock(block)                  // Transformar bloque a formato UI
- transformBlocksStructure(blocks) // Organizar bloques jerárquicamente
```

**Reglas:**
- ✅ Funciones puras (mismo input = mismo output)
- ✅ Sin efectos secundarios
- ✅ Sin dependencias externas (excepto librerías)
- ✅ Reutilizables en cualquier contexto
- ❌ NO estado
- ❌ NO llamadas a APIs
- ❌ NO lógica de React

---

### 4. **CUSTOM HOOKS** (Lógica de React)
**Ubicación:** `src/hooks/`

**Responsabilidad:** Encapsular lógica con estado de React

```javascript
// useSectionData.js
- Llamar a Services
- Manejar estado (data, loading, error)
- Manejar efectos secundarios (useEffect)
- Memory leak protection
```

**Reglas:**
- ✅ Usar `useState`, `useEffect`, etc.
- ✅ Llamar a Services (no Repositories)
- ✅ Retornar { data, loading, error, etc }
- ✅ Cleanup en useEffect
- ❌ NO renderizar JSX
- ❌ NO acceso directo a BD

---

### 5. **COMPONENTS** (Presentación)
**Ubicación:** `src/pages/`, `src/components/`

**Tipos:**
- **Container Components** (Smart): Obtienen datos, manejan lógica
- **Presentational Components** (Dumb): Solo reciben props, renderizan

```javascript
// DynamicSection.jsx (Container)
- Usa hook useSectionData()
- Maneja routing (useParams)
- Control de loading/error
- Renderiza Section

// Section.jsx (Presentational)
- Recibe data como prop
- Maneja estado UI local (expandedId)
- Renderiaza HTML y componentes hijos
```

**Reglas:**
- ✅ Container: Lógica + orquestación
- ✅ Presentational: Visualización pura
- ✅ Usar utils para transformaciones simples
- ❌ NO llamadas directas a BD
- ❌ NO crear Services/Repositories aquí

---

## Flujo de Datos

```
URL con slug
    ↓
DynamicSection (obtiene slug de useParams)
    ↓
useSectionData(slug) [Hook]
    ↓
SectionService.getSectionWithBlocks(slug) [Service]
    ↓
SectionRepository.getSectionWithBlocks(slug) [Repository]
    ↓
supabase.from().select() [BD]
    ↓
Datos crudos ← dataTransformers.transformBlocksStructure()
    ↓
Datos transformados → useState en Hook
    ↓
DynamicSection recibe { data, loading, error }
    ↓
Section (presentacional) recibe data y renderiza
```

---

## Ventajas de esta Arquitectura

| Aspecto | Antes | Después |
|--------|-------|---------|
| **Acoplamiento** | Alto (BD en componentes) | Bajo (separado en capas) |
| **Testabilidad** | Difícil (depende de BD) | Fácil (mock Services) |
| **Reutilización** | Baja | Alta (Services reutilizables) |
| **Debugging** | Complejo (lógica dispersa) | Simple (encontrar por capa) |
| **Escalabilidad** | Frágil | Robusta |

---

## Cómo Agregar Nuevas Funcionalidades

### Ejemplo: Agregar obtención de comentarios

**1. Crear Repository**
```javascript
// src/api/repositories/CommentRepository.js
export const CommentRepository = {
  async getCommentsBySection(sectionId) {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("section_id", sectionId);
    return data || [];
  }
};
```

**2. Crear Service**
```javascript
// src/api/services/CommentService.js
export const CommentService = {
  async getCommentsBySlug(slug) {
    // Lógica para obtener section primero, luego comentarios
    const section = await SectionRepository.getSectionBySlug(slug);
    if (!section) return [];
    return await CommentRepository.getCommentsBySection(section.id);
  }
};
```

**3. Crear Hook (si es necesario)**
```javascript
// src/hooks/useComments.js
export function useComments(slug) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    CommentService.getCommentsBySlug(slug).then(setComments);
  }, [slug]);
  return comments;
}
```

**4. Usar en Componente**
```javascript
// En DynamicSection.jsx o Section.jsx
const comments = useComments(slug);
// Renderizar comments
```

---

## Patrones de Error Handling

### En Repository
```javascript
// Simple: retornar null o []
if (error) {
  console.error("Error:", error);
  return null;
}
```

### En Service
```javascript
// Validación y manejo lógico
if (!section) {
  throw new Error("Sección no encontrada");
}
```

### En Hook
```javascript
// Con estado para UI
try {
  const data = await SectionService.getSectionWithBlocks(slug);
  setData(data);
} catch (err) {
  setError(err.message);
}
```

### En Componente
```javascript
// Mostrar al usuario
if (error) {
  return <div>Error: {error}</div>;
}
```

---

## Checklist: Al Hacer Cambios

- [ ] ¿El cambio accede a BD? → Ir a Repository
- [ ] ¿El cambio tiene lógica de negocio? → Ir a Service
- [ ] ¿El cambio manipula objetos? → Ir a Utils
- [ ] ¿El cambio maneja estado React? → Ir a Hook
- [ ] ¿El cambio renderiza HTML? → Ir a Component
- [ ] ¿El componente hace `supabase.from()`? → 🚨 REFACTORIZAR

---

## Próximos Pasos para Refactorizar el Resto

Usar este patrón para otros componentes que hacen llamadas directas a BD:

1. **Menu.jsx, Home.jsx, etc.** → Crear SectionRepository, etc.
2. **Admin.jsx** → Crear AdminService con lógica de CRUD
3. **Componentes de mapa, etc.** → Crear OfficesService
4. **Autenticación** → Crear AuthService

**Orden sugerido:** Módulos menos usados primero, datos relacionados juntos.

---

## Contacto y Dudas

Esta arquitectura es flexible. Adaptarla a nuevas necesidades del proyecto.
