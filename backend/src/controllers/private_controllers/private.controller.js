const { supabase } = require("../../../db/supabaseClient");

const getAllSections = async (req, res) => {

  const { data, error } = await supabase
    .from("section")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

const getSectionBySlug = async (req, res) => {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from("section")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return res.status(404).json({ error: error.message });
  }

  res.json(data);
};

module.exports = {
  getAllSections,
  getSectionBySlug
};
