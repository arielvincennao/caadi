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
    section_id: block.section_id,
    data,
    ...data,
  };
}

export function transformBlocksStructure(blocks) {
  const list = blocks || [];

  // Indexamos todos los bloques por id para acceso rápido
  const blockMap = {};
  for (const b of list) {
    blockMap[String(b.id)] = { ...mapBlock(b), children: [] };
  }

  // Adjuntamos cada hijo a su padre
  for (const b of list) {
    if (b.parent_id != null && b.parent_id !== "") {
      const parent = blockMap[String(b.parent_id)];
      if (parent) {
        parent.children.push(blockMap[String(b.id)]);
      }
    }
  }

  // Ordenamos los hijos por position en todos los niveles
  for (const block of Object.values(blockMap)) {
    block.children.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }

  // Los bloques raíz son los que no tienen parent_id
  const rootBlocks = list
    .filter(b => b.parent_id == null || b.parent_id === "")
    .map(b => blockMap[String(b.id)])
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  return { rootBlocks };
}
