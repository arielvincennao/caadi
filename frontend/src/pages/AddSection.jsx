import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import Button from "../components/common/Button";
import BtnBack from "../components/common/BtnBack";
import { SectionRepository } from "../api/repositories/SectionRepository";

function AddSection() {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate slug from title
      const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

      // Get max position
      const sections = await SectionRepository.getAll();
      const maxPosition = sections.length > 0 ? Math.max(...sections.map(s => s.position || 0)) : 0;
      const position = maxPosition + 1;

      const sectionData = {
        title,
        icon,
        slug,
        position,
        description, // Assuming the table has this field
      };

      await SectionRepository.create(sectionData);
      alert("Sección agregada exitosamente");
      navigate("/menu");
    } catch (error) {
      console.error("Error adding section:", error);
      alert("Error al agregar la sección");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>
      <section className="flex flex-col items-center pb-10 pt-20 md:pt-4">
        <Title className="m-4 md:text-2xl">Agregar Sección</Title>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="icon" className="block text-sm font-medium">Imagen (URL del ícono)</label>
            <input
              type="text"
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Agregando..." : "Agregar Sección"}
          </Button>
        </form>
      </section>
    </div>
  );
}

export default AddSection;