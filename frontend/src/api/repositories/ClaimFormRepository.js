import { supabase } from "../../../db/supabaseClient";

export const ClaimFormRepository = {
  async get() {
    const { data, error } = await supabase
      .from("claim_form")
      .select("*")
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, changes) {
    const { data, error } = await supabase
      .from("claim_form")
      .update(changes)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};