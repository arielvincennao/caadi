import { supabase } from "../../../db/supabaseClient";

/**
 * SectionRepository
 * Capa de acceso a datos - Responsable ÚNICAMENTE de comunicarse con Supabase
 * No contiene lógica de negocio ni transformaciones complejas de datos
 */

export const SectionRepository = {
  /**
   * Obtiene una sección particular por su slug
   * @param {string} slug - El slug de la sección
   * @returns {Promise<Object|null>} La sección o null si no existe
   */
  async getSectionBySlug(slug) {
    const { data: section, error } = await supabase
      .from("section")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching section:", error);
      return null;
    }

    return section;
  },

  /**
   * Obtiene todos los bloques de contenido para una sección
   * @param {number} sectionId - El ID de la sección
   * @returns {Promise<Array>} Array de bloques ordenados por posición
   */
  async getContentBlocksBySection(sectionId) {
    const { data: blocks, error } = await supabase
      .from("content_block")
      .select("*")
      .eq("section_id", sectionId)
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching blocks:", error);
      return [];
    }

    return blocks || [];
  },

  /**
   * Obtiene una sección con todos sus bloques en una llamada
   * (optimizado para evitar dos llamadas separadas)
   * @param {string} slug - El slug de la sección
   * @returns {Promise<Object>} Objeto con section y blocks
   */
  async getSectionWithBlocks(slug) {
    const section = await this.getSectionBySlug(slug);

    if (!section) {
      return { section: null, blocks: [] };
    }

    const blocks = await this.getContentBlocksBySection(section.id);

    return { section, blocks };
  },

  async getAll() {
    const { data, error } = await supabase
      .from("section")
      .select("*")
      .order("position", { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async create(sectionData) {
    const { data, error } = await supabase
      .from("section")
      .insert([sectionData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, changes) {
    const { data, error } = await supabase
      .from("section")
      .update(changes)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from("section")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  async delete(slug) {
    const { error } = await supabase
      .from("section")
      .delete()
      .eq("slug", slug);
    if (error) throw error;
  }

};
