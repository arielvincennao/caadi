import { supabase } from "../../../db/supabaseClient";

export const OfficeRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from("office")
      .select("*, office_section(section_id)");
    if (error) throw error;
    return data || [];
  },

  async getBySection(sectionSlug) {
    const { data: sectionData, error: sectionError } = await supabase
      .from("section")
      .select("id")
      .eq("slug", sectionSlug)
      .single();
    if (sectionError) throw sectionError;

    const { data, error } = await supabase
      .from("office_section")
      .select("office:office_id(*)")
      .eq("section_id", sectionData.id);
    if (error) throw error;
    return data?.map(row => row.office) || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("office")
      .select("*, office_section(section_id)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(officeData) {
    const { data, error } = await supabase
      .from("office")
      .insert([officeData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, changes) {
    const { data, error } = await supabase
      .from("office")
      .update(changes)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from("office")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  async linkSection(officeId, sectionId) {
    const { error } = await supabase
      .from("office_section")
      .insert({ office_id: officeId, section_id: sectionId });
    if (error) throw error;
  }

}