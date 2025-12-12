import { getSectionBySlug } from "../../root/sectionBySlugDB";

app.get("/section/:slug", async (req, res) => {
  const { slug } = req.params;

  try {
    const section = await getSectionBySlug(slug);
    res.json(section);
  } catch (error) {
    res.status(500).json({ error });
  }
});