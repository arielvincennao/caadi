import { supabase } from "../../../db/supabaseClient";

export const ClaimRepository = {
    async insert(formData) {
        const { error } = await supabase.from("claim").insert([formData]);
        if (error) throw error;
    }
}