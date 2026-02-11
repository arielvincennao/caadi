const { supabase } = require("../../../db/supabaseClient");

const getSectionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const { data: section, error } = await supabase
      .from("section")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSectionBySlug,
};
