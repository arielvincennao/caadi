import { getHome } from "../../routes/public_routes/homeDB";

app.get("/home", async (res) => {

  try {
    const home = await getHome();
    res.json(home);
  } catch (error) {
    res.status(500).json({ error });
  }
  
});