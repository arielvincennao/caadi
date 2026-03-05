import { supabase } from "../../../db/supabaseClient";

export const OfficeRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from("*, office_section(section_id)")
      .select("*");
    if (error) throw error;
    return data || [];
  },
  
  async getBySection(sectionSlug) {
    const { data, error } = await supabase
      .from("office")
      .select("*, office_section!inner(section_id, section!inner(slug))")
      .eq("office_section.section.slug", sectionSlug);
    if (error) throw error;
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("office")
      .select("*, office_section(section_id)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  }
}