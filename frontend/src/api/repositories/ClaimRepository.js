import { supabase } from "../../../db/supabaseClient";

export const ClaimRepository = {
    async getAll() {
        const { data, error } = await supabase
            .from("claim")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data || [];
    },
    
    async insert(formData) {
        const { error } = await supabase.from("claim").insert([formData]);
        if (error) throw error;
    }
}