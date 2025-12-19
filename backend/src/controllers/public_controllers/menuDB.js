const { supabase } = require("../../../db/supabaseClient");


const getMenu = async (req, res) => {
  console.log("in");
  const { data, error } = await supabase.from("section").select("title, icon");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

module.exports = {
  getMenu,
};
