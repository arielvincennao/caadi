/**
 * AddSection
 * Responsabilidades:
 * - Mostrar un formulario para crear una nueva “sección” (título, ícono, descripción y portada)
 * - Convertir el título a un `slug` usable para la URL
 * - Subir la imagen a storage
 * - Persistir la nueva sección con `SectionService.create(...)`
 * - Después de crear, volver al menú con un mensaje de feedback
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import Button from "../components/common/Button";
import BtnBack from "../components/common/BtnBack";
import { SectionService } from "../api/services/SectionService";
import { StorageService } from "../api/services/StorageService";
import { ICON_OPTIONS } from "../utils/iconOptions.JS";
import { Icon } from "../components/common/Icon";

function AddSection() {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: "", type: "" });

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

      setFeedback({ message: "¡Sección creada con éxito! Redirigiendo...", type: "success" });
      setTimeout(() => {
        navigate("/menu");
      }, 2000);

    } catch (error) {
      console.error("Error adding section:", error);
      setFeedback({ message: "Hubo un error al guardar la sección.", type: "error" });
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
        {feedback.message && (
          <div className={`mb-4 p-4 rounded-lg w-full max-w-md text-center font-medium animate-bounce ${feedback.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
            }`}>
            {feedback.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <div>
              <label className="block text-sm font-medium mb-2">Seleccionar Ícono</label>

              <div className="mb-3 p-2 border w-fit rounded-lg bg-gray-50">
                <Icon name={icon || "cud"} className="w-8 h-8 text-blue-600" />
              </div>

              <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border rounded mt-1">
                {ICON_OPTIONS.map((ico) => (
                  <button
                    key={ico}
                    type="button"
                    onClick={() => setIcon(ico)}
                    className={`p-2 border rounded flex justify-center items-center transition-colors ${icon === ico ? "bg-blue-200 ring-2 ring-blue-400" : "hover:bg-gray-100"
                      }`}
                  >
                    <Icon name={ico} className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>
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