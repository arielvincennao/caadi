import { supabase } from "../../../db/supabaseClient";

export const ContentBlockRepository = {
  async getBySection(sectionId) {
    const { data, error } = await supabase
      .from("content_block")
      .select("*")
      .eq("section_id", sectionId)
      .order("position", { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async create(block) {
    const { data, error } = await supabase
      .from("content_block")
      .insert([block])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, changes) {
    const { data, error } = await supabase
      .from("content_block")
      .update(changes)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from("content_block")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  async updatePositions(blocks) {
    const promises = blocks.map(({ id, position }) =>
      supabase.from("content_block").update({ position }).eq("id", id)
    );
    const results = await Promise.all(promises);
    const failed = results.find(({ error }) => error);
    if (failed?.error) throw failed.error;
  }
};