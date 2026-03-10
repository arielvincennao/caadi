import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { SectionService } from "../api/services/SectionService";
import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import { Title, Text } from "../components/Typography";
import SectionBlock from "../components/sections/SectionBlock";

/**
 * Section
 * Responsabilidades:
 * - Renderizar la sección con todos sus bloques
 * - Manejar estado local de UI
 * - Presentar datos de forma visual
 * - Permitir edición si el usuario es admin
 */
function Section({ data: initialData }) {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) setEditData(initialData);
  }, [initialData]);

  if (!initialData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await SectionService.update(editData.id, {
        title: editData.title,
        description: editData.description,
        image: editData.image
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error guardando sección:", err);
    }
  };

  const rootBlocks = editData.rootBlocks ?? [];

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />

      <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>

      <div className="p-3 md:w-6xl pt-20 md:pt-3 w-full mx-auto">

        {isAuthenticated && (
          <div className="mb-6 p-4 bg-white border-l-4 border-blue-600 shadow-sm flex justify-between items-center rounded-r-lg">
            <span className="font-bold text-blue-800">Panel de Administración</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (isEditing) setEditData(initialData);
                }}
                className={`px-4 py-2 rounded font-medium transition ${isEditing ? 'bg-red-100 text-red-600' : 'bg-blue-600 text-white'}`}
              >
                {isEditing ? "Cancelar" : "Editar Sección"}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700"
                >
                  Guardar
                </button>
              )}
            </div>
          </div>
        )}

        <section className="flex flex-col items-center text-center md:text-left md:items-start mb-8 w-full">
          <div className="w-full relative mb-6">
            {editData.image && (
              <img
                src={editData.image}
                alt={editData.title}
                className={`w-full max-h-64 md:max-h-96 object-cover rounded-lg ${isEditing ? 'opacity-50 ring-4 ring-blue-400' : ''}`}
              />
            )}
            {isEditing && (
              <div className="mt-2">
                <label className="text-xs font-bold text-gray-500 uppercase">URL de la Imagen</label>
                <input
                  name="image"
                  value={editData.image || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm bg-white"
                />
              </div>
            )}
          </div>

          <div className="w-full mb-2">
            {isEditing ? (
              <div className="flex flex-col">
                <label className="text-xs font-bold text-blue-600 uppercase">Título</label>
                <input
                  name="title"
                  value={editData.title || ""}
                  onChange={handleChange}
                  className="text-3xl font-bold border-b-2 border-blue-500 bg-transparent outline-none w-full py-2"
                />
              </div>
            ) : (
              <Title>{editData.title}</Title>
            )}
          </div>

          <div className="w-full mb-4">
            {isEditing ? (
              <div className="flex flex-col">
                <label className="text-xs font-bold text-blue-600 uppercase">Descripción</label>
                <textarea
                  name="description"
                  value={editData.description || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border-2 border-blue-100 rounded-lg outline-none focus:border-blue-500 bg-white"
                />
              </div>
            ) : (
              <Text>{editData.description}</Text>
            )}
          </div>
        </section>

        {rootBlocks.map((block) => (
          <SectionBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}

export default Section;
