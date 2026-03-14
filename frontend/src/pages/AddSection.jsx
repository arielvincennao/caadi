import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import Button from "../components/common/Button";
import BtnBack from "../components/common/BtnBack";
import { SectionService } from "../api/services/SectionService";
import { StorageService } from "../api/services/StorageService";

function AddSection() {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
      const sections = await SectionService.getAll();
      const maxPosition = sections.length > 0 ? Math.max(...sections.map(s => s.position || 0)) : 0;
      const position = maxPosition + 1;

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await StorageService.uploadImage('section_covers', imageFile);
      }

      await SectionService.create({
        title,
        icon,
        slug,
        position,
        description,
        image: imageUrl
      });

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
            <label className="block text-sm font-medium">Título</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Ícono</label>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Imagen de portada</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
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