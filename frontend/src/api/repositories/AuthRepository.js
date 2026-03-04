import { supabase } from "../../../db/supabaseClient";

export const AuthRepository = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((_event, session) => callback(session))
  }
}