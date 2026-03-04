import { supabase } from "../../../db/supabaseClient";

export const OfficeRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from("office")
      .select("*");
    if (error) throw error;
    return data || [];
  }
}