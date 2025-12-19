const { supabase } = require("../../../db/supabaseClient");

const getAllSections = async (req, res) => {
  console.log("asddas");

  const { data, error } = await supabase
    .from("section")
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

//aca agus podes crear los demas metodos privados

module.exports = {
  getAllSections,
  getSectionBySlug
};
