import { supabase } from "../../db/supabaseClient"

export const login = async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) return res.status(400).json({ error: error.message })

  res.json({ message: "Login exitoso", session: data.session })
}

export const getAllSections = async (req, res) => {
  const { data, error } = await supabase.from("sections").select("*")
  if (error) return res.status(400).json({ error })
  res.json(data)
}

export const getSectionById = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return res.status(404).json({ error: "Seccion no encontrada" })
  res.json(data)
}

export const createSection = async (req, res) => {
  const { data, error } = await supabase
    .from("sections")
    .insert(req.body)
    .single()

  if (error) return res.status(400).json({ error })
  res.json(data)
}

export const updateSection = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from("sections")
    .update(req.body)
    .eq("id", id)
    .single()

  if (error) return res.status(400).json({ error })
  res.json(data)
}

export const deleteSection = async (req, res) => {
  const { id } = req.params
  const { error } = await supabase
    .from("sections")
    .delete()
    .eq("id", id)

  if (error) return res.status(400).json({ error })
  res.json({ message: "Sección eliminada correctamente" })
}

export default router