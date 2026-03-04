/**
 * dataTransformers.js
 * Utilidades para transformar datos de la capa de acceso a datos
 * Funciones puras para manipular estructuras de datos
 */

/**
 * Transforma datos JSON que puede estar en diferentes formatos
 * @param {*} raw - Datos crudos (puede ser objeto, string JSON o null)
 * @returns {Object} Objeto parsed o vacío
 */
export function parseBlockData(raw) {
  if (raw == null) return {};
  
  if (typeof raw === "object") return raw;
  
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  
  return {};
}

/**
 * Convierte un bloque de la BD en el formato esperado por el componente
 * @param {Object} block - Bloque de la BD
 * @returns {Object} Bloque transformado
 */
export function mapBlock(block) {
  const data = parseBlockData(block.data);
  
  return {
    id: block.id,
    type: String(block.type || ""),
    data,
    ...data,
  };
}

/**
 * Organiza los bloques en una estructura jerárquica
 * Separa bloques raíz de bloques hijos y agrupa por parent_id
 * @param {Array} blocks - Array de bloques de la BD
 * @returns {Object} { rootBlocks, childrenByParentId }
 */
export function transformBlocksStructure(blocks) {
  const list = blocks || [];
  
  // Filtrar bloques sin parent (raíz)
  const rootBlocks = list.filter(
    (b) => b.parent_id == null || b.parent_id === ""
  );
  
  // Agrupar bloques hijos por su parent_id
  const childrenByParentId = {};
  for (const b of list) {
    if (b.parent_id != null && b.parent_id !== "") {
      const key = String(b.parent_id);
      if (!childrenByParentId[key]) {
        childrenByParentId[key] = [];
      }
      childrenByParentId[key].push(b);
    }
  }
  
  // Ordenar hijos por position
  for (const key of Object.keys(childrenByParentId)) {
    childrenByParentId[key].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }
  
  return { rootBlocks, childrenByParentId };
}
