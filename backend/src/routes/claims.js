import { supabase } from "../db/supabaseClient.js";

export async function createClaim(data) {
  return await supabase.from("claim").insert([data]).select().single();
}

export async function getClaims() {
  return await supabase
    .from("claim")
    .select("*")
    .order("created_at", { ascending: false });
}
