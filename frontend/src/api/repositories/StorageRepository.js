import { supabase } from "../../../db/supabaseClient";

export const StorageRepository = {
  async upload(bucket, path, file) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });
    if (error) throw error;
    return data;
  },

  getPublicUrl(bucket, path) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  },

  async delete(bucket, path) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    if (error) throw error;
  },

  async list(bucket, folder) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder);
    if (error) throw error;
    return data || [];
  }
};