//funcion multiuso la cual le pasas el slug como parametro y lo utiliza para realizar la consulta a la base de datoss :)

import { supabase } from "../supabaseClient.js";

export async function getSectionBySlug(slug) {
  const { data, error } = await supabase
    .from("section")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}
