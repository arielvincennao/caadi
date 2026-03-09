import { SectionRepository } from "../repositories/SectionRepository";
import { transformBlocksStructure } from "../../utils/dataTransformers";

/**
 * SectionService
 * Capa de lógica de negocio
 * Orquesta las operaciones del repositorio y aplica transformaciones de datos
 * Encapsula la lógica compleja de obtención y procesamiento de secciones
 */

export const SectionService = {
  /**
   * Obtiene una sección completa con sus bloques organizados jerárquicamente
   * @param {string} slug - El slug de la sección
   * @returns {Promise<Object>} Objeto con sección y bloques estructura organizados
   */
  async getSectionWithBlocks(slug) {
    if (!slug) {
      throw new Error("Slug is required");
    }

    const { section, blocks } = await SectionRepository.getSectionWithBlocks(slug);

    if (!section) {
      return null;
    }

    // Transforma los bloques en una estructura jerárquica
    const { rootBlocks, childrenByParentId } = transformBlocksStructure(blocks);

    return {
      ...section,
      rootBlocks,
      childrenByParentId,
    };
  },

  /**
   * Verifica si una sección existe
   * @param {string} slug - El slug de la sección
   * @returns {Promise<boolean>}
   */
  async sectionExists(slug) {
    const section = await SectionRepository.getSectionBySlug(slug);
    return !!section;
  },

  async getAll() {
    return await SectionRepository.getAll();
  },

  async create(sectionData) {
    if (!sectionData.slug) throw new Error("El slug es requerido");
    if (!sectionData.title) throw new Error("El título es requerido");
    if (!sectionData.icon) throw new Error("El ícono es requerido");
    if (!sectionData.image) throw new Error("La imagen es requerida");
    if (sectionData.position === undefined) throw new Error("La posición es requerida");
    return await SectionRepository.create(sectionData);
  },

  async update(id, changes) {
    if (!id) throw new Error("El id es requerido");
    return await SectionRepository.update(id, changes);
  },
  
  async delete(id) {
    if (!id) throw new Error("El id es requerido");
    return await SectionRepository.delete(id);
  }
};
