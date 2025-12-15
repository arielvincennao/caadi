
import { supabase } from "../supabaseClient.js";

export async function getHome() {
  const { data, error } = await supabase
    .from("home")
    .select("*")
    .single();

  if (error) throw error;

  return data;
}
