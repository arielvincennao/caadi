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


module.exports = {
  getAllSections,
  getSectionBySlug
};
